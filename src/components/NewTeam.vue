<template>
  <div class="new-team-container">
    <h2>New Team</h2>
    <form class="team-types">
      <label class="team-type">
        <input type="radio" class="basic-radio"
          name="team-type"
          v-model="teamType"
          value="COMMUNITY">
        <i>Community Group</i>
      </label>
      <label class="team-type">
        <input type="radio" class="basic-radio"
          name="team-type"
          v-model="teamType"
          value="SERVE">
        <i>Serve Team</i>
      </label>
      <label class="team-type">
        <input type="radio" class="basic-radio"
          name="team-type"
          v-model="teamType"
          value="ANONYMOUS">
        <i>Annonymous Group</i>
      </label>
    </form>
    <input type="text" class="basic-input team-name"
      placeholder="Enter Team Name"
      v-model="name">
    <div class="new-team-grid">
      <div class="left-panel">
        <br>
        <div class="team-leader">
          <label for=""  v-if="teamType != 'ANONYMOUS'">team leader
            <div class="dropdown">
              <ejs-dropdownlist
                :autofill='true' 
                :fields='fields' 
                :dataSource='possibleLeaders' 
                :placeholder='"team leader"'
                :select="assignLeader"></ejs-dropdownlist>
            </div>
          </label>
        </div>
        <!-- <recurrance/> -->
        <label for="" v-if="teamType != 'ANONYMOUS'">address
          <input type="text" v-model="address" class="basic-input" placeholder="adddress">
        </label>
        <label for="" v-if="teamType != 'ANONYMOUS'">location
          <input type="text" v-model="location" class="basic-input" placeholder="location">
        </label>
        <label for="">description
          <textarea class="basic-textarea"
            v-model="description"
            placeholder="description"
            ></textarea>
        </label>
        <br>
      </div>
      <div class="right-panel" v-if="teamType != 'ANONYMOUS'">
        <br>
        <div class="add-memebers">
          <label for="">members <span>| {{peopleInTeam.length}}</span></label>
          <div class="dropdown">
            <ejs-dropdownlist
              :autofill='true' 
              :fields='fields' 
              :dataSource='computedPeople' 
              :placeholder='"new person"'
              :select="appendUser"></ejs-dropdownlist>
          </div>  
        </div>
        <div class="people-list-panel">
          <div class="people">
            <div class="people-box" v-for="person in peopleInTeam" :key="person.personID">
              <div class="icon" :style="{backgroundImage: 'url(' +  person.icon + ')'}"></div>
              <div class="person-info">
                <div class="name">{{person.firstName + " " + person.lastName}}</div>
              </div>
              <div class="delete" @click="removeUser(person)">
                <i class="material-icons">clear</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="create-team">
      <button class="basic-button" @click="postTeam">create</button>
    </div>
  </div>
</template>

<script>
import People from '@/services/people'
import Teams from '@/services/teams'
import Recurrance from "@/components/Recurrance";

export default {
  name: 'NewTeam',
  data () {
    return {
      name: '',
      teamLeader: {},
      people: [],
      peopleInTeam: [],
      possibleLeaders: [],
      selectedIndex: 0,
      fields: { value: 'id', text: 'name', index: 'selectedIndex'},
      teamType: 'COMMUNITY',
      description: '',
      address: '',
      location: '',
      newTeamTemplate: {
        churchUsername: "",
        name: "",
        iconURL: "",
        leaderID: -1,
        members: [
        ],
        isAnonymous: false,
        description: "",
        hasMeetings: false,
        meetingRecurrence: "",
        meetingAddress: "",
        meetingLocationDescription: "",
        isServeTeam: false
      }
    }
  },
  components: {
    Recurrance
  },
  methods: {
    async getPeople() {   
      const response = await People.getPeople()
      this.people = response['person(s)']

      // List of all people who can be leaders
      const reformattedPeople = []
      for (let index = 0; index < this.people.length; index++) {
        const person = this.people[index];
        reformattedPeople.push({
          name: person.firstName + ' ' + person.lastName,
          id: person.id,
          profile: 'https://i0.wp.com/christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg?ssl=1'
        })
      }
      this.possibleLeaders = [...reformattedPeople]
    },
    valueChange(selectedUser) {
    },
    assignLeader(selectedUser) {
      const data = selectedUser.itemData
      
      // Get index of selected user to remove from people pool
      let index = this.computedPeople.findIndex(x => {
        if (x.id === data.id) {
          return true
        }
      })

      this.teamLeader = {...this.people.splice(index, 1)[0]}
    },
    appendUser(selectedUser) {
      const data = selectedUser.itemData
      
      // Get index of selected user to remove from people pool
      let index = this.computedPeople.findIndex(x => {
        if (x.id === data.id) {
          return true
        }
      })
      this.peopleInTeam.push(this.people.splice(index, 1)[0])
    },
    removeUser(selectedUser) {
      const data = selectedUser
      
      // Get index of selected user to remove from people pool
      let index = this.peopleInTeam.findIndex(x => {
        if (x.id === data.id) {
          return true
        }
      })
      this.people.push(this.peopleInTeam.splice(index, 1)[0])
    },
    async postTeam() {
      var newTeam = {...this.newTeamTemplate}

      newTeam.churchUsername = 'NPCChurch3'
      newTeam.name = this.name
      newTeam.leaderID = this.teamLeader.id

      //Filter Members
      const members = []
      for (let index = 0; index < this.peopleInTeam.length; index++) {
        const member = this.peopleInTeam[index];
        members.push({
          personID: member.id
        })
      }
      newTeam.members = members
      
      newTeam.isAnonymous = this.teamType === 'ANONYMOUS'
      newTeam.isServeTeam = this.teamType === 'SERVE'
      newTeam.description = this.description
      newTeam.meetingAddress = this.address
      newTeam.meetingLocationDescription = this.location

      console.log(newTeam)
      const response = await Teams.postTeam(newTeam)
      console.log(response)
      // this.people = response['person(s)']
    }
  },
  watch: {
  },
  props: {
  },
  mounted() {
    this.getPeople()
  },
  created() {   
    this.newTeam = {...this.newTeamTemplate}
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

.new-team-container {
  height: 100%;  
  padding: 20px 30px;
  overflow-y: auto;
}
.new-team-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
}
.new-team-grid label {
  font-size: 15px;
  /* padding-left: 15px; */
}
/* .right-panel {
  padding-top: 65px;
} */
h2 {
  padding-top: 30px;
  /* padding-left: 20px; */
  height: 40px;
}
.team-name {
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 17.5px;
  height: 30px;
  width: 100%;
}
/* .team-name:  */
.team-types {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.team-type {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 5px;
}
.team-type i {  
  padding: 5px;
  font-size: 13px;
  font-style: normal;
}
.dropdown {
  margin: 10px;
}
.people-list-panel {
  margin: 10px;
}
.basic-textarea {
  height: 100px;
  resize: unset;
  margin-bottom: 30px;
}
.person-info .name {
  font-size: 12px;
}
.people-box .delete .material-icons{
  font-size: 15px;
}
.people-list-panel .people {
  margin-right: 0px;
  max-height: 300px;
}
.create-team {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
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