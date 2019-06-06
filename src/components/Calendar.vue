<template>
  <div>
    <div id="events-content">
      <div class="events-wrapper">
        <div class="event-card-wrapper">
          <cards
            :cardList="formattedEvents"
            :loading="false"
            :selectedID="selectedID + ''"
            @selected="recieveID"/>
        </div>
        <div class="selected-view" v-show="selectedID != -1"  v-if="!creatingNewItem">
          <div class="header">
            <h3>{{selectedEvent.eventName}}</h3>
            <div class="subtitle">event type</div>
          </div>
          <div class="details">
            <div class="panel">
              <h4 class="noselect">General Info</h4>
              <div class="item">
                <i class="material-icons noselect">place</i>
                <div class="label noselect">Start Time</div>
                <div class="content">
                  <ejs-datetimepicker id="start-time" :placeholder="'Start Time'" :value="selectedEvent.startTime" :format="dateFormat"></ejs-datetimepicker>
                </div>
              </div>
              <div class="item">
                <i class="material-icons noselect">place</i>
                <div class="label noselect">End Time</div>
                <div class="content">
                  <ejs-datetimepicker id="end-time" :placeholder="'End Time'" :value="selectedEvent.endTime" :format="dateFormat"></ejs-datetimepicker>
                </div>
              </div>
            </div>
            <div class="panel">
              <h4>Times</h4>
              <times/>
            </div>
            <div class="panel">
              <h4>Reminders</h4>
              <reminders/>
            </div>
            <div class="panel">
              <h4>Teams</h4>
              <div class="explanation">This is where teams are. Let's describe this better</div>
              <event-teams/>
            </div>
            <div class="panel">
              <h4>Serve Teams</h4>
              <event-serving/>
            </div>
            <div class="panel">
              <h4>Order of Service</h4>
              <order-of-service/>
            </div>
          </div>
        </div>
      </div>
      <div class="new-item" v-if="creatingNewItem">
        <div class="title">New Event</div>
        <div class="details">
          <div class="type">            
            <!-- <custom-radio v-model="newItemType" :options="['detailed', 'bulk', 'upload']"></custom-radio> -->
          </div>
          <div class="detailed">
          </div>
        </div>
        <div class="footer">
          <button class="basic-button red" @click="creatingNewItem = false">CANCEL</button>
          <button class="basic-button green">CREATE</button>
        </div>
      </div>
      <div class="calendar-holder">
        <ejs-schedule height="100%" 
          id="Schedule"
          ref="ScheduleObj"
          :selectedDate='selectedDate' 
          :eventSettings='eventSettings'
          >
          <e-views>
            <e-view option="Month"></e-view>
            <e-view option="Day"></e-view>
            <e-view option="Agenda"></e-view>
          </e-views>
        </ejs-schedule>
      </div>
    </div>
  </div>
</template>

<script>
import { SchedulePlugin, Day, Month, Agenda, Resize, DragAndDrop, EJ2Instances } from "@syncfusion/ej2-vue-schedule"
import { DateTimePickerPlugin } from '@syncfusion/ej2-vue-calendars'
import { extend } from '@syncfusion/ej2-base'
import Events from '@/services/events'
import Cards from '@/components/CardList'

// Event Components

import EventServing from '@/components/EventServing'
import OrderOfService from '@/components/OrderOfService'
import Times from '@/components/Times'
import TextField from '@/components/TextField'
import Reminders from '@/components/Reminders'
import EventTeams from '@/components/EventTeams'

import {getHHMM, getDayOfWeek} from '../utils/helpers'

import Vue from 'vue'
Vue.use(SchedulePlugin, DateTimePickerPlugin)

export default {
  name: 'Calender',
  data() {
    return {
      events: [],  
      eventSettings: { dataSource: extend([], this.events, null, true) },
      dataManageer: {},
      // selectedDate: new Date(),
      selectedDate: new Date('2018-08-19T12:00:00'),
      selectedID: -1,
      selectedEvent: {},
      views: ['Month', 'Day', 'Agenda'],
      eventHash: {},
      creatingNewItem: false,
      dateFormat: "dd MMMM yyyy hh:mm a",
      eventComponents: [],
    }
  },
  components: {
    Cards, Times, EventServing, OrderOfService, Reminders, EventTeams
  },
  provide: {
    schedule: [Day, Month, Agenda, Resize, DragAndDrop]
  },
  mounted() {
    this.getEvents()
  },
  methods: { 
    addEvent() {

    },
    recieveID(id) {
      this.selectedID = id
      this.getEvent(id)
    },
    async getEvents () {
      const response = await Events.getEvents()
      const data = response['event(s)']
      this.events = data
      return data
    },
    async getEvent (id) {
      const response = await Events.getEvent(id)
      const data = response['event']
      this.selectedEvent = data
      this.eventComponents = data.components['components']
    }
  },
  computed: {   
    formattedEvents() {
      if (this.events.length == 0) {
        return
      }

      var events = Array(this.events.length)
      for (let index = 0; index < this.events.length; index++) {
        const event = this.events[index];
        const newEvent = {
          id: event.id,
          title: event.eventName,
          subtext: getHHMM(new Date(event.startTime)),
          header: getDayOfWeek(new Date(event.startTime)),
          Id: event.id,
          Subject: event.eventName,
          StartTime: event.startTime,
          EndTime: event.endTime       
          // profile:'https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          // subtext: prayer.personID + '',
        }        

        // Pass Events to Scheduler
        if (this.eventHash[event.id] == true) {
          continue
        }
        else {          
          this.eventHash[event.id] = true          
          this.$refs.ScheduleObj.addEvent(newEvent)
        }
        events[index] = newEvent        
      }
      return events
    }
  }
}
</script>

<style scoped>
  #events-content {
    height: 100vh;
  }
  .events-wrapper {
    display: grid;
    grid-template-columns: 250px 1fr;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    /* overflow-x: auto; */
  }
    
  .event-card-wrapper {
    overflow-y: auto;
    width: 100%;
    position: relative;
    border-right: 1px #E6E9EC solid;
  }

  .calendar-holder {
    height: 100vh;
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
  .event-card-wrapper {
    padding-top: 35px;
  }
 }

@media all and (max-width: 480px) {
  .events-wrapper {
    grid-template-columns: 1fr;
    height: calc(100vh - 35px);    
    margin-top: 35px;
  }
 }
</style>
