<template>
  <div id="this-sunday-container">    
    <sweet-modal icon="warning" ref="deleteItemModal">
      <h3>Are you sure you want to delete {{selectedService.title}}?</h3>
      <button slot="button" class="gs-basic-button red" @click="deleteItem">DELETE</button>
    </sweet-modal>
    <sweet-modal icon="success" ref="itemCreated">
      <h3>{{newService.title}} created!!</h3>
    </sweet-modal>
    <div class="page-wrapper">    
      <div class="page-card-wrapper">              
          <cards
            v-model="selectedID"
            :loading="loading"
            :noProfile="true"
            :cardList="services"
            :profilePicFillerValue="'name'"
            :emptyMessage="'Not in any teams'"
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
              <img :src="selectedService.iconURL" alt="" srcset="" 
                class="this-sunday-image"
                v-show="!editing">
            </div>      
            <form action="" class="" id="this-sunday-form">
              <div class="gs-form-group">
                <label for="">Title</label>        
                <input type="text" class="gs-basic-input large" placeholder="Add a title" required
                  v-model="selectedService.title"
                  :readonly="!editing">
              </div>
              <!-- <div class="gs-form-group">
                <label for="">Date</label>
                <flat-pickr class="gs-basic-input" :config="datePickerConfig"
                :disabled="!editing"
                v-model="selectedService.dateObject"></flat-pickr>
              </div> -->
              <div class="gs-form-group">
                <label for="">Times</label>
                <div class="times">
                  <input v-for="time in selectedService['serviceTimes']['serviceTimes(s)']" v-model="time.time" :key="time.id" type="time" class="gs-basic-input time"
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
                  v-model="selectedService.speakerName"
                  :readonly="!editing"> -->
              </div>
              <div class="gs-form-group">
                <label for="">Description</label>        
                <textarea type="text" class="gs-basic-input" placeholder="Add Description" rows="10" required
                  v-model="selectedService.description"
                  :readonly="!editing"></textarea>
              </div>
            </form>
          </div>
        </div>
        <div class="details" v-if="creatingNewItem">
          <div class="panel gs-container vertical">
            <h5>Create New Service</h5>
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
            <form action="" class="" id="this-sunday-form" @submit.prevent="createService">
              <div class="gs-form-group">
                <label for="">Title</label>        
                <input type="text" class="gs-basic-input large" placeholder="Add a title" required
                  v-model="newService.title">
              </div>
              <div class="gs-form-group">
                <label for="">Date</label>
                <flat-pickr class="gs-basic-input" :config="datePickerConfig"
                v-model="newService.date"></flat-pickr>
              </div>
              <div class="gs-form-group">
                <label for="">Times</label>
                <div class="times">
                  <div v-for="(time, index) in newService.serviceTimes" :key="index" class="time">
                    <div class="delete-time noselect" @click="deleteTime(index)"><i class="material-icons">close</i></div>
                    <input v-model="time.time" type="time" class="gs-basic-input time"
                      placeholder="Time" required
                    >
                  </div>
                  <div class="gs-basic-button icon" formnovalidate @click="addTime"><i class="material-icons">add</i></div>
                </div>
              </div>
              <div class="gs-form-group">
                <label for="">Speaker</label>                
                <dropdown
                  :inputCSSClass="'gs-basic-input'"
                  :items="people"
                  :fields="{
                    title: 'fullName',
                    id: 'id', 
                    profile: 'personImageThumbnailURL'
                  }"
                />   
                <!-- <input type="text" class="gs-basic-input" placeholder="Add Speaker" required
                  v-model="newService.speakerName"> -->
              </div>
              <div class="gs-form-group">
                <label for="">Description</label>        
                <textarea type="text" class="gs-basic-input" placeholder="Add Description" rows="10" required
                  v-model="newService.description"></textarea>
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

import Services from '@/services/services'
import People from '@/services/people'
import {getHHMM, getDayOfWeekMonthDay, getThisSunday} from '../utils/helpers'

