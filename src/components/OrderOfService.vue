<template>
  <div class='order-of-service-container'>
    <div class="order-of-service">
      <Container 
      class="item-list"
      :behaviour="'copy'"
      :group-name="'item-list'" 
      :get-child-payload="getChildPayload1">
        <Draggable
            v-for="item in itemTypes"
            v-bind:key="item.typeName">
            <div 
            class="item-list-button noselect"            
            @click="addItem(item)"
            :style="{background: '#' + item.color}">
              {{item.typeName}}
            </div>
        </Draggable>
      </Container>
      <!-- <div class="service-items no-items noselect" v-if="eventServiceItems.length == 0">
        <h4>NO ITEMS YET</h4>
      </div> -->
      <div class="service-items">
        <Container 
          class="service-items-container"
          :behaviour="'drag'"
          :group-name="'item-list'" 
          :get-child-payload="getServiceItemsPayload" 
          @drop="onDropItems('eventServiceItems', $event)">   
          <Draggable
          class="drag"
            v-for="(item) in eventServiceItems"
            v-bind:key="item.id">
                  <div class="item-bar noselect"
                    :class="{selected: item == selectedItem}"
                    @click="onItemClick(item)"
                    :style="{background: '#' + item.colorCode}"
                  >
                    <div class="item-bar-button">
                      <div class="item-name">{{item.title != '' ? item.title : 'new item'}}</div>
                      <div class="item-duration">{{item.duration | formatTime}}</div>
                      <!-- <div class="item-type">{{item.itemType.typeName}}</div> -->
                    </div>
                  </div>
                <!-- </Draggable>
              </Container> -->
          </Draggable>   
        </Container>  
      </div>
    </div>
  </div>
</template>

<script>
// Vue.use(VueDraggable)

import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, HHMMSSToReadable } from '@/utils/helpers'
import Swatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.min.css"
import { generateGUID } from '../utils/helpers'
import EventComponents from '@/services/eventComponents'

export default {
  name: 'OrderOfService',
  data () {
    return {
      eventComponent: this.value,
      eventServiceItems: this.value.fields.eventElements['orderOfEventComponentMembers(s)'],
      newItem: {
        title: '',
        colorCode: '00cec9',
        id: '',
        videoUrl: '',
        lyrics: '',
        spotifyMusicURL: '',
        appleMusicURL: '',
        notes: '',
        duration: '00:00:00',
      },
      selectedItem: {},
      itemTypes: [{
          typeName: '+',
          color: '00cec9',
          hasVideo: false,
          videoUrl: '',
          hasLyrics: false,
          lyrics: '',
          hasSongUrl: false,
          songUrls: {spotify: '', apple: ''},
          hasPicture: false,
          pictureUrl: '',
          hasNotes: true,
          notes: ''
        },
        // {
        //   typeName: 'Song',
        //   color: '00cec9',
        //   hasVideo: true,
        //   videoUrl: '',
        //   hasLyrics: true,
        //   lyrics: '',
        //   hasSongUrl: true,
        //   songUrls: {spotify: '', apple: ''},
        //   hasPicture: false,
        //   pictureUrl: '',
        //   hasNotes: true,
        //   notes: ''  
        // },{
        //   typeName: 'Video',
        //   color: '00cec9',
        //   hasVideo: false,
        //   videoUrl: '',
        //   hasLyrics: false,
        //   lyrics: '',
        //   hasSongUrl: false,
        //   songUrls: {spotify: '', apple: ''},
        //   hasPicture: false,
        //   pictureUrl: '',
        //   hasNotes: true,
        //   notes: ''
        // }
      ],
      numberOfItems: 0
    }
  },
  components: {
    Container, Draggable, Swatches
  },
  methods: {
    onDropItems (collection, dropResult) {
      var payload = dropResult.payload
      this[collection] = applyDrag(this[collection], dropResult) 
      if (this[collection].length > this.numberOfItems) {
        this.numberOfItems ++
        dropResult.payload.id = generateGUID()
        this.emitItem(dropResult.payload)
      }
    },       
    getChildPayload1 (index) {
      var newItem = {...this.newItem}
      newItem.itemType = {...this.itemTypes[index]}
      return newItem
    },    
    getServiceItemsPayload (index) {
      return this.eventServiceItems[index]
    },
    emitItem(item) {
      this.$root.$emit('currentlyEditing', 'ORDER')
      this.$nextTick(() => {
        this.$root.$emit('editEventItem', item)
      })
    },
    onItemClick(item) {
      this.selectedItem = item      
      this.emitItem(this.selectedItem)
    },
    addItem (item) {
      var newItem = {...this.newItem}
      newItem.itemType = {...item}
      newItem.id = generateGUID()
      this.eventServiceItems.push(newItem)
      this.selectedItem = newItem
      this.numberOfItems++

      var newItemPatchFields =
      {
        "eventElementsAdd": [
          {
            "title": '',
            "order": this.numberOfItems,
            "duration": newItem.duration,
            "colorCode": newItem.color,
            // "itemType": newItem.itemType.typeName
          }
        ]
      }

      EventComponents.patchComponent(this.id, newItemPatchFields)

      console.log(newItemPatchFields)
      this.emitItem(this.selectedItem)
    }
  },
  filters: {
    formatTime(val) {
      return HHMMSSToReadable(val)
    }
  },
  props: {
    value: {
      type: Object,
      default: function() {
        return {}
      }
    },    
    id: {
      type: Number,
      default: -1
    }
  }, 
  mounted() {
    this.$root.$on('editEventItem', data => {this.selectedItem = data})
  },
  computed: {
    dragOptions() {
      return {
        animation: .5,
        group: "title",
        disabled: false,
        ghostClass: "ghost"
      };
    },        
    videoId () {
      return this.$youtube.getIdFromUrl(this.selectedItem.itemType.videoUrl)
    }
  }
}
</script>

