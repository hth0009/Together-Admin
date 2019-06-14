<template>
  <div class="event-teams-container">
    <div class="add-team new-item">
      <div class="title">Add {{team.name != undefined ? team.name : 'Team'}} to Event</div>
      <carousel class="details" ref="addTeamCarousel" v-model="currentCarouselPage">
        <div class="new-item-card">
          <div class="section-header">Select team</div>
          <ejs-dropdownlist
            :dataSource='teams' 
            :fields="{ value: 'name'}"
            floatLabelType="Auto" 
            :placeholder='"Select Team"'
            :allowFiltering="true"
            :select="assignTeam"></ejs-dropdownlist>
        </div>
        <div class="new-item-card">
          <div class="section-header">Select a response type</div>
          <div class="section-header-info">How do you want people on {{team.name}} to respond to this event</div>   
            <custom-radio v-model="responseType" @changed="resizeCarousel" :options="['Auto', 'Serve', 'Sign Up', 'RSVP']"></custom-radio>
            <div v-show="responseType == 0" class="item-description">
              This event will automatically get added to all or selected people within the team's calendar.
            </div>
            <div v-show="responseType == 1" class="item-description">
              People within the team will have the option to either accept or deny their service for this event. You can assign roles and/or times to each requested person.
            </div>
            <div v-show="responseType == 2" class="item-description">
              Let people on the team sign up for times and/or roles or just the entire event.
            </div>
        </div>
        <div class="new-item-card" v-if="responseType == 1">
          <div class="section-header">Serve: Select Members</div>
          <custom-radio v-model="isWholeTeamServing" :options="['Whole Team', 'Selected People']"></custom-radio>
          <div v-show="isWholeTeamServing == 0" class="item-description">
            This serve request will be sent out to everyone on this team.
          </div>
          <div v-show="isWholeTeamServing == 1" class="item-description">
            Select the people you want serving for this event, the times you want them serving, and assign them roles
          </div>
          <div class="serve-assign-page" v-if="isWholeTeamServing == 1">
            <div class="serve-person-sidebar">
              <div :key=formatedPeople.length>
                <ejs-dropdownlist
                  :dataSource='formatedPeople' 
                  :fields="{ value: 'fullName'}"
                  floatLabelType="Auto" 
                  :placeholder='"Add Person"'
                  :allowFiltering="true"
                  :noRecordsTemplate="'No more people'"
                  :select="addPerson"></ejs-dropdownlist>
              </div>
              <div class="assigned-people">
                <div class="person noselect" v-for="(person, index) in assignedPeople" :key="index"
                  :class="{'selected': selectedPerson.personID == person.personID}">
                  <div class="name"  @click="selectPerson(person)">{{person.firstName + ' ' + person.lastName}}</div>
                  <div class="remove" @click="removeServingPerson(person)"><i class="material-icons">close</i></div>
                </div>
              </div>
            </div>
            <div class="person-info" v-if="selectedPerson.personID != undefined">
              <h3 class="person-name">{{selectedPerson.firstName + ' ' + selectedPerson.lastName}}</h3>
              <label for="">Toggle times</label>
              <custom-multi-select :options="times" v-model="selectedPerson.times"></custom-multi-select>
              <label for="">Assign role</label>
              <ejs-textbox floatLabelType="Never" placeholder="Role"
              name="" v-model="selectedPerson.role"></ejs-textbox>
            </div>
          </div>
        </div>
        <div class="new-item-card"  v-if="responseType == 2">
          <div class="section-header">Sign Up: Times</div>
          <div class="section-header-info">Should people sign up to serve the entire event or should they select times?</div>
          <custom-radio v-model="hasServeTimes" :options="['Whole Event', 'Selected Times']"></custom-radio>
          <!-- <custom-multi-select v-if="hasServeTimes == 1" :options="times" v-model="serveTimes"></custom-multi-select> -->
          <div class="time-caps" v-if="hasServeTimes == 1">
            <div v-for="(time, index) in signUpTimes" :key="index" class="sign-up-times">
              <div class="time">{{time.time}}</div>
              <div class="cap">
                <label for="">Number of people requested to serve:</label>
                <div class="number">
                  <ejs-textbox floatLabelType="Never" min="0" :placeholder="'Max'" type="number"
                    name="" v-model="time.cap"></ejs-textbox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="new-item-card" v-if="responseType == 2">
          <div class="section-header">Sign Up: Roles</div>
          <div class="section-header-info">You can add specific roles for people to sign up for</div>   
          <custom-radio v-model="hasRoles" :options="['No Roles', 'Has Roles']"></custom-radio>
          <div class="times" v-if="hasRoles == 1 && hasServeTimes == 1">
            <div v-for="(time, index) in signUpTimes" :key="index" class="sign-up-roles">
              <div class="time">{{time.time + ' (Cap: ' + time.cap + ' people)'}}</div>              
              <div class="roles">
                <div v-for="(role, index) in time.roles" :key="index"
                  class="role">
                  <input type="text" class="basic-input" placeholder="New Role" v-model="role.role">
                  <input type="number" class="basic-input number" placeholder="#" v-model="role.amount" min="0">
                  <button class="basic-button icon red"  @click.prevent="removeRole(time.roles, index)"><i class="material-icons">remove</i></button>
                </div>
              </div>
              <button class="basic-button icon" @click.prevent="addRole(time.roles)"><i class="material-icons">add</i></button>
            </div>
          </div>          
          <div class="sign-up-roles"
            v-if="hasRoles == 1 && hasServeTimes == 0">
            <div class="roles">
              <div v-for="(role, index) in noSignUpTimesRoles" :key="index"
                class="role">
                <input type="text" class="basic-input" placeholder="New Role" v-model="role.role">
                <input type="number" class="basic-input number" placeholder="#" v-model="role.amount">
                <button class="basic-button icon red"  @click.prevent="removeRole(noSignUpTimesRoles, index)"><i class="material-icons">remove</i></button>
              </div>
            </div>
            <button class="basic-button icon" @click.prevent="addRole(noSignUpTimesRoles)"><i class="material-icons">add</i></button>
          </div>
        </div>
        <div class="new-item-card">
          <div class="section-header">Message</div>
          <div class="section-header-info"></div>
          <div>
            <div class="multiline_wrapper">
              <!-- <ejs-textbox :multiline="true" rows="8" floatLabelType="Auto" placeholder="Enter your message"></ejs-textbox> -->
              <textarea placeholder="Enter your message" rows="10" class="basic-textarea" v-model="message"></textarea>
            </div>
          </div>
        </div>
      </carousel>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel";
