<template>
  <div>
    <div id="events-content">
      <div class="events-wrapper">
        <div class="event-card-wrapper">
          <cards
            :cardList="formattedEventsForCards"
            :loading="false"
            @selected="onSubmit"/>
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
              <e-view option="Week"></e-view>
              <e-view option="Day"></e-view>
              <e-view option="Agenda"></e-view>
            </e-views>
          </ejs-schedule>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SchedulePlugin, Week, Day, Month, Agenda, Resize, DragAndDrop, EJ2Instances } from "@syncfusion/ej2-vue-schedule";
import { extend } from '@syncfusion/ej2-base';
import Events from '@/services/events'
import Cards from '@/components/CardList'


import Vue from 'vue'
Vue.use(SchedulePlugin);

export default {
  name: 'Calender',
  data() {
    return {
      events: [],  
      eventSettings: { dataSource: []},
      dataManageer: {},
      selectedDate: new Date(),
      views: ['Month', 'Day', 'Agenda'],
    }
  },
  components: {
    Cards
  },
  provide: {
    schedule: [Day, Week, Month, Agenda, Resize, DragAndDrop]
  },
  mounted() {
    this.getEvents()
  },
  methods: { 
    async getEvents () {
      const response = await Events.getEvents()
      const data = response['event(s)']

      const events = Array(data.length)
      for (let index = 0; index < data.length; index++) {
        const event = data[index];
        data[index]['Id'] = event.id
        data[index]['Subject'] = event.eventName
        data[index]['StartTime'] = event.startTime
        data[index]['EndTime'] = event.endTime
      }
          
      let scheduleObj = document.getElementById("Schedule").ej2_instances[0]; 
      scheduleObj.eventSettings.dataSource = data
      this.events = data
      return data
    }
  },
  computed: {    
    formattedEventsForCards() {
      var events = Array(this.events.length)
      for (let index = 0; index < this.events.length; index++) {
        const event = this.events[index];
        const newEvent = {
          id: event.id,
          title: event.eventName,         
          // profile:'https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          // subtext: prayer.personID + '',
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
