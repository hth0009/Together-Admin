<template>
  <div class='expanded-day-container'>
    <Container 
      class="group-list"
      :behaviour="'copy'"
      :group-name="'1'" 
      :get-child-payload="getChildPayload1">
      <Draggable
          v-for="group in groups"
          v-bind:key="group.title">
          <div 
          class="group-list-button noselect"
          :style="{background: group.color}">
            {{group.title}}
          </div>
      </Draggable>
    </Container>
    <div class="expanded-day">
      <Container 
        class="expanaded-day-groups"
        :behaviour="'drag'"
        :group-name="'1'" 
        :get-child-payload="getChildPayload2" 
        @drop="onDropGroups('selectedGroups', $event)">   
        <Draggable
          v-for="group in selectedGroups"
          v-bind:key="group.title">
            <!-- <Container>
              <Draggable
              :behaviour="'drag'"
              :group-name="'1'" 
              > -->
                <div class="group-bar noselect"
                  :style="{background: group.color}"
                >
                  <div class="selected-group-list-button" 
                  >{{group.title}}
                  </div>
                  <!-- <div class="group-details-toggle"
                    @click="group.editing = !group.editing">v</div> -->
                  <!-- <div class="group-details-toggle"
                    @click="group.editing = !group.editing">&#x2636;</div> -->
                </div>
                <transition name="height" >
                  <div class="group-details"
                  v-if="group.editing">
                    <h5>People</h5>
                  </div>
                </transition>
              <!-- </Draggable>
            </Container> -->
        </Draggable>   
      </Container>
      <div class="expanded-day-background">
        <ul class='time-block' v-for="time in times"
          v-bind:key="time" >
          <div class="time noselect">{{time}}
          </div>
        </ul>
        <!-- <div class="add noselect">
          +
        </div> -->
      </div>
    </div>    
    <modal
      name="hello-world"
      height="75%">
      <div class="group-info-full">
      <h3 :style="{color: selectedGroup.color}">{{selectedGroup.title}}</h3>
      <div class="all-people-groups noselect">
        <div class="avaliable-group people-group">
          <h5>Avaliable People</h5>
          <input type="text" class="basic-input" placeholder="search">
          <Container group-name="selectPeople" 
            :get-child-payload="getChildPayloadAvaliablePeople"
            @drop="onDropPeople('avaliablePeople', $event)">
            <Draggable v-for="person in selectedGroup.avaliablePeople" :key="person.name">
              <div class="draggable-item basic-drag">
                {{person.name}}<span>lorem ipsum asdfa</span>
              </div>
            </Draggable>
          </Container>
        </div>
        <div class="selected-people people-group">
          <h5>Selected People</h5>
          <div class="container-holder">
          <Container group-name="selectPeople" 
            :get-child-payload="getChildPayloadSelectedPeople"
            @drop="onDropPeople('selectedPeople', $event)"            
            :drag-handle-selector="'.basic-drag-bar'">
            <Draggable v-for="person in selectedGroup.selectedPeople"
              :key="person.name"
              ref="selected-people-container">
              <div class="draggable-item basic-drag" :style="{borderColor: selectedGroup.color}">
                <!-- <div class="basic-drag-bar-filler" :style="{borderColor: selectedGroup.color}"
                ></div> -->
                <!-- <div class="resize-bar"
                  :style="{marginLeft: resizeAndPos(person).leftMargin,
                  background: selectedGroup.color}"
                  @mousedown="startDrag" @mousemove="dragLeft(event, person)">|</div> -->
                <div class="basic-drag-bar" :style="{background: selectedGroup.color, 
                  width: resizeAndPos(person).width}">
                {{person.name}}<span> lorem ipsum asdfa</span>
                </div>
                <!-- <div class="resize-bar"
                  :style="{background: selectedGroup.color}"
                  @mousedown="startDrag" @mousemove="dragRight">|</div> -->
              </div>
            </Draggable>
          </Container> 
          </div>         
          <div class="expanded-day-background">
            <ul class='time-block' v-for="time in times"
              v-bind:key="time" >
              <div class="time noselect">{{time}}
              </div>
            </ul>
          </div>
        </div>
      </div>
      <h5>Message</h5>
      <textarea name="message" class="basic-textarea" v-model="selectedGroup.message"></textarea>
      <button class="basic-button">SEND</button>
      </div>
    </modal>
  </div>
