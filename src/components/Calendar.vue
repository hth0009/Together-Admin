<template>
  <div id="events-content">
    <sweet-modal icon="warning" ref="deleteTeamModal">
      <!-- <h3>Are you sure you want to delete {{selectedTeam.name}}?</h3> -->
      <!-- <button slot="button" class="basic-button red" @click="deleteTeam">DELETE</button> -->
    </sweet-modal>
    <sweet-modal icon="success" ref="eventCreated">
      <h3>New event created!!</h3>
    </sweet-modal>
    <div class="page-wrapper" :class="{'three-rows': selectedID != -1}">
      <div class="page-card-wrapper">
        <cards
          :cardList="formattedEvents"
          :loading="eventsLoading"
          :selectedID="selectedID + ''"
          :hasAddNew="true"
          :hasDates="true"
          :returnObject="true"
          @selected="recieveItem"
          @onAddNew="createNewItem"/>
      </div>
      <div class="selected-view" v-if="selectedID != -1 && !creatingNewItem">
        <div class="header">
          <h3>{{eventInstance.eventBase.title}}</h3>
          <div class="subtitle"
            :style="{'color': '#' + eventInstance.eventBase.eventType.colorCode}">{{eventInstance.eventBase.eventType.name}}</div>
        </div>
        <div class="time-chip-holder">
          <!-- <custom-radio :options="times" :chips="true" :overflow="true" class="chips"></custom-radio> -->
        </div>
        <div class="quick-actions">
          <button class="basic-button red"><i class="material-icons">delete</i></button>
        </div>
        <div class="details">
          <div class="panel">
            <div class="card-header noselect">General Info</div>
            <div v-show="eventInstance.startTime.toDateString() == eventInstance.endTime.toDateString()">
              <ejs-datepicker
                :showClearButton="false"
                :floatLabelType="'Auto'"
                :allowEdit="false" :placeholder="'Date'"
                :value="eventInstance.startTime"
                :format="dateFormat"
              ></ejs-datepicker>              
            </div>
            <div v-show="eventInstance.startTime.toDateString() != eventInstance.endTime.toDateString()">
              <ejs-daterangepicker
                :showClearButton="false"
                :floatLabelType="'Auto'"
                :allowEdit="false" :placeholder="'Dates'"
                :value="eventInstance.dates"
                :format="dateFormat"
              ></ejs-daterangepicker>              
            </div>
            <div style="display: flow-root">
              <div style="width: 48%; float: left">
                <ejs-timepicker floatLabelType="Auto" v-model="eventInstance.startTime" :placeholder="'Start Time'"></ejs-timepicker>
              </div>
              <div style="width: 48%; float: right">
                <ejs-timepicker floatLabelType="Auto" v-model="eventInstance.endTime" :placeholder="'End Time'" :min="eventInstance.startTime"></ejs-timepicker>
              </div>
            </div>
            <!-- <ejs-textbox autocomplete="off" v-model="eventInstance.components['component(s)'][0].fields.contents" :multiline="true" :rows="8" resize="none" floatLabelType="Auto" :placeholder="'Description'"
              required></ejs-textbox> -->
            <!-- <ejs-textbox autocomplete="off" v-model="eventInstance.components['component(s)'][0].fields.contents" :multiline="true" :rows="8" resize="none" floatLabelType="Auto" :placeholder="'Description'"
              required></ejs-textbox> -->
          </div>
          <!-- <div class="panel">
            <div class="card-header">Times</div>
            <times/>
          </div> -->
          <!-- <div class="panel">
            <div class="card-header">Reminders</div>
            <reminders/>
          </div> -->
          <div class="panel">
            <div class="card-header">Speaker</div>
            <speaker
              v-model="tempSpeaker"/>
          </div>
          <div class="panel">
            <div class="card-header">Contact</div>
            <contact
              v-model="tempContact"/>
          </div>
          <div class="panel">
            <div class="card-header">Teams</div>
            <div class="card-explanation">This is where teams are. Let's describe this better</div>
            <event-teams
              v-model="tempTeams"
            />
          </div>
          <!-- <div class="panel">
            <div class="card-header">Serve Teams</div>
            <event-serving/>
          </div> -->
          <div class="panel">
            <div class="card-header">Order of Service</div>
            <order-of-service
              v-model="tempOrderOfEvents"
              @edit="selectedOrderItem = $event"/>
          </div>
        </div>
      </div>        
      <div class="calendar-holder" v-show="!!!currentlyEditing && !creatingNewItem">
        <div class="calendar">
          <ejs-schedule 
            style="min-height: 80vh"
            ref="ScheduleObj"
            id="Schedule"
            :selectedDate='selectedDate' 
            :eventSettings='eventSettings'>
            <e-views>
              <e-view option="Month"></e-view>
              <!-- <e-view option="Day"></e-view> -->
            </e-views>
          </ejs-schedule>
        </div>
      </div>
      <div class="editing-panel-wrapper" v-if="!!currentlyEditing">
        <div class="editing-panel">
          <new-order-of-service-item v-if="currentlyEditing == 'ORDER'"/>
          <add-team-to-event v-if="currentlyEditing == 'EVENT_TEAMS'"/>
        </div>
      </div>

      <div class="new-item" v-if="creatingNewItem">
        <div class="title">New Event</div>
        <div class="details">
          <new-event
            @created="onEventCreated()"/>
        </div>
        <div class="footer">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SchedulePlugin, Day, Month, Resize, DragAndDrop, EJ2Instances } from "@syncfusion/ej2-vue-schedule"
