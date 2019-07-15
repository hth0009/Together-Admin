<template>
  <div class="people-container">
    <div class="page-wrapper">
      <div class="page-card-wrapper"
        :class="{'inactive': selectedID != ''}">        
        <cards
          :cardList="formatedPeople"
          :loading="peopleLoading"
          :selectedID="selectedID + ''"
          :hasAddNew="false"
          @selected="recieveID"
          @onAddNew="createNewItem"
          />
      </div>
      <transition name="fadeOut">
      <div class="selected-view" id="selected-view" v-if="selectedID != '' && Object.keys(selectedPerson).length != 0 && selectedID != -1 && !creatingNewItem" ref="selectedView">
        <div class="header"> 
          <!-- <div :style="{backgroundImage: 'url(' +  selectedPerson.profile + ')'}"
          class="profile-pic"></div> -->
          <!-- <div :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)'}"
          class="profile-pic"></div> -->
          <div class="profile-pic">
            <avatar
              :height="60"
              :url="selectedPerson.personImageThumbnailURL"
              :title="selectedPerson.fullName"/>
          </div>
          <!-- <div :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)'}"
          class="profile-pic"></div> -->
          <h3>{{selectedPerson.firstName + ' ' + selectedPerson.lastName}}</h3>
          <div class="subtitle" v-if="!!selectedPerson.account">{{selectedPerson.account.username !== '' ? '@' + selectedPerson.account.username : ''}}</div>
        </div>
        <static-header class="static-header"
          :parentDivID="'selected-view'"
          :displayScrollValue="100"
        > 
          <!-- <div :style="{backgroundImage: 'url(' +  selectedPerson.profile + ')'}"
          class="profile-pic"></div> -->
          <!-- <div :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)'}"
          class="profile-pic"></div> -->
          <div class="profile-pic">
            <avatar
              :height="30"
              :url="selectedPerson.personImageThumbnailURL"
              :title="selectedPerson.fullName"/>
          </div>
          <!-- <div :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)'}"
          class="profile-pic"></div> -->
          <h3>{{selectedPerson.firstName + ' ' + selectedPerson.lastName}}</h3>
        </static-header>
        <div class="details">
          <div class="quick-actions">
            <!-- <button class="basic-button"><i class="material-icons">send</i></button> -->
            <!-- <button class="basic-button red"><i class="material-icons">delete</i></button> -->
          </div>
          <!-- <button class="section-toggle">Teams</button> -->
          <div class="panel">
            <div class="card-header noselect">General Info</div>
            <!-- <div class="item">
              <i class="material-icons noselect">email</i>
              <div class="label noselect">Email</div>
                {{selectedPerson.accountEmail}}
              </div>
            <div class="item">
              <i class="material-icons noselect">event</i>
              <div class="label noselect">Birthday</div>
              {{selectedPerson.birthday}}
            </div>
            <div class="item">
              <i class="material-icons noselect">place</i>
              <div class="label noselect">Address</div>
              {{selectedPerson.address}}
            </div> -->
            <div class="input-label">Email</div>
            <ejs-inplaceeditor floatLabelType="Auto" :emptyText="'Email'" autocomplete="off" :mode="'Inline'" 
              name="none" v-model="selectedPerson.accountEmail" data-underline='false' :cssClass="'basic-inline'"></ejs-inplaceeditor>
            <div class="input-label">Birthday</div>
            <ejs-inplaceeditor floatLabelType="Auto" :model="{allowEdit: false, showClearButton: false}"
              :emptyText="'Birthday'" v-model="selectedPerson.birthday" :type="'Date'"
              :format="'MMMM dd, yyyy'" :mode="'Inline'" data-underline='false' :cssClass="'basic-inline'"
              @actionSuccess="patchPersonValue('birthday', $event.value)"  
            ></ejs-inplaceeditor>
            <div class="input-label">Home Address</div>
            <ejs-inplaceeditor floatLabelType="Auto" :emptyText="'Home Address'" autocomplete="off" :mode="'Inline'" 
              name="none" v-model="selectedPerson.homeAddress" data-underline='false' :cssClass="'basic-inline'"
              @actionSuccess="patchPersonValue('homeAddress', $event.value)"  
            ></ejs-inplaceeditor>
            <div class="input-label">Mailing Address</div>            
            <ejs-inplaceeditor floatLabelType="Auto" :emptyText="'Mailing Address'" autocomplete="off" :mode="'Inline'" 
              name="none" v-model="selectedPerson.mailingAddress" data-underline='false' :cssClass="'basic-inline'"
              @actionSuccess="patchPersonValue('mailingAddress', $event.value)"  
            ></ejs-inplaceeditor>
            <div class="input-label">Phone Number</div>
            <ejs-inplaceeditor floatLabelType="Auto" :emptyText="'Phone Number'" autocomplete="off" :mode="'Inline'" 
              name="none" v-model="selectedPerson.phoneNumber" data-underline='false' :cssClass="'basic-inline'"
              :type="'Mask'" :model="{mask: '(000) 000-0000'}" value="(123) 456-7890"
              @actionSuccess="patchPersonValue('phoneNumber', $event.value)"  
            ></ejs-inplaceeditor>
          </div>
          <!-- <div class="panel">
            <div class="card-header">Roles</div>
            <div class="search">              
                <cards
                  :hasShadow="false"
                  :loading="false"
                  :inline="true"
                  :cardList="[]"
                  :cardSelectable="false"
                  :hasSearch="false"
                  :profilePicFillerValue="'name'"
                  :fields="{
                    title: 'name',
                    id: 'id'
                  }"
                />
            </div>
          </div> -->
          <div class="panel">
            <div class="card-header">Family</div>
            <div class="card-explanation">COMING SOON</div>
            <!-- <div class="search">              
                <cards
                  :hasShadow="false"
                  :loading="false"
                  :inline="true"
                  :cardList="[]"
                  :cardSelectable="false"
                  :hasSearch="false"
                  :profilePicFillerValue="'name'"
                  :fields="{
                    title: 'name',
                    id: 'id'
                  }"
                />
            </div> -->
          </div>
          <div class="panel">
            <div class="card-header">Teams</div>
            <div class="teams">              
                <cards
                  :hasShadow="false"
                  :loading="false"
                  :inline="true"
                  :cardList="selectedPersonTeams"
                  :cardSelectable="false"
                  :profilePicFillerValue="'name'"
                  :emptyMessage="'Not in any teams'"
                  :fields="{
                    title: 'name',
                    id: 'id',
                    profile: 'teamImageThumbnailURL'
                  }"
                />
            </div>
          </div>
          <div class="panel"
            style="min-height: 300px">
            <div class="card-header">Notes</div>
            <div class="card-explanation">These notes are visible to anyone on the admin site.</div>
            <ejs-inplaceeditor :emptyText="'Notes'" width="100%" autocomplete="off" :mode="'Inline'" :submitOnEnter="false" 
              v-model="selectedPerson.notes"
              :model="{
                editorMode: 'Markdown',               
                placeholder: 'Notes',
                toolbarSettings: {
                  items: []
                },
                height: 500,
                pasteCleanupSettings: 'plainTextFormatting'
              }"
              name="none" type="RTE" data-underline='false' :cssClass="'basic-inline'"
              @actionSuccess="patchPersonValue('notes', $event.value)"  
            ></ejs-inplaceeditor>
             <!-- <ejs-richtexteditor v-model="selectedPerson.notes" :height="600"
              :editorMode="'Markdown'" :placeholder="'Notes'" :toolbarSettings="{items: []}"
              @blur="patchPersonValue('notes', $event.value)"
              ></ejs-richtexteditor> -->
          </div>
          <div class="panel">
            <div class="card-header noselect">Skills</div>
            <div class="card-explanation">Track your members talents with the skills feature.</div>
            <!-- <div class="card-explanation">Track your members talents with the skills feature. <span style="color: #05e0a2; font-weight: 600">Confirm</span> skills and they will filter to the top of any skills search.</div> -->
            <div class="skills noselect">
              <div class="skill" 
                v-for="(skill, index) in selectedPerson.skills['personSkill(s)']"
                :key="skill.id"
                :class="{'confirmed': skill.confirmed}"
                @click="toggleSkill(index)">
                {{ skill.skill.name }}
              </div>
            </div>
          </div>
        </div>
      </div>      
      </transition>
      <!-- <div class="new-item" v-if="creatingNewItem">
        <div class="title">New Person</div>
        <div class="details">
          <div class="type">
          </div>
          <div class="detailed" v-show="newItemType == 0">
           <div style="width: 45%; display: inline-block">
              <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="First Name"
              required name="none"></ejs-textbox>
            </div>
            <div style="width: 45%; display: inline-block; float: right">
              <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Last Name" v-bind:enableRtl="true"
              name="none"></ejs-textbox>
            </div>
            <div>
              <ejs-textbox autocomplete="off" floatLabelType="Auto" type="email" placeholder="Email"
              name="none"></ejs-textbox>
            </div>
            <div>
              <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Street"
              name="none"></ejs-textbox>
            </div>
            <div style="width: 50%; display: inline-block;">
              <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="City"
              name="none"></ejs-textbox>
            </div>
            <div style="width: 19%; display: inline-block;">
              <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="St"
              name="none"></ejs-textbox>
            </div>
            <div style="width: 28%; display: inline-block; float: right">
              <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Zip"
              name="none"></ejs-textbox>
            </div>
          </div>
        </div>
        <div class="footer">
          <button class="basic-button red" @click="creatingNewItem = false">CANCEL</button>
          <button class="basic-button green">CREATE</button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Cards from '@/components/CardList'
