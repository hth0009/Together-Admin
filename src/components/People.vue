<template>
  <div class="people-container">
    <div class="people-wrapper">
      <div class="people-table-wrapper">        
        <h2>People</h2>
        <input type="text" class="basic-input" placeholder="search" v-model="peopleSearch">
        <vue-table
          :data="computedPeople"
          :columns="gridColumns"
          :column-type="columnType"
          :filter-key="peopleSearch"
          :id-key="'id'"
          :highlighted-entry="selectedPerson['id']"
          @value="recieveID"></vue-table>
      </div>
      <div class="person-view" v-show="selectedID != ''">
        <div class="person-header"> 
          <!-- <div :style="{backgroundImage: 'url(' +  selectedPerson.profile + ')'}"
          class="profile-pic"></div> -->
          <div :style="{backgroundImage: 'url(https://i0.wp.com/christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg?ssl=1)'}"
          class="profile-pic"></div>
          <h3>{{selectedPerson.firstName + ' ' + selectedPerson.lastName}}</h3>
        </div>
        <div class="person-info">
          <!-- <button class="section-toggle">Teams</button> -->
          <div class="general-info-panel">
            <h4>General Info</h4>
            <p class="username">username: {{selectedPerson.username}}</p>
            <p class="email">email: {{selectedPerson.accountEmail}}</p>
            <p class="birthday">birthday: {{selectedPerson.birthday}}</p>
            <p class="address">address: {{selectedPerson.address}}</p>
          </div>
          <div class="teams-panel">
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
          <!-- <div class="roles-panel">
            <h4>Role</h4>
              <p class="role-title">
              </p>
          </div>
          <div class="skills-panel">
            <h4>Skills</h4>
            <div class="skills">
              <div class="skill noselect" 
                v-for="skill in selectedPerson.skills" :key="skill.title"                
                :class="{confirmed: skill.confirmed}"
                @click="skill.confirmed = !skill.confirmed">
                {{skill.title}}
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTable from '@/components/Table'
import People from '@/services/people'
import Teams from '@/services/teams'
// import store from '../store'

export default {
  name: 'People',
  data () {
    return {
      searchQuery: '',
      gridColumns: ['profile', 'name'],
      columnType: {profile: 'profile', name: 'text'},
      people: [],
      peopleSearch: '',
      selectedID: '',
      selectedPerson: {},
      selectedPersonTeams: []
    }
  },
  components: {
    VueTable
  },
  methods: {
    async getPeople () {
      const response = await People.getPeople()
      this.people = response['person(s)']
    },
    async getPerson () {
      var response = await People.getPerson(this.selectedID)
      this.selectedPerson = response['person']
    },
    async getTeams() {   
      const response = await Teams.getTeams(this.selectedID)
      this.selectedPersonTeams = response['team(s)']
    },
    recieveID(id) {
      this.selectedID = id
      this.getPerson()
      this.getTeams()
    }
  },
  props: {
  },
  mounted() {    
    this.getPeople()
  },
  computed: {
    computedPeople() {
      const newPeople = []
      for (let index = 0; index < this.people.length; index++) {
        const person = this.people[index];
        newPeople.push({
          name: person.firstName + ' ' + person.lastName,
          id: person.id,
          profile: 'https://i0.wp.com/christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg?ssl=1'
        })
      }
      return newPeople
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
  grid-template-columns: 300px auto;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* overflow-x: auto; */
}

.people-table-wrapper {
  padding: 20px 30px;
  height: calc(100%);
  overflow-y: auto;
  height: calc(100vh - 80px);
}
.people-table-wrapper table {
  width: 100%;
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
.person-view::before {
  content: '';
  border-left: 1px solid #f0f0f0 ;
  position: absolute;
  height: 20vh;
  left: 0;
  top: 0%;
}
.person-header {  
  position: relative;
}
.person-header h3 {
  display: inline;
  padding: 10px;
}
.person-header .profile-pic {
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
 }

@media all and (max-width: 480px) {
  .people-wrapper {
    grid-template-columns: 1fr;
  }
 }
</style>