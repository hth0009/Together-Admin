<template>
  <div class="teams-container">
    <sweet-modal icon="warning" ref="deleteTeamModal">
      <h3>Are you sure you want to delete {{selectedTeam.name}}?</h3>
      <button slot="button" class="basic-button red" @click="deleteTeam">DELETE</button>
    </sweet-modal>
    <sweet-modal icon="success" ref="teamCreated">
      <h3>{{newTeam.name}} created!!</h3>
    </sweet-modal>
    <div class="page-wrapper">      
      <div class="page-card-wrapper">
        <!-- <h2>Teams</h2> -->
        <cards
          :cardList="formattedTeams"
          :loading="teamsLoading"
          :selectedID="selectedID + ''"
          :hasAddNew="true"
          :alphabetical="true"
          @selected="recieveID"
          @onAddNew="createNewItem"
          :filters="teamFilters"/>
      </div>
      <transition name="fadeOut">
      <div class="selected-view" v-if="selectedID != -1 && !creatingNewItem && Object.keys(selectedTeam).length != 0">
        <div class="header"> 
          <div class="profile-pic">
            <avatar
              :height="100"
              :url="selectedTeam.teamImageURL"
              :title="selectedTeam.name"/>
          </div>
          <h3>{{selectedTeam.name}}</h3>
          <div class="subtitle" v-if="selectedTeam.isAnonymous">anonymous</div>
          <div class="subtitle" v-else-if="selectedTeam.isServeTeam">private group</div>
          <div class="subtitle" v-else>public group</div>
        </div>
        <div class="details"
        :key="selectedID">    
          <div class="quick-actions">
            <!-- <button class="basic-button"><i class="material-icons">send</i></button> -->
            <button class="basic-button red" @click="deleteButtonClicked"><i class="material-icons">delete</i></button>
          </div>
          <div class="panel">
            <div class="card-header noselect">Description</div>
            <!-- <p>{{selectedTeam.description}}</p> -->
            <ejs-inplaceeditor floatLabelType="Auto" :emptyText="'Description'" autocomplete="off" :mode="'Inline'"
              :template="descriptionMultiline" :actionBegin="bindDescription"
              name="none" :value="selectedTeam.description" data-underline='false' :cssClass="'basic-inline'"
              @actionSuccess="patchTeamValue('description', $event.value)"    
            ></ejs-inplaceeditor>
          </div>    
          <div class="panel" 
            v-if="!selectedTeam.isAnonymous"
            style="height: 80px">
            <div class="card-header noselect">Leader</div>
              <cards
                v-if="this.selectedTeamLeader != undefined"
                :hasShadow="false"
                :hasSearch="false"
                :loading="false"
                :inline="true"
                :cardList="this.selectedTeamLeader"
                :cardSelectable="false"
                profilePicFillerValue="fullName"
                :fields="{
                  title: 'fullName',
                  id: 'id', 
                  profile: 'personImageThumbnailURL'
                }"
              />
          </div>    
            <div class="panel" v-if="!selectedTeam.isAnonymous">
              <div class="card-header noselect">
                <div>Members <span>| {{selectedTeam.members ? selectedTeam.members.total: ''}}</span></div>
              </div>
              <div :key="selectedID" class="add-people">
                <ejs-multiselect :dataSource='peopleNotInTeam' 
                  :fields="{value: 'id', text: 'fullName'}"
                  v-model="peopleToAdd" :placeholder="'Add People'"
                ></ejs-multiselect>                
                <button class="basic-button icon"
                @click="addPeopleToTeam"
                ><i class="material-icons">add</i></button>
              </div>
              <div class="people">
                <cards
                  :hasShadow="false"
                  :loading="false"
                  :inline="true"
                  :hasButtonOnCard="true"
                  :alphabetical="true"
                  :buttonColor="'#ff7675'"
                  :buttonIcon="'close'"
                  :emptyMessage="'No Members'"
                  :cardList="peopleInTeam"
                  :cardSelectable="false"
                  @buttonClicked="removePersonFromTeam"
                  profilePicFillerValue="fullName"
                  :fields="{
                    title: 'fullName',
                    id: 'relationshipID',
                    profile: 'personImageThumbnailURL'
                  }"
                />
              </div>
            </div>   
          </div>
        </div>
      </transition>
      <div class="new-item" v-if="creatingNewItem" :model="7">
        <div class="title">New Team</div>
        <div class="details">
          <carousel>
            <div class="new-item-card">
              <div class="section-header">New Team Name</div>  
              <div class="section-header-info">Give this new team a name</div>
              <!-- <image-uploader
                :debug="1"
                :maxWidth="512"
                :quality="0.7"
                :autoRotate="true"
                outputFormat="verbose"
                :preview="false"
                :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
                capture="environment"
                accept="video/*,image/*"
                doNotResize="['gif', 'svg']"
                @input="setImage"
                @onUpload="startImageResize"
                @onComplete="endImageResize"
              ></image-uploader> -->
              <!-- <div class="image-cropper">
                <clipper-fixed class="clipper" ref="clipper"
                  :ratio="1"
                  :wrapRatio="1"
                  :border="0"
                  :round="true"
                  :grid="false"
                  :min-scale=".55"
                  :shadow="'#ffffffcc'"
                  :src="'https://images.unsplash.com/photo-1561542515-6db9361a100d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2130&q=80'"
                >    
                  <div slot="placeholder">No image</div>
                </clipper-fixed>        
              </div> -->              
              <div>
                <ejs-textbox autocomplete="off" v-model="newTeam.name" floatLabelType="Auto" :placeholder="'Team Name'"
                required></ejs-textbox>
              </div>
            </div>
            <div class="new-item-card" style="overflow-y: auto">
              <div class="section-header">Team Type</div>  
              <div class="section-header-info">Choose a profile picture for {{newTeam.name}}?</div>              
              <div class="image-croppa">
                <croppa v-model="teamPhotoCroppa"
                  canvas-color="transparent"
                  :disable-rotation="true"
                  :prevent-white-space="true"
                  :width="200"
                  :height="200"
                  :speed="10"
                ></croppa>
              </div>
              <!-- <button @click="uploadTeamProfilePic()">clip</button> -->
              <!-- <img :src="teamPhotoCroppaDataUrl"> -->
            </div>
            <div class="new-item-card">
              <div class="section-header">Team Type</div>  
              <div class="section-header-info">What type of team is {{newTeam.name}}?</div>
                <div class="type">            
                  <custom-radio v-model="newTeam.type" :options="['Public', 'Private', 'Anonymous']"></custom-radio>
                  <div v-show="newTeam.type == 0" name="public" class="item-description">
                     This is a team that anyone within the church can sign up upon hitting the "sign up" button on the app. You are able to remove people from this team but there is no block from anybody entering this group. Leaders will be notified of new signs ups. Examples of this would be a community group, weekend serve team, or a sporting event team
                  </div>
                  <div v-show="newTeam.type == 1" name="serve" class="item-description">
                    The difference between public and private is the ability to "request to sign up" button as opposed to the "sign up" button on the public. This means the leader can accept or deny requests to join the team. Examples for this include: a worship team, a staff team, or a team that you want to control who's a part of it.
                  </div>
                  <div v-show="newTeam.type == 2" name="annonymous" class="item-description">
                    With our anonymous team, Together chooses not to hold any information on our platform. We urge the individual who is the contact to handle everything on their side but offering a place for an individual within the church can get plugged in outside of our platform. Examples for this could be a same sex attraction group, an abortion group, or divorce group
                  </div>
                </div>
            </div>
            <div class="new-item-card">
              <div class="section-header">{{newTeam.name}} Description</div>  
              <div class="section-header-info">Briefly explain what {{newTeam.name}} is about</div>
              <div>
                <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Description" v-model="newTeam.description"
                required name="" :multiline="true"></ejs-textbox>
                <div v-show="newTeam.type == 2" name="annonymous" class="item-description">
                  Since this team is annonymous, we will not be keeping a record of anyone participants. Therefore, the only way to reach to out to {{newTeam.name}} will be through traditional communication. We recommend including a phone number or email in the description.
                </div>
              </div>
            </div>
            <div class="new-item-card">
              <div class="section-header">{{newTeam.name}} Leader</div>  
              <div class="section-header-info">Select the leader of {{newTeam.name}}</div>            
                <div v-show="newTeam.type != 2">
                <ejs-dropdownlist
                  :dataSource='formatedPeople' 
                  :fields="{ value: 'name'}"
                  floatLabelType="Auto" 
                  :placeholder='"Select Leader"'
                  :allowFiltering="true"
                  :select="assignLeader"></ejs-dropdownlist>
                </div>
                <div v-show="newTeam.type == 2" name="annonymous" class="item-description">
                  Annonymous teams can only be managed by admin.
                </div>
            </div>
            <div class="new-item-card">
              <div class="section-header">{{newTeam.name}} Location</div>  
              <div class="section-header-info">Does {{newTeam.name}} have a meeting location?</div>            
                <div v-show="newTeam.type != 2">
                  <custom-radio v-model="newTeam.hasMeetings" :options="['Has Location', 'No Location']"></custom-radio>
                  <div v-show="newTeam.hasMeetings == 0">
                    <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Address"
                    name="" v-model="newTeam.address"></ejs-textbox>
                    <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Location Description (ex: Room 103, Front Office)"
                    name="" v-model="newTeam.location"></ejs-textbox>
                    <!-- <div class="item-description">(ex: Room 103, Front Office)</div> -->
                  </div>
                </div>
                <div v-show="newTeam.type == 2" name="annonymous" class="item-description">
                  Annonymous teams cannot have addresses.
                </div>
            </div>
            <div class="new-item-card">
              <div class="section-header">{{newTeam.name}} Meeting Recurrence</div>  
              <div class="section-header-info">Does {{newTeam.name}} meet on a regular basis?</div>            
                <div v-show="newTeam.type != 2">
                  <div class="type">
                    <custom-radio v-model="newTeam.hasRecurrence" :options="['Meets Regualarly', 'Does Not Meet Regularly']"></custom-radio>
                  </div>
                  <div v-show="newTeam.hasRecurrence == 0">
                    <ejs-recurrenceeditor id='editor' ref="EditorObj" :selectedType="0" :change="setRecurranceOfNewTeam"></ejs-recurrenceeditor>
                  </div>
                </div>
                <div v-show="newTeam.type == 2" name="annonymous" class="item-description">
                  Annonymous teams cannot have events assigned to them.
                </div>
            </div>
            <div class="new-item-card">
              <div class="section-header">{{newTeam.name}} Subteams</div>  
              <div class="section-header-info">Does {{newTeam.name}} have subteams? Details can be added to the subteams later.</div>            
                <div v-show="newTeam.type != 2" style="height: 250px">
                  <quick-create
                    :model="newTeam.leaders"
                    :itemStructure="subTeamStructure"
                    />
                </div>
                <div v-show="newTeam.type == 2" name="annonymous" class="item-description">
                  Annonymous teams cannot have subteams.
                </div>
            </div>
            <!-- <div>
              <div class="profile-pic" @click="uploadingPhoto = true"></div>
              <div>
                <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Name"
                required name=""></ejs-textbox>
              </div>
              <div>
                <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Description"
                required name=""></ejs-textbox>
              </div>
              <div class="type">            
                <custom-radio v-model="newTeam.type" :options="['public', 'serve', 'anonymous']"></custom-radio>
              </div>
              <div class="detailed public" v-if="newTeam.type == 0">
                <ejs-dropdownlist
                  :dataSource='formatedPeople' 
                  :fields="{ value: 'name'}"
                  floatLabelType="Auto" 
                  :placeholder='"Select Leader"'
                  :allowFiltering="true"
                  :select="assignLeader"></ejs-dropdownlist>
                <div>
                  <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Address"
                  name=""></ejs-textbox>
                </div>
                <div>
                  <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Location Description"
                  name=""></ejs-textbox>
                </div>
                <ejs-recurrenceeditor id='editor' ref="EditorObj" :selectedType='selectedType' :change="onChange"></ejs-recurrenceeditor>
                <image-uploader field="img"
                  v-model="uploadingPhoto"
                  :width="300"
                  :height="300"
                  url="/upload"
                  lang-type="en"
                  :params="{}"
                  :headers="{}"
                  :noSquare="true"
                  img-format="png"></image-uploader>
              </div>
            </div> -->
          </carousel>
        </div>
        <div class="footer">          
          <button class="basic-button red" @click="creatingNewItem = false">CANCEL</button>
          <button class="basic-button green" @click="postTeam()">CREATE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewTeams from '@/components/NewTeam'
