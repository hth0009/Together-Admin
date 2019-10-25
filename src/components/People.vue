<template>
  <div class="people-container">
    <div class="page-wrapper">
      <div class="page-card-wrapper" :class="{'inactive': selectedID != ''}">
        <cards
          :cardList="formatedPeople"
          :loading="loading"
          :selectedID="selectedID + ''"
          :hasAddNew="false"
          :alphabetical="true"
          @selected="recieveID"
          @onAddNew="createNewItem"
          :inline="false"
          :hasShadow="true"
        />
      </div>
      <transition name="fadeOut">
        <div
          class="selected-view"
          id="selected-view"
          v-if="selectedID != '' && Object.keys(selectedPerson).length != 0 && selectedID != -1 && !creatingNewItem"
          ref="selectedView"
        >
          <div class="details">
            <div class="quick-actions">
              <!-- <button class="basic-button"><i class="material-icons">send</i></button> -->
              <!-- <button class="basic-button red"><i class="material-icons">delete</i></button> -->
            </div>
            <!-- <button class="section-toggle">Teams</button> -->
            <div id="person-profile" class="panel gs-container vertical">
              <div class="header">
                <div class="profile-pic">
                  <div class="image-croppa">
                    <croppa
                      v-model="photoCroppa"
                      canvas-color="transparent"
                      :disable-rotation="true"
                      :prevent-white-space="true"
                      :width="100"
                      :height="100"
                      :speed="10"
                      v-show="editing"
                      style="border-radius:100%;overflow:hidden;opacity:0.6;position:absolute"
                    ></croppa>
                  </div>
                  <avatar
                    :height="100"
                    :url="selectedPerson.personImageThumbnailURL"
                    :title="selectedPerson.fullName"
                  />
                </div>
                <h3>{{selectedPerson.firstName + ' ' + selectedPerson.lastName}}</h3>
                <div
                  class="subtitle"
                  v-if="!!selectedPerson.account"
                >{{selectedPerson.account.username !== '' ? '@' + selectedPerson.account.username : ''}}</div>
              </div>
              <static-header
                class="static-header"
                :parentDivID="'selected-view'"
                :displayScrollValue="100"
              >
                <!-- <div :style="{backgroundImage: 'url(' +  selectedPerson.profile + ')'}"
                class="profile-pic"></div>-->
                <!-- <div :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)'}"
                class="profile-pic"></div>-->
                <div class="profile-pic">
                  <avatar
                    :height="30"
                    :url="selectedPerson.personImageThumbnailURL"
                    :title="selectedPerson.fullName"
                  />
                </div>
                <!-- <div :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)'}"
                class="profile-pic"></div>-->
                <h3>{{selectedPerson.firstName + ' ' + selectedPerson.lastName}}</h3>
              </static-header>
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
              <!-- <div class="item">
              <i class="material-icons noselect">email</i>
              <div class="label noselect">Email</div>
                {{selectedPerson.accountEmail}}
              </div>
            <div class="item">
              <i class="material-icons noselect">event</i>
              <div class="label noselect">Birthday</div>
              {{selectedPerson.birthday}}
            </div>
            <div class="item">
              <i class="material-icons noselect">place</i>
              <div class="label noselect">Address</div>
              {{selectedPerson.address}}
              </div>-->
              <form id="selectedPerson-form">
                <div class="gs-form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    class="gs-basic-input"
                    readonly
                    placeholder="Email Address"
                    v-model="selectedPerson.contactEmail"
                  />
                </div>
                <div class="gs-form-group">
                  <label>Birthday</label>
                  <input
                    type="text"
                    class="gs-basic-input"
                    readonly
                    placeholder="Birthday"
                    v-model="selectedPerson.birthday"
                  />
                </div>
                <div class="gs-form-group">
                  <label>Home Address</label>
                  <input
                    type="text"
                    class="gs-basic-input"
                    :readonly="!editing"
                    placeholder="Home Address"
                    v-model="selectedPerson.homeAddress"
                  />
                </div>
                <div class="gs-form-group">
                  <label>Mailing Address</label>
                  <input
                    type="text"
                    class="gs-basic-input"
                    :readonly="!editing"
                    placeholder="Mailing Address"
                    v-model="selectedPerson.mailingAddress"
                  />
                </div>
                <div class="gs-form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    class="gs-basic-input"
                    :readonly="!editing"
                    placeholder="Phone Number"
                    v-model="selectedPerson.phoneNumber"
                  />
                </div>
              </form>
            </div>
            <div class="panel gs-container vertical">
              <h1 class="gs-card-header">Teams</h1>
              <cards
                :hasShadow="false"
                :loading="false"
                :inline="true"
                :hasButtonOnCard="false"
                :alphabetical="true"
                :emptyMessage="'Not in any teams'"
                :cardList="selectedPersonTeams"
                :cardSelectable="true"
                @selected="teamSelected"
                profilePicFillerValue="teamName"
                :hasSearch="false"
                :fields="{
                    title: 'teamName',
                    profile: 'teamIconURL',
                    id: 'teamID',
                  }"
              />
            </div>
            <!-- <div class="panel">
            <div class="card-header">Roles</div>
            <div class="search">              
                <cards
                  :hasShadow="false"
                  :loading="false"
                  :inline="true"
                  :cardList="[]"
                  :cardSelectable="false"
                  :hasSearch="false"
                  :profilePicFillerValue="'name'"
                  :fields="{
                    title: 'name',
                    id: 'id'
                  }"
                />
            </div>
            </div>-->
            <!-- <div class="panel">
            <div class="card-header">Teams</div>
            <div class="teams">              
                <cards
                  :hasShadow="false"
                  :loading="false"
                  :inline="true"
                  :cardList="selectedPersonTeams"
                  :cardSelectable="false"
                  :profilePicFillerValue="'name'"
                  :emptyMessage="'Not in any teams'"
                  :alphabetical="true"
                  :fields="{
                    title: 'name',
                    id: 'id',
                    profile: 'teamImageThumbnailURL'
                  }"
                />
            </div>
            </div>-->
            <!-- <div class="panel"
            style="min-height: 200px">
            <div class="card-header">Notes</div>
            <div class="card-explanation">These notes are visible to anyone on the admin site.</div>
            <div class="markdown">
            <ejs-inplaceeditor ref="notes" :emptyText="'Notes'" width="100%" autocomplete="off" :mode="'Inline'" :submitOnEnter="false" 
              :value="selectedPerson.notes"
              :model="{
                editorMode: 'Markdown',               
                placeholder: 'Notes',
                toolbarSettings: {
                  items: [],
                  enable: false
                },
                height: 400,
                width:'100%',
                pasteCleanupSettings: 'plainTextFormatting'
              }"
              name="none" type="RTE" data-underline='false' :cssClass="'basic-inline'"
              @actionSuccess="patchNotes"
              @created="formatNotes"
            >
            </ejs-inplaceeditor>
            </div>
            </div>-->
            <!-- <div class="panel">
            <div class="card-header noselect">Skills</div>
            <div class="card-explanation">Track your members talents with the skills feature. <span style="color: #05e0a2; font-weight: 600">Confirm</span> skills and they will filter to the top of any skills search.</div>
            <div class="skills noselect">
              <div class="skill" 
                v-for="(skill, index) in selectedPerson.skills['personSkill(s)']"
                :key="skill.id"
                :class="{'confirmed': skill.confirmed}"
                @click="toggleSkill(index, skill.id)">
                {{ skill.skill.name }}
              </div>
            </div>
            </div>-->
            <!-- <div class="panel">
            <div class="card-header">Family</div>
            <div class="card-explanation">COMING SOON</div>
            <div class="search">              
                <cards
                  :hasShadow="false"
                  :loading="false"
                  :inline="true"
                  :cardList="[]"
                  :cardSelectable="false"
                  :hasSearch="false"
                  :profilePicFillerValue="'name'"
                  :fields="{
                    title: 'name',
                    id: 'id'
                  }"
                />
            </div>
            </div>-->
          </div>
        </div>
      </transition>
      <div class="new-item" v-if="creatingNewItem">
        <div class="title">New Person</div>
        <div class="details">
          <div class="type"></div>
          <div class="detailed" v-show="newItemType == 0">
            <div style="width: 45%; display: inline-block">
              <ejs-textbox
                autocomplete="off"
                floatLabelType="Auto"
                placeholder="First Name"
                required
                name="none"
              ></ejs-textbox>
            </div>
            <div style="width: 45%; display: inline-block; float: right">
              <ejs-textbox
                autocomplete="off"
                floatLabelType="Auto"
                placeholder="Last Name"
                v-bind:enableRtl="true"
                name="none"
              ></ejs-textbox>
            </div>
            <div>
              <ejs-textbox
                autocomplete="off"
                floatLabelType="Auto"
                type="email"
                placeholder="Email"
                name="none"
              ></ejs-textbox>
            </div>
            <div>
              <ejs-textbox
                autocomplete="off"
                floatLabelType="Auto"
                placeholder="Street"
                name="none"
              ></ejs-textbox>
            </div>
            <div style="width: 50%; display: inline-block;">
              <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="City" name="none"></ejs-textbox>
            </div>
            <div style="width: 19%; display: inline-block;">
              <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="St" name="none"></ejs-textbox>
            </div>
            <div style="width: 28%; display: inline-block; float: right">
              <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Zip" name="none"></ejs-textbox>
            </div>
          </div>
        </div>
        <div class="footer">
          <button class="gs-basic-button red" @click="creatingNewItem = false">CANCEL</button>
          <button class="gs-basic-button">CREATE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cards from "@/components/CardList";
