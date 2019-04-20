<template>
  <div class="teams-container">
    <div class="teams-wrapper">      
    <modal
      name="new-team"
      height="auto"
      :scrollable="true"
      y-overflow="auto">
      <new-teams></new-teams>
    </modal>
      <div class="teams-table-wrapper">
        <h2>Teams</h2>
        <div id="add-new-team"
          @click="show">
          <i class="material-icons noselect">add</i>
        </div>
        <input type="text" class="basic-input" placeholder="search" v-model="teamsSearch">
        <vue-table
          :data="computedPeople"
          :columns="gridColumns"
          :column-type="columnType"
          :filter-key="teamsSearch"
          :id-key="'id'"
          :highlighted-entry="selectedID"
          @value="recieveID"></vue-table>
      </div>
      <div class="team-view" v-if="selectedID != ''">
        <div class="team-header"> 
          <div :style="{backgroundImage: 'url(https://i0.wp.com/christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg?ssl=1)'}"
          class="profile-pic"></div>
          <!-- <div :style="{backgroundImage: 'url(' +  selectedTeam.iconURL + ')'}"
          class="profile-pic"></div> -->
          <h3>{{selectedTeam.name}}</h3>
          <div class="team-type noselect serve" v-if="selectedTeam.isServe">Serve Team</div>
          <div class="team-type noselect annonymous" v-if="selectedTeam.isAnnonymous">Annonymous</div>
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
    </div>
  </div>
</template>

<script>
import NewTeams from '@/components/NewTeam'
import VueTable from '@/components/Table'
import Teams from '@/services/teams'

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
      teamsSearch: '',
      selectedID: '',
      selectedTeam: {},
      selectedID: 0
    }
  },
  components: {
    VueTable, NewTeams
  },
  methods: {
    show () {
      this.$modal.show('new-team');
    },
    hide () {
      this.$modal.hide('new-team');
    },
    recieveID(id) {
      this.getTeam(id)
    },    
    async getTeams() {
      const response = await Teams.getTeams()
      this.teams = response['team(s)']
    },
    async getTeam(id) {
      this.selectedID = id
      const response = await Teams.getTeam(id)
      this.selectedTeam = response['team']
    }
  },
  props: {
  },
  mounted() {
    this.getTeams()
  },
  created() {
  },
  computed: {
    computedPeople() {
      const newTeams = []

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

      newTeams.push({
          name: team.name,
          type: teamType,
          id: team.id,
          profile: 'https://i0.wp.com/christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg?ssl=1'
        })
      }
      return newTeams
    }
  }
}
</script>

<style scoped>

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
  grid-template-columns: 1fr 1fr;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* overflow-x: auto; */
}

.teams-table-wrapper {
  padding: 20px 30px;
  height: calc(100%);
  overflow-y: auto;
  height: calc(100vh - 80px);
  position: relative;
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

#add-new-team {
  width: 25px;
  height: 25px;
  padding: 7.5px;
  position: absolute;
  top: 40px;
  right: 15px;
  background: #00cec9;
  border-radius: 50px;
  cursor: pointer;
}

#add-new-team i {    
  color: white;
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
  .teams-wrapper {
    grid-template-columns: 1fr;
  }
 }
</style>