<template>
  <div class="new-event new-item">
    <div class="title">New Event</div>
    <div class="details">
    <carousel v-model="currentCarouselPage" :cardHeight="450">
      <div class="new-item-card" style="overflow-y: auto">
        <div class="section-header">Basic Details</div>
        <div>
          <ejs-textbox autocomplete="off" v-model="newEvent.name" floatLabelType="Auto" :placeholder="'Event Name'"
          required></ejs-textbox>
          <ejs-textbox autocomplete="off" style="max-height: 50px" :multiline="true" v-model="newEvent.description" :rows="8" resize="none" floatLabelType="Auto" :placeholder="'Description'"
          required></ejs-textbox>
          <ejs-textbox autocomplete="off" v-model="newEvent.location" resize="none" floatLabelType="Auto" :placeholder="'Location'"
          required></ejs-textbox>
          <ejs-textbox autocomplete="off" v-model="newEvent.locationDescription" resize="none" floatLabelType="Auto" :placeholder="'Location Description (ex: Room 103, Front Office)'"
          required></ejs-textbox>
        </div>
      </div>
      <div class="new-item-card">
        <div class="section-header">Event Date</div>          
        <custom-radio v-model="newEvent.eventDateType" :options="['Single Day', 'Multiple Days', 'Repeating Event']"></custom-radio>
        <div v-show="newEvent.eventDateType == 0">
          <ejs-datepicker autocomplete="off" :showClearButton="false" :allowEdit="false"
            :format="dateFormat" v-model="newEvent.date" floatLabelType="Auto" :placeholder="'Pick Date'"
            required></ejs-datepicker>
        </div>
        <div v-show="newEvent.eventDateType == 1">
          <ejs-daterangepicker autocomplete="off" :showClearButton="false" :allowEdit="false"
            :format="dateFormat" v-model="newEvent.dates" floatLabelType="Auto" :placeholder="'Pick Dates'"
          required></ejs-daterangepicker>
          <div>
            <div style="width: 48%; float: left">
              <ejs-timepicker floatLabelType="Auto" v-model="newEvent.startTime" :placeholder="'Start Time'"></ejs-timepicker>
            </div>
            <div style="width: 48%; float: right">
              <ejs-timepicker floatLabelType="Auto" v-model="newEvent.endTime" :placeholder="'End Time'" :min="newEvent.startTime"></ejs-timepicker>
            </div>
          </div>       
        </div>
        <div v-show="newEvent.eventDateType == 2">
          <ejs-datepicker autocomplete="off" :showClearButton="false" :allowEdit="false"
            :format="dateFormat" v-model="newEvent.date" floatLabelType="Auto" :placeholder="'Start Date'"
            required></ejs-datepicker>
        <div class="section-header" style="margin-top: 5px">Duration</div>
        <div class="duration">
          <ejs-textbox autocomplete="off" min="0" max="23" type="number" v-model="newEvent.duration[0]" floatLabelType="Auto" :placeholder="'Hours'"
            required></ejs-textbox>
          <ejs-textbox autocomplete="off" min="0" max="59" type="number" v-model="newEvent.duration[1]" floatLabelType="Auto" :placeholder="'Minutes'"
            required></ejs-textbox>
        </div>
        <div class="section-header" style="margin-top: 5px">Recurrance</div>
          <ejs-recurrenceeditor :change="setRecurranceOfNewTeam"></ejs-recurrenceeditor>        
          <!-- <div>
            <div style="width: 48%; float: left">
              <ejs-timepicker floatLabelType="Auto" v-model="newEvent.startTime" :placeholder="'Start Time'"></ejs-timepicker>
            </div>
            <div style="width: 48%; float: right">
              <ejs-timepicker floatLabelType="Auto" v-model="newEvent.endTime" :placeholder="'End Time'" :min="newEvent.startTime"></ejs-timepicker>
            </div>
          </div>        -->
        </div>
        <div v-show="newEvent.eventDateType == 0">        
          <custom-radio v-model="newEvent.hasMultipleTimes" :options="['Single Time', 'Multiple Times']"></custom-radio>
          <div v-show="newEvent.hasMultipleTimes == 0">
            <div style="width: 48%; float: left">
              <ejs-timepicker floatLabelType="Auto" v-model="newEvent.startTime" :placeholder="'Start Time'"></ejs-timepicker>
            </div>
            <div style="width: 48%; float: right">
              <ejs-timepicker floatLabelType="Auto" v-model="newEvent.endTime" :placeholder="'End Time'" :min="newEvent.startTime"></ejs-timepicker>
            </div>
          </div>       
          <div class="multiple-times" v-show="newEvent.hasMultipleTimes == 1">              
            <quick-create
              v-model="newEvent.times"
              :itemStructure="
                [{
                  name: 'startTime',
                  type: 'TIME',
                  placeholder: 'Start Time',
                  default: ''
                },{
                  name: 'endTime',
                  type: 'TIME',
                  placeholder: 'End Time',
                  default: ''
                }]"
              />
          </div>
        </div>
      </div>
      <div class="new-item-card">
        <div class="section-header">Event Members</div>          
        <custom-radio v-model="newEvent.isForWholeChurch" :options="['Team', 'Whole Church']"></custom-radio>
        <div v-show="newEvent.isForWholeChurch == 0">
          <ejs-dropdownlist
            :dataSource='teams' 
            :fields="{ value: 'id', text: 'name' }"
            floatLabelType="Auto" 
            :placeholder='"Select Team"'
            :allowFiltering="true"
            v-model="newEvent.teamID"
            ></ejs-dropdownlist>  
        </div>
      </div>
    </carousel>
    </div>
    <div class="footer">
      <button class="basic-button red" @click="$root.$emit('currentlyCreate', ''); $emit('canceled')">CANCEL</button>
      <button class="basic-button green" @click="createEvent()">CREATE</button>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import CustomRadio from '@/components/CustomRadio'
