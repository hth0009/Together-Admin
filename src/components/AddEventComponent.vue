<template>
  <div class="add-event-component-container">
    <div class="component-type-wrapper">
      <custom-radio class="toggle" v-model="forEventBase" :options="['For This Event', 'For All Instances of This Event']"></custom-radio>
      <div class="component-types">
        <div class="component-type noselect" tabindex="0" v-for="cType in cTypes" :key="cType.type"
          @click="selectType(cType)"
          :class="{selected: selectedType == cType.type}"
        >
          {{ cType.title }}
        </div>
      </div>
      <div class="type-title">{{selectedTypeObject.title}}</div>
      <div class="description">{{selectedType != '' ? description: ''}}</div>
      <div class="buttons">
        <button class="basic-button red" @click="canceled()">CANCEL</button>
        <button class="basic-button green">ADD</button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomRadio from '@/components/CustomRadio'
import { orderOfEventComponentEmpty, speakerComponent } from '../utils/event-component-types'
import Events from '../services/events'

export default {
  name: '',
  data () {
    return {
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugit blanditiis architecto, facilis autem accusantium odio distinctio in, ipsam labore placeat omnis consequatur adipisci est debitis provident mollitia sapiente necessitatibus eos accusamus maiores! Illum, neque nihil consectetur quibusdam numquam ab!',
      cTypes: [
        {
          title: 'Teams',
          type: 'TEAMS'
        }, 
        {
          title: 'Speaker',
          type: 'SPEAKER',
          template: speakerComponent
        }, 
        // {
        //   title: 'Contact',
        //   type: 'CONTACT'
        // },
        {
          title: 'Order of Service',
          type: 'ORDER',
          template: orderOfEventComponentEmpty
        },
        {
          title: 'Check In (coming soon)',
          type: 'CHECKIN'
        },
        {
          title: 'Video (coming soon)',
          type: 'VIDEO'
        },
        {
          title: 'Audio (coming soon)',
          type: 'AUDIO'
        },
        {
          title: 'Reminder (coming soon)',
          type: 'REMINDER'
        },
        {
          title: 'PDF (coming soon)',
          type: 'PDF'
        },
        {
          title: 'Text (coming soon)',
          type: 'TEXT'
        },
      ],
      selectedType: this.value,
      selectedTypeObject: {},
      forEventBase: 0
    }
  },
  components: {
    CustomRadio
  },
  methods: {
    async addComponent() {
      if (this.forEventBase == 1) {

      }
    },
    canceled() {
      this.$emit('canceled')
    },
    async patchEventBase(BaseID) {

    },
    selectType(typeIn) {
      this.selectedType = typeIn.type
      this.selectedTypeObject = typeIn
    }
  },
  props: {
    eventInstanceID: {
      type: Number,
      default: null
    },
    eventBaseID: {
      type: Number,
      default: null
    },
    value: {
      type: String,
      default: ''
    }
  },
  mounted() {
  },
  computed: {
  },
  watch: {
    selectedType(n) {
      this.$emit('input', n)
    } 
  },
}
</script>

<style scoped>

.toggle {
  margin-bottom: 20px
}

.component-types {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  grid-auto-rows: 4rem;
  grid-gap: 20px;
  justify-content: center;
  padding-bottom: 15px;
}

.component-type {
  text-align: center;
  font-size: .75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  color: #5a5a5a;
  background-color: white;
  padding: 0px 5px;
  
  transition: color .5s ease, background-color .5s ease;
}

.component-type:focus,
.component-type:hover {
  outline: none;
  color: #00cec9;
}

.component-type:active,
.component-type.selected {
  background-color: #00cec9;
  color: white;
  transition: color .2s ease, background-color .75s ease-out;
}

.type-title {
  color: #616161;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: .2rem;
}
.description {
  color: #7e7e7e;
  font-size: .9rem;
  font-weight: 600;
  min-height: 100px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: space-between;
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