import VueTable from '@/components/Table'
import People from '@/services/people'
import Teams from '@/services/teams'
import CustomRadio from '@/components/CustomRadio'
import StaticHeader from '@/components/StaticHeader'
import Avatar from '@/components/Avatar'
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '@/utils/helpers'

import { Rte } from '@syncfusion/ej2-vue-inplace-editor'
import { PasteCleanup, MarkdownEditor } from "@syncfusion/ej2-vue-richtexteditor";

// import store from '../store'

export default {
  name: 'People',
  data () {
    return {
      searchQuery: '',
      gridColumns: ['profile', 'name'],
      columnType: {profile: 'profile', name: 'text'},
      people: [],
      peopleLoading: false,
      peopleSearch: '',
      selectedID: '',
      selectedPerson: {},
      selectedPersonTeams: [
      ],
      creatingNewItem: false,
      newItemType: 0,
    }
  },
  provide: {"inplaceeditor":[Rte, MarkdownEditor], richtextEditor:[PasteCleanup, MarkdownEditor]},
  components: {
    VueTable, Cards, CustomRadio, Container, Draggable, Avatar,
    StaticHeader
  },
  methods: {
    async getPeople () {
      const response = await People.getPeople()
      this.people = response['person(s)']
    },
    async getPerson () {
      var response = await People.getPerson(this.selectedID)
      this.selectedPerson = response['person']
      this.selectedPerson.birthday = new Date(this.selectedPerson.birthday)
    },
    async patchPersonValue (valueKey, value) {
      var response = await People.patchPersonValue(this.selectedID, valueKey, value)
    },
    async getTeams() {   
      const response = await Teams.getTeamsByID(this.selectedID)
      this.selectedPersonTeams = response['team(s)']
    },
    toggleSkill(index) {
      this.skills[index].confirmed = !this.skills[index].confirmed
    },
    recieveID(id) {
      if (id == undefined) {
        this.selectedPerson = {}
        return
      }
      if (id == '-1') {
        this.selectedID = id
        this.$router.push(`/app/people/`)
        this.selectedPerson = {}
        return
      }
      this.selectedPerson = {}
      this.creatingNewItem = false
      this.$router.push(`/app/people/${id}`)
      this.selectedID = id
      this.getPerson()
      this.getTeams()
    },
    createNewItem() {
      this.selectedThreadID = -1;
      this.$router.push(`/app/people/`)

      this.creatingNewItem = !this.creatingNewItem
    }
  },
  props: {
  },
  mounted() {    
    this.peopleLoading = true
    this.recieveID(this.$route.params.id)
    this.getPeople().then(() => {this.peopleLoading = false})
  },
  computed: {
    formatedPeople() {
      var people = Array(this.people.length)
      for (let index = 0; index < this.people.length; index++) {
        const person = this.people[index];
        const newPerson = {
          id: person.id,
          profile: person.personImageThumbnailURL,
          title: person.firstName + ' ' + person.lastName,
          subtext: person.account.username !== '' ? '@' + person.account.username : ''
          // profile: thread.threadImageThumbnailURL,          
          // profile: this.profiles[index % 4],
        }
        people[index] = (newPerson)
      }
      return people
    }
  }
}
</script>

