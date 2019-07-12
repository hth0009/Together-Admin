<template>
  <div class="add-event-component-container">
    <div class="component-types">
      <div class="component-type noselect" tabindex="0" v-for="cType in cTypes" :key="cType.type"
        @click="selectedType = cType.type"
        :class="{selected: selectedType == cType.type}"
      >
        {{ cType.title }}
      </div>
    </div>
    <div class="buttons">
      <button class="basic-button red">CANCEL</button>
      <button class="basic-button green">ADD</button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      cTypes: [
        {
          title: 'Speaker',
          type: 'SPEAKER'
        }, 
        {
          title: 'Contact',
          type: 'CONTACT'
        }, 
        {
          title: 'Order of Service',
          type: 'ORDER'
        },
      ],
      selectedType: ''
    }
  },
  components: {
  },
  methods: {
    async addComponent() {

    }
  },
  props: {
    eventID: {
      type: Number,
      default: null
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<style scoped>

.component-types {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  grid-template-rows: 5rem;
  grid-gap: 20px;
  justify-content: center;
  padding-bottom: 30px;
}

.component-type {
  text-align: center;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  color: #5a5a5a;
  background-color: white;
  
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