<style scoped>
.order-of-service {
  position: relative;
}
.item-list{
  display: flex;
  flex-direction: row;
  justify-content: left;
  color: white;
  font-size: 12px;
  padding: 5px 0px;
  flex-wrap: wrap;
}
.item-list-button {
  padding: 7.5px 10px;
  margin-right: 10px;
  cursor: grab;
  border-radius: 3px;
}
.service-items{
  width: 100%;
  color: white;
  overflow: auto;
  border: 1px rgba(190, 190, 190, 0.493) solid;
  display: flex;
  flex-direction: column;
  height: 300px;
}
.service-items-container {
  min-height: 100%
}
.no-items {  
  color: #4e4e4e;
  justify-content: center;
  align-items: center;
}
.no-items h4 {
  text-align: center;
  text-align: center;
  font-size: 5vw;
}
.no-items button {
  border-radius: 50px;
  font-size: 5vw;
  width: 7vw;
  height: 7vw;
  margin: 20px 0px;
  /* background: red; */
  text-align: center;
  color: #4e4e4e;
  padding: 0px;
  padding-top: .75vw;
}
.order-of-service .add {
  margin: 0px;
  padding: 10px;
  border: 1px #bebebe7e solid;
  cursor: pointer;
  max-width: 30px;
}

.item-bar {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  font-size: 15px;
  transition: all .2s ease;
}
.item-bar.selected {  
  margin-left: 20px;
  border-radius: 10px 0px 0px 10px;
}
.item-bar-button {
  padding: 10px 10px;
  cursor: grab;
  flex: 1;
  display: grid;
  justify-content: space-between;
  transition: all .2s ease;
  grid-template-columns: 5fr 3fr;
  text-shadow: 0px 1px 6px #0000004b;
  transition: all .2s ease;
}
.item-bar.selected .item-bar-button {
  padding: 15px;
  font-size: 22px;
}
.item-bar-button .item-type {
  transition: font-size .15s ease;
  font-size: 12px;
  opacity: .7;
}
.item-bar-button .item-duration{
  transition: font-size .15s ease;
  font-size: 12px;
  opacity: 1;
  justify-self: flex-end;
}
.item-bar.selected  .item-type{
  font-size: 14px;
  opacity: .8;
}

.service-item-info-full {
    overflow-y: auto;
    height: 100%;
}
.service-item-info-full-content {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: stretch;
    padding: 10px 30px;
    padding-bottom: 50px;
}
.service-item-info-full h5{
  font-weight: lighter;
  padding: 10px;
  margin-top: 10px;
}
.service-item-info-full h3{
  text-align: center;
  padding-top: 20px;
}
.service-item-info-full .item-title {
  width: 200px;
  font-size: 20px;
  margin-top: 20px;
}
.service-item-info-full .basic-button {
  align-self: center;
}
.item-options{
  display: flex;
  flex-direction: column;
}
.item-options hr {
  margin: 20px auto;
  width: 30%;
  border: 0px #B6B9BC solid;
  border-top-width: 1px;
}
.link-address{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
}
.link-address label {
  font-size: 12px;
  margin-right: 10px;
}
.link-address input{
  flex: 1  
}
.item-types-container {
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: space-evenly;
}
.item-type {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item-type i{
  padding: 5px;
  font-size: 13px;
  font-style: normal;
}
.basic-radio.add-type {
  border-color: #4e4e4e;
  background: #4e4e4e;
  display: inline-block;
  color: #4e4e4e;
  border-radius: 20px;
  font-weight: 600;
  height: 16px;
  width: 16px;
  padding: 1.5px;
  text-align: center;
}
.basic-radio.add-type:hover {
  color: white;
  box-shadow: 0px 0px 0px 2px inset white;
}
.basic-radio.add-type:active {
  box-shadow: 0px 0px 0px 0px inset white;
  color: white
}
.item-options button{
  /* margin-top: 30px; */
}
@media (max-width: 600px) {
}

</style>