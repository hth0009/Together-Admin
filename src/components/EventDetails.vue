<template>
  <div id='event-details'>
    <div id="event-header">
      <h1 :style="{color: eventType.color}">{{eventName}}</h1>
      <h5 :style="{background: eventType.color}"
        class="noselect">{{eventType.label}}</h5>
      <div id="event-date" :style="{background: eventType.color}"
        class="noselect">
        <div id="event-month">02</div>
        <div id="event-date-line"></div>
        <div id="event-day">19</div>
      </div>
    </div>
    <div id="event-basic-options">
      <div class="contact"><h4>Contact: </h4><vue-select></vue-select></div>
      <div class="description"><h4>Description: </h4><textarea class="basic-textarea" rows="2"></textarea></div>
      <div class="location"><h4>Location: </h4><input class="basic-input" placeholder="Location"></div>
    </div>
    <div id="event-body">
      <component v-for="category in eventType.categories"
        v-bind:key="category.name"
        :is="category.component"></component>
    </div>
  </div>
</template>

<script>
import DayExpandedScheduler from '@/components/DayExpandedScheduler'
import OrderOfService from '@/components/OrderOfService'
import Times from '@/components/Times'
import TextField from '@/components/TextField'
// import Audio from '@/components/Audio'
import Reminders from '@/components/Reminders'

import VueSelect from 'vue-select'

  export default {
    name: 'EventDetails',
    data () {
      return {
        eventName: 'I\'m a Sheep',
        eventType: {
          label: 'Sunday Gathering',
          color: 'rgb(173, 117, 35)',
          categories: [
            {
              name: 'Times',
              component: 'Times'
            },
            {
              name: 'Reminders',
              component: 'Reminders'
            },
            {
              name: 'Day Scheduler',
              component: 'DayExpandedScheduler'
            },
            {
              name: 'Order of Service',
              component: 'OrderOfService'
            },
            {
              name: 'Text Field',
              component: 'TextField'
            },
            // {
            //   name: 'Audio',
            //   component: 'Audio'
            // }
          ]
        }
      }
    },
    components: {      
      DayExpandedScheduler,
      OrderOfService,
      Times,
      TextField,
      // Audio,
      Reminders,
      VueSelect
    }
  }
</script>

<style scoped>
#event-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  position: relative;
}
#event-header {
  align-self: flex-start;
}
#event-header h1{
  padding: 30px;
  padding-bottom: 15px;
  padding-right: 90px;
}
#event-header h5{
  color: white;
  padding: 5px 10px;
  margin-left: 35px;
  display: inline;
  font-weight: lighter;
  font-size: 12px;
}
#event-body {
  padding: 5px;
  padding-bottom: 30px;
  /* flex-grow: 0; */
}
#event-body div{
  margin: 20px 50px;
  flex: 1;
  min-width: 40%;
}
#event-body div.width-override-full {
  min-width: 80%;
}

#event-date {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 75px;
  height: 75px;
  color: rgb(236, 236, 236);
  font-size: 20px;
  font-weight: bold;
}
#event-day {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
#event-month {
  position: absolute;
  top: 15px;
  left: 15px;
}
#event-date-line {
    width: 30px;
    height: 30px;
    border-bottom: 1px solid white;
    -webkit-transform:
        rotate(-45deg);
    position: absolute;
    right: 30px;
    bottom: 35px;
}
#event-basic-options {
  padding: 20px 50px 0px 50px;
  /* padding-left: 50px; */
  /* max-width: 500px; */
}
#event-basic-options h4{
  font-weight: 100;
  padding-top: 10px;
  margin-bottom: 10px;
  font-size: 15px;
}
#event-basic-options .contact,
#event-basic-options .location,
#event-basic-options .description{
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
}
#event-basic-options .dropdown,
#event-basic-options textarea,
#event-basic-options input{
  flex: 1;
  margin-left: 20px;
}
#event-basic-options textarea{
  resize: none;
}
@media (min-width: 1050px) {
  #event-body {
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    flex-wrap: wrap;
    width: 1100px;
    /* flex: 1; */
  }
  #event-details {
    align-items: center;
  }
}
</style>