import VueTable from "@/components/Table";
import People from "@/services/people";
import ChurchPeople from "@/services/churchPeople";
import Skills from "@/services/skills";
import Teams from "@/services/teams";
import CustomRadio from "@/components/CustomRadio";
import StaticHeader from "@/components/StaticHeader";
import Avatar from "@/components/Avatar";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "@/utils/helpers";
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import CDN from '@/services/cdn'
import Vue from 'vue'
import { checkIfObjNotFilled, generateGUID, getYYYYMMDD } from '../utils/helpers'
Vue.use(Croppa)

import { Rte } from "@syncfusion/ej2-vue-inplace-editor";
import {
  PasteCleanup,
  MarkdownEditor
} from "@syncfusion/ej2-vue-richtexteditor";

const marked = require("marked");
marked.setOptions({
  gfm: true,
  breaks: true
});
const DOMPurify = require("dompurify");

import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';

export default {
  name: "People",
  data() {
    return {
      searchQuery: "",
      gridColumns: ["profile", "name"],
      columnType: { profile: "profile", name: "text" },
      people: [],
      peopleLoading: false,
      peopleSearch: "",
      selectedID: "",
      selectedPerson: {},
      selectedPersonTeams: [],
      creatingNewItem: false,
      newItemType: 0,
      notesHTML: "",
      editing: false
    };
  },
  provide: {
    inplaceeditor: [Rte, MarkdownEditor],
    richtextEditor: [PasteCleanup, MarkdownEditor]
  },
  components: {
    VueTable,
    Cards,
    CustomRadio,
    Container,
    Draggable,
    Avatar,
    StaticHeader
  },
  methods: {
    async getPeople() {
      const response = await People.getPeople().then(response => {
        this.people = response.data["people"];
      });
    },
    async getPerson() {
      People.getPerson(this.selectedID).then(response => {
        this.selectedPerson = response.data.people[0];
        this.selectedPersonTeams = response.data.people[0].teamsPeople.map(
          aTeam => ({
            teamName: aTeam.team.name,
            teamIconURL: aTeam.team.iconURL,
            isLeader: aTeam.isLeader,
            teamID: aTeam.teamID
          })
        );
      });
    },
    async patchPersonValue(valueKey, value) {
      var response = await People.patchPersonValue(
        this.selectedID,
        valueKey,
        value
      );
    },
    patchNotes(noteContent) {
      // console.log(noteContent))
      var val = noteContent.value;
      if (val === "") return;
      // noteContent.value = this.toMarkdown(val + '')
      this.patchPersonValue("notes", val);
    },
    formatNotes() {
      // this.$refs.notes.value = this.toMarkdown(this.$refs.notes.value)
    },
    toMarkdown(val) {
      console.log(val);
      var markedVal = marked(val);
      const clean = DOMPurify.sanitize(markedVal);
      return '<div class="markdown">' + clean + "</div>";
    },
    toggleSkill(index, skillID) {
      const isConfirmed = !this.selectedPerson.skills["personSkills"][index]
        .confirmed;
      this.selectedPerson.skills["personSkills"][index].confirmed = isConfirmed;
      Skills.patchSkill(skillID, isConfirmed);
    },
    recieveID(id) {
      if (id == undefined) {
        this.selectedPerson = {};
        return;
      }
      if (id == "-1") {
        this.selectedID = id;
        this.$router.push(`/app/people/`);
        this.selectedPerson = {};
        return;
      }
      this.selectedPerson = {};
      this.creatingNewItem = false;
      this.$router.push(`/app/people/${id}`);
      this.selectedID = id;
      this.getPerson();
      // this.getTeams()
    },
    createNewItem() {
      this.selectedThreadID = -1;
      this.$router.push(`/app/people/`);

      this.creatingNewItem = !this.creatingNewItem;
    },
    async saveEdit() {      
      this.editing = false 
      var patch = {
        "identifier":{
          "id": this.selectedID
        },
        "values": {
          homeAddress: this.selectedPerson.homeAddress,
          mailingAddress: this.selectedPerson.mailingAddress,
          phoneNumber: this.selectedPerson.phoneNumber
        }
      }
      if (this.photoCroppa.hasImage()) {        
        await CDN.getKeys().then(response => {
          this.cdnKeys = response.data
        })
        var profilePic = await this.uploadProfilePic()
        profilePic = !!profilePic ? 'https://togethercdn.global.ssl.fastly.net/ProfilePics/' + profilePic : ''
        patch['values']['personImageURL'] = profilePic
        patch['values']['personImageThumbnailURL'] = profilePic
      }
      People.patchPerson(patch).then(() => {
        this.getPerson()
      })
    },
    cancelEdit() {
      this.editing = false;
    },
    startEdit() {
      this.editing = true;
    },    
    async uploadProfilePic() {
      const { accessKeyID, secretAccessKey } = this.cdnKeys
      const fileSufix = 'ProfilePics/'
      var fileName = generateGUID() + '.jpg'
      
      if (!this.photoCroppa.hasImage()) {
        return
      }
      var blob = await this.photoCroppa.promisedBlob('image/jpeg')
      var arrayBuffer = await new Response(blob).arrayBuffer();  
      await CDN.postImage(accessKeyID, secretAccessKey, arrayBuffer, fileSufix, fileName).catch(error => {
        console.log(error)
        fileName = ''
      })
      return fileName
    },
    teamSelected(id) {
      this.$router.push(`/app/teams/${id}`)
    }
  },
  props: {},
  mounted() {
    this.peopleLoading = true;
    this.recieveID(this.$route.params.id);
    this.getPeople().then(() => {
      this.peopleLoading = false;
    });
  },
  computed: {
    formatedPeople() {
      var people = Array(this.people.length);
      for (let index = 0; index < this.people.length; index++) {
        const person = this.people[index];
        const newPerson = {
          id: person.id,
          profile: person.personImageThumbnailURL,
          title: person.firstName + " " + person.lastName,
          subtext:
            person.account !== null && person.account.username != ""
              ? "@" + person.account.username
              : ""
          // profile: thread.threadImageThumbnailURL,
          // profile: this.profiles[index % 4],
        };
        people[index] = newPerson;
      }
      return people;
    }
  }
};
</script>

