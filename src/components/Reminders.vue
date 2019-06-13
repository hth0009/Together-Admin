<template>
  <div class="reminder-container">
    <div class="reminders">
      <div v-if="reminders.length == 0" class="no-reminders">
        SET REMINDER
      </div>
      <div v-else class="reminder-list">
        <div v-for="(reminder, index) in reminders" :key="reminder.id" class="reminder">
          <!-- <date-picker v-model="reminder.date"
            class="date-picker"
            :input-class="'input'"
            :wrapper-class="'wrapper'"
            :placeholder="'Enter Date'"
            :calendar-button="true"
            :calendar-button-icon="'material-icons noselect'"
            :calendar-button-icon-content="'calendar_today'"></date-picker> -->
          <!-- <date-picker v-model="reminder.date"
            class="date-picker"
            :input-class="'basic-input input'"
            :wrapper-class="'wrapper'"
            :placeholder="'Enter Date'"></date-picker> -->
          <input class="basic-input time" type="time" v-model="reminder.time">
          <input class="basic-input message" type="text" v-model="reminder.message"
          placeholder="Message">
          <div class="delete noselect"
            @click="deleteReminder(index)">x</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Reminders',
  data () {
    return {
      reminders: [
        {
          date: '',
          time: '',
          message: ''
        }
      ]
    }
  },
  components: {
  },
  methods: {
    deleteReminder (index) {
      if (this.reminders.length == 1) {
        this.reminders = [
        {
          date: '',
          time: '',
          message: ''
        }]
        return
      }
      this.reminders.splice(index, 1)
    }
  },
  props: {
  },
  mounted() {
  },
  computed: {
  },
  watch: {
    reminders: {
      handler: function (n, o) {
        var lastReminder = n[n.length - 1]
        if (lastReminder.date != '' && lastReminder.time != '' && lastReminder.message != '') {
          n.push({
            date: '',
            time: '',
            message: ''        
          })
        }
      }, deep: true
    }
  }
}
</script>

<style scoped>
  .reminders {
    padding-top: 20px;
  }
  .reminder {
    display: flex;
    align-items: center;
  }
  .date-picker >>> .input {
    width: 100px;
  }
  .time {
    min-width: 100px;
  }
  .message {
    flex: 2;
  }
  .delete {
    cursor: pointer;
  }
</style>