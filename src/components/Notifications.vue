<template>
  <div class="reading-plan-container">
    <form action="" class="new-notification">
      <label for="new-notification">New Notification</label>
      <input type="text" name="new-notification" class="basic-input notification" placeholder="new notification">
      <div class="events">
        <ejs-dropdownlist
          :autofill='true' 
          :fields='fields' 
          :dataSource='events' 
          :placeholder='"events"'
          :select="appendUser"></ejs-dropdownlist>
      </div>
      <div class="teams">
        <ejs-dropdownlist
          :autofill='true' 
          :fields='fields' 
          :dataSource='teams' 
          :placeholder='"team"'
          :select="appendUser"></ejs-dropdownlist>
      </div>
      <button class="basic-button submit">sumbit</button>
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

.new-notification {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* grid-auto-rows: minmax(100px, auto); */
  grid-gap: 10px;
}
.new-notification label{
  grid-column: 1/5;
}
.new-notification .notification{
  grid-column: 2/5;
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
  /* grid-column: 4/5;
  grid-row: 1/3; */
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