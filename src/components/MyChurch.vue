<template>
  <div class="selected-view" id="selected-view">
    <div id="church-wrapper">
      <div id="church-info" class="panel gs-container vertical">
        <div class="header">
          <div class="profile-pic">
            <avatar :height="100" :url="me.personImageThumbnailURL" :title="me.fullName" />
          </div>
          <h3>Church of John</h3>
          <div
            class="subtitle"
            v-if="!!me.account"
          >{{me.account.username !== '' ? '@' + 'churchofjohn' : ''}}</div>
        </div>
        <div class="gs-buttons-right">
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
        <form id="church-form">
          <div class="gs-form-group">
            <label>Website</label>
            <input
              type="text"
              class="gs-basic-input"
              :readonly="!editing"
              placeholder="Add Website"
            />
          </div>
          <div class="gs-form-group">
            <label>Address</label>
            <input
              type="text"
              class="gs-basic-input"
              :readonly="!editing"
              placeholder="Add Mailing Address"
            />
          </div>
          <div class="gs-form-group">
            <label>Phone Number</label>
            <input
              type="text"
              class="gs-basic-input"
              :readonly="!editing"
              placeholder="Add Phone Number"
            />
          </div>
          <div class="gs-form-group">
            <label>Description</label>
            <textarea
              type="text"
              class="gs-basic-input"
              placeholder="Add Description"
              rows="10"
              :readonly="!editing"
            ></textarea>
          </div>
          <div class="gs-form-group">
            <label>Statement of Faith</label>
            <textarea
              type="text"
              class="gs-basic-input"
              placeholder="Add Statement of Faith"
              rows="10"
              :readonly="!editing"
            ></textarea>
          </div>
        </form>
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
  #selected-view #church-wrapper #church-info .header {
    margin: 0;
  }
</style>