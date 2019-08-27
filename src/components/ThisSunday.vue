<template>
  <div id="this-sunday-container">
    <div class="page-wrapper">    
      <div class="page-card-wrapper">              
          <cards
            :loading="true"
            :cardList="[]"
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
      <div class="selected-view" id="selected-view" >
        <div class="header">
          <h3>Sunday</h3>
        </div>
        <div class="details">
          <div class="panel">
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
            <form action="" class="" id="this-sunday-form">
              <div class="gs-form-group">
                <label for="">Title</label>        
                <input type="text" class="gs-basic-input large" placeholder="Title" required>
              </div>
              <div class="gs-form-group">
                <label for="">Date</label>          
                <flat-pickr v-model="date" class="gs-basic-input" :config="datePickerConfig"></flat-pickr>
              </div>
              <div class="gs-form-group">
                <label for="">Times</label>        
                <input type="text" class="gs-basic-input" placeholder="Times (8:30 AM, 10:00 AM)" required>
              </div>
              <div class="gs-form-group">
                <label for="">Speaker</label>        
                <input type="text" class="gs-basic-input" placeholder="Times (8:30 AM, 10:00 AM)" required>
              </div>
              <div class="gs-form-group">
                <label for="">Description</label>        
                <textarea type="text" class="gs-basic-input" placeholder="Times (8:30 AM, 10:00 AM)" rows="10" required></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="sunday-info gs-card-with-shadow no-padding">
      <div class="image-croppa">
        <croppa v-model="photoCroppa"
          canvas-color="transparent"
          :disable-rotation="true"
          :prevent-white-space="true"
          :width="350"
          :height="350"
          :speed="10"          
          :image-border-radius="'20'"
        ></croppa>
      </div>
      <form action="" class="gs-container gs-padding">
        <div class="gs-form-group">
          <label for="">Title</label>        
          <input type="text" class="gs-basic-input large" placeholder="Title" required>
        </div>
        <div class="gs-form-group">
          <label for="">Times</label>        
          <input type="text" class="gs-basic-input" placeholder="Times (8:30 AM, 10:00 AM)" required>
        </div>
      </form>
    </div> -->
  </div>
</template>

<script>
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import CDN from '@/services/cdn'
import { checkIfObjNotFilled, generateGUID } from '../utils/helpers'
import { SweetModal } from 'sweet-modal-vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

import Cards from '@/components/CardList'

const newSundayTemplate = {
  name: ''
}

export default {
  name: 'ThisSunday',
  data () {
    return {
      creatingNewItem: false,
      newSunday: {},
      selectedID: -1,
      cdnKeys: {},      
      photoCroppa: {},
      cdnKeys: {},      
      date: new Date(),
      datePickerConfig: {
        dateFormat: 'l F J, Y'
      }
    }
  },
  components: {    
    flatPickr, Cards
  },
  methods: {    
    createNewItem() {
      this.selectedID = -1;
      this.$router.push(`/app/this-sunday/`)

      this.creatingNewItem = !this.creatingNewItem
      this.newSunday = {...newSundayTemplate}
      if (this.creatingNewItem == true) {
        CDN.getKeys().then(response => {
         this.cdnKeys = response.data
        })
      }
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
    }
  },
  props: {
  },
  mounted() {    
  },
  computed: {
  }
}
</script>

<style src="./../assets/css/general-style.css"></style> 

<style scoped>

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
#this-sunday-form {
  margin-top: 25px;
  /* max-width: 600px; */
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