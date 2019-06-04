<template>
  <form class="new-event" @submit.prevent="submit">
    <h5>Create New Event</h5>
    <input type="text" class="event-name basic-input"
      placeholder="Event Title"
      v-model="newEvent.title">
    <!-- <select v-model="eventType" required class="basic-select">
      <option value="" disabled selected hidden class="place-holder">Select your option</option>
      <option v-for="type in eventTypeOptions"
       v-bind:value="type.value" v-bind:key="type.value">
        {{type.title}}
      </option>
    </select> -->
    <vue-select v-model="newEvent.type" :placeholder="'Event Type'" :options="eventTypeOptions"></vue-select>
    <date-picker class="basic-input" :placeholder="'Start date'" v-model="newEvent.start"/> 
    <date-picker class="basic-input" :placeholder="'End date'" v-model="newEvent.end"/> 
    <textarea 
      name="description" class="basic-textarea event-description"
      placeholder="Description"
      v-model="newEvent.description"></textarea>
    <button v-on:submit.prevent="" class="basic-button">
      Create
    </button>
  </form>
</template>

<script>
import VueSelect from '@/components/Select'
import DatePicker from 'vuejs-datepicker';
import format from 'date-fns/format';

export default {
  name: 'NewEvent',
  data () {
    return {
      eventTypeOptions: [
        {name: 'Sermon', value: 'sermon', color: '#ad7523'},
        {name: 'Worship Night', value: 'worship-night', color: '#238987'},
        {name: 'Community Volunteer', value: 'community-volunteer', color: '#a71ba3'}
      ],
      event: this.value,
      newEvent: {
        name: '',
        description: '',
        start: '',
        end: '',
        type: ''
      }
    }
  },
  components: {
    VueSelect,
    DatePicker
  },
  props: {
    value:{
      type: Object,
      default: function () {
        return {
          name: '',
          description: '',
          start: '',
          end: '',
          type: ''
        }
      }
    }
  },
  methods: {
    submit: function() {
      const start = format(this.newEvent.start, 'YYYY-MM-DD');
      const end = format(this.newEvent.end, 'YYYY-MM-DD');
      const event = {
        title: this.newEvent.title,
        description: this.newEvent.description,
        type: this.newEvent.type.value,
        start: start,
        end: end
      }
      this.$emit('input', event)      
      const empty = {
        title: '',
        description: '',
        start: '',
        end: '',
        type: ''
      }
      this.newEvent = empty
    }
  }
}
</script>

<style scoped>
  .new-event{
    display: flex;
    flex-direction: column;
    align-content: left;
    margin: 0px;
  }
  .new-event h5{
    margin-bottom: 10px;
  } 
  .event-name {
    /* font-size: 17px; */
    font-weight: 600
  }
  .event-description {
    resize: none;
    width: calc(100% - 20px);
    height: 50px;
  }  
</style>
