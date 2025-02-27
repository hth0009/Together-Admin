<template>
  <div id="teams-container">
    <sweet-modal icon="warning" ref="deleteItemModal">
      <h3>Are you sure you want to delete {{selectedTeam.name}}?</h3>
      <button slot="button" class="gs-basic-button red" @click="deleteItem">DELETE</button>
    </sweet-modal>
    <sweet-modal icon="success" ref="itemCreated">
      <h3>{{newTeam.name}} created!!</h3>
    </sweet-modal>
    <div class="page-wrapper">
      <div class="page-card-wrapper">
        <cards
          v-model="selectedID"
          :loading="loading"
          :cardList="teams"
          :profilePicFillerValue="'name'"
          :emptyMessage="'No Teams'"
          :fields="{
              title: 'name',
              id: 'id',
              subtitle: 'title',
              profile: 'teamImageThumbnailURL'
            }"
          :hasAddNew="true"
          @selected="recieveID"
          @onAddNew="createNewItem"
        />
      </div>
      <div class="gs-app-selected-view" id="selected-view" >
        <div class="details" v-if="selectedID != -1 && !creatingNewItem">
          <div class="panel gs-container vertical">
            <div class="gs-buttons-right">
              <button class="gs-basic-button"
                @click="startEdit"
                v-show="!editing"
              ><i class="material-icons">edit</i>EDIT</button>            
              <button class="gs-basic-button red" 
                @click="deleteButtonClicked"
                v-show="!editing"
              ><i class="material-icons">delete</i>DELETE</button>
              <button class="gs-basic-button red"
                @click="cancelEdit"
                v-show="editing"
              ><i class="material-icons">close</i>CANCEL</button>
              <button class="gs-basic-button"
                @click="saveEdit"
                v-show="editing"
              ><i class="material-icons">done</i>SAVE</button>            
            </div>
            <div class="image-croppa gs-card-photo">
              <croppa v-model="photoCroppa"
                canvas-color="transparent"
                :disable-rotation="true"
                :prevent-white-space="true"
                :width="250"
                :height="250"
                :speed="10"
                v-show="editing"
              ></croppa>
              <img
                :src="selectedTeam.teamImageURL"
                alt
                srcset
                class="teams-image"
                v-show="!editing"
              />
            </div>
            <form action="" class="" id="teams-form">
              <padlock
                v-model="selectedTeam.isPrivate"
                :lockedLabel="'Private Team'"
                :unlockedLabel="'Public Team'"
                :disabled="!editing"
                :canBeUnlocked="false"
                :cantUnlockMessage="'Private teams cannot be made public'"
                :lockWarning="'Once this team is made private it cannot be made public again.'"
              />
              <div class="gs-form-group">
                <label for>Name</label>
                <input
                  type="text"
                  class="gs-basic-input large"
                  placeholder="Add a team name"
                  required
                  v-model="selectedTeam.name"
                  :readonly="!editing"
                />
              </div>
              <div class="gs-form-group">
                <label for>Meeting Frequency</label>
                <input
                  type="text"
                  class="gs-basic-input"
                  placeholder="ex. Every Wednesday at 7:00 PM"
                  required
                  v-model="selectedTeam.time"
                  :readonly="!editing"
                />
              </div>
              <div class="gs-form-group">
                <label for>Leader</label>
                <dropdown
                  :inputCSSClass="'gs-basic-input'"
                  :items="people"
                  :readonly="!editing"
                  :fields="{
                    title: 'fullName',
                    id: 'id', 
                    profile: 'personImageThumbnailURL'
                  }"
                  @selected="onLeaderSelected"
                  :selectedItem="selectedTeam.leaders[0].person"
                />
                <!-- <input type="text" class="gs-basic-input" placeholder="Add Speaker" required
                  v-model="selectedTeam.speakerName"
                :readonly="!editing">-->
              </div>
              <div class="gs-form-group">
                <label for>Max Capacity</label>
                <input
                  type="number"
                  class="gs-basic-input"
                  placeholder="Enter the max capacity for this group"
                  required
                  v-model="selectedTeam.maxCapacity"
                  :readonly="!editing"
                />
              </div>
              <div class="gs-form-group">
                <label for>Short Description</label>
                <input
                  type="text"
                  class="gs-basic-input"
                  maxlength="40"
                  placeholder="Add a short description (ex. 6th Grade Boys Small Group)"
                  required
                  v-model="selectedTeam.subtitle"
                  :readonly="!editing"
                />
                <input-char-count v-show='editing'
                                  :input='selectedTeam.subtitle' :max-num-of-chars-allowed='"40"'>
                </input-char-count>
              </div>
              <div class="gs-form-group">
                <label for>Description</label>
                <textarea
                  type="text"
                  class="gs-basic-input"
                  placeholder="Add Description"
                  rows="10"
                  required
                  v-model="selectedTeam.description"
                  :readonly="!editing"
                ></textarea>
                <input-char-count v-show='editing'
                                  :input='selectedTeam.description' :max-num-of-chars-allowed='"500"'>
                </input-char-count>
              </div>
            </form>
              <div class="gs-buttons-right">         
              <button class="gs-basic-button red"
                @click="cancelEdit"
                v-show="editing"
              ><i class="material-icons">close</i>CANCEL</button>
              <button class="gs-basic-button"
                @click="saveEdit"
                v-show="editing"
              ><i class="material-icons">done</i>SAVE</button>
              </div>
          </div>
        </div>
        <div class="details" v-if="creatingNewItem">
          <div class="panel gs-card-with-shadow gs-card-rise">
            <b-row>
              <b-col sm="10">
                <h5>Create New Team</h5>
              </b-col>
              <b-col sm="2">
                <button class="gs-basic-button" @click="cancelCreatingNewItem()">X</button>
              </b-col>
            </b-row>
            <div class="image-croppa gs-card-photo">
              <croppa v-model="photoCroppa"
                canvas-color="transparent"
                :disable-rotation="true"
                :prevent-white-space="true"
                :width="250"
                :height="250"
                :speed="10"
              ></croppa>
            </div>
            <form action="" class="" id="teams-form" @submit.prevent="createTeam">
              <padlock
                v-model="newTeam.isPrivate"
                :lockedLabel="'Private Team'"
                :unlockedLabel="'Public Team'"
                :lockWarning="'Once this team is made private it cannot be made public again.'"
              />
              <div class="gs-form-group">
                <label for>Name</label>
                <input
                  type="text"
                  class="gs-basic-input large"
                  placeholder="Add a team name"
                  required
                  v-model="newTeam.name"
                />
              </div>
              <div class="gs-form-group">
                <label for>Meeting Frequency</label>
                <input
                  type="text"
                  class="gs-basic-input"
                  placeholder="ex. Every Wednesday at 7:00 PM"
                  required
                  v-model="newTeam.time"
                />
              </div>
              <div class="gs-form-group">
                <label for>Leader</label>
                <dropdown
                  :inputCSSClass="'gs-basic-input'"
                  :items="people"
                  :fields="{
                    title: 'fullName',
                    id: 'id', 
                    profile: 'personImageThumbnailURL'
                  }"
                  @selected="onNewTeamLeaderSelected"
                  :placeholder="'Choose a team leader'"
                />
              </div>
              <div class="gs-form-group">
                <label for>Short Description</label>
                <input
                  type="text"
                  class="gs-basic-input"
                  maxlength="40"
                  placeholder="Add a short description (ex. 6th Grade Boys Small Group)"
                  required
                  v-model="newTeam.subtitle"
                />
                <input-char-count :input='newTeam.subtitle' :max-num-of-chars-allowed='"40"'></input-char-count>
              </div>
              <div class="gs-form-group">
                <label for>Description</label>
                <textarea
                  type="text"
                  class="gs-basic-input"
                  placeholder="Add Description"
                  rows="10"
                  required
                  maxlength="500"
                  v-model="newTeam.description"
                ></textarea>
                <input-char-count :input='newTeam.description' :max-num-of-chars-allowed='"500"'></input-char-count>
              </div>
              <button class="gs-basic-button">CREATE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
