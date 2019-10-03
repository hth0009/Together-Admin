<template>
  <div id="teams-container">    
    <sweet-modal icon="warning" ref="deleteItemModal">
      <h3>Are you sure you want to delete {{selectedTeam.title}}?</h3>
      <button slot="button" class="gs-basic-button red" @click="deleteItem">DELETE</button>
    </sweet-modal>
    <sweet-modal icon="success" ref="itemCreated">
      <h3>{{newTeam.title}} created!!</h3>
    </sweet-modal>
    <div class="page-wrapper">    
      <div class="page-card-wrapper">              
          <cards
            v-model="selectedID"
            :loading="loading"
            :noProfile="true"
            :cardList="services"
            :profilePicFillerValue="'name'"
            :emptyMessage="'No Teams'"
            :hasDates="true"
            :fields="{
              title: 'dateTitle',
              id: 'id',
              subtitle: 'title'
            }"
            :hasAddNew="true"
            :returnObject="true"
            @selected="recieveItem"
            @onAddNew="createNewItem"
          />
      </div>
      <div class="selected-view" id="selected-view" >
        <div class="header">
          <h3>Sunday</h3>
        </div>
        <div class="details" v-if="selectedID != -1 && !creatingNewItem">          
          <div class="quick-actions">
            <!-- <button class="basic-button"><i class="material-icons">send</i></button> -->
            <button class="basic-button red" @click="deleteButtonClicked"><i class="material-icons">delete</i></button>
          </div>
          <div class="panel gs-container vertical">
            <div class="gs-top-buttons">
            <button class="gs-basic-button"
              @click="startEdit"
              v-show="!editing"
            ><i class="material-icons">edit</i>EDIT</button>
            <button class="gs-basic-button red"
              @click="cancelEdit"
              v-show="editing"
            ><i class="material-icons">close</i>CANCEL</button>
            <button class="gs-basic-button"
              @click="saveEdit"
              v-show="editing"
            ><i class="material-icons">done</i>SAVE</button>
            </div>
            <div class="image-croppa">
              <croppa v-model="photoCroppa"
                canvas-color="transparent"
                :disable-rotation="true"
                :prevent-white-space="true"
                :width="250"
                :height="250"
                :speed="10"
                v-show="editing"
              ></croppa>
              <img :src="selectedTeam.iconURL" alt="" srcset="" 
                class="teams-image"
                v-show="!editing">
            </div>      
            <form action="" class="" id="teams-form">
              <div class="gs-form-group">
                <label for="">Title</label>        
                <input type="text" class="gs-basic-input large" placeholder="Add a title" required
                  v-model="selectedTeam.title"
                  :readonly="!editing">
              </div>
              <!-- <div class="gs-form-group">
                <label for="">Date</label>
                <flat-pickr class="gs-basic-input" :config="datePickerConfig"
                :disabled="!editing"
                v-model="selectedTeam.dateObject"></flat-pickr>
              </div> -->
              <div class="gs-form-group">
                <label for="">Times</label>
                <div class="times">
                  <input v-for="time in selectedTeam['serviceTimes']['serviceTimes(s)']" v-model="time.time" :key="time.id" type="time" class="gs-basic-input time"
                    placeholder="Time" required :readonly="!editing"
                  >
                  <div class="gs-basic-button icon" formnovalidate v-show="editing"><i class="material-icons">add</i></div>
                </div>
              </div>
              <div class="gs-form-group">
                <label for="">Speaker</label>
                <dropdown
                  :inputCSSClass="'gs-basic-input'"
                  :items="people"
                  :readonly="!editing"
                  :fields="{
                    title: 'fullName',
                    id: 'id', 
                    profile: 'personImageThumbnailURL'
                  }"
                />      
                <!-- <input type="text" class="gs-basic-input" placeholder="Add Speaker" required
                  v-model="selectedTeam.speakerName"
                  :readonly="!editing"> -->
              </div>
              <div class="gs-form-group">
                <label for="">Description</label>        
                <textarea type="text" class="gs-basic-input" placeholder="Add Description" rows="10" required
                  v-model="selectedTeam.description"
                  :readonly="!editing"></textarea>
              </div>
            </form>
          </div>
        </div>
        <div class="details" v-if="creatingNewItem">
          <div class="panel gs-container vertical">
            <h5>Create New Team</h5>
            <div class="image-croppa">
              <croppa v-model="photoCroppa"
                canvas-color="transparent"
                :disable-rotation="true"
                :prevent-white-space="true"
                :width="250"
                :height="250"
                :speed="10"
              ></croppa>
            </div>
            <form action="" class="" id="teams-form" @submit.prevent="createService">
              <div class="gs-form-group">
                <label for="">Title</label>        
                <input type="text" class="gs-basic-input large" placeholder="Add a title" required
                  v-model="newTeam.title">
              </div>
              <div class="gs-form-group">
                <label for="">Date</label>
                <input type="text" class="gs-basic-input" placeholder="Add a title" required
                  v-model="newTeam.title">
              </div>
              <div class="gs-form-group">
                <label for="">Leader</label>
                <dropdown
                  :inputCSSClass="'gs-basic-input'"
                  :items="people"
                  :fields="{
                    title: 'fullName',
                    id: 'id', 
                    profile: 'personImageThumbnailURL'
                  }"
                />
              </div>
              <div class="gs-form-group">
                <label for="">Short Description</label>
                <input type="text" class="gs-basic-input" placeholder="Add a title" required
                  v-model="newTeam.title">
              </div>
              <div class="gs-form-group">
                <label for="">Description</label>        
                <textarea type="text" class="gs-basic-input" placeholder="Add Description" rows="10" required
                  v-model="newTeam.description"></textarea>
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
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import CDN from '@/services/cdn'
import { checkIfObjNotFilled, generateGUID, getYYYYMMDD } from '../utils/helpers'
import { SweetModal } from 'sweet-modal-vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