import Teams from '@/services/teams'
import CustomRadio from '@/components/CustomRadio'
import CustomMultiSelect from '@/components/CustomMultiSelect'

const personTemplate = {
  firstName: '',
  lastName: '',
  id: -1,
  personID: -1,
  role: '',
  times: [],
  commmittableType: ''
}

export default {
  name: 'AddTeamToEvent',
  data () {
    return {
      currentCarouselPage: 1,
      availablePeople: [],
      people: [],
      teams: [],
      team: {},
      assignedPeople: [],
      responseType: 0,
      selectedID: -1,
      selectedPerson: {},
      isWholeTeamServing: 0,
      hasServeTimes: 0,
      hasRoles: 0,
      signUpTimes: [],
      message: '',
      noSignUpTimesRoles: []
    }
  },
  components: {
    Carousel, CustomRadio, CustomMultiSelect
  },
  methods: {
    async getTeams() {
      const response = await Teams.getTeamsByChurch()
      this.teams = response['team(s)']
    },
    async getTeam(id) {
      this.selectedID = id
      const response = await Teams.getTeam(id)
      this.team = response['team']
      return response
    },
    assignTeam(item) {
      this.getTeam(item.itemData.id).then(result => {
        this.people = result.team.members['teamMembers(s)']
        this.availablePeople = result.team.members['teamMembers(s)']
      })
      this.assignedPeople = []
      this.selectedPerson = {}
    },
    selectPerson(person) {
      this.selectedPerson = person
    },
    addPerson(item) {
      var addedPerson = {...personTemplate}
      addedPerson.firstName = item.itemData.firstName
      addedPerson.lastName = item.itemData.lastName
      addedPerson.id = item.itemData.id
      addedPerson.personID = item.itemData.personID
      addedPerson.times = [...this.times]

      this.assignedPeople.push(addedPerson)
      this.selectedPerson = addedPerson

      this.availablePeople = [...this.availablePeople.filter(function( person ) {
        return person.personID != item.itemData.personID;
      })]
    },
    removeServingPerson(item) {
      this.availablePeople.push(item)
      this.assignedPeople = this.assignedPeople.filter(function( person ) {
        return person.personID != item.personID;
      })
      if (this.selectedPerson.personID == item.personID) {
        this.selectedPerson = {}
      }
    },
    addRole(roleList) {
      roleList.push({
        role: '',
        amount: ''})
    },
    removeRole(roleList, index) {
      roleList.splice(index, 1)
    },
    resizeCarousel() {
      this.$refs.addTeamCarousel.resize()
    }
  },
  props: {
    times: {
      type: Array,
      default: () => {return ['9:00AM', '12:00PM', '5:00PM']}
    }
  },
  mounted() {
    this.getTeams(),
    this.times = [...this.times]
  },
  computed: {
    formatedPeople() {
      var people = []
      for (let index = 0; index < this.availablePeople.length; index++) {
        const person = this.availablePeople[index];
        people.push({
          fullName: person.firstName + ' ' + person.lastName,
          firstName: person.firstName,
          lastName: person.lastName,
          personID: person.personID,
        })
      }
      return people
    }
  },
  watch: {
    times: {
      handler(n, o) {
        var sTimes = []
        for (let index = 0; index < n.length; index++) {
          const element = n[index];
          sTimes.push({
            time: element,
            cap: 0,
            roles: [],
          })
        }
        this.signUpTimes = sTimes
      }, deep: true
    }
  }
}
</script>

