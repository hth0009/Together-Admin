<template>
  <div class="selected-view" id="selected-view">
    <div id="church-wrapper">
      <div id="church-info" class="panel gs-container vertical">
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
            <avatar :height="100" :url="church.churchImageThumbnailURL" />
          </div>
          <h3>{{church.name}}</h3>
          <div
            class="subtitle"
          >{{church.username !== '' ? '@' + church.username : ''}}</div>
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
              type="url"
              class="gs-basic-input"
              :readonly="!editing"
              placeholder="Add Website"
              v-model="church.websiteURL"
            />
          </div>
          <div class="gs-form-group">
            <label>Address</label>
            <input
              type="text"
              class="gs-basic-input"
              :readonly="!editing"
              placeholder="Add Mailing Address"
              v-model="church.address"
            />
          </div>
          <div class="gs-form-group">
            <label>Phone Number</label>
            <input
              type="text"
              class="gs-basic-input"
              :readonly="!editing"
              placeholder="Add Phone Number"
              v-model="church.phoneNumber"
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
              v-model="church.description"
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
              v-model="church.statementOfFaith"
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
              v-model="church.vision"
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
                  @selected="recieveID"
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
import Cards from '@/components/CardList';
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import CDN from '@/services/cdn'
import Vue from 'vue'
import { checkIfObjNotFilled, generateGUID, getYYYYMMDD } from '../utils/helpers'
import { mapActions, mapState } from 'vuex';
Vue.use(Croppa)

export default {
  name: "",
  data() {
    return {
      myChurchStaff: [],
      photoCroppa: {},
      editing: false
    };
  },
  components: {
    Avatar,
    Cards
  },
  computed: {
    ...mapState(['church', 'churchUsername']),
  },
  methods: {
    ...mapActions(['getChurch']),
    async getMyChurch() {
      this.getChurch(this.churchUsername, true).then(response => {
        this.myChurchStaff = [response].map((aStaff) => ({
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
    async saveEdit() {      
      this.editing = false 
      var patch = {
        "identifier":{
          "username": Store.state.churchUsername
        },
        "values": {
          websiteURL: this.church.websiteURL,
          address: this.church.address,
          phoneNumber: this.church.phoneNumber,
          description: this.church.description,
          statementOfFaith: this.church.statementOfFaith,
          vision: this.church.vision
        }
      }
      if (this.photoCroppa.hasImage()) {        
        await CDN.getKeys().then(response => {
          this.cdnKeys = response.data
        })
        var profilePic = await this.uploadProfilePic()
        profilePic = profilePic ? 'https://togethercdn.global.ssl.fastly.net/ChurchPics/' + profilePic : ''
        patch['values']['churchImageURL'] = profilePic
        patch['values']['churchImageThumbnailURL'] = profilePic
      }
      Church.patchChurch(patch).then(() => {
        this.getMyChurch()
      })
    },
    async uploadProfilePic() {
      const { accessKeyID, secretAccessKey } = this.cdnKeys
      const fileSufix = 'ChurchPics/'
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
      console.log(id)
      this.$router.push(`/app/people/${id}`)
    }
  },
  props: {},
  mounted() {
    this.getMyChurch();
  },
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