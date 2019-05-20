<template>
  <div class="people-container">
    <div class="people-wrapper">
      <div class="people-card-wrapper"
        :class="{'inactive': selectedID != ''}">        
        <!-- <h2>People</h2> -->
        <!-- <input type="text" class="basic-input" placeholder="search" v-model="peopleSearch"> -->
        <!-- <vue-table
          :data="computedPeople"
          :columns="gridColumns"
          :column-type="columnType"
          :filter-key="peopleSearch"
          :id-key="'id'"
          :highlighted-entry="selectedPerson['id']"
          @value="recieveID"></vue-table> -->
        <cards
          :cardList="formatedPeople"
          :loading="peopleLoading"
          :selectedID="selectedID + ''"
          @selected="recieveID"
          />
      </div>
      <div class="selected-view" v-show="selectedID != ''">
        <div class="header"> 
          <!-- <div :style="{backgroundImage: 'url(' +  selectedPerson.profile + ')'}"
          class="profile-pic"></div> -->
          <div :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)'}"
          class="profile-pic"></div>
          <h3>{{selectedPerson.firstName + ' ' + selectedPerson.lastName}}</h3>
          <div class="subtitle">@username</div>
        </div>
        <div class="info">
          <!-- <button class="section-toggle">Teams</button> -->
          <div class="general-info-panel">
            <h4>General Info</h4>
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
      profiles: [
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
        'https://images.unsplash.com/photo-1486645725491-57c86b563b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        'https://images.unsplash.com/photo-1485811904074-04513843270c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
        ]
    }
  },
  components: {
    VueTable, Cards
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
      if (id == undefined) {
        return
      }
      this.$router.push(`/app/people/${id}`)
      this.selectedID = id
      this.getPerson()
      this.getTeams()
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
          // profile: thread.threadImageThumbnailURL,          
          profile: this.profiles[index % 4],
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
  border-right: 1px #E6E9EC solid;
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