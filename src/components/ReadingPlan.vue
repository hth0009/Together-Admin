<template>
  <div class="reading-plan-container">
    <div class="date-picker-column">  
      <ul class="day-buttons">
        <li 
          class = "noselect"
          v-for="(day, index) in weekDays" :key="day.day"          
          :class="{selected: index == selectedDate.weekDayIndex}"
          @click="adjustDay(index)"
          @opened="setToToday()"
          >{{day.day + ' ' + day.date}}</li>
      </ul>    
      <div class="mini-calendar">
      <mini-calendar
        v-model="calendarData"
        :configs="calendarConfigs"
        ></mini-calendar>
      </div>
    </div>
    <div class="selected-day-container">
      <h2>{{selectedDate.displayDate}}</h2>
    </div>
  </div>
</template>

<script>
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

import MiniCalendar from 'vue-functional-calendar'
export default {
  name: 'ReadingPlan',
  data () {
    return {
      calendarData: {},
      calendarConfigs: {
        isDatePicker: true,
        monthNames: monthNames,
        dateFormat: 'mm/dd/yyyy',
        sundayStart: true
      },
      selectedDate: {
        shortDate: '',
        fullDate: undefined,
        displayDate: '',
        weekDayIndex: -1
      },
      weekDays: [
        {day: 'Sunday',
        date: ''},
        {day: 'Monday',
        date: ''},
        {day: 'Tuesday',
        date: ''},
        {day: 'Wednesday',
        date: ''},
        {day: 'Thursday',
        date: ''},
        {day: 'Friday',
        date: ''},
        {day: 'Saturday',
        date: ''}
      ],
    }
  },
  components: {
    MiniCalendar
  },
  watch: {
    calendarData: {
      handler: function(n, o) {
        var selectedDate = this.selectedDate
        var weekDayIndex = 0
        var fullDate = new Date(selectedDate)

        if (n.selectedDate == false) {
          return
        }
        selectedDate.shortDate = n.selectedDate
        fullDate = new Date(n.selectedDate)
        selectedDate.fullDate = fullDate

        const dateInfo = this.expandDateFormat(fullDate)
        selectedDate.displayDate = dateInfo.displayDate
        selectedDate.weekDayIndex = dateInfo.weekDayIndex
      }, deep: true
    }
  },
  methods: {
    expandDateFormat: function(date) {    
      var output = {
        displayDate: '',
        weekDayIndex: ''
      }
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      for (let dateIndex = 0; dateIndex < dayNames.length; dateIndex++) {
        const day = dayNames[dateIndex]
        if (day.substring(0,3) == date.toString().substring(0,3)){
          output.displayDate = day
          output.weekDayIndex = dateIndex
        }
      }
      output.displayDate +=
      ' ' + monthNames[date.getMonth()] +
      ' ' + date.getDate() +
      ', ' + date.getFullYear()
      
      return output
    },
    adjustDay(index) {
      var date = new Date(this.calendarData.selectedDate)
      date.setDate(date.getDate() + index - this.selectedDate.weekDayIndex)      
      this.calendarData.selectedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
    },
    setToToday() {
      var date = new Date()
      this.calendarData.selectedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
    }
  },
  props: {
  },
  mounted() {   
    setTimeout(function () {
      this.setToToday()
    }.bind(this), 50);
  },
  computed: {
  }
}
</script>

<style scoped>
.reading-plan-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow-x: hidden;
}
.date-picker-column {
  width: 285px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
  border-right: 1px #E6E9EC solid;
}
.day-buttons li {
  height: 30px;
  font-size: 20px;
  padding-top: 10px;
  padding-left: 15px;
  vertical-align: middle;
  cursor: pointer;
  margin: 5px;
  border-radius: 3px;
  transition: all .2s ease;
}
.day-buttons li:hover {
  background: #E6E9EC
}
.day-buttons li.selected {
  background: #E6E9EC
}
.mini-calendar >>> .vfc-main-container {
  height: 240px;
  box-shadow: none !important;
  border-top: 1px #E6E9EC solid;
}
.mini-calendar >>> .vfc-day {
  font-size: 12px;
}

.selected-day-container h2 {
  padding: 15px;
  font-weight: lighter;
}
</style>