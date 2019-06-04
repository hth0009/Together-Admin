<template>
  <div class="teams-container">
    <div class="teams-wrapper">      
      <div class="teams-card-wrapper">
        <!-- <h2>Teams</h2> -->
        <cards
          :cardList="formattedTeams"
          :loading="teamsLoading"
          :selectedID="selectedID + ''"
          :hasAddNew="true"
          @selected="recieveID"
          @onAddNew="createNewItem"/>
      </div>
      <div class="selected-view" v-if="selectedID != -1 && !creatingNewItem">
        <div class="header"> 
          <div :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1496275068113-fff8c90750d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'}"
          class="profile-pic"></div>
          <!-- <div :style="{backgroundImage: 'url(' +  selectedTeam.iconURL + ')'}"
          class="profile-pic"></div> -->
          <h3>{{selectedTeam.name}}</h3>
          <!-- <div class="team-type noselect serve" v-if="selectedTeam.isServe">Serve Team</div>
          <div class="team-type noselect annonymous" v-if="selectedTeam.isAnnonymous">Annonymous</div> -->
          <div class="subtitle" v-if="selectedTeam.isAnonymous">anonymous</div>
          <div class="subtitle" v-else-if="selectedTeam.isServeTeam">serve team</div>
          <div class="subtitle" v-else>community group</div>
        </div>
        <div class="team-info">
          <div class="annonymous-team"
            v-if="selectedTeam.isAnnonymous">            
            <div class="description-panel">
              <h4>Description</h4>
              <p>{{selectedTeam.description}}</p>
            </div>            
            <div class="contact-panel">
              <h4>Contact</h4>
              <p>Please email us at: herchoicetoheal.acc@gmail.com</p>
            </div>
          </div>
          <div v-else>
            <div class="description-panel">
              <h4>Description</h4>
              <p>{{selectedTeam.description}}</p>              
            </div>    
            <!-- <div class="team-leader-panel">   
              <h4>Team Leader</h4>           
                <div class="people-box">
                  <div class="icon" :style="{backgroundImage: 'url(' +  selectedTeam.leader.icon + ')'}"></div>
                  <div class="person-info">
                    <div class="name">{{selectedTeam.leader.name}}</div>
                  </div>
                </div>
                <p>Reach out to John at (606) 637-0799</p>
            </div> -->
            <div class="people-list-panel">
              <h4>Members <span>| {{selectedTeam.members.total}}</span></h4>
              <div class="people">
                <div class="people-box" v-for="person in selectedTeam.members['teamMembers(s)']" :key="person.personID">
                  <div class="icon" :style="{backgroundImage: 'url(' +  person.icon + ')'}"></div>
                  <div class="person-info">
                    <div class="name">{{person.firstName + " " + person.lastName}}</div>
                  </div>
                </div>
              </div>
            </div>   
          </div>
        </div>
      </div>
      <div class="new-item" v-if="creatingNewItem">
        <div class="title">New Team</div>
        <div class="details">
          <div class="profile-pic" @click="uploadingPhoto = true"></div>
          <div>
            <ejs-textbox floatLabelType="Auto" placeholder="Name"
            required name="none"></ejs-textbox>
          </div>
          <div>
            <ejs-textbox floatLabelType="Auto" placeholder="Description"
            required name="none"></ejs-textbox>
          </div>
          <div class="type">            
            <custom-radio v-model="newItemType" :options="['public', 'serve', 'anonymous']"></custom-radio>
          </div>
          <div class="detailed public" v-if="newItemType == 0">
            <!-- <div class="section">
              Leader
            </div> -->
              <ejs-dropdownlist
                :dataSource='formatedPeople' 
                :fields="{ value: 'name'}"
                floatLabelType="Auto" 
                :placeholder='"Select Leader"'
                :allowFiltering="true"
                :select="assignMember"></ejs-dropdownlist>
            <div>
              <ejs-textbox floatLabelType="Auto" placeholder="Address"
              name="none"></ejs-textbox>
            </div>
            <div>
              <ejs-textbox floatLabelType="Auto" placeholder="Location Description"
              name="none"></ejs-textbox>
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
          </div>
        <div class="footer">
          <button class="basic-button red" @click="creatingNewItem = false">CANCEL</button>
          <button class="basic-button green">CREATE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewTeams from '@/components/NewTeam'
import Cards from '@/components/CardList'
import VueTable from '@/components/Table'
import Teams from '@/services/teams'
import People from '@/services/people'
import CustomRadio from '@/components/CustomRadio'
import ImageUploader from 'vue-image-crop-upload'

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
      newItemType: 0,
      people: [],
      uploadingPhoto: false
    }
  },
  components: {
    VueTable, NewTeams, Cards, CustomRadio, ImageUploader
  },
  methods: {
    recieveID(id) {
      if (id == undefined) {
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
    async getTeam(id) {
      this.selectedID = id
      const response = await Teams.getTeam(id)
      this.selectedTeam = response['team']
    },
    async getPeople() {
      // const response = await Teams.getTeamsByID(this.personID)
      const response = await People.getPeople()
      let people = response['person(s)']
      this.people = people
    },
    createNewItem() {
      this.selectedID = -1;
      this.$router.push(`/app/teams/`)

      this.creatingNewItem = !this.creatingNewItem
    },
    assignMember (member) {
      console.log(member)
    }
  },
  props: {
  },
  mounted() {
    this.teamsLoading = true
    this.recieveID(this.$route.params.id)
    this.getTeams().then(() => {this.teamsLoading = false})
    this.getPeople()
  },
  created() {
  },
  computed: {
    formattedTeams() {      
      var teams = Array(this.teams.length)
      for (let index = 0; index < this.teams.length; index++) {
        const team = this.teams[index];

        // Find Team Type
        var teamType = ''
        if (team.isServeTeam ) {
          teamType = "Serve Team"
        }
        else if (team.isAnonymous ) {
          teamType = "Anonymous"
        }
        else {
          teamType = "Community Group"
        }

        const newTeam = {
          id: team.id,
          title: team.name,          
          profile: 'https://images.unsplash.com/photo-1496275068113-fff8c90750d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          subtext: teamType
        }
        teams[index] = newTeam
      }
      return teams
    },    
    formatedPeople() {
      var people = this.people
      for (let index = 0; index < people.length; index++) {
        const person = people[index]
        people[index]['name'] = person.firstName + " " + person.lastName
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
  border-right: 1px #E6E9EC solid;
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
.skills {
  padding-left: 5px;
}
.skill {
  display: inline-block;
  margin: 0px 5px 15px 5px;
  padding: 5px;
  border: 2px #B6B9BC solid;
  cursor: pointer;
  font-size: 12px;
}
.skill.confirmed {
  border-color: #69CDCF;
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