import Teams from '@/services/teams'
import People from '@/services/people'
import {getHHMM, getDayOfWeekMonthDay, getThisSunday} from '../utils/helpers'

import Cards from '@/components/CardList'
import Dropdown from '@/components/CardDropdown'

import Vue from 'vue'
Vue.use(Croppa)

const newTeamTemplate = {
	"churchUsername": "",
  "title": "",
  "iconURL": "",
	"date": getThisSunday(),
	"speakerID": null,
	"speakerName": "",
	"description": "",
	"serviceTimes": [
		{
			"time": ""
		}
	]
}

export default {
  name: 'ThisSunday',
  data () {
    return {
      loading: true,
      creatingNewItem: false,
      services: [],
      newTeam: {},
      selectedID: -1,
      selectedTeam: {},
      beforeEditedService: {},
      cdnKeys: {},      
      photoCroppa: {},
      cdnKeys: {},      
      date: new Date(),
      datePickerConfig: {
        altFormat: 'l F J, Y',
        dateFormat: 'Y-m-d\\Z',
        allowInput: true,
        altInput: true,
      },
      editing: false,
      people: []
    }
  },
  components: {    
    flatPickr, Cards, SweetModal, Dropdown
  },
  methods: {
    createNewItem() {
      this.selectedID = -1;
      this.$router.push('/app/teams/')

      this.creatingNewItem = !this.creatingNewItem
      this.newTeam = {...newTeamTemplate}
      if (this.creatingNewItem == true) {
        CDN.getKeys().then(response => {
         this.cdnKeys = response.data
        })
      }
    },
    recieveItem(item) {
      this.recieveID(item.id)
      this.selectedTeam = item
      this.selectedTeam['dateObject'] = new Date(item.date)
    },
    async recieveID(id) {
      if (id == undefined) {
        return
      }
      if (id == '-1') {
        this.selectedID = id
        this.$router.push('/app/teams/')
        return
      }

      this.$router.push(`/app/teams/${id}`)

      this.creatingNewItem = false
   
      this.selectedID = id
    },
    async deleteItem() {
      this.$refs.deleteItemModal.close()
      Teams.deleteService(this.selectedID).then(function(response) {
        this.recieveID(-1)
        this.getTeams()
      }.bind(this))
    },
    addTime() {
      this.newTeam.serviceTimes.push({ "time": "12:00:00" })
    },
    deleteTime(index) {
      this.newTeam.serviceTimes.splice(index, 1)
      // this.newTeam.serviceTimes.push([{ "time": ""}])
    },
    deleteButtonClicked() {
      this.$refs.deleteItemModal.open()
    },
    getTeams() {
      this.loading = true
      return Teams.getTeamsByChurch().then(response => {
        console.log('----TEAMS RESPONSE-----')
        console.log(response)
        console.log('----TEAMS RESPONSE-----')
        // this.services = response.data['teama(s)'].map(obj => {
        //   var rObj = obj
        //   rObj['dateTitle'] = getDayOfWeekMonthDay(new Date(obj.date))
        //   return rObj
        // })
        this.loading = false
      })
    },
    getPeople() {
      People.getPeople().then(response => {        
        this.people = response.data['person(s)']
      })
    },
    async createService() {
      this.$root.$emit('loading', true)
      var profilePic = await this.uploadProfilePic()
      profilePic = !!profilePic ? 'https://togethercdn.global.ssl.fastly.net/EventPics/' + profilePic : ''
      var nService = {...this.newTeam}
      nService.churchUsername = this.$store.state.churchUsername
      console.log(this.newTeam.date)
      console.log(new Date(this.newTeam.date))
      nService.date = getYYYYMMDD(new Date(this.newTeam.date))
      nService.iconURL = profilePic
      Teams.postService(nService).then(() => {              
        this.$root.$emit('loading', false)
        this.getTeams().then(
          this.$refs.itemCreated.open()
        )
      })
      console.log(nService)
    },    
    async uploadProfilePic() {
      const { accessKeyID, secretAccessKey } = this.cdnKeys
      const fileSufix = 'EventPics/'
      var fileName = generateGUID() + '.jpg'
      
      if (!this.photoCroppa.hasImage()) {
        return
      }
      var blob = await this.photoCroppa.promisedBlob('image/jpeg')
      var arrayBuffer = await new Response(blob).arrayBuffer();  
      await CDN.postImage(accessKeyID, secretAccessKey, arrayBuffer, fileSufix, fileName).catch(() => {fileName = ''})

      return fileName
    },
    startEdit() {
      this.editing = true
      this.beforeEditedService = {...this.selectedTeam}
    },
    cancelEdit() {
      this.editing = false
      this.selectedTeam = {...this.beforeEditedService}
    },
    saveEdit() {
      this.editing = false
    }
  },
  props: {
  },
  mounted() {
    this.getTeams()
    this.getPeople()
    
    // this.recieveID(this.$route.params.id)
  },
  computed: {
  }
}
</script>

<style src="./../assets/css/general-style.css"></style> 

<style scoped>
.edit {
  align-self: flex-end;
  margin-bottom: 10px;
}
.edit i {
  font-size: .7rem;
  margin-right: .3rem;
  vertical-align: center;
}
#teams-container {
  height: 100%;
}
#teams-container .dates{
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
#teams-form .times{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
#teams-form .times .time{
  position: relative;
}
#teams-form .times .delete-time{
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
#teams-form .times .delete-time i{
  font-size: 12.5px;
}
#teams-form .times input{
  margin-right: 10px;
}
#teams-form .times .gs-basic-button{
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