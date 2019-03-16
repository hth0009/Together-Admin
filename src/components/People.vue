<template>
  <div class="people-container">
    <h2>People</h2>
    <div class="people-wrapper">
      <div class="people-table-wrapper">
        <input type="text" class="basic-input" placeholder="search" v-model="peopleSearch">
        <vue-table
          :data="gridData"
          :columns="gridColumns"
          :column-type="columnType"
          :filter-key="peopleSearch"
          :id-key="'username'"
          :highlighted-entry="selectedPerson['username']"
          @value="recieveID"></vue-table>
      </div>
      <div class="person-view" v-show="selectedID != ''">
        <div class="person-header"> 
          <div :style="{backgroundImage: 'url(' +  selectedPerson.profile + ')'}"
          class="profile-pic"></div>
          <h3>{{selectedPerson.name}}</h3>
        </div>
        <div class="person-info">
          <!-- <button class="section-toggle">Teams</button> -->
          <div class="general-info-panel">
            <h4>General Info</h4>
            <p class="username">username: {{selectedPerson.username}}</p>
            <p class="email">email: {{selectedPerson.email}}</p>
            <p class="phone">phone: {{selectedPerson.phone}}</p>
            <p class="address">address: {{selectedPerson.address}}</p>
          </div>
          <div class="teams-panel">
            <h4>Teams</h4>
            <div class="teams">
              <div class="team-box" v-for="team in selectedPerson.teams" :key="team.id">
                <div class="icon" :style="{backgroundImage: 'url(' +  team.icon + ')'}"></div>
                <div class="team-info">
                  <div class="name">{{team.name}}</div>
                  <div v-if="team.isLeader" class="leader">Team Leader</div>
                </div>
              </div>
            </div>
          </div>
          <div class="roles-panel">
            <h4>Role</h4>
              <p class="role-title">
                {{selectedPerson.staff.isStaff ? selectedPerson.staff.staffRole : 'Member'}}
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTable from '@/components/Table'
// import store from '../store'

export default {
  name: 'People',
  data () {
    return {
      searchQuery: '',
      gridColumns: ['profile', 'name', 'username'],
      columnType: {profile: 'profile', name: 'text', username: 'text'},
      gridData: [
        {profile: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80', name: 'Sarah Thompson', username: 'sarah_t'},
        {profile: 'https://images.unsplash.com/photo-1486645725491-57c86b563b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', name: 'John Smith', username: 'smith123'},
        {profile: 'https://images.unsplash.com/photo-1485811904074-04513843270c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', name: 'Lauren White' ,username: 'LaurenWhite'},
        {profile: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', name: 'Bob Jackson' , username: 'bob_1978'}
      ],
      peopleSearch: '',
      selectedID: '',
      selectedPerson: {}
    }
  },
  components: {
    VueTable
  },
  methods: {
    getPeople () {
      // console.log(this.$store.state)
      this.$http.get('people',
      {
        params: {
          inChurch: 'NPCChurch3',
          pagesize: 500,
          page: 0,
          // accountEmail: this.$store.state.user.username
        }
      }).then((response) => {
        console.log(response.data)
      })
      .catch((e) => {
        console.error(e)
      })
    },
    recieveID(id) {
      this.selectedID = id
      var key = 'username'
      this.selectedPerson = {...this.gridData.find(function (item) {
        return item[key] === id
      })}
      this.selectedPerson['address'] = '2202 Straford Park, Lexington Lexington 40505'
      this.selectedPerson['phone'] = '(606) 637-0799'
      this.selectedPerson['email'] = 'email@email.com'
      this.selectedPerson['teams'] = [
        {
          "name": "Crazy Love",
          "icon": "https://images.unsplash.com/photo-1532498551838-b7a1cfac622e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          "isLeader": false,
          "isServeTeam": false
        },
        {
          "name": "Worship Team",
          "icon": "https://images.unsplash.com/photo-1508349356983-7838c2b04eb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
          "isLeader": true,
          "isServeTeam": true
        }
      ]
      this.selectedPerson["staff"] = {
        "isStaff": true,
        "staffRole": "Worship Leader",
        "roleID": 239
      }
      this.selectedPerson["skills"] = [
        { 
          title: 'Singing',
          confirmed: false
        }, { 
          title: 'Drums',
          confirmed: true
        }, { 
          title: 'Videography',
          confirmed: false
        }, { 
          title: 'Preaching',
          confirmed: false
        }
      ],
      this.selectedPerson = {...this.selectedPerson}
    }
  },
  props: {
  },
  mounted() {    
    this.recieveID('smith123')
    this.getPeople()
  },
  computed: {
  }
}
</script>

<style scoped>
.people-container {
  height: 100%;
}
h2 {
  padding-top: 30px;
  padding-left: 20px;
  height: 40px;
}

.people-wrapper {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
  position: relative;
  height: calc(100% - 70px);
  overflow: hidden;
}

.people-table-wrapper {
  padding: 20px 30px;
  flex: 1;
}

.person-view {  
  width: 100%;
  height: 100%;
  position: relative;
  padding-left: 30px;
  flex: 1;
  height: 100%;
  overflow-y: auto;
}
.person-view::before {
  content: '';
  border-left: 1px solid #D0D3D6;
  position: absolute;
  height: 60vh;
  left: 0;
  top: 20%;
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
</style>