</template>

<script>
// Vue.use(VueDraggable)

import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '@/utils/helpers'

export default {
  name: 'EventServing',
  data () {
    return {
      title: 'Serve Teams',
      groups: [
        {
          title: 'Load In',
          color: '#0077B5',
          avaliablePeople: [
            {
              id:'',
              name: 'Joe',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Leah',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Bob',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Sarah',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Adam',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Nicole',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            }
          ],
          selectedPeople: [],
          fullDay: true,
          startTime: '',
          endTime: '',
          editing: false,
          message: ''
        },
        {
          title: 'Home Team',
          color: '#C11F1D',
          avaliablePeople: [
            {
              id:'',
              name: 'Joe',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Leah',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Bob',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Sarah',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Adam',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Nicole',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            }
          ],
          selectedPeople: [],
          fullDay: true,
          startTime: '',
          endTime: '',
          editing: false,
          message: ''
        },
        {
          title: 'Production',
          color: '#4E8F13',
          avaliablePeople:  [
            {
              id:'',
              name: 'Joe',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Leah',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Bob',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Sarah',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Adam',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            },
            {
              id:'',
              name: 'Nicole',
              firstTime: '',
              lastTime: '',
              skills: [],
              lastDayServed: ''            
            }
          ],
          selectedPeople: [],
          fullDay: true,
          startTime: '',
          endTime: '',
          editing: false,
          message: ''
        },
      ],
      day: '',
      times: ['9:00 AM', '10:30 AM', '5:00 PM'],
      selectedGroups: [],
      selectedGroup: {},
      selectedGroupNames: [],
      avaliablePeople: [],
      selectedPeople: [],
      startMosX: 0,
      startMosY: 0,
      dragging: false,
    }
  },
  components: {
    Container, Draggable
  },
  methods: {
    onDropGroups (collection, dropResult) {
      console.log(dropResult)
      var payload = dropResult.payload
      if (this.selectedGroupNames.indexOf(payload.title) >= 0){
        console.log('already exists')
        return
      }
      else {
        this.selectedGroupNames.push(payload.title)
        this.show()
      }
      // this.selectedGroup = {...payload}
      this.selectedGroup = payload
      this[collection] = applyDrag(this[collection], dropResult) 
    },
    onDropPeople (collection, dropResult) {
      var payload = dropResult.payload
      // console.log(payload)
      // payload.firstTime = this.times[1]
      // payload.lastTime = this.times[this.times.length - 1]
      if (dropResult.addedIndex) {
      }
      this.selectedGroup[collection] = applyDrag(this.selectedGroup[collection], dropResult) 
    },
    getChildPayload1 (index) {
      return this.groups[index]
    },    
    getChildPayload2 (index) {
      return this.selectedGroups[index]
    },  
    getChildPayloadSelectedPeople (index) {
      return this.selectedGroup.selectedPeople[index]
    },  
    getChildPayloadAvaliablePeople (index) {
      return this.selectedGroup.avaliablePeople[index]
    }, 
    show () {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    },
    resizeAndPos (element) {
      // console.log('--------------')
      // console.log(element)
      // console.log('--------------')
      // const start = element.firstTime
      // const end = element.lastTime
      // const startPos = this.times.indexOf(start)
      // const endPos = this.times.indexOf(end)
      // const indexWidth = endPos - startPos + 1
      // const percentWidth = 100 * (indexWidth / this.times.length)
      // const percentLeftMargin = 100 * startPos * (1 / this.times.length)
      // const result = {
      //   width: percentWidth + "%",
      //   leftMargin: percentLeftMargin + "%"
      // }
      const result = {
        width: 100 + "%",
        leftMargin: 0 + "%"
      }
      // console.log(result)
      return result
    },
    startDrag (event) {
      console.log(event)
      this.startMosX = event.pageX
      this.dragging = true
    },
    dragLeft (event, element) {
      if (this.dragging) {
        const change = this.startMosX - event.pageX
        console.log(change)
      }
    },
    stopDrag() {
      this.dragging = false
    },
  },
  props: {
  }, 
  mounted() {    
    window.addEventListener('mouseup', this.stopDrag);
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "title",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
}
</script>

<style scoped>
.expanded-day {
  position: relative;
  height: 300px;
}
.expanaded-day-groups{
  margin-top: 36px;
  position: absolute;
  z-index: 100;
  /* width: calc(100% - 32px); */
  width: 100%;
  height: calc(100% - 37px);
  color: white;
  overflow: auto;
}
.expanded-day-background {
  display: flex;
  direction: row;
  justify-content: stretch;
  align-items: stretch;
  height: 100%;
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 1;
}
.group-list{
  display: flex;
  flex-direction: row;
  justify-content: left;
  color: white;
  font-size: 12px;
  padding: 5px;
}
.group-list-button {
  padding: 7.5px 10px;
  margin: 5px;
  cursor: grab;
  border-radius: 3px;
}
.group-details {
  color: #424242;
  background: white;
  height: 230px;
  margin: 10px;
  margin-top: 0px;
  box-shadow: 0px 8px 9px -6px rgba(128, 128, 128, 0.507);
  padding: 10px;
}
.selected-group-list-button {
  cursor: grab;
  flex: 1
}
.group-details-toggle{  
  cursor: pointer;
}
.group-bar {
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  margin-top: 5px;
  font-size: 15px;
}
.time-block {
  flex: 1;
  border: 1px rgba(190, 190, 190, 0.493) solid
}
.time-block .time {
  margin: 0px;
  padding: 10px;
}
.expanded-day .add {
  margin: 0px;
  padding: 10px;
  border: 1px rgba(190, 190, 190, 0.493) solid;
  cursor: pointer;
  max-width: 30px;
}

.group-info-full {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: stretch;
    padding: 10px;
}
.group-info-full h5{
  text-align: center;
  font-weight: lighter;
}
.group-info-full h3{
  text-align: center;
  padding-top: 20px;
}
.group-info-full textarea{
  resize: none;
  margin: 20px;
  margin-top: 5px;
  height: 60px;
}
.group-info-full .basic-button {
  /* width: 100px; */
  align-self: center;
}
.all-people-groups {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
  margin-top: 30px;
  margin-bottom: 50px;
}
.avaliable-group {
}
.people-group {
  margin: 0px 5px;
  width: 140px;
  height: 235px;
}
.people-group.avaliable-group {
  height: 200px;
}
.people-group h5{
  text-align: center;
  padding-bottom: 10px;
  color: #474747;
  font-weight: lighter;
}
.people-group .basic-input {
  width: calc(100% - 20px);
  margin: 0px;
  position: relative;
  z-index: 200;
}
.people-group .basic-drag {
  margin-bottom: 5px;
  padding: 5px;
    /* box-shadow: 0px 5px 6px -2px rgba(128, 128, 128, 0.507); */
  font-size: 12px;
  z-index: 100;
  position: relative;
}
.basic-drag span{
  font-size: 11px;
  color: #808080;
}
.people-group .smooth-dnd-container {
  height: 100%;
  /* border: white 3px solid; */
  /* box-shadow: 0px 8px 9px -6px rgba(128, 128, 128, 0.507); */
  border-top-width: 0px;
  padding: 3px;
  overflow-y: auto;
}
.selected-people {
  position: relative;
  flex: 1;
}
.selected-people .expanded-day-background{
  top: 30px;
}
.selected-people .basic-drag{
  padding: 0px;
  background: none;
  display: flex;
  flex-direction: row;
  background: white;
  border: white 2px solid
}
.selected-people .basic-drag-bar{
  color: white;
  padding: 5px;
  display: flex;
  flex-direction: column;
}
.selected-people .basic-drag-bar span{
  color: #f0f0f0
}
.selected-people .resize-bar{
  padding: 8px 2px;
  color: white;
  cursor: w-resize;
}
.selected-people .container-holder {
  position: absolute;
  height: calc(100% - 43px);
  width: calc(100% - 2px);
  top: 65px;
  left: 1px;
  z-index: 100;
}
.basic-drag:hover {
  box-shadow: 0px 4px 3px -2px rgba(128, 128, 128, 0.507);
  z-index: 100;
  position: relative;
}
.basic-drag-bar-filler {
  background: white;
  border: white 3px solid;
}
@media (max-width: 600px) {
  /* .expanded-day {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .time-block {
    width: 95%;
  } */
}

/* TRANSITIONS */
.height-enter-active,
.height-leave-active {
  transition: all 0.2s;
  height: 230px;
}
.height-enter,
.height-leave-to
{
  height: 0px;
}
</style>