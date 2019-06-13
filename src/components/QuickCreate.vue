<template>
  <div class="quick-create-container">
    <div class="quick-create-cards">
      <div v-for="(item, index) in newItems" :key="index"
        class="quick-create-card">
        <div v-for="(element, index2) in itemStructure" :key="index2">
          <div v-if="element.type === 'DROPDOWN'">
            <ejs-dropdownlist
              :dataSource="element['list']"
              :fields="{value: element['displayValue']}"
              floatLabelType="Auto" 
              :placeholder="element['placeholder']"
              :allowFiltering="true"
              @select="assignItem($event, element, index)"></ejs-dropdownlist>
          </div>
          <div v-if="element.type === 'INPUT'">            
            <ejs-textbox 
              floatLabelType="Auto" 
              v-model="item[element['name']]"
              :placeholder="element['placeholder']"
              name=""></ejs-textbox>
          </div>
          <div v-if="element.type === 'TIME'">       
            <ejs-timepicker
              autocomplete="off"
              floatLabelType="Auto" 
              v-model="item[element['name']]"
              :showClearButton="false"
              :placeholder="element['placeholder']"
              name=""></ejs-timepicker>
          </div>
        </div>
        <button @click="removeItem(index)" class="basic-button red">
          <i class="material-icons">remove</i>
        </button>
      </div>
    </div>
    <button 
      class="basic-button"
      @click="addItem"
      ><i class="material-icons">add</i></button>
  </div>
</template>

<script>
export default {
  name: 'QuickCreate',
  data () {
    return {
      newItems: this.value,
      itemTemplate: {}
    }
  },
  components: {
  },
  methods: {
    addItem() {
      var lastObjectIsEmpty = 0
      const keys = Object.keys(this.itemTemplate)
      if (this.newItems.length > 0) {
        for (var index in Object.keys(this.itemTemplate)) {
          const element = this.newItems[this.newItems.length - 1][keys[index]]
          if (element != '' && element != undefined) {
            lastObjectIsEmpty += 1
          }
        }
        if (lastObjectIsEmpty != keys.length) {          
          return
        }
      }
      this.newItems.push({...this.itemTemplate})
    },
    removeItem(index) {
      this.newItems.splice(index, 1)
    },
    assignItem(e, item, itemIndex) {
      this.newItems[itemIndex][item.name] = e.itemData[item.dropdownKey]
    },
    onChange(index) {
      this.$emit('input', this.newItems)
    },
  },
  props: {
    value: {
      type: Array,
      default: () => {return []}
    },
    // name: name of variable
    // type: INPUT, DROPDOWN,
    // placeholder: 'insert text',
    // list: if drop, list that dropdown pulls from
    itemStructure: {
      type: Array,
      default: () => {return [{
        name: '',
        type: '',
        placeholder: '',
        list: []
      }]}
    },
  },
  mounted() {
    var template = {}
    for (let index = 0; index < this.itemStructure.length; index++) {
      const element = this.itemStructure[index];
      template[element.name] = ''
    }
    this.itemTemplate = {...template}
  },
  computed: {
  }
}
</script>

<style scoped>
.quick-create-container {
  height: 100%;
  position: relative;
  display: grid;
  grid-gap: 7.5px;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
}
.quick-create-cards {
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 3px;
  padding-right: 3px;
}
.quick-create-card {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: flex-end;
  padding-bottom: 2px; 
  padding-right: 2px; 
}
.quick-create-card > div{
  margin-right: 10px;
  flex: 1
}
.basic-button {
  width: 30px;
  height: 30px;
  padding: 5px 3px 3px 3px;
}
.basic-button i{
  font-size: 18px;
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