<style scoped>
.people-container {
  height: 100%;
}
h2 {
  padding-top: 30px;
  /* padding-left: 20px; */
  height: 40px;
}

.people-wrapper {
  display: grid;
  grid-template-columns: 250px auto;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* overflow-x: auto; */
}

.people-card-wrapper {
  overflow-y: auto;
  width: 100%;
  position: relative;
  /* border-right: 1px #E6E9EC solid; */
}

.person-view {  
  /* width: 100%; */
  height: 100%;
  position: relative;
  padding-left: 30px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding-top: 40px;
}
.person-header {  
  position: relative;
}
.person-header h3 {
  display: inline;
  padding: 10px;
}
.person-header .profile-pic {
  width: 75px;
  height: 75px;
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
.person-info div{
  margin-top: 20px; 
  margin-bottom: 15px;
}
.person-info p{
  margin: 10px 10px;
}
.team-box {
  margin: 5px;
  margin-right: 20px;
  padding: 10px;
  transition: all .3s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-left: 2px white solid;
  cursor: pointer;
}  
.team-box.unread {
  border-left: 2px #69CDCF solid;
}
.team-box:hover {
  box-shadow: 0px 2px 4px -2px rgba(128, 128, 128, 0.507);    
}
.team-box.selected {
  box-shadow: 0px 4px 5px -3px rgba(128, 128, 128, 0.507);
}
.team-box .icon {
  min-width: 30px;
  max-width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-flex;
  flex: 1;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.team-box .team-info{
  flex: 1;
  padding-left: 10px;
}
.skills {
  /* padding-left: 5px; */
}
.skill {
  display: inline-block;
  cursor: pointer;
  margin: 0px 10px 15px 0px;
  padding: 10px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  border-radius: 50px;
  background: #b2bec3;
  text-shadow: 0px 1px 8px #00000034;
  transition: all .3s ease-out;
  text-transform: capitalize;
}
.skill.confirmed {
  background: #05e0a2;
}

.skills-container {
  margin: 10px;
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
  .people-card-wrapper {
    padding-top: 35px;
  }
 }

@media all and (max-width: 480px) {
  .people-wrapper {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    /* height: calc(100% - 35px);     */
    /* margin-top: 35px; */
  }
  .people-card-wrapper {
    margin-top: 35px;
  }
  .people-card-wrapper.inactive {
    margin-top: 0px;
    display: none;
  }
 }

</style>