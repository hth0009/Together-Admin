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
            :style="{background: item.color}">
              {{item.typeName}}
            </div>
        </Draggable>
      </Container>
      <!-- <div class="service-items no-items noselect" v-if="serviceItems.length == 0">
        <h4>NO ITEMS YET</h4>
      </div> -->
      <div class="service-items">
        <Container 
          class="service-items-container"
          :behaviour="'drag'"
          :group-name="'item-list'" 
          :get-child-payload="getServiceItemsPayload" 
          @drop="onDropItems('serviceItems', $event)">   
          <Draggable
          class="drag"
            v-for="item in serviceItems"
            v-bind:key="item.itemName">
                  <div class="item-bar noselect"
                    @click="show(); selectedItem = item"
                    :style="{background: item.itemType.color}"
                  >
                    <div class="item-bar-button">
                      <div class="item-name">{{item.itemName}}</div>
                      <div class="item-type">{{item.itemType.typeName}}</div>
                    </div>
                  </div>
                <!-- </Draggable>
              </Container> -->
          </Draggable>   
        </Container>  
      </div>    
      <!-- <button class="basic-button" @click="createNewItem">+</button> -->
    </div>    
    <modal
      name="new-service-item"
      height="75%">      
      <div class="service-item-info-full">
        <div class="service-item-info-full-content">
          <h3>New Service Item</h3>
          <!-- <h3 :style="{color: selectedGroup.color}">{{selectedGroup.title}}</h3> -->
          <h5>Section Type</h5>
          <div class="item-types-container">
            <label class="item-type"
              v-for="itemType in itemTypes"
              v-bind:key="itemType.itemName">
              <input class="basic-radio"
                name="itemType" type="radio" 
                :style="{borderColor: itemType.color,
                  background: itemType.color}"
                v-model="selectedItem.itemType"
              :value="itemType">
              <i :for="itemType.typeName">{{itemType.typeName}}</i>
            </label>
            <div class="item-type">
                <div class="basic-radio noselect add-type">+</div>
            </div>
          </div>
          <input type="text" v-model="selectedItem.itemName" class="item-title basic-input" placeholder="Section Title">
          <div class="item-options" 
            v-if="selectedItem.itemType != undefined && selectedItem.itemType.typeName != ''">
            <div class="item-lyrics"
              v-if="selectedItem.itemType.hasLyrics">
              <h5>Lyrics</h5>
              <vue-editor v-model="selectedItem.itemType.lyrics"
              :editorToolbar="[]"></vue-editor>
              <div v-html="selectedItem.itemType.lyrics"></div>
              <!-- <div v-html="selectedItem.itemType.lyrics"></div> -->
              <hr>
            </div>
            <div class="item-songs"
              v-if="selectedItem.itemType.hasSongUrl">
              <h5>Song Links</h5>
              <div class="link-address">
                <label for="spotify">Spotify:</label>
                <input name="spotify" type="text" class="basic-input"
                  v-model="selectedItem.itemType.songUrls.spotify">
              </div>
              <div class="link-address">
                <label for="apple">Apple Music:</label>
                <input name="apple" type="text" class="basic-input"
                  v-model="selectedItem.itemType.songUrls.apple">
              </div>
              <hr>
            </div>
            <div class="item-video"
              v-if="selectedItem.itemType.hasVideo">  
              <h5>Video Link</h5>            
              <div class="link-address">
                <label for="youtube">Youtube:</label>
                <input name="youtube" type="text" class="basic-input"
                  v-model="selectedItem.itemType.videoUrl">
              </div>
              <youtube
                ref="youtube"
                v-if="videoId != null"
                :video-id="videoId"
                :width = "'100%'"
                :resize="true"
                ></youtube>
            <hr>            
            </div>
            <div class="item-picture"
              v-if="selectedItem.itemType.hasPicture">
            <hr>
            </div>
            <div class="item-notes"
              v-if="selectedItem.itemType.hasNotes">   
              <h5>Notes</h5>
              <vue-editor v-model="selectedItem.itemType.notes"
              ></vue-editor>
            <hr>
            </div>
            <button class="basic-button" @click="hide()">CONFIRM</button>
          </div>        
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
// Vue.use(VueDraggable)

import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '@/utils/helpers'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'OrderOfService',
  data () {
    return {
      title: 'Order of Service',
      serviceItems: [],
      newItem: {
        itemName: '',
        itemType: {
          typeName: '',
          color: '',
          hasVideo: false,
          videoUrl: '',
          hasLyrics: false,
          lyrics: '',
          hasSongUrl: false,
          songUrls: [],
          hasPicture: false,
          pictureUrl: '',
          hasNotes: false,
          notes: ''
        },
        duration: '',
      },
      selectedItem: {},
      itemTypes: [{
          typeName: 'Message',
          color: '#CD5308',
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
        },{
          typeName: 'Song',
          color: '#008891',
          hasVideo: true,
          videoUrl: '',
          hasLyrics: true,
          lyrics: '',
          hasSongUrl: true,
          songUrls: {spotify: '', apple: ''},
          hasPicture: false,
          pictureUrl: '',
          hasNotes: true,
          notes: ''  
        },{
          typeName: 'Video',
          color: '#EFB920',
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
        },{
          typeName: 'Offering',
          color: '#434649',
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
        },{
          typeName: 'Announcements',
          color: '#3B7511',
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
        }
      ],
      numberOfItems: 0
    }
  },
  components: {
    Container, Draggable, VueEditor
  },
  methods: {
    onDropItems (collection, dropResult) {
      var payload = dropResult.payload
      this[collection] = applyDrag(this[collection], dropResult) 
      if (this[collection].length > this.numberOfItems) {
        this.selectedItem = payload
        this.show()
        this.numberOfItems ++
      }
    },       
    getChildPayload1 (index) {
      var newItem = {...this.newItem}
      newItem.itemType = {...this.itemTypes[index]}
      return newItem
    },    
    getServiceItemsPayload (index) {
      return this.serviceItems[index]
    },  
    createNewItem () {
      this.selectedItem = {...this.newItem}
      this.show()
    },
    show () {
      this.$modal.show('new-service-item');
    },
    hide () {
      this.$modal.hide('new-service-item');
    },
    addItem (item) {
      var newItem = {...this.newItem}
      newItem.itemType = {...item}
      this.serviceItems.push(newItem)
      this.selectedItem = newItem
      this.show()
    }
  },
  props: {
  }, 
  mounted() {    
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
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
  padding: 5px;
  flex-wrap: wrap;
}
.item-list-button {
  padding: 7.5px 10px;
  margin: 5px;
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
  min-height: calc(100% - 37px);
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
  border: 1px rgba(190, 190, 190, 0.493) solid;
  cursor: pointer;
  max-width: 30px;
}

.item-bar {
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  margin-top: 5px;
  font-size: 15px;
}
.item-bar-button {
  cursor: grab;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.item-bar-button .item-type{
  font-size: 12px;
  opacity: .7;
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