<style>
@import "../assets/css/markdown.css";
</style>

<style scoped>
#selected-view #person-profile .header {
  margin: 0;
}
.people-container {
  height: 100%;
}
h2 {
  padding-top: 30px;
  /* padding-left: 20px; */
  height: 40px;
}

.people-wrapper {
  display: grid;
  grid-template-columns: 250px auto;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* overflow-x: auto; */
}

.people-card-wrapper {
  overflow-y: auto;
  width: 100%;
  position: relative;
  /* border-right: 1px #E6E9EC solid; */
}

.person-view {
  /* width: 100%; */
  height: 100%;
  position: relative;
  padding-left: 30px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding-top: 40px;
}
.person-header {
  position: relative;
}
.person-header h3 {
  display: inline;
  padding: 10px;
}
.person-header .profile-pic {
  width: 75px;
  height: 75px;
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
.person-info div {
  margin-top: 20px;
  margin-bottom: 15px;
}
.person-info p {
  margin: 10px 10px;
}
.team-box {
  margin: 5px;
  margin-right: 20px;
  padding: 10px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-left: 2px white solid;
  cursor: pointer;
}
.team-box.unread {
  border-left: 2px #69cdcf solid;
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
.team-box .team-info {
  flex: 1;
  padding-left: 10px;
}
.skills {
  /* padding-left: 5px; */
}
.skill {
  display: inline-block;
  cursor: pointer;
  margin: 0px 10px 15px 0px;
  padding: 10px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  border-radius: 50px;
  background: #b2bec3;
  text-shadow: 0px 1px 8px #00000034;
  transition: all 0.3s ease-out;
  text-transform: capitalize;
}
.skill.confirmed {
  background: #05e0a2;
}

.skills-container {
  margin: 10px;
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
  .people-card-wrapper {
    padding-top: 35px;
  }
}

@media all and (max-width: 480px) {
  .people-wrapper {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    /* height: calc(100% - 35px);     */
    /* margin-top: 35px; */
  }
  .people-card-wrapper {
    margin-top: 35px;
  }
  .people-card-wrapper.inactive {
    margin-top: 0px;
    display: none;
  }
}
</style>