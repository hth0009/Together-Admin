<template>
  <div>
    <div id="calendar-content">
      <!-- <div id="event-content">
        <new-event v-model="newEvent"></new-event>
      </div> -->
      <div class="calendar-holder">
        <ejs-schedule height="650px" 
          :selectedDate='selectedDate' 
          :eventSettings='eventSettings'
          :views='views'
          :events='events'
          ></ejs-schedule>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from 'vue-fullcalendar'
import NewEvent from '@/components/NewEvent'
import { SchedulePlugin, Day, Month, Agenda, Resize, DragAndDrop } from "@syncfusion/ej2-vue-schedule";

import Vue from 'vue'
Vue.use(SchedulePlugin);

export default {
  name: 'Calender',
  data() {
    return {
      newEvent: {},
      events: [],  
      views: ['Month', 'Day', 'Agenda'],
       eventSettings: {
        dataSource: []
      },
      selectedDate: new Date(),
    }
  },
  components: {
    FullCalendar,
    NewEvent,
  },
  provide: {
    schedule: [Day, Month, Agenda, Resize, DragAndDrop]
  },
  methods: {
    onDateChange: function (args) {
      this.selectedDate = args.value;
    }
  },
  watch: {
    newEvent: {
      handler: function (n, o) {
        const empty = {
          title: '',
          description: '',
          start: '',
          end: '',
          type: ''
        }
        if (n == empty) {
          return
        }
        this.events = [
          ...this.events,
          this.newEvent
        ]
      }
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
