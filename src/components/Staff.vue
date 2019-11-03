<template>
  <div class="staff-container">
    <div class="main-wrapper">
      <div class="page-card-wrapper"
        :class="{'inactive': selectedID != ''}">        
        <cards
          :cardList="formatedPeople"
          :loading="peopleLoading"
          :selectedID="selectedID + ''"
          :hasAddNew="true"
          @selected="recieveID"
          @onAddNew="createNewItem"
          />
      </div>
      <div class="selected-view" v-if="selectedID != '' && !creatingNewItem">
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
          <div :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)'}"
          class="profile-pic"></div>
          <h3>{{selectedPerson.firstName + ' ' + selectedPerson.lastName}}</h3>
          <div class="subtitle">{{selectedPerson.account.username !== '' ? '@' + selectedPerson.account.username : ''}}</div>
        </div>
        <div class="details">
          <!-- <button class="section-toggle">Teams</button> -->
          <div class="panel">
            <h4 class="noselect">General Info</h4>
            <div class="item">
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
            </div>
          </div>
          <div class="panel">
            <h4 class="noselect">Skills</h4>
            <div class="explanation">Track your members talents with the skills feature. 
              <span style="color: #05e0a2; font-weight: 600">Confirm</span> skills and they will filter to the top of any skills search.
            </div>
            <div class="skills noselect">
              <div class="skill" 
                v-for="(skill, index) in skills"
                :key="skill.title"
                :class="{'confirmed': skill.confirmed}"
                @click="toggleSkill(index)">
                {{ skill.title }}
              </div>
            </div>
          </div>
          <div class="panel">
            <h4>Teams</h4>
            <div class="teams">
              <div class="team-box" v-for="team in selectedPersonTeams" :key="team.id">
                <div class="icon" :style="{backgroundImage: 'url(' +  team.icon + ')'}"></div>
                <div class="team-info">
                  <div class="name">{{team.name}}</div>
                  <div v-if="team.isLeader" class="leader">Team Leader</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="new-item" v-if="creatingNewItem">
        <div class="title">Add Person to Staff</div>
        <div class="details">
          <div class="type">            
            <custom-radio v-model="newItemType" :options="['detailed', 'bulk', 'upload']"></custom-radio>
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
            <!-- <div class="section">
              mailing
            </div> -->
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
      </div>
    </div>
  </div>
</template>

<script>
import Cards from '@/components/CardList'
import VueTable from '@/components/Table'
import People from '@/services/people'
import Teams from '@/services/teams'
import CustomRadio from '@/components/CustomRadio'
import Avatar from '@/components/Avatar'
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '@/utils/helpers'
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
      skills: [
        {title: 'Dancing',
        confirmed: false},
        {title: 'Preaching',
        confirmed: false},
        {title: 'CPR',
        confirmed: true},
        {title: 'Talking',
        confirmed: false},
        {title: 'Guitar',
        confirmed: false},
        {title: 'Singing',
        confirmed: false},
        {title: 'Cooking',
        confirmed: true},
        {title: 'Boating',
        confirmed: false},
        {title: 'Drums',
        confirmed: false},
        {title: 'Ukulele',
        confirmed: true},
      ]
    }
  },
  components: {
    VueTable, Cards, CustomRadio, Container, Draggable, Avatar
  },
  methods: {
    async getPeople () {
      const response = await People.getPeople()
      this.people = response['person(s)']
    },
    async getPerson () {
      const response = await People.getPerson(this.selectedID)
      this.selectedPerson = response['person']
    },
    async getTeams() {   
      const response = await Teams.getTeamsByID(this.selectedID)
      this.selectedPersonTeams = response['team(s)']
    },
    toggleSkill(index) {
      this.skills[index].confirmed = !this.skills[index].confirmed
    },
    recieveID(id) {
      if (!id) {
        return
      }
      this.creatingNewItem = false
      this.$router.push(`/app/staff/${id}`)
      this.selectedID = id
      this.getPerson()
      this.getTeams()
    },
    createNewItem() {
      this.selectedThreadID = -1;
      this.$router.push(`/app/staff/`)

      this.creatingNewItem = true;
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
          title: person.firstName + ' ' + person.lastName,
          subtext: person.account.username !== '' ? '@' + person.account.username : '',
          profile: person.personImageThumbnailURL
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
.staff-container {
  height: 100%;
}
h2 {
  padding-top: 30px;
  /* padding-left: 20px; */
  height: 40px;
}

.staff-wrapper {
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
.person-info h4{
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
  padding-left: 5px;
}
.skill {
  display: inline-block;
  cursor: pointer;
  margin: 0px 5px 15px 5px;
  padding: 10px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  border-radius: 50px;
  background: #b2bec3;
  text-shadow: 0px 1px 8px #00000034;
  transition: all .3s ease-out
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
  .staff-wrapper {
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