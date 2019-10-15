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
              <input type="text" class="gs-basic-input" readonly v-model="me.accountEmail" />
            </div>
            <div class="gs-form-group">
              <label>Birthday</label>
              <input type="text" class="gs-basic-input" readonly v-model="me.birthday" />
            </div>
            <div class="gs-form-group">
              <label>Home Address</label>
              <input
                type="text"
                class="gs-basic-input"
                :readonly="!editing"
                placeholder="Home Address"
                v-model="me.homeAddress"
              />
            </div>
            <div class="gs-form-group">
              <label>Mailing Address</label>
              <input
                type="text"
                class="gs-basic-input"
                :readonly="!editing"
                placeholder="Mailing Address"
                v-model="me.mailingAddress"
              />
            </div>
            <div class="gs-form-group">
              <label>Phone Number</label>
              <input
                type="text"
                class="gs-basic-input"
                :readonly="!editing"
                placeholder="Phone Number"
                v-model="me.phoneNumber"
              />
            </div>
          </form>
        </div>
        <div id="me-orgs-teams">
          <h1>Organizations</h1>
          <div class="panel gs-container vertical">
            <div class="header">
              <div class="profile-pic">
                <avatar :height="80" :url="me.personImageThumbnailURL" :title="me.fullName" />
              </div>
              <h3>Church of {{me.firstName}}</h3>
              <div class="subtitle" v-if="!!me.account">Filler Content</div>
            </div>
            <div class="gs-top-buttons">
              <button class="gs-basic-button red">LEAVE</button>
            </div>
          </div>
          <h1>Teams</h1>
          <div class="panel gs-container vertical">
            <div class="header">
              <div class="profile-pic">
                <avatar :height="80" :url="me.personImageThumbnailURL" :title="me.fullName" />
              </div>
              <h3>Team of {{me.firstName}}</h3>
              <div class="subtitle" v-if="!!me.account">Filler Content</div>
            </div>
            <div class="team-footer">
              <div class="profile-pic">
                <avatar :height="40" :url="me.personImageThumbnailURL" :title="me.fullName" />
                <h6>Church of {{me.firstName}}</h6>
              </div>
              <div>
                <button class="gs-basic-button">END TEAM</button>
                <button class="gs-basic-button red">LEAVE</button>
              </div>
            </div>
            <div class="gs-top-buttons">
            </div>
          </div>
        </div>
      </div>
      <div class="logout">
        <button @click="logout" class="gs-basic-button red">LOG OUT</button>
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
      console.log(response);
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
.team-footer {
  display: flex;
  justify-content: space-between;
}
.team-footer .profile-pic {
  display: flex;
  align-items: center;
}
.team-footer h6 {
  margin-left: 10px;
  font-size: 16px;
}
#me-orgs-teams h1 {
  margin-left: 12px;
}
#me-wrapper {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(350px, 525px));
}
#selected-view #me-orgs-teams .header {
  margin: 0;
  margin-bottom: 20px;
}
#selected-view #me-orgs-teams .subtitle {
  font-size: 16px;
  font-weight: 500;
}
#selected-view #me-orgs-teams h3 {
  font-size: 28px;
}
#selected-view #me-myself .header {
  margin: 0;
}
.me-container {
  height: 100%;
}
.me-wrapper {
  display: grid;
  grid-template-rows: 50px auto;
}
.logout {
  cursor: pointer;
  margin-left: 199px;
}
</style>