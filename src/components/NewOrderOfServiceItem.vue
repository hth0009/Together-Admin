<template>
  <div class='new-order-of-service-item-container'>
    <div class="service-item-info-full">
      <div class="service-item-info-full-content">
        <div class="card-header">New Service Item</div>
        <ejs-textbox autocomplete="off" class="item-title" v-model="selectedItem.title" floatLabelType="Auto" :placeholder="'Item Name'"
          required></ejs-textbox>          
        <div class="section-header">Duration</div>
        <div class="duration">
          <ejs-textbox autocomplete="off" min="0" max="23" type="number" v-model="splitDuration.hours" floatLabelType="Auto" :placeholder="'Hours'"
            required></ejs-textbox>
          <ejs-textbox autocomplete="off" min="0" max="59" type="number" v-model="splitDuration.min" floatLabelType="Auto" :placeholder="'Minutes'"
            required></ejs-textbox>
          <ejs-textbox autocomplete="off" min="0" max="59" type="number" v-model="splitDuration.sec" floatLabelType="Auto" :placeholder="'Seconds'"
            required></ejs-textbox>
        </div>
        <!-- <div class="section-header">Section Type</div>
        <div class="item-types-container">
          <label class="item-type"
            v-for="itemType in itemTypes"
            v-bind:key="itemType.itemName">
            <input class="basic-radio"
              name="itemType" type="radio" 
              :style="{borderColor: '#55C0E4',
                background: '#55C0E4'}"
              v-model="selectedItem.itemType"
            :value="itemType">
            <i :for="itemType.typeName">{{itemType.typeName}}</i>
          </label>
        </div> -->
        <div class="section-header">Color</div>
        <div class="colors">
          <swatches :showBorder="false" :inline="true" :shapes="'circles'" :swatchSize="25" :colors="colors" :value="'#' + selectedItem.colorCode"
            @input="changeColor"/>
        </div>
        <div class="item-options">
          <div class="item-lyrics">
            <div class="section-header">Lyrics</div>
            <ejs-richtexteditor
              v-model="selectedItem.lyrics"
              :toolbarSettings="toolbarSettings"
              :maxLength="20"></ejs-richtexteditor>
            <!-- <div v-html="selectedItem.itemType.lyrics"></div> -->
          </div>
          <div class="item-songs">
            <div class="section-header">Song Links</div>
            <ejs-textbox autocomplete="off" v-model="selectedItem.spotifyMusicURL" floatLabelType="Auto" :placeholder="'Spotify'"
              required></ejs-textbox>
            <ejs-textbox autocomplete="off" v-model="selectedItem.appleMusicURL" floatLabelType="Auto" :placeholder="'Apple Music'"
              required></ejs-textbox>
          </div>
          <div class="item-video">
            <div class="section-header">Video Link</div>
            <ejs-textbox autocomplete="off" v-model="selectedItem.videoUrl" floatLabelType="Auto" :placeholder="'Youtube Link'"
              required></ejs-textbox>
            <youtube
              ref="youtube"
              v-if="videoId != null"
              :video-id="videoId"
              :width = "'100%'"
              :height="auto"
              :resize="true"
              ></youtube>
          </div>
          <div class="item-notes">   
            <div class="section-header">Notes</div>
            <!-- <ejs-richtexteditor ref="rteObj" :value="selectedItem.itemType.notes" :toolbarSettings="toolbarSettings" :showCharCount="showCharCount" :maxLength="maxLength"></ejs-richtexteditor> -->
            <ejs-richtexteditor
              v-model="selectedItem.notes"
              :toolbarSettings="toolbarSettings"
              :maxLength="20"></ejs-richtexteditor>
            <!-- <ejs-richtexteditor ref="rteObj" :value="value" :toolbarSettings="toolbarSettings" :actionBegin="handleFullScreen" :actionComplete="actionCompleteHandler" :showCharCount="showCharCount" :maxLength="maxLength"></ejs-richtexteditor> -->
          </div>
          <button class="basic-button confirm green" @click="close()">CONFIRM</button>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
// Vue.use(VueDraggable)

import Swatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.min.css"

import { Toolbar, Link, Image, HtmlEditor } from "@syncfusion/ej2-vue-richtexteditor";
import { formatDigits } from '../utils/helpers';

