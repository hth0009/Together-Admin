<template>
  <div id="events-content">
    <div class="page-wrapper" :class="{'three-rows': !!currentlyEditing}">
      <div class="page-card-wrapper">
        <cards
          :cardList="formattedEvents"
          :loading="eventsLoading"
          :selectedID="selectedID + ''"
          :hasAddNew="true"
          @selected="recieveID"
          @onAddNew="createNewItem"/>
      </div>
      <div class="selected-view" v-if="selectedID != -1 && !creatingNewItem">
        <div class="header">
          <h3>{{eventInstance.eventBase.title}}</h3>
          <div class="subtitle"
            :style="{'color': '#' + eventInstance.eventBase.eventType.colorCode}">{{eventInstance.eventBase.eventType.name}}</div>
        </div>
        <div class="details">
          <div class="panel">
            <h4 class="noselect">General Info</h4>
            <div class="item">
              <i class="material-icons noselect">place</i>
              <div class="label noselect">Start Time</div>
              <div class="content">
                <ejs-datetimepicker id="start-time" :placeholder="'Start Time'" :value="eventInstance.startTime" :format="dateFormat"></ejs-datetimepicker>
              </div>
            </div>
            <div class="item">
              <i class="material-icons noselect">place</i>
              <div class="label noselect">End Time</div>
              <div class="content">
                <ejs-datetimepicker id="end-time" :placeholder="'End Time'" :value="eventInstance.endTime" :format="dateFormat"></ejs-datetimepicker>
              </div>
            </div>
          </div>
          <!-- <div class="panel">
            <h4>Times</h4>
            <times/>
          </div> -->
          <!-- <div class="panel">
            <h4>Reminders</h4>
            <reminders/>
          </div> -->
          <div class="panel">
            <h4>Teams</h4>
            <div class="explanation">This is where teams are. Let's describe this better</div>
            <event-teams/>
          </div>
          <!-- <div class="panel">
            <h4>Serve Teams</h4>
            <event-serving/>
          </div> -->
          <div class="panel">
            <h4>Order of Service</h4>
            <order-of-service
              v-model="tempOrderOfEvents"
              @edit="selectedOrderItem = $event"/>
          </div>
        </div>
      </div>        
      <!-- <div class="calendar-holder">
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
      </div> -->
      <div class="editing-panel-wrapper" v-if="!!currentlyEditing">
        <div class="editing-panel">
          <new-order-of-service-item v-if="currentlyEditing == 'ORDER'"/>
          <add-team-to-event v-if="currentlyEditing == 'EVENT_TEAMS'"/>
        </div>
      </div>

      <div class="new-item" v-if="creatingNewItem">
        <div class="title">New Event</div>
        <div class="details">
          <div class="type">            
            <!-- <custom-radio v-model="newItemType" :options="['detailed', 'bulk', 'upload']"></custom-radio> -->
          </div>
          <div class="detailed">
            <new-event/>
          </div>
        </div>
        <div class="footer">
          <button class="basic-button red" @click="creatingNewItem = false">CANCEL</button>
          <button class="basic-button green">CREATE</button>
        </div>
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

import NewEvent from '@/components/NewEvent'
import AddTeamToEvent from '@/components/AddTeamToEvent'  

// Event Components

import EventServing from '@/components/EventServing'
import OrderOfService from '@/components/OrderOfService'
import NewOrderOfServiceItem from '@/components/NewOrderOfServiceItem'
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
      eventsLoading: true,
      eventInstance: {},
      tempOrderOfEvents: [],
      selectedOrderItem: {},
      selectedTeamToEvent: {},
      currentlyEditing: '',
    }
  },
  components: {
    Cards, Times, EventServing, OrderOfService, Reminders, EventTeams,
    NewEvent, NewOrderOfServiceItem, AddTeamToEvent
  },
  provide: {
    schedule: [Day, Month, Agenda, Resize, DragAndDrop]
  },
  mounted() {
    this.getEventInstances()
    this.getEventBases()
   
    // this.$root.$on('editEventItem', data => {
    //   this.selectedOrderItem = data
    // });
    // this.$root.$on('addTeamToEvent', data => {
    //   this.selectedTeamToEvent = data
    // });
    this.$root.$on('currentlyEditing', data => {
      this.currentlyEditing = data
    });
  },
  methods: {
    recieveID(id) {
      if (id == undefined) {
        return
      }

      this.$router.push(`/app/calendar/${id}`)

      this.selectedID = id
      this.creatingNewItem = false

      this.getEventInstance(id)
    },    
    createNewItem() {
      this.selectedID = -1;
      this.$router.push(`/app/calendar/`)

      this.creatingNewItem = !this.creatingNewItem
    },
    async getEventInstances () {
      const response = await Events.getEventInstancesByChurch()
      const data = response['eventInstance(s)']
      this.events = data
      this.eventsLoading = false
      return data
    },
    async getEventInstance (instanceID) {
      const response = await Events.getEventInstance(instanceID)
      console.log(response)
      const data = response['eventInstance']
      this.eventInstance = data
      return data
    },
    async getEventBases () {
      const response = await Events.getEventBasesByChurch()
      console.log(response)
      const data = response['eventBase(s)']
      // this.events = data
      // this.eventsLoading = false
      return data
    },
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
        const event = this.events[index];
        const newEvent = {
          id: event.id,
          title: event.eventBase.title,
          color: '#' + event.eventBase.eventType.colorCode,
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
          // this.$refs.ScheduleObj.addEvent(newEvent)
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
 }

@media all and (max-width: 480px) {
 }
</style>
