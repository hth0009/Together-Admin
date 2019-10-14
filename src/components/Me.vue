<template>
  <div class="me-container">
    <div class="selected-view" id="selected-view">
      <div id="me-wrapper">
        <div id="me-myself" class="panel gs-container vertical">
          <div class="header">
            <div class="profile-pic">
              <avatar :height="100" :url="me.personImageThumbnailURL" :title="me.fullName" />
            </div>
            <h3>{{me.firstName + ' ' + me.lastName}}</h3>
            <div
              class="subtitle"
              v-if="!!me.account"
            >{{me.account.username !== '' ? '@' + me.account.username : ''}}</div>
          </div>
          <div class="gs-top-buttons">
            <button class="gs-basic-button" @click="startEdit" v-show="!editing">
              <i class="material-icons">edit</i>EDIT
            </button>
            <button class="gs-basic-button red" @click="cancelEdit" v-show="editing">
              <i class="material-icons">close</i>CANCEL
            </button>
            <button class="gs-basic-button" @click="saveEdit" v-show="editing">
              <i class="material-icons">done</i>SAVE
            </button>
          </div>
          <form id="me-form">
            <div class="gs-form-group">
              <label>Email</label>
              <input type="text" class="gs-basic-input large" readonly v-model="me.accountEmail" />
            </div>
            <div class="gs-form-group">
              <label>Birthday</label>
              <input type="text" class="gs-basic-input large" readonly v-model="me.birthday" />
            </div>
            <div class="gs-form-group">
              <label>Home Address</label>
              <input
                type="text"
                class="gs-basic-input large"
                :readonly="!editing"
                placeholder="Home Address"
                v-model="me.homeAddress"
              />
            </div>
            <div class="gs-form-group">
              <label>Mailing Address</label>
              <input
                type="text"
                class="gs-basic-input large"
                :readonly="!editing"
                placeholder="Mailing Address"
                v-model="me.mailingAddress"
              />
            </div>
            <div class="gs-form-group">
              <label>Phone Number</label>
              <input
                type="text"
                class="gs-basic-input large"
                :readonly="!editing"
                placeholder="Phone Number"
                v-model="me.phoneNumber"
              />
            </div>
          </form>
        </div>
        <div id="me-orgs-teams">
          <h1>testing</h1>
          <div class="panel gs-container vertical">
            <p>another test</p>
          </div>
        </div>
      </div>
      <div class="me-header">
        <div></div>
        <div class="logout">
          <button @click="logout" class="gs-basic-button red">LOG OUT</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from "../store";
import People from "../services/people";
import Church from "../services/church";
import Teams from "../services/teams";
import Avatar from "../components/Avatar";
export default {
  name: "",
  data() {
    return {
      myTeams: "",
      me: "",
      myOrgs: "",
      editing: false
    };
  },
  components: {
    Avatar
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
        console.log("logged out");
      });
    },
    async getMe() {
      const response = await People.getPerson(Store.state.personID);
      this.me = response["person"];
      console.log(this.me.inChurch);
      this.myOrgs = await Church.getChurch(this.me.inChurch);
    },
    async getMyTeams() {
      const response = await Teams.getTeamsByID(Store.state.personID);
      console.log(response)
      // this.myTeams = response["team(s)"];
    },
    startEdit() {
      this.editing = true;
    },
    cancelEdit() {
      this.editing = false;
    },
    saveEdit() {
      this.editing = false;
    }
  },
  props: {},
  mounted() {
    this.getMe();
    this.getMyTeams();
  },
  computed: {}
};
</script>

<style src="./../assets/css/general-style.css"></style> 

<style scoped>
#me-wrapper {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(350px, 525px));
}
#selected-view #me-myself .header {
  margin-top: 0;
}
.me-container {
  height: 100%;
}
.me-wrapper {
  display: grid;
  grid-template-rows: 50px auto;
}
.me-header {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 100px 1fr;
  padding: 10px 0px;
}
.logout {
  cursor: pointer;
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