<template>
  <carousel class="new-event" v-model="currentCarouselPage">
    <div class="new-item-card">
      <div class="section-header">Basic Details</div>  
      <!-- <div class="section-header-info">Give this new team a name</div>        -->
      <div>
        <ejs-textbox autocomplete="off" v-model="newEvent.name" floatLabelType="Auto" :placeholder="'Event Name'"
        required></ejs-textbox>
        <ejs-textbox autocomplete="off" :multiline="true" v-model="newEvent.description" :rows="8" resize="none" floatLabelType="Auto" :placeholder="'Description'"
        required></ejs-textbox>
        <ejs-textbox autocomplete="off" v-model="newEvent.location" resize="none" floatLabelType="Auto" :placeholder="'Location'"
        required></ejs-textbox>
        <ejs-textbox autocomplete="off" v-model="newEvent.location" resize="none" floatLabelType="Auto" :placeholder="'Location Description'"
        required></ejs-textbox>
      </div>
    </div>
    <div class="new-item-card">
      <div class="section-header">Event Date</div>          
      <custom-radio v-model="newEvent.eventDateType" :options="['Single Day', 'Multiple Days', 'Repeating Event']"></custom-radio>
      <div v-show="newEvent.eventDateType == 0">
        <!-- <div class="item-description">
          Select the date of this event. Give it a start and end time or several start times and a duration for each time
        </div> -->
        <ejs-datepicker autocomplete="off" v-model="newEvent.date" floatLabelType="Auto" :placeholder="'Pick Date'"
        required></ejs-datepicker>
      </div>
      <div v-show="newEvent.eventDateType == 1">                   
        <ejs-daterangepicker autocomplete="off" v-model="newEvent.dates" floatLabelType="Auto" :placeholder="'Pick Dates'"
        required></ejs-daterangepicker>
      </div>
      <div v-show="newEvent.eventDateType == 2">                   
        <ejs-recurrenceeditor :change="setRecurranceOfNewTeam"></ejs-recurrenceeditor>
      </div>
      <div v-show="newEvent.eventDateType == 0 || newEvent.eventDateType == 2">        
        <custom-radio v-model="newEvent.hasMultipleTimes" :options="['Single Time', 'Multiple Times']"></custom-radio>
        <div v-show="newEvent.hasMultipleTimes == 0">
          <div style="width: 48%; float: left">
            <ejs-timepicker floatLabelType="Auto" v-model="newEvent.startTime" :placeholder="'Start Time'"></ejs-timepicker>
          </div>
          <div style="width: 48%; float: right">
            <ejs-timepicker floatLabelType="Auto" v-model="newEvent.endTime" :placeholder="'End Time'" :min="newEvent.startTime"></ejs-timepicker>
          </div>
        </div>       
        <div class="multiple-times" v-show="newEvent.hasMultipleTimes == 1">              
          <quick-create
            :model="newEvent.times"
            :itemStructure="
              [{
                name: 'starTime',
                type: 'TIME',
                placeholder: 'Start Time',
                default: ''
              },{
                name: 'endTime',
                type: 'TIME',
                placeholder: 'End Time',
                default: ''
              }]"
            />
        </div>
      </div>
    </div>
    <div class="new-item-card">
      <div class="section-header">Event Members</div>          
      <custom-radio v-model="newEvent.isForWholeChurch" :options="['Team', 'Whole Church']"></custom-radio>
      <div v-show="newEvent.isForWholeChurch == 0">
          <ejs-dropdownlist
            :dataSource='teams' 
            :fields="{ value: 'id', text: 'name' }"
            floatLabelType="Auto" 
            :placeholder='"Select Team"'
            :allowFiltering="true"
            ></ejs-dropdownlist>  
      </div>
    </div>
  </carousel>
</template>

<script>
import Carousel from '@/components/Carousel'
import CustomRadio from '@/components/CustomRadio'
import QuickCreate from '@/components/QuickCreate'
import Teams from '@/services/teams'

const newEventTemplate = {
  name: '',
  date: '',
  dates: ['', ''],
  recurrence: '',
  eventDateType: 0,
  description: '',
  location: '',
  locationDescription: '',
  hasMultipleTimes: 0,
  times: [{'time': ''}],
  isForWholeChurch: 0,
  startTime: new Date(),
  endTime: new Date()
}

export default {
  name: 'NewEvent',
  data () {
    return {
      currentCarouselPage: 1,
      newEvent: {},
      teams: []
    }
  },
  components: {
    Carousel, CustomRadio, QuickCreate
  },
  methods: {
    setRecurranceOfNewTeam(event) {
      this.newEvent.recurrence = event.value
    },
    async getTeams() {
      const response = await Teams.getTeamsByChurch()
      this.teams = response['team(s)']
    },
  },
  props: {
  },
  mounted() {
    this.newEvent = {...newEventTemplate}
    this.getTeams()
  },
  computed: {
  }
}
</script>

<style scoped>

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