import CDN from "@/services/cdn";
import {
  checkIfObjNotFilled,
  generateGUID,
  getYYYYMMDD
} from "../utils/helpers";
import { SweetModal } from "sweet-modal-vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import Teams from "@/services/teams";
import Church from "@/services/church";
import People from "@/services/people";
import { getHHMM, getDayOfWeekMonthDay } from "../utils/helpers";

import Cards from '@/components/CardList'
import Dropdown from '@/components/CardDropdown'
import Padlock from '@/components/Padlock'
import InputCharCount from '@/components/InputCharCount';

import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Vue from "vue";
Vue.use(Croppa);

const newTeamTemplate = {
  churchID: 44,
  description: "",
  iconURL: "",
  name: "",
  isServeTeam: true,
  meetingAddress: "",
  teamImageURL: "",
  teamImageThumbnailURL: "",
  messageThread: {
    directMessage: false,
    title: "",
    description: ""
  },
  members: [],
  mainEventID: null,
  taggableID: null,
  maxCapacity: 1000,
  subtitle: "",
  time: "",
  title: "",
  isPrivate: false
};

export default {
  name: "Teams",
  data() {
    return {
      newTeam: {},
      selectedID: -1,
      selectedTeam: {},
      beforeEditedService: {},
      cdnKeys: {},
      photoCroppa: {},
      cdnKeys: {},
      date: new Date(),
      datePickerConfig: {
        altFormat: "l F J, Y",
        dateFormat: "Y-m-d\\Z",
        allowInput: true,
        altInput: true
      },
      editing: false,
      people: []
    };
  },
  computed: {
    ...mapState('teams', ['teams', 'loading', 'creatingNewItem']),
  },
  components: {    
    flatPickr, Cards, SweetModal, Dropdown, Padlock, InputCharCount
  },
  methods: {
    ...mapMutations('teams', [
      'setTeams',
      'setLoading',
      'setCreatingNewItem'
    ]),
    ...mapActions('teams', ['getTeams']),


    recieveID(id) {
      if (!id) {
        return;
      }
      if (this.selectedID !== id) {
        // this.selectedTeam = {}
      }
      if (id === -1) {
        this.selectedID = id;
        this.$router.push(`/app/teams/`);
        return;
      }
      if(this.creatingNewItem) {
        this.cancelCreatingNewItem();
      }
      this.$router.push(`/app/teams/${id}`);
      this.selectedID = id;
      return this.getTeam(id);
    },
    async createNewItem() {
      this.selectedID = -1;
      this.$router.push("/app/teams/");


      this.newTeam = { ...newTeamTemplate };

      if(!this.creatingNewItem) {
        this.teams.push(this.newTeam);
      }
      this.setCreatingNewItem(true);

      let getKeysRes = await CDN.getKeys();
      this.cdnKeys = getKeysRes.data;
    },
    async getTeam(id) {
      this.selectedID = id;
      const getTeamRes = await Teams.getTeam(id);
      const team = getTeamRes.data.teams[0];
      this.selectedTeam = team;
      if(this.selectedTeam) {
        this.selectedTeam.leaders = team.leaders.length > 0 ? team.leaders : [{}];
      }
    },
    async deleteItem() {
      this.$refs.deleteItemModal.close();
      Teams.deleteTeam(this.selectedID)
      .then(() => {
        this.recieveID(-1);
        this.getTeams();
      });
    },
    onLeaderSelected(item) {
      // console.log(item)
    },
    onNewTeamLeaderSelected(person) {
      this.newTeam.members = [];
      this.newTeam.members.push({
        personID: person.id,
        isLeader: true
      });
    },
    deleteButtonClicked() {
      this.$refs.deleteItemModal.open();
    },
    getPeople() {
      People.getPeople().then(response => {
        this.people = response.data.people;
      });
    },
    async createTeam() {
      this.$root.$emit("loading", true);
      let newTeam = { ...this.newTeam };

      const church = await Church.getChurch();

      let profilePic = await this.uploadProfilePic();
      profilePic = profilePic
        ? "https://togethercdn.global.ssl.fastly.net/TeamPics/" + profilePic
        : "";
      newTeam.teamImageURL = profilePic;
      newTeam.teamImageThumbnailURL = profilePic;

      let postedTeam = await Teams.postTeam({
        churchID: church.data.churches[0].id,
        description: newTeam.description,
        name: newTeam.name,
        teamImageURL: newTeam.teamImageURL,
        teamImageThumbnailURL: newTeam.teamImageThumbnailURL,
        messageThread: {
          directMessage: false,
          title: newTeam.name,
          description: newTeam.description
        },
      });
      this.setCreatingNewItem(false);
      this.$refs.itemCreated.open();
      await this.getTeams();
      await this.recieveID(postedTeam.data.newResourceID);
      this.$root.$emit("loading", false);
    },
    async uploadProfilePic() {
      const { accessKeyID, secretAccessKey } = this.cdnKeys;
      const fileSufix = "TeamPics/";
      const fileName = generateGUID() + ".jpg";

      if (!this.photoCroppa.hasImage()) {
        return;
      }

      await CDN.postImage(
        accessKeyID,
        secretAccessKey,
        await new Response(await this.photoCroppa.promisedBlob("image/jpeg")).arrayBuffer(),
        fileSufix,
        fileName
      ).catch(error => {
        fileName = "";
      });
      return fileName;
    },
    startEdit() {
      this.editing = true;
      this.beforeEditedService = { ...this.selectedTeam };
    },
    cancelEdit() {
      this.editing = false;
      this.selectedTeam = { ...this.beforeEditedService };
    },
    async saveEdit() {
      this.editing = false;
      const patch = {
        identifier: {
          id: `${this.selectedID}`
        },
        values: {
          name: this.selectedTeam.name,
          subtitle: this.selectedTeam.subtitle,
          description: this.selectedTeam.description,
          time: this.selectedTeam.time,
          isPrivate: this.selectedTeam.isPrivate
        }
      };
      if (this.photoCroppa.hasImage()) {
        let getKeysRes = await CDN.getKeys();
        this.cdnKeys = getKeysRes.data;
        let profilePic = await this.uploadProfilePic();
        profilePic = profilePic
          ? "https://togethercdn.global.ssl.fastly.net/TeamPics/" + profilePic
          : "";
        patch["values"]["teamImageURL"] = profilePic;
        patch["values"]["teamImageThumbnailURL"] = profilePic;
      }
      await Teams.patchTeam(patch)
      this.getTeams();
      this.getTeam(this.selectedID);
    },
    cancelCreatingNewItem() {
      this.setCreatingNewItem(false);
      this.removeNewTeamPlaceholderInCardList();
    },
    removeNewTeamPlaceholderInCardList() { this.teams.pop(); }
  },
  props: {},
  mounted() {
    if(this.teams.length < 1) {
      this.getTeams();
    }
    this.getPeople();
    this.recieveID(this.$route.params.id)
  },
};
</script>

<style src="./../assets/css/general-style.css"></style> 

<style scoped>
.edit {
  align-self: flex-end;
  margin-bottom: 10px;
}
.edit i {
  font-size: 0.7rem;
  margin-right: 0.3rem;
  vertical-align: center;
}
#teams-container {
  height: 100%;
}
#teams-container .dates {
}
#teams-info {
  height: 100vh;
  padding: 50px 20px;
  overflow-y: auto;
  box-sizing: border-box;
}
.teams-image {
  width: 250px;
  height: 250px;
  background: #c4c4c4;
  display: block;
}
#teams-form {
  margin-top: 25px;
  /* max-width: 600px; */
}
#teams-form .times {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
#teams-form .times .time {
  position: relative;
}
#teams-form .times .delete-time {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22.5px;
  width: 22.5px;
  border-radius: 30px;
  position: absolute;
  z-index: 100;
  top: -10px;
  right: 0px;
  background: white;
  border: 1px grey solid;
  cursor: pointer;
}
#teams-form .times .delete-time i {
  font-size: 12.5px;
}
#teams-form .times input {
  margin-right: 10px;
}
#teams-form .times .gs-basic-button {
  margin-bottom: 5px;
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