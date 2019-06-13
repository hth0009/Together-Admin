<template>
  <div class="staff-container">
    <div id="staff-and-volunteer-wrapper">
      <div id="staff-group">
        <h2>Staff</h2>
        <div class="card-view-grid">
          <div class="card noselect"
          @click="recieveID(person.id)"
            v-for="(person, index) in staff"
            v-bind:key="index">
            <div class="profile-pic"
            :style="{backgroundImage: 'url(' +  person.profile + ')'}"></div>
            <div class="name">
              {{person.name}}
            </div>
            <div class="title">
              {{person.title}}
            </div>
          </div>
        </div>
      </div>
      <div id="volunteer-group">
        <h2>Validated Volunteers</h2>
        <div class="card-view-grid">
          <div class="card noselect"
          @click="recieveID(person.id)"
            v-for="(person, index) in staff"
            v-bind:key="index">
            <div class="profile-pic"
            :style="{backgroundImage: 'url(' +  person.profile + ')'}"></div>
            <div class="name">
              {{person.name}}
            </div>
            <div class="title">
              {{person.title}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="person-view" v-show="selectedID != ''">
      <div class="person-header"> 
          <div :style="{backgroundImage: 'url(' +  selectedPerson.profile + ')'}"
          class="profile-pic"></div>
          <h3>{{selectedPerson.name}}</h3>
      </div>
      <div class="person-info">
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
</template>

<script>
export default {
  name: '',
  data () {
    return {
      staff: [
        {
          name: 'Jon Doe',
          title: 'Pastor',
          id: '3',
          profile: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
        }
      ],
      selectedPerson: {}
    }
  },
  components: {
  },
  methods: {    
    recieveID(id) {
      this.selectedID = id
      var key = 'username'
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
  },
  computed: {
  },
  created () {
    // filler
    const person = this.staff[0]
    for (let index = 0; index < 6; index++) {
      this.staff.push(person)      
    }    
    this.recieveID('smith123')
  }
}
</script>

<style scoped>
.staff-container {
  height: calc(100vh - 40px);
  display: grid;
  grid-template-columns: 2fr 1fr;
  overflow-y: hidden;
}
#staff-and-volunteer-wrapper {
  overflow: auto;
}
h2 {
  padding-top: 30px;
  padding-left: 20px;
  height: 40px;
}
.card-view-grid {
  padding: 10px;
  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  grid-gap: 15px;
}

.card {
  background: white;
  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  padding: 10px;
  cursor: pointer;

  transition: all .3s ease;
}

.card:hover {
  box-shadow: 0px 2px 2px 0px rgba(53, 53, 53, 0.295);
}

.card .profile-pic {
  grid-column: 2/3;
  justify-self: center;

  width: 100px;
  height: 100px;
  border-radius: 50%;
  
  background-position: center center;
  background-size: cover;
  margin: 5px;
}
.card .name, .card .title {
  grid-column: 1/4;
  text-align: center;
  padding-top: 5px;
  font-size: 15px;
}

.card .title {
  font-size: 13px;
}



.person-view {  
  position: relative;
  padding-left: 30px;
  flex: 1;
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
  .card-view-grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
 }

@media all and (min-width: 768px) and (max-width: 1024px) {
  .card-view-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .staff-container {
    grid-template-columns: 3fr 2fr;
  }
 }

@media all and (min-width: 480px) and (max-width: 768px) {
  .card-view-grid {
    grid-template-columns: 1fr;
  }
  .staff-container {
    grid-template-columns: 1fr 1fr;
  }
 }

@media all and (max-width: 480px) {
  .card-view-grid {
    grid-template-columns: 1fr 1fr;
  }  
  .staff-container {
    grid-template-columns: 1fr;
  }
  .person-view {
    display: none;
  }
 }

</style>