import Cards from '@/components/CardList'
import Dropdown from '@/components/CardDropdown'

import Vue from 'vue'
Vue.use(Croppa)

const newServiceTemplate = {
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
      newService: {},
      selectedID: -1,
      selectedService: {},
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
      this.$router.push(`/app/this-sunday/`)

      this.creatingNewItem = !this.creatingNewItem
      this.newService = {...newServiceTemplate}
      if (this.creatingNewItem == true) {
        CDN.getKeys().then(response => {
         this.cdnKeys = response.data
        })
      }
    },
    recieveItem(item) {
      this.recieveID(item.id)
      this.selectedService = item
      this.selectedService['dateObject'] = new Date(item.date)
    },
    async recieveID(id) {
      if (id == undefined) {
        return
      }
      if (id == '-1') {
        this.selectedID = id
        this.$router.push(`/app/this-sunday/`)
        return
      }

      this.$router.push(`/app/this-sunday/${id}`)

      this.creatingNewItem = false
   
      this.selectedID = id
    },
    async uploadImage() {
      const { accessKeyID, secretAccessKey } = this.cdnKeys
      var fileName = generateGUID() + '.jpg'
      
      if (!this.photoCroppa.hasImage()) {
        return
      }
      var blob = await this.photoCroppa.promisedBlob('image/jpeg')
      
      var arrayBuffer = await new Response(blob).arrayBuffer();  
      await CDN.postImage(accessKeyID, secretAccessKey, arrayBuffer, fileName).catch(() => {fileName = ''})

      return fileName
    },    
    async deleteItem() {
      this.$refs.deleteItemModal.close()
      Services.deleteService(this.selectedID).then(function(response) {
        this.recieveID(-1)
        this.getServices()
      }.bind(this))
    },
    addTime() {
      this.newService.serviceTimes.push({ "time": "12:00:00" })
    },
    deleteTime(index) {
      this.newService.serviceTimes.splice(index, 1)
      // this.newService.serviceTimes.push([{ "time": ""}])
    },
    deleteButtonClicked() {
      this.$refs.deleteItemModal.open()
    },
    getServices() {
      this.loading = true
      return Services.getServices().then(response => {
        // this.services = response.data['services(s)']
        this.services = response.data['services(s)'].map(obj => {
          var rObj = obj
          rObj['dateTitle'] = getDayOfWeekMonthDay(new Date(obj.date))
          return rObj
        })
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
      var nService = {...this.newService}
      nService.churchUsername = this.$store.state.churchUsername
      console.log(this.newService.date)
      console.log(new Date(this.newService.date))
      nService.date = getYYYYMMDD(new Date(this.newService.date))
      nService.iconURL = profilePic
      Services.postService(nService).then(() => {              
        this.$root.$emit('loading', false)
        this.getServices().then(
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
      this.beforeEditedService = {...this.selectedService}
    },
    cancelEdit() {
      this.editing = false
      this.selectedService = {...this.beforeEditedService}
    },
    saveEdit() {
      this.editing = false
    }
  },
  props: {
  },
  mounted() {
    this.getServices()
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
#this-sunday-container {
  height: 100%;
}
#this-sunday-container .dates{
}
#this-sunday-info {
  height: 100vh;
  padding: 50px 20px;
  overflow-y: auto;  
  box-sizing: border-box;
}
.this-sunday-image {
  width: 250px;
  height: 250px;
  background: #c4c4c4;
  display: block;
}
#this-sunday-form {
  margin-top: 25px;
  /* max-width: 600px; */
}
#this-sunday-form .times{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
#this-sunday-form .times .time{
  position: relative;
}
#this-sunday-form .times .delete-time{
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
#this-sunday-form .times .delete-time i{
  font-size: 12.5px;
}
#this-sunday-form .times input{
  margin-right: 10px;
}
#this-sunday-form .times .gs-basic-button{
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