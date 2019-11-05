<template>
  <div class="me-container">
    <div class="selected-view" id="selected-view">
      <div id="me-wrapper">
        <div id="me-myself" class="panel gs-container vertical">
          <div class="header">
            <div class="profile-pic">
              <div class="image-croppa">
                <croppa v-model="photoCroppa"
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
              <avatar :height="100" :url="me.personImageThumbnailURL" :title="me.fullName" />
            </div>
            <h3>{{me.firstName + ' ' + me.lastName}}</h3>
            <div
              class="subtitle"
              v-if="!!me.account"
            >{{me.account.username !== '' ? '@' + me.account.username : ''}}</div>
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
          <form id="me-form">
            <div class="gs-form-group">
              <label>Email</label>
              <input type="text" class="gs-basic-input" readonly placeholder="Email Address" v-model="me.contactEmail" />
            </div>
            <div class="gs-form-group">
              <label>Birthday</label>
              <input type="text" class="gs-basic-input" readonly placeholder="Birthday" v-model="me.birthday" />
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
          <div class="panel gs-container vertical">
            <h1 class="gs-card-header">Organizations</h1>
            <cards
                  :hasShadow="false"
                  :loading="false"
                  :inline="true"
                  :hasButtonOnCard="false"
                  :alphabetical="true"
                  :emptyMessage="'Not in any organizations'"
                  :cardList="myOrgs"
                  :cardSelectable="false"
                  profilePicFillerValue="orgName"
                  :hasSearch="false"
                  :fields="{
                    title: 'orgName',
                    profile: 'orgIconURL',
                    id: 'orgID',
                  }"
                />
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
                  :cardList="myTeams"
                  :cardSelectable="true"
                  @selected="recieveID"
                  profilePicFillerValue="teamName"
                  :hasSearch="false"
                  :fields="{
                    title: 'teamName',
                    profile: 'teamIconURL',
                    id: 'teamID',
                  }"
                />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from "../store"
import People from "../services/people"
import Church from "../services/church"
import Teams from "../services/teams"
import Avatar from "../components/Avatar"
import Cards from '@/components/CardList'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import CDN from '@/services/cdn'
import Vue from 'vue'
import { checkIfObjNotFilled, generateGUID, getYYYYMMDD } from '../utils/helpers'
Vue.use(Croppa)

export default {
  name: "Me",
  data() {
    return {
      myTeams: [],
      me: {},
      myOrgs: {},
      editing: false
    };
  },
  components: {
    Avatar,
    Cards
  },
  methods: {
    async getMe() {
      People.getPerson(Store.state.personID).then(response => {
        this.me = response.data.people[0]
        this.myTeams = response.data.people[0].teamsPeople.map((aTeam) => ({
          teamName: aTeam.team.name,
          teamIconURL: aTeam.team.iconURL,
          isLeader: aTeam.isLeader,
          teamID: aTeam.teamID
        }))
      })
      Church.getChurch(Store.state.churchUsername).then(response => {
        this.myOrgs = response.data.churches.map((aOrg) => ({
          orgName: aOrg.name,
          orgIconURL: aOrg.churchImageURL,
          orgID: aOrg.id
        }))
      })
    },
    async saveEdit() {      
      this.editing = false 
      var patch = {
        "identifier":{
          "id": Store.state.personID
        },
        "values": {
          homeAddress: this.me.homeAddress,
          mailingAddress: this.me.mailingAddress,
          phoneNumber: this.me.phoneNumber
        }
      }
      if (this.photoCroppa.hasImage()) {        
        await CDN.getKeys().then(response => {
          this.cdnKeys = response.data
        })
        var profilePic = await this.uploadProfilePic()
        profilePic = profilePic ? 'https://togethercdn.global.ssl.fastly.net/ProfilePics/' + profilePic : ''
        patch['values']['personImageURL'] = profilePic
        patch['values']['personImageThumbnailURL'] = profilePic
      }
      People.patchPerson(patch).then(() => {
        this.getMe()
      })
    },
    startEdit() {
      this.editing = true
    },
    cancelEdit() {
      this.editing = false
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
    recieveID(id) {
      this.$router.push(`/app/teams/${id}`)
    }
  },
  props: {},
  mounted() {
    this.getMe()
    // this.getMyTeams()
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
#me-wrapper {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(350px, 525px));
}
#selected-view {
  height: 100vh;
  overflow-y: auto;
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
  overflow: hidden;
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