<style scoped>

.serve-assign-page {
  display: grid;
  grid-template-columns: 175px 1fr;
  width: 100%;
}
.serve-person-sidebar {
  min-width: 175px;
  width: 25%;
}
.serve-person-sidebar .assigned-people .person{
  font-size: 13px;
  display: grid;
  grid-template-columns: 1fr auto;
}
.serve-person-sidebar .assigned-people .person.selected,
.serve-person-sidebar .assigned-people .person:hover{
  background-color: #eceaea;
}
.serve-person-sidebar .assigned-people .person .name{
  padding: 10px;
}

.serve-person-sidebar .assigned-people .person .remove i{
  padding: 10px 7.5px;
  cursor: pointer;
  font-size: 14px;
}

.serve-assign-page .person-info{
  padding-left: 25px;
}
.serve-assign-page .person-info .person-name{
  font-size: 22px !important;
  color: #575757;
  padding-bottom: 10px;
}
.serve-assign-page .person-info label{
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #575757;
  padding-bottom: 10px;
}

.time-caps .sign-up-times {
  /* display: flex; */
  align-items: flex-end;
  margin-bottom: 5px;
  margin-top: 10px;
}
.times {
  overflow-y: auto;
  max-height: 225px;
}
.times .sign-up-roles .time,
.time-caps .sign-up-times .time{
  font-size: 20px;
  font-weight: 500;
  color: #555555;
  margin-top: 10px;
}
.time-caps .sign-up-times .cap{
  padding-left: 20px;
  /* display: flex; */
  /* width: 50px; */
}
.time-caps .sign-up-times .cap .number{
  display: inline-block;
  width: 75px;
  padding-left: 15px;
  font-size: 20px;
}
.time-caps .sign-up-times .cap .number input{
  font-size: 18px;
}
.sign-up-roles {
  padding-bottom: 5px;
}
.sign-up-roles .roles {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
}
.sign-up-roles .role{
  display: grid;
  margin-right: 5px;
  grid-template-columns: 1fr auto auto;
  grid-gap: 5px;
  min-width: 100px;
}
.sign-up-roles .role input{
  padding: 10px;
  color: white;
  font-size: 12px;
  border-radius: 7px;
  text-shadow: 0px 1px 8px #00000034;
  transition: all .2s ease-out;
  background: #05e0a2;
  font-weight: 600;
  width: 150px;
}
.sign-up-roles .role input.number{
  max-width: 50px;
}
.sign-up-roles .role input::placeholder{
  color: #ffffffd7;
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
}

@media all and (max-width: 480px) {
}
</style>