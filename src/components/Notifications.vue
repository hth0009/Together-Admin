<template>
  <div class="new-notification-container">
    <label for="new-notification" class="header">New Notification</label>
    <form @submit.prevent="addNotification" class="new-notification">
      <!-- <input type="text" name="new-notification-title" class="basic-input title" placeholder="title"> -->
      <textarea type="text" name="new-notification" class="basic-textarea notification" placeholder="message"></textarea>
      <!-- <div class="date">
        <label class="event-or-team">
          <input type="checkbox" class="basic-radio"
            name="event-or-team"
            v-model="teamType"
            value="TEAM">
          <i>scheduled</i>
        </label>
      </div> -->
      <div class="date">
        <ejs-datetimepicker
          :placeholder="'now'"></ejs-datetimepicker>
      </div>
          <!-- <div class="teams">
        <label class="event-or-team">
          <input type="radio" class="basic-radio"
            name="event-or-team"
            v-model="teamType"
            value="TEAM">
          <i>TEAM</i>
        </label>
        <ejs-dropdownlist
          :autofill='true' 
          :fields='fields' 
          :dataSource='teams' 
          :placeholder='"team"'
          :select="appendUser"></ejs-dropdownlist>
      </div>
      <div class="events">
        <label class="event-or-team">
          <input type="radio" class="basic-radio"
            name="event-or-team"
            v-model="teamType"
            value="EVENT">
          <i>EVENT</i>
        </label>
        <ejs-dropdownlist
          :autofill='true' 
          :fields='fields' 
          :dataSource='events' 
          :placeholder='"events"'
          :select="appendUser"></ejs-dropdownlist>
      </div> -->
      <button class="basic-button submit">
        <i class="material-icons">
          send
        </i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  components: {
  },
  methods: {
  },
  props: {
  },
  mounted() {    
  },
  computed: {
  }
}
</script>

<style scoped>
.new-notification-container {
  padding: 20px;
}
.new-notification-container .header{
  margin-bottom: 10px;
  display: block;
}
.new-notification {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr .2fr;
  /* grid-auto-rows: minmax(100px, auto); */
  grid-gap: 10px;
  padding: 0px 20px;
}
.new-notification .notification, .new-notification .title{
  grid-column: 2/4;
  padding: 15px 10px;
  margin: 0px;
  height: 80px;
  resize: none;
}
.new-notification .title{
  font-weight: 600;
}
.new-notification .date{
  padding-top: 10px;
  grid-column: 1;
  grid-row: 1;
}
.new-notification .teams{
  grid-column: 2;
  /* grid-row: 2; */
}
.new-notification .events{
  grid-column: 3;
  /* grid-row: 2; */
}
.new-notification .submit{
  grid-column: 4/5;
  grid-row: 1/3;
  width: 40px;
  height: 40px;
  padding: 7.5px 0px 0px 2.5px;
  border-radius: 50px;
  justify-self: center;
  /* align-self: center; */
}
.new-notification .submit i{
  font-size: 17.5px;
  text-rendering: optimizeLegibility;
}

.event-or-team {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 5px;
}
.event-or-team i {  
  padding: 5px;
  font-size: 13px;
  font-style: normal;
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