<template>
  <div>
    <div id="calendar-content">
      <div id="event-content">
        <new-event v-model="newEvent"></new-event>
      </div>
      <div class="calendar-holder">
        <full-calendar :events="events"></full-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from 'vue-fullcalendar'
import NewEvent from '@/components/NewEvent'

export default {
  name: 'Calender',
  components: {
    FullCalendar,
    NewEvent
  },
  data () {
    return {
      newEvent: {},
      events: []
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


  .red {
    background: rgb(235, 77, 77) !important;
    color: whitesmoke !important;
  }
  .blue {
    background: rgb(59, 59, 163) !important;
    color: whitesmoke !important;
  }
  .orange {
    background: orange !important;
    color: white !important;
  }
  .green {
    background: rgb(49, 155, 49) !important;
    color: white !important;
  }
  .blue,
  .orange,
  .red,
  .green {
    font-size: 13px;
    font-weight: 500;
    text-transform: capitalize;
  }
  .event-item {
    padding: 2px 0 2px 4px !important;
  }
</style>