import QuickCreate from '@/components/QuickCreate'
import Teams from '@/services/teams'
import Events from '@/services/events'
import store from '../store'
import { getHHMMArray, formatDigits } from '../utils/helpers';
import { install } from 'vuex';
import { RRule, RRuleSet, rrulestr } from 'rrule'
import { format } from 'path';

const newEventTemplate = {
  name: '',
  date: new Date(),
  dates: [new Date(), new Date()],
  recurrence: '',
  eventDateType: 0,
  description: '',
  location: '',
  locationDescription: '',
  hasMultipleTimes: 0,
  times: [],
  isForWholeChurch: 0,
  startTime: new Date(),
  endTime: new Date(),
  teamID: null,
  duration: [0, 0, 0]
}

const eventBaseTemplate = {
  title: '',
  churchUsername: `${store.state.churchUsername}`,
  eventTypeID: -1,
  creatorID: `${store.state.personID}`,
  isAllChurch: false,
  isPrivate: false,
  teamID: null,
  components: [],
  /*For recurrence*/
  recurrence: '',
  startRecurrence: '',
  endRecurrence: '',
  // eventDuration: "00:00:00",
  eventDuration: '',
}
const eventInstanceTemplate = {
  eventBaseID: 0,
  startTime: '',
  endTime: '',
  instanceOverrides: [
  ]
}
export default {
  name: 'NewEvent',
  data () {
    return {
      currentCarouselPage: 1,
      newEvent: {},
      teams: [],
      dateFormat: 'MMMM dd, yyyy'
    }
  },
  components: {
    Carousel, CustomRadio, QuickCreate
  },
  methods: {
    setRecurranceOfNewTeam(event) {
      this.newEvent.recurrence = event.value
    },
    async getTeams() {
      const response = await Teams.getTeamsByChurch()
      this.teams = response['team(s)']
    },
    async createEvent() {
      const newEvent = this.newEvent

      this.$root.$emit('loading', true)

      // Populate Event Base
      var eventBase = {...eventBaseTemplate}
      eventBase.title = newEvent.name
      eventBase.eventTypeID = 1
      eventBase.creatorID = `${store.state.personID}`
      eventBase.churchUsername = `${store.state.churchUsername}`
      eventBase.isAllChurch = newEvent.isForWholeChurch == 1
      eventBase.teamID = newEvent.isForWholeChurch == 0 ? `${newEvent.teamID}` : null
      eventBase.components = [
        {
          component: {
            order: 1,
            componentType: "descriptionComponent",
            isBase: true,
            component: {
              fields: {
                contents: `${newEvent.description}`
              }
            }
          }
        },
        // {
        //   component: {
        //     order: 2,
        //     componentType: "committableComponent",
        //     isBase: true,
        //     component: {
        //       fields: {
        //         committable: {
        //           title: "",
        //           committableType: "INVITE",
        //           startTime: "12:00:00",
        //           endTime: "14:00:00",
        //           signUpMessage: "",
        //           invitations: [
        //             {
        //               message: "",
        //               teamID: newEvent.isForWholeChurch == 0 ? `${newEvent.teamID}` : null
        //             },
        //             {
        //               message: "",
        //               personID: null
        //             },
        //             {
        //               message: "",
        //               churchUsername: this.$store.state.churchUsername
        //             }
        //           ]
        //         }
        //       }
        //     }
        //   }
        // },
        {
            component: {
                order: 3,
                componentType: "locationComponent",
                isBase: true,
                component: {
                    fields: {
                        address: newEvent.location,
                        description: newEvent.locationDescription
                    }
                }
            }
        },
      ]

      // Create Event Instance(s)
      var eventInstances = []

      // One Single Day Event
      if (newEvent.eventDateType == 0 && newEvent.hasMultipleTimes == 0) {
        var eInst = {...eventInstanceTemplate}

        eInst.startTime = new Date(newEvent.date)
        eInst.endTime = new Date(newEvent.date)

        const startTime = getHHMMArray(newEvent.startTime)
        const endTime = getHHMMArray(newEvent.endTime)

        eInst.startTime.setHours(startTime[0], startTime[1], 0)
        eInst.endTime.setHours(endTime[0], endTime[1], 0)

        eventInstances.push(eInst)
      }
      // Multiple Single Day Event
      else if (newEvent.eventDateType == 0 && newEvent.hasMultipleTimes == 1) {
        for (let index = 0; index < newEvent.times.length; index++) {          
          var eInst = {...eventInstanceTemplate}

          eInst.startTime = new Date(newEvent.date)
          eInst.endTime = new Date(newEvent.date)

          const startTime = getHHMMArray(newEvent.times[index].startTime);
          const endTime = getHHMMArray(newEvent.times[index].endTime);

          console.log(startTime)

          eInst.startTime.setHours(startTime[0], startTime[1], '00')
          eInst.endTime.setHours(endTime[0], endTime[1], '00')

          console.log(eInst)
          eventInstances.push(eInst)
        }
      }
      // Multiple Day Event
      else if (newEvent.eventDateType == 1) {    
          var eInst = {...eventInstanceTemplate}

          eInst.startTime = new Date(newEvent.dates[0])
          eInst.endTime = new Date(newEvent.dates[1])


          const startTime = getHHMMArray(newEvent.startTime)
          const endTime = getHHMMArray(newEvent.endTime)

          eInst.startTime.setHours(startTime[0], startTime[1], 0)
          eInst.endTime.setHours(endTime[0], endTime[1], 0)

          eventInstances.push(eInst)
      }
      // Recurring Event
      else if (newEvent.eventDateType == 2) {
        var eInst = {...eventInstanceTemplate}

        eventBase.recurrence = newEvent.recurrence

        eventBase.startRecurrence = new Date()
        eventBase.endRecurrence = ''

        const startRecurrence = getHHMMArray(newEvent.startTime)
        eventBase.startRecurrence = new Date(newEvent.date)

        // Convert start date to ISO format and remove puncuation
        var startStr = eventBase.startRecurrence.toISOString()
        startStr = startStr.replace(/[:\.\-]/g, '')
        startStr = startStr.substring(0, 15) + 'Z'

        // Remove last semicolan
        eventBase.recurrence = eventBase.recurrence.replace(/;([^;]*)$/,'')
        var recurrence = eventBase.recurrence

        const rruleStr = 'DTSTART:' + startStr + '\nRRULE:' + recurrence
        var rrule = new rrulestr(recurrence)


        const hasEndDate = !!rrule.options.until || !!rrule.options.count
        if (hasEndDate) {
          const allDates = rrule.all()
          eventBase.endRecurrence = allDates[allDates.length - 1]
        }
        else {
          const d = newEvent.startTime
          const year = d.getFullYear();
          const month = d.getMonth();
          const day = d.getDate();
          const endDate = new Date(year + 1, month, day)
          eventBase.endRecurrence = endDate
        }

        eventBase.startRecurrence = eventBase.startRecurrence.toISOString()
        eventBase.endRecurrence = eventBase.endRecurrence.toISOString()

        eventBase.eventDuration = formatDigits(newEvent.duration[0]) + ':' 
          + formatDigits(newEvent.duration[1]) + ':00'
      }

    var newInstanceID = ""

     await this.postBase(eventBase).then(async function(response) {
        for (let index = 0; index < eventInstances.length; index++) {
          let event = eventInstances[index]
          eventInstances[index].startTime = event.startTime.toISOString()
          eventInstances[index].endTime = event.endTime.toISOString()
          eventInstances[index].eventBaseID = response.newResourceID
          console.log(eventInstances[index])
          eventInstances[index].instanceOverrides.push(
            {
              component: {
                order: 2,
                componentType: "committableComponent",
                isBase: false,
                component: {
                  fields: {
                    committable: {
                      title: "",
                      committableType: "INVITE",
                      startTime: "",
                      endTime: "",
                      signUpMessage: "",
                      invitations: [
                        {
                          message: "",
                          teamID: newEvent.isForWholeChurch == 0 ? `${newEvent.teamID}` : null
                        },
                        {
                          message: "",
                          churchUsername: this.$store.state.churchUsername
                        }
                      ]
                    }
                  }
                }
              }
            }
          )
          await this.postInstance(eventInstances[index]).then(response => {
            newInstanceID = !!!newInstanceID ? response.data.newResourceID : newInstanceID
            console.log(newInstanceID)
          })
        }
      }.bind(this))

    this.$emit('created', newInstanceID)
    
      
    this.$root.$emit('loading', false)
      
    },
    async postBase(eventBase) {
      const response = await Events.postEventBase(eventBase)
      return response
    },
    async postInstance(eventInstance) {
      const response = await Events.postEventInstance(eventInstance)
      return response
    },
  },
  props: {
  },
  mounted() {
    this.newEvent = {...newEventTemplate}
    this.getTeams()
  },
  computed: {
  }
}
</script>

<style scoped>

.duration {
  width: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  grid-template-rows: 1fr;
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