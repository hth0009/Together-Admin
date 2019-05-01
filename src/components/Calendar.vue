<template>
  <div>
    <div id="calendar-content">
      <div class="calendar-holder">
        <ejs-schedule height="650px" 
          id="schedule"
          ref="ScheduleObj"
          :selectedDate='selectedDate' 
          :eventSettings='eventSettings'
          :views='views'
          ></ejs-schedule>
      </div>
    </div>
  </div>
</template>

<script>
import { SchedulePlugin, Day, Month, Agenda, Resize, DragAndDrop } from "@syncfusion/ej2-vue-schedule";
import { extend } from '@syncfusion/ej2-base';
import Events from '@/services/events'

import Vue from 'vue'
Vue.use(SchedulePlugin);

const eventTemplate = {
  Id: -1,
  Subject: '',
  StartTime: new Date(),
  EndTIme: new Date(),
  IsAllDay: false,
}

export default {
  name: 'Calender',
  data() {
    return {
      events: [],  
      eventSettings: { dataSource: extend({}, this.events, null, true)},
      selectedDate: new Date("2018-08-19T12:00:00"),
      views: ['Month', 'Day', 'Agenda'],
    }
  },
  provide: {
    schedule: [Day, Month, Agenda, Resize, DragAndDrop]
  },
  mounted() {
    this.getEvents()
  },
  methods: {   
    async getEvents () {
      const response = await Events.getEvents()
      const data = response['event(s)']
      for (let index = 0; index < data.length; index++) {
        const event = data[index];
        this.events.push({
          Id: event.id,
          Subject: event.eventName,
          StartTime: new Date(event.startTime),
          EndTIme: new Date(event.endTime),
        })        
      }
      // this.eventSettings.dataSource = this.events  
      let scheduleObj = document.getElementById("schedule").ej2_instances[0]; 
      scheduleObj.eventSettings.dataSource = this.events  
    }
  }
}
</script>

<style scoped>
  #calendar-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
  }
  .calendar-holder {
    flex: 50;
    padding: 30px;
  }
  #event-content {
    padding: 30px;
    flex: 10;
  }
  .comp-full-calendar {
    /* padding: 20px;
    background: #fff;
    max-width: inherit;
    margin: inherit;
    display: inline-block; */
}

</style>