export default {
  name: 'EditOrderOfServiceItem',
  data () {
    return {
      selectedItem: {},
      colors: ['#eb3b5a', '#fa8231', '#f7b731', '#20bf6b',
        '#55C0E4', '#2d98da', '#3867d6', '#8854d0', '#a5b1c2', '#4b6584'],
      maxLength: 2000,
      showCharCount: true,
      toolbarSettings: {
          items: ['Bold', 'Italic', 'Underline', 
          'FontColor', 'BackgroundColor', '|',
          'Formats', 'OrderedList', 'UnorderedList',
          'Outdent', 'Indent', '|', 'Undo', 'Redo']
      },
      itemTypes: [{
          typeName: 'Text',
          color: '55C0E4',
          hasVideo: false,
          videoUrl: '',
          hasLyrics: false,
          lyrics: '',
          hasSongUrl: false,
          songUrls: {spotify: '', apple: ''},
          hasPicture: false,
          pictureUrl: '',
          hasNotes: true,
          notes: ''
        },{
          typeName: 'Song',
          color: '55C0E4',
          hasVideo: true,
          videoUrl: '',
          hasLyrics: true,
          lyrics: '',
          hasSongUrl: true,
          songUrls: {spotify: '', apple: ''},
          hasPicture: false,
          pictureUrl: '',
          hasNotes: true,
          notes: ''  
        },{
          typeName: 'Video',
          color: '55C0E4',
          hasVideo: true,
          videoUrl: '',
          hasLyrics: false,
          lyrics: '',
          hasSongUrl: false,
          songUrls: {spotify: '', apple: ''},
          hasPicture: false,
          pictureUrl: '',
          hasNotes: true,
          notes: ''
        }
      ],      
      splitDuration: {
        hours: 0,
        min: 0,
        sec: 0
      }
    }
  },
  props: {
  },
  components: {
    Swatches
  },
  methods: {
    close() {
      this.selectedItem = {...{}}
      this.$root.$emit('editEventItem', this.selectedItem)
      this.$root.$emit('currentlyEditing', '')
    },
    changeColor(val) {
      console.log(val)
      this.selectedItem.colorCode = val.substring(1,7)
    }
  },
  provide:{
    richtexteditor:[Toolbar, Link, Image, HtmlEditor]
  },
  mounted() {    
    this.$root.$on('editEventItem', data => {
      this.selectedItem = data
      const duration = data.duration
      if (duration.length == 8) {        
        this.splitDuration =  {
          hours: parseInt(duration.substring(0,2)),
          min: parseInt(duration.substring(3,5)),
          sec: parseInt(duration.substring(6,8)),
        }
      }
      else {
        this.splitDuration =  {
          hours: 0,
          min: 0,
          sec: 0,
        }
      }
    });
  },
  computed: {
    videoId () {
      return this.$youtube.getIdFromUrl(this.selectedItem.videoUrl)
    },
    computedDuration() {
      var duration = this.splitDuration.hours.split(1)
      return this.splitDuration.hours
    }
  },
  watch: {
    splitDuration: {
      handler(n) {
        const sDur = this.splitDuration
        const duration = formatDigits(sDur.hours) + ':'
        + formatDigits(sDur.min) + ':'
        + formatDigits(sDur.sec)
        this.selectedItem.duration = duration
      }, deep: true
    }
  }
}
</script>

<style scoped>

.service-item-info-full {
    overflow-y: auto;
    height: 100%;
}
.service-item-info-full-content {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: stretch;
    /* padding: 10px 30px; */
    /* padding-bottom: 50px; */
}
.service-item-info-full h5{
  font-weight: lighter;
  padding: 10px;
  margin-top: 10px;
}
.service-item-info-full h3{
  text-align: center;
  padding-top: 20px;
}
.service-item-info-full .item-title {
  font-size: 18px;
}
.service-item-info-full .basic-button {
  align-self: center;
}
.item-options{
  display: flex;
  flex-direction: column;
}
.link-address{
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: 10px 15px; */
}
.link-address label {
  font-size: 12px;
  margin-right: 10px;
}
.link-address input{
  flex: 1  
}
.item-types-container {
  display: flex;
  flex-direction: row;
  /* padding: 10px; */
  justify-content: flex-start;
}
.item-type {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
}
.item-type i{
  padding: 5px;
  font-size: 13px;
  font-style: normal;
}
.basic-radio.add-type {
  border-color: #4e4e4e;
  background: #4e4e4e;
  display: inline-block;
  color: #4e4e4e;
  border-radius: 20px;
  font-weight: 600;
  height: 16px;
  width: 16px;
  padding: 1.5px;
  text-align: center;
}
.basic-radio.add-type:hover {
  color: white;
  box-shadow: 0px 0px 0px 2px inset white;
}
.basic-radio.add-type:active {
  box-shadow: 0px 0px 0px 0px inset white;
  color: white
}
.colors {
  /* margin: 0px auto */
}
.basic-button.confirm {
  margin: 20px 0px;
}
.duration {
  width: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  grid-template-rows: 1fr;
}

</style>