import { DateTimePickerPlugin } from '@syncfusion/ej2-vue-calendars'
import { extend } from '@syncfusion/ej2-base'
import Events from '@/services/events'
import Cards from '@/components/CardList'

import NewEvent from '@/components/NewEvent'
import AddTeamToEvent from '@/components/AddTeamToEvent'
import CustomRadio from '@/components/CustomRadio'
import { SweetModal } from 'sweet-modal-vue'

// Event Components

import EventServing from '@/components/EventServing'
import OrderOfService from '@/components/OrderOfService'
import NewOrderOfServiceItem from '@/components/NewOrderOfServiceItem'
import Times from '@/components/Times'
import TextField from '@/components/TextField'
import Reminders from '@/components/Reminders'
import EventTeams from '@/components/EventTeams'
import Speaker from '@/components/EventSpeaker'
import Contact from '@/components/EventContact'

import {getHHMM, getDayOfWeekMonthDay} from '../utils/helpers'

import Vue from 'vue'
Vue.use(SchedulePlugin, DateTimePickerPlugin)

export default {
  name: 'Calender',
  data() {
    return {
      events: [],  
      eventSettings: { dataSource: extend([], this.events, null, true) },
      dataManageer: {},
      times: [],
      // selectedDate: new Date(),
      selectedDate: new Date(),
      selectedID: -1,
      selectedEvent: {},
      selectedEvents: [],
      views: ['Month', 'Day'],
      eventHash: {},
      creatingNewItem: false,
      dateFormat: "dd MMMM yyyy",
      eventComponents: [],
      eventsLoading: true,
      eventInstance: {},
      tempOrderOfEvents: [],
      selectedOrderItem: {},
      selectedTeamToEvent: {},
      currentlyEditing: '',
      tempSpeaker: {},
      tempContact: {},
      tempTeams: [
        {teamName: 'Worship Team',
        members: [
          {}
        ]}
      ]
    }
  },
  components: {
    Cards, Times, EventServing, OrderOfService, Reminders, EventTeams,
    NewEvent, NewOrderOfServiceItem, AddTeamToEvent, Speaker, Contact,
    CustomRadio, SweetModal
  },
  provide: {
    schedule: [Day, Month, Resize, DragAndDrop]
  },
  mounted() {
    this.recieveID(this.$route.params.id)
    this.getEventInstances()
    this.getEventBases()
    
    this.$root.$on('currentlyEditing', data => {
      this.currentlyEditing = data
    });
  },
  methods: {
    recieveItem(item) {
      console.log(item.id)
      this.recieveID(item.id)
      this.getEventInstancesByBase(item.eventBaseID)
    },
    async recieveID(id) {
      if (id == undefined) {
        return
      }
      if (id == '-1') {
        this.selectedID = id
        this.$router.push(`/app/calendar/`)
        return
      }

      this.$router.push(`/app/calendar/${id}`)

      this.creatingNewItem = false


      await this.getEventInstance(id)      
      this.selectedID = id
    },
    createNewItem() {
      this.selectedID = -1
      this.$router.push(`/app/calendar/`)

      this.creatingNewItem = !this.creatingNewItem
      this.$root.$emit('currentlyEditing', '')
    },
    async getEventInstances () {
      const response = await Events.getEventInstancesByChurch()
      const data = response['eventInstance(s)']
      this.events = data
      this.eventsLoading = false
      return data
    },
    async getEventInstancesByBase (eventBaseID) {
      const response = await Events.getEventInstancesByBase(eventBaseID)
      const data = response['eventInstance(s)']
      this.selectedEvents = data
      console.log(data)
      this.times = ['all']
      for (let index = 0; index < data.length; index++) {
        const event = data[index];
        const date = new Date(event.startTime)
        this.times.push(getDayOfWeekMonthDay(date) + ', ' + getHHMM(date))
      }
      return data
    },
    async getEventInstance (instanceID) {
      const response = await Events.getEventInstance(instanceID)
      const data = response['eventInstance']
      this.eventInstance = data
      this.eventInstance.startTime = new Date(data.startTime)
      this.eventInstance.endTime = new Date(data.endTime)
      this.eventInstance.dates = [        
        this.eventInstance.startTime,
        this.eventInstance.endTime
      ]
      return data
    },
    async getEventBases () {
      const response = await Events.getEventBasesByChurch()
      const data = response['eventBase(s)']
      // this.events = data
      // this.eventsLoading = false
      return data
    },
    onEventCreated() {
      this.$refs.eventCreated.open()
      this.createNewItem = false
      this.getEventInstances()
    }
  },
  computed: {
    editingItem () {
      if (Object.keys(this.selectedOrderItem).length > 0) {
        return 'ORDER'
      }
      if (Object.keys(this.selectedTeamToEvent).length > 0) {
        return 'TEAM'
      }
      return ''
    },
    formattedEvents() {
      if (this.events.length == 0) {
        return
      }

      var events = Array(this.events.length)
      for (let index = 0; index < this.events.length; index++) {
        const event = this.events[index]
        const newEvent = {
          id: event.id,
          title: event.eventBase.title,
          color: '#' + event.eventBase.eventType.colorCode,
          subtext: getHHMM(new Date(event.startTime)),
          header: getDayOfWeekMonthDay(new Date(event.startTime)),
          Id: event.id,
          Subject: event.eventBase.title,
          StartTime: event.startTime,
          EndTime: event.endTime,
          startTime: event.startTime,
          endTime: event.endTime,
          eventBaseID: event.eventBaseID
          // profile:'https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          // subtext: prayer.personID + '',
        }
        events[index] = newEvent

        // Pass Events to Scheduler
        if (this.eventHash[event.id] == true) {
          continue
        }
        else {          
          this.eventHash[event.id] = true          
          this.$refs.ScheduleObj.addEvent(newEvent)
        }
      }
      return events
    }
  },
  watch: {

  }
}
</script>

<style scoped>
  #events-content {
    height: 100vh;
  }    
  .event-card-wrapper {
    overflow-y: auto;
    width: 100%;
    position: relative;
    border-right: 1px #E6E9EC solid;
  }

  .calendar-holder {
    overflow: auto;
    height: 92vh;
    padding: 4vh 0px;
    position: relative;
  }
  .calendar {    
    padding: 10px;
    border-radius: 10px;
    margin: 10px 7.5px;
    box-shadow: 0px 3px 13px -2px #00000040;
    max-width: 750px;
    min-width: 500px;
  }
  .time-chip-holder {
    width: 95%;
    overflow-x: auto;
  }
  .chips {
    margin-left: 25px;
    width: auto;
    display: inline-block;
    overflow-x: visible;
    min-width: 90%;
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
