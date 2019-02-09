<template>
  <div class="teams-container">
    <h2>Teams</h2>
    <div class="teams-wrapper">
      <div class="teams-table-wrapper">
        <input type="text" class="basic-input" placeholder="search" v-model="teamsSearch">
        <vue-table
          :data="gridData"
          :columns="gridColumns"
          :column-type="columnType"
          :filter-key="teamsSearch"
          :id-key="'id'"
          :highlighted-entry="selectedTeam['id']"
          @value="recieveID"></vue-table>
      </div>
      <div class="team-view" v-show="selectedID != ''">
        <div class="team-header"> 
          <div :style="{backgroundImage: 'url(' +  selectedTeam.profile + ')'}"
          class="profile-pic"></div>
          <h3>{{selectedTeam.name}}</h3>
          <div class="team-type noselect serve" v-if="selectedTeam.isServe">Serve Team</div>
          <div class="team-type noselect annonymous" v-if="selectedTeam.isAnnonymous">Annonymous</div>
        </div>
        <div class="team-info">
          <!-- <button class="section-toggle">Teams</button> -->
          <div class="annonymous-team"
            v-if="selectedTeam.isAnnonymous">            
            <div class="description-panel">
              <h4>Description</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>            
            <div class="contact-panel">
              <h4>Contact</h4>
              <p>Please email us at: herchoicetoheal.acc@gmail.com</p>
            </div>
          </div>
          <div v-else>
            <div class="description-panel">
              <h4>Description</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>    
            <div class="team-leader-panel">   
              <h4>Team Leader</h4>           
                <div class="people-box">
                  <div class="icon" :style="{backgroundImage: 'url(' +  selectedTeam.leader.icon + ')'}"></div>
                  <div class="person-info">
                    <div class="name">{{selectedTeam.leader.name}}</div>
                  </div>
                </div>
                <p>Reach out to John at (606) 637-0799</p>
            </div>
            <div class="people-panel">
              <h4>Members <span>| {{selectedTeam.people.length}}</span></h4>
              <div class="people">
                <div class="people-box" v-for="person in selectedTeam.people" :key="person.id">
                  <div class="icon" :style="{backgroundImage: 'url(' +  person.icon + ')'}"></div>
                  <div class="person-info">
                    <div class="name">{{person.name}}</div>
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
import VueTable from '@/components/Table'
export default {
  name: 'Teams',
  data () {
    return {
      searchQuery: '',
      gridColumns: ['profile', 'name', 'type'],
      columnType: {profile: 'profile', name: 'text', type: 'text'},
      gridData: [
        {profile: 'https://images.unsplash.com/photo-1532498551838-b7a1cfac622e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', name: 'Crazy Love', type: 'Community Group', id: 12363},
        {profile: 'https://images.unsplash.com/photo-1523459178261-028135da2714?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80', name: 'Abortion Recovery', type: 'Annonymous Group', id: 9832},
        {profile: 'https://images.unsplash.com/photo-1519096990358-3c121dec4458?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', name: 'Living out Sunday\'s Sermon' , type: 'Community Group', id: 934},
        {profile: 'https://images.unsplash.com/photo-1527853359084-088460b3000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=936&q=80', name: 'Load In' , type: 'Serve', id: 4876},
        {profile: 'https://images.unsplash.com/photo-1509622460822-e6f328c33ac4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=618&q=80', name: 'Production' , type: 'Serve', id: 567587},
        {profile: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', name: 'Wednessday Dinner and Discussion' , type: 'Community Group', id: 98765},
        {profile: 'https://images.unsplash.com/photo-1508349356983-7838c2b04eb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', name: 'Worship Team' , type: 'Serve', id: 8766},
      ],
      teamsSearch: '',
      selectedID: '',
      selectedTeam: {}
    }
  },
  components: {
    VueTable
  },
  methods: {
    recieveID(id) {
      this.selectedID = id
      var key = 'id'
      this.selectedTeam = {...this.gridData.find(function (item) {
        return item[key] === id
      })}
      this.selectedTeam['isAnnonymous'] = false
      this.selectedTeam['isServe'] = false
      if (this.selectedTeam.type === 'Annonymous Group') {
        this.selectedTeam.isAnnonymous = true
      }
      if (this.selectedTeam.type === 'Serve') {
        this.selectedTeam.isServe = true
      }
      this.selectedTeam['people'] = [
        {
          "name": "Bob Jackson",
          "icon": "https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",  
        },
        {
          "name": "John Doe",
          "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
        },
        {
          "name": "John Doe",
          "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
        },
        {
          "name": "John Doe",
          "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
        },
        {
          "name": "John Doe",
          "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
        },
        {
          "name": "John Doe",
          "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
        },
        {
          "name": "John Doe",
          "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
        },
        {
          "name": "John Doe",
          "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
        },
        {
          "name": "John Doe",
          "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
        }
      ]
      this.selectedTeam["leader"] = {
        "name": 'John Smith',
        "icon": "https://images.unsplash.com/photo-1486645725491-57c86b563b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "id": 239
      }
      this.selectedTeam = {...this.selectedTeam}
    }
  },
  props: {
  },
  mounted() {    
    this.recieveID(4876)
  },
  computed: {
  }
}
</script>

<style scoped>
.teams-container {
  height: 100%;
}
h2 {
  padding-top: 30px;
  padding-left: 20px;
  height: 40px;
}

.teams-wrapper {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
  position: relative;
  height: calc(100% - 70px);
  overflow: hidden;
}

.teams-table-wrapper {
  padding: 20px 30px;
  height: 100%;
  overflow-y: auto;
  flex: 1;
}

.team-view {  
  width: 100%;
  height: 100%;
  position: relative;
  padding-left: 30px;
  flex: 1;
  overflow-y: auto;
}
.team-view::before {
  content: '';
  border-left: 1px solid #D0D3D6;
  position: absolute;
  height: 60vh;
  left: 0;
  top: 20%;
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
.people {
  max-height: 400px;
  overflow-y: auto;
  margin-right: 15px;
}
.people-box {
  margin: 5px;
  padding: 10px;
  transition: all .3s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-left: 2px white solid;
  cursor: pointer;
}  
.people-box.unread {
  border-left: 2px #69CDCF solid;
}
.people-box:hover {
  box-shadow: 0px 2px 4px -2px rgba(128, 128, 128, 0.507);    
}
.people-box.selected {
  box-shadow: 0px 4px 5px -3px rgba(128, 128, 128, 0.507);
}
.people-box .icon {
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
.people-box .person-info{
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