<template>
  <div class="selected-view" id="selected-view">
    <div id="church-wrapper">
      <div id="church-info" class="panel gs-container vertical">
        <div class="header">
          <div class="profile-pic">
            <avatar :height="100" :url="myChurch.churchImageThumbnailURL" :title="myChurch.name" />
          </div>
          <h3>{{myChurch.name}}</h3>
          <div
            class="subtitle"
          >{{myChurch.username !== '' ? '@' + myChurch.username : ''}}</div>
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
              v-model="myChurch.websiteURL"
            />
          </div>
          <div class="gs-form-group">
            <label>Address</label>
            <input
              type="text"
              class="gs-basic-input"
              :readonly="!editing"
              placeholder="Add Mailing Address"
              v-model="myChurch.address"
            />
          </div>
          <div class="gs-form-group">
            <label>Phone Number</label>
            <input
              type="text"
              class="gs-basic-input"
              :readonly="!editing"
              placeholder="Add Phone Number"
              v-model="myChurch.phoneNumber"
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
              v-model="myChurch.description"
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
              v-model="myChurch.statementOfFaith"
            ></textarea>
          </div>
          <div class="gs-form-group">
            <label>Vision</label>
            <textarea
              type="text"
              class="gs-basic-input"
              placeholder="Add Vision"
              rows="10"
              :readonly="!editing"
              v-model="myChurch.vision"
            ></textarea>
          </div>
        </form>
      </div>
      <div id="church-staff">
        <div class="panel gs-container vertical">
            <h1 class="gs-card-header">Staff</h1>
            <cards
                  :hasShadow="false"
                  :loading="false"
                  :inline="true"
                  :hasButtonOnCard="false"
                  :alphabetical="true"
                  :emptyMessage="'No staff'"
                  :cardList="myChurchStaff"
                  :cardSelectable="true"
                  profilePicFillerValue="orgName"
                  :hasSearch="false"
                  :fields="{
                    title: 'staffName',
                    profile: 'staffIconURL',
                    id: 'staffID',
                  }"
                />
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
import Cards from '@/components/CardList'
export default {
  name: "",
  data() {
    return {
      myChurch: "",
      myChurchStaff: "",
      editing: false
    };
  },
  components: {
    Avatar,
    Cards
  },
  methods: {
    async getMyChurch() {
      Church.getChurch(Store.state.churchUsername).then(response => {
        this.myChurch = response.data.churches[0]
        this.myChurchStaff = response.data.churches.map((aStaff) => ({
          staffName: aStaff.pastor.firstName + ' ' + aStaff.pastor.lastName,
          staffIconURL: aStaff.pastor.personImageURL,
          staffID: aStaff.pastor.id
        }))
      })
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
    this.getMyChurch();
  },
  computed: {}
};
</script>

<style src="./../assets/css/general-style.css"></style> 

<style scoped>
  #selected-view {
    height: 100vh;
    overflow: auto;
  }
  #selected-view #church-wrapper #church-info .header {
    margin: 0;
  }
  #church-wrapper {
    display: grid;
    align-items: start;
    grid-template-columns: repeat(auto-fit, minmax(350px, 525px));
  }
</style>