import Cards from '@/components/CardList'
import Teams from '@/services/teams'
import People from '@/services/people'
import CDN from '@/services/cdn'
import CustomRadio from '@/components/CustomRadio'
// import ImageUploader from 'vue-image-crop-upload'
import Carousel from '@/components/Carousel'
import Avatar from '@/components/Avatar'
import QuickCreate from '@/components/QuickCreate'
import { checkIfObjNotFilled, generateGUID } from '../utils/helpers'
// import ImageUploader from 'vue-image-upload-resize'
import { SweetModal } from 'sweet-modal-vue'
// import VuejsClipper from 'vuejs-clipper'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

import store from '../store'

import Vue from 'vue'

Vue.use(Croppa)

const subTeamStructureTemplate = [
  {
    name: 'teamName',
    type: 'INPUT',
    placeholder: 'Subteam Name',
    default: ''
  }, {
    name: 'leaderID',
    dropdownKey: 'id',
    type: 'DROPDOWN',
    placeholder: 'Choose Leader',
    list: [],
    displayValue: 'name',
    default: ""
  }
]

const teamFiltersTemplate = [
  {
    type: 'Type',
    key: 'subtext',
    options: [
      {
        value: 'Public',
        title: 'Public',
        icon: 'public'
      },
      {
        value: 'Private',
        title: 'Private',
        icon: 'lock'
      },
      {
        value: 'Anonymous',
        title: 'Anonymous',
        icon: 'wc'
      }
    ]
  },
  // {
  //   type: 'Grade',
  //   key: 'ageGroup',
  //   options: [
  //     {
  //       value: '1',
  //       title: 'First',
  //       icon: '',
  //       short: '1'
  //     },
  //     {
  //       value: '2',
  //       title: 'Second',
  //       icon: '',
  //       short: '2'
  //     },
  //     {
  //       value: '3',
  //       title: 'Third',
  //       icon: '',
  //       short: '3'
  //     },
  //     {
  //       value: '4',
  //       title: 'Fourth',
  //       icon: '',
  //       short: '4'
  //     },
  //     {
  //       value: '5',
  //       title: 'Fifth',
  //       icon: '',
  //       short: '5'
  //     },
  //     {
  //       value: '6',
  //       title: 'Sixth',
  //       icon: '',
  //       short: '6'
  //     },
  //   ]
  // },
]

const newTeamTemplate = {
  name: '',
  description: '',
  hasMeetings: 0,
  address: "",
  location: "",
  hasRecurrence: 0,
  recurrence: '',
  type: 0,
  leaderID: null
}

export default {
  name: 'Teams',
  data () {
    return {
      searchQuery: '',
      gridColumns: ['profile', 'name', 'type'],
      // gridColumns: ['name', 'type'],
      // columnType: {name: 'text', type: 'text'},
      columnType: {profile: 'profile', name: 'text', type: 'text'},
      teams: [
      ],
      teamsLoading: false,
      teamsSearch: '',
      selectedTeam: {},
      selectedID: -1,
      creatingNewItem: false,
      people: [],
      uploadingPhoto: false,
      newTeam: newTeamTemplate,
      subTeamStructure: subTeamStructureTemplate,
      teamFilters: teamFiltersTemplate,
      peopleInTeam: [],
      peopleNotInTeam: [],
      peopleToAdd: [],
      selectedTeamLeader: [{}],
      teamPhotoCroppa: {},
      cdnKeys: {},
      teamPhotoCroppaDataUrl: '',
      descriptionMultiline:  function () {
        return {
          template: Vue.component('DescriptionMultiline', {
            template: '<ejs-textbox value="' + this.selectedTeam.description + '" style="height: 7rem" :multiline="true"></ejs-textbox>',
            data() { return { }; }
          })
        }
      }.bind(this)
    }
  },
  components: {
    NewTeams, Cards, CustomRadio, Carousel, QuickCreate, Avatar,	SweetModal
  },
  methods: {
    recieveID(id) {
      if (!id) {
        return
      }
      if (this.selectedID != id) {
        this.selectedTeam = {}
      }
      if (id == '-1') {
        this.selectedID = id
        this.$router.push(`/app/teams/`)
        return
      }
      this.creatingNewItem = false
      this.$router.push(`/app/teams/${id}`)
      this.selectedID = id
      this.getTeam(id)
    },
    async getTeams() {
      const response = await Teams.getTeamsByChurch()
      this.teams = response['team(s)']
    },
    async patchTeamValue (valueKey, value) {
      Teams.patchTeamValue(this.selectedID, valueKey, value)
      this.selectedTeam[valueKey] = value
    },
    async getTeam(id) {
      this.selectedID = id
      const response = await Teams.getTeam(id)
      this.selectedTeam = response['team']

      this.peopleInTeam = response['team'].members['teamMembers(s)'].map((member) => ({
        fullName: member.firstName + ' ' + member.lastName,
        id: member.personID,
        relationshipID: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        personImageThumbnailURL: member.person.personImageThumbnailURL,
      }))
      this.peopleInTeam = this.peopleInTeam.filter(( person ) => {
        const isLeader = person.id == this.selectedTeam.leaderID
        if (isLeader) {
          this.selectedTeamLeader = [person]
        }
        return true
      });
      this.getPeopleNotInTeam()
      
      this.$root.$emit('loading', false)
      
      return this.selectedTeam
    },
    async getPeople() {
      // const response = await Teams.getTeamsByID(this.personID)
      const response = await People.getPeople()
      let people = response['person(s)']
      this.people = people
      this.subTeamStructure[1].list = this.people;
    },
    async getPerson(personID) {
      // const response = await Teams.getTeamsByID(this.personID)
      const response = await People.getPerson(personID)
      let person = response['person']
      return person
    },
    async deleteTeam() {
      this.$refs.deleteTeamModal.close()
      Teams.deleteTeam(this.selectedID).then(function(response) {
        this.recieveID(-1)
        this.getTeams()
      }.bind(this))
    },
    deleteButtonClicked() {
      this.$refs.deleteTeamModal.open()
    },
    createNewItem() {
      this.selectedID = -1;
      this.$router.push(`/app/teams/`)

      this.creatingNewItem = true;
      this.newTeam = {...newTeamTemplate}
      if (this.creatingNewItem == true) {
        CDN.getKeys().then(response => {
         this.cdnKeys = response.data
        })
      }
    },
    assignLeader (member) {
      this.newTeam.leaderID = member.itemData.id
    },
    setRecurranceOfNewTeam(e) {
      console.log(e)
      this.newTeam.recurrence = e.value
      console.log(this.newTeam)
    },
    bindDescription: function(args) {
      const description = document.getElementsByClassName('e-input')[0].value;
      if(description != null && description != undefined) {
          args.data.value = description;
          return description
      }
    },
    async getPeopleNotInTeam () {
      this.peopleToAdd = []
      const peopleInTeam = this.peopleInTeam.map(person =>
      person.id)
      const people = this.people

      const toRemoveMap = peopleInTeam.reduce(
        function(ids, item) {
          ids[item] = item || true;
          return ids;
        },
        {} // initialize an empty object
      )

      const filteredArray = people.filter(function (x) {
        return !toRemoveMap[x.id + ''];
      })

      this.peopleNotInTeam = filteredArray
    },
    async removePersonFromTeam(relationshipID) {
      const patchData = 
      {
        "identifier":{
          "id": `${this.selectedID}`
        },
        "values":{
          "membersRemove": [
            {"id": `${relationshipID}`}
          ]
        }
      }      
      Teams.patchTeam(patchData).then(() => {
        this.recieveID(this.selectedID)
      })
    },
    async addPeopleToTeam() {
      this.$root.$emit('loading', true)
      // Reformat People Ids
      const members = this.peopleToAdd.map(function(id) {
        return {"personID": `${id}`}
      })

      const patchData = 
      {
        "identifier":{
          "id": `${this.selectedID}`
        },
        "values":{
          "membersAdd": members
        }
      }
      await Teams.patchTeam(patchData).then(() => {
        this.recieveID(this.selectedID)
      })
      
    }, 
    async postTeam() {      
      this.$root.$emit('loading', true)
      var profilePic = await this.uploadTeamProfilePic()
      profilePic = profilePic ? 'https://togethercdn.global.ssl.fastly.net/TeamPics/' + profilePic : ''
      const newTeam = {
        "churchUsername": store.state.churchUsername,
        "name": this.newTeam.name,
        "teamImageURL": profilePic,
        "teamImageThumbnailURL": profilePic,
        "leaderID":  this.newTeam.type != 2 ? this.newTeam.leaderID : null,
        "members":  this.newTeam.type != 2 ? [
          {
            "personID": this.newTeam.leaderID
          }
        ] : [],
        "isAnonymous": this.newTeam.type == 2,
        "description": this.newTeam.description,
        "hasMeetings": this.newTeam.hasMeetings == 1,
        "meetingRecurrence": this.newTeam.recurrence,
        "meetingAddress": this.newTeam.address,
        "meetingLocationDescription": this.newTeam.location,
        "isServeTeam": this.newTeam.type == 1,
        "serveTeamRoles": [
        ]
      }
      await Teams.postTeam(newTeam).then(function(result) {
        this.$refs.teamCreated.open()
        this.getTeams()
        this.creatingNewItem = false
        this.recieveID(result.data.newResourceID)
        // console.log(result)
        // this.selectedTeam
      }.bind(this))
      
      this.$root.$emit('loading', false)
    },
    async uploadTeamProfilePic() {
      const { accessKeyID, secretAccessKey } = this.cdnKeys
      var fileName = generateGUID() + '.jpg'
      
      if (!this.teamPhotoCroppa.hasImage()) {
        return
      }
      var blob = await this.teamPhotoCroppa.promisedBlob('image/jpeg')
      
        // var fd = new FormData()
        // const file = new File([blob], fileName)
        // fd.append('file', blob, fileName)
        // console.log(file)
      var arrayBuffer = await new Response(blob).arrayBuffer();  
      await CDN.postImage(accessKeyID, secretAccessKey, arrayBuffer, fileName).catch(() => {fileName = ''})

      return fileName
    }
  },
  props: {
  },
  mounted() {
    this.teamsLoading = true
    this.getTeams().then(() => {this.teamsLoading = false})
    this.getPeople().then(() =>{      
      this.recieveID(this.$route.params.id)
    })
  },
  created() {
  },
  computed: {
    newTeamReady () {
      return !checkIfObjNotFilled(this.newTeam)
    },
    formattedTeams() {      
      var teams = Array(this.teams.length)
      for (let index = 0; index < this.teams.length; index++) {
        const team = this.teams[index];

        // Find Team Type
        var teamType = ''
        if (team.isServeTeam ) {
          teamType = "Private"
        }
        else if (team.isAnonymous ) {
          teamType = "Anonymous"
        }
        else {
          teamType = "Public"
        }

        const newTeam = {
          id: team.id,
          title: team.name,          
          profile: team.teamImageThumbnailURL,
          subtext: teamType
        }
        teams[index] = newTeam
      }
      return teams
    },    
    formatedPeople() {
      var newPeople = []
      var people = this.people
      for (let index = 0; index < people.length; index++) {
        var person = people[index]
        person['name'] = person.firstName + " " + person.lastName
        newPeople.push(person)
      }
      return people
    }
  }
}
</script>

<style scoped>

@import '../assets/css/selected-view.css';

.teams-container {
  height: 100%;
}
h2 {
  padding-top: 30px;
  /* padding-left: 20px; */
  height: 40px;
}

.teams-wrapper {
  display: grid;
  grid-template-columns: 250px 1fr;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* overflow-x: auto; */
}

.teams-card-wrapper {
  overflow-y: auto;
  width: 100%;
  position: relative;
  /* border-right: 1px #E6E9EC solid; */
}

.team-view {  
  /* width: 100%; */
  height: 100%;
  position: relative;
  padding-left: 30px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding-top: 40px;
}
.team-view::before {
  content: '';
  border-left: 1px solid #f0f0f0 ;
  position: absolute;
  height: 20vh;
  left: 0;
  top: 0%;
}
.team-header {  
  position: relative;
}
.team-header h3 {
  display: inline;
  padding: 10px;
}

.team-header .team-type{
  font-size: 11px;
  font-weight: lighter;
  padding: 2.5px 5px;
  border-radius: 3px;
  display: inline;
}
.team-header .team-type.serve{
  border: 2px #A589D9 solid;
}
.team-header .team-type.annonymous{
  border: 2px #69CDCF solid;
}
.team-header .profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: inline-flex;
  flex: 1;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  /* position: absolute;
  right: 20px;
  top: 0px; */
}
.team-info h4{
  margin-top: 20px; 
  margin-bottom: 15px;
}
.team-info h4 span{
  font-weight: lighter;
}
.team-info p{
  margin: 10px 20px 10px 10px;
}
.image-cropper {
  height: 100px;
  width: 100px;
  overflow: hidden;
}
.image-croppa {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  overflow: hidden;
}
.image-cropper .clipper{
  height: 150px;
  width: 150px;
  position: relative;
  left: -25px;
  top: -25px;
}
.add-people {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.add-people button {
  width: 25px;
  height: 25px;
  padding: 6px 5px;
}
.add-people button i{
  font-size: .8rem
}

/* //////////////////////////
//////  MEDIA QUERIES ///////
////////////////////////// */

/*------------------------------------------
  Responsive Grid Media Queries - 1280, 1024, 768, 480
   1280-1024   - desktop (default grid)
   1024-768    - tablet landscape
   768-480     - tablet 
   480-less    - phone landscape & smaller
--------------------------------------------*/
@media all and (min-width: 1024px) and (max-width: 1280px) {
}

@media all and (min-width: 768px) and (max-width: 1024px) {
}

@media all and (min-width: 480px) and (max-width: 768px) {
  .teams-card-wrapper {
    padding-top: 35px;
  }
}

@media all and (max-width: 480px) {
  .teams-wrapper {
    grid-template-columns: 1fr;
    height: calc(100% - 35px);
    margin-top: 35px;
    
  }
}
</style>