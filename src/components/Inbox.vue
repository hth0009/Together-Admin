<template>
  <div class="inbox-container">
    <div class="page-card-wrapper"
      :class="{'inactive': selectedThreadID != '' || -1}">
      <cards
        :cardList="sortedThreads"
        :loading="threadsLoading"
        :selectedID="selectedThreadID + ''"
        :hasAddNew="true"
        @selected="selectThread"
        @onAddNew="createNewItem"
        />
    </div>
    <div class="thread-wrapper" v-if="!creatingNewItem">
      <div class="thread">
        <div class="thread-header noselect">{{thread.title}}</div>
        <div class="messages">
          <div class="message-box-wrapper" v-if="displayThread == 2">
            <div v-for="(message, index) in reversedMessages" :key="message.id"
            class="message-box"
            :class="{
                'self': personID == message.fromID,
                'repeat': index > 0 && reversedMessages[index - 1].fromID == reversedMessages[index].fromID 
              }">
              <!-- <div
                class="profile-pic" :style="{backgroundImage: 'url(' +  message.fromIDIcon + ')'}"></div> -->
              <div class="time" v-if="index == 0">{{getDateFormate(message.sentAt)}}</div>
              <div class="time" v-else>{{getDateFormate(message.sentAt, reversedMessages[index - 1].sentAt)}}</div>
              <div
                class="profile-pic"
              >
                <avatar
                  :height="30"
                  :url="peopleHash[message.fromID].personImageThumbnailURL"
                  :title="peopleHash[message.fromID].fullName"
                />
              </div>
              <div class="message-info">
                <div
                  class="user">{{peopleHash[message.fromID].firstName + " " + peopleHash[message.fromID].lastName}}</div>
                <div class="message-content">{{message.contents}}</div>
              </div>
            </div>
          </div>
        </div>
          <form class="new-message-box"
            v-if="displayThread >= 0"
            v-on:sumbit.prevent="">
            <input type="text" v-model="newMessageContent"  @keypress.enter.prevent="sendMessage">
            <i @click="sendMessage" class="material-icons noselect">send</i>
          </form>
      </div>
    </div>
      <div class="new-item" v-if="creatingNewItem">
        <div class="title">New Message</div>
        <div class="details">
          <div class="type">            
            <custom-radio v-model="newThread.type" :options="['direct', 'team']"></custom-radio>
          </div>
          <div class="members">
            <div v-show="newThread.type == 0">
              <ejs-dropdownlist
                :dataSource='formatedPeople' 
                :fields='dropDownField'
                floatLabelType="Auto" 
                :placeholder='"select person"'
                :allowFiltering="true"
                :select="assignPersonToNewThread"></ejs-dropdownlist>  
            </div>
            <div v-show="newThread.type == 1">
              <ejs-dropdownlist
                :dataSource='teams' 
                :fields='dropDownField'
                floatLabelType="Auto" 
                :placeholder='"select team"'
                :allowFiltering="true"
                :select="assignTeamToNewThread"></ejs-dropdownlist> 
            </div>            
            <textarea placeholder="Enter your message" rows="4" class="basic-textarea" v-model="newThread.firstMessage"></textarea>
          </div>
        </div>
            <!-- <ejs-textbox floatLabelType="Auto" placeholder="" v-model="newThread.name"></ejs-textbox> -->
            <!-- <ejs-inplaceeditor  
              type="Text"
              emptyText="Name"
              mode="Inline" 
              data-underline="false"
              :validationRules="textValidationRules" 
              :model="newThread.name" >
            </ejs-inplaceeditor> -->
        <div class="footer">
          <button class="basic-button red" @click="creatingNewItem = false">CANCEL</button>
          <button class="basic-button green" @click="createThread">SEND</button>
        </div>
      </div>
  </div>
</template>

<script>
import Threads from '@/services/threads'
import Teams from '@/services/teams'
import People from '@/services/people'

import Message from '@/services/messages'
import Cards from '@/components/CardList'
import CustomRadio from '@/components/CustomRadio'
import Avatar from '@/components/Avatar'

import store from '../store'
import {formatDate} from '../utils/helpers'
import { clearInterval } from 'timers'; 

export default {
  name: 'Inbox',
  data () {
    return {
      threadSearch: '',
      threads: [],
      threadsLoading: false,
      thread: {},
      selectedThreadID: -1,
      messages: [],
      personID: -1,
      peopleHash: {},
      displayThread: -1,
      newMessageContent: '',
      creatingNewItem: false,
      dropDownField: { value: 'id', text: 'name' },
      textValidationRules: {
        Name: { required: [true, 'Enter valid title'] },
      },
      teams: [],
      people: [],
      newThread: {
        recipientID: -1,
        teamID: -1,
        firstMessage: '',
        type: 0
      },
      messagesReload: {},
      threadReload: {}
    }
  },
  components: {
    Cards, CustomRadio, Avatar
  },
  mounted() {
    this.personID = store.state.personID
    this.threadsLoading = true
    this.selectThread(this.$route.params.id)
    this.getThreads().then(() => {this.threadsLoading = false})
    this.getTeams()
    this.getPeople()
    
    // THIS IS TEMPORARY
    this.threadReload = setInterval(function () {this.getThreads()}.bind(this), 10000)
  },
  beforeDestroy() {
    window.clearInterval(this.messagesReload)
    window.clearInterval(this.threadReload)
  },
  watch: {
    newThreadType: {
      handler: function(newValue) {
        console.log(newValue)
      },
      deep: true
    },
    selectedThreadID(val) {
      const reloadNumber = Number(this.messagesReload)
      if (!!reloadNumber) {
        window.clearInterval(reloadNumber)
      }
      if (val != -1 && val != undefined) {
        this.messagesReload = setInterval(function() {
          this.updateMessages(val)
        }.bind(this), 5000)
      }
    }
  },
  methods: {
    async getThreads() {
      const response = await Threads.getThreads()
      let threads = response['thread(s)']
      this.threads = threads
    },
    async getTeams() {
      // const response = await Teams.getTeamsByID(this.personID)
      const response = await Teams.getTeamsByChurch()
      let teams = response['team(s)']
      this.teams = teams
    },
    async getPeople() {
      // const response = await Teams.getTeamsByID(this.personID)
      const response = await People.getPeople()
      let people = response['person(s)']
      this.people = people
    },
    async getThread(id) {
      const response = await Threads.getThread(id)
      // console.log(thread)
      let thread = response.thread
      Threads.patchMessageRead(thread.threadPersonID)
      let members = thread.members['threadMembers(s)']
      this.peopleHash = []
      for (let index = 0; index < members.length; index++) {
        const member = members[index].person;
        this.peopleHash[member.id] = member
      }
      this.thread = thread
    },
    async getMessages(id) {
      const response = await Message.getMessages(id)
      let messages = response['message(s)']
      return messages
    },
    async postMessage(fromID, threadID, content) {
      const response = await Message.postMessage(fromID, threadID, content)
    },
    async postDirectThread(senderID, recipientID, title) {
      const response = await Threads.postDirectThread(senderID, recipientID, title)
    },
    // On new thread member selected
    assignMember (member) {
      console.log(member)
    },
    getDateFormate(date1, date2) {
      return formatDate(date1, date2)
    },
    createNewItem() {
      this.selectedThreadID = -1;
      this.$router.push(`/app/inbox/`)

      this.creatingNewItem = !this.creatingNewItem
    },
    selectThread(id) {
      if (id == undefined) {
        return
      }
      if (id == '-1') {
        this.selectedThreadID = id
        this.$router.push(`/app/inbox/`)
        return
      }
      
      // clearInterval(this.messageReload)

      this.$router.push(`/app/inbox/${id}`)

      this.selectedThreadID = id
      this.messages = []
      this.creatingNewItem = false

      // displayThread waits for getThread() and getMessages()
      // to finish. When displayThread equals 2 we know both
      // functions have run
      this.displayThread = 0
      this.thread = {}
      this.getThread(id).then(() => {this.displayThread += 1})
      this.getMessages(id).then(response => {
          this.displayThread += 1
          this.messages = response
        })
    },
    sendMessage() {
      const fromID = this.personID
      const threadID = this.selectedThreadID
      const content = this.newMessageContent
      if (content == '') {
        return
      }
      this.postMessage(fromID, threadID, content).then(() => {
        this.updateMessages(threadID)
        this.newMessageContent = ''
      })
    },
    updateMessages(id) {
      this.getMessages(id).then(response => {
        this.messages = response
      })
    },
    createThread() {
      const thread = this.newThread
      if (thread.type == 0) {
        this.postDirectThread(this.personID, thread.recipientID, 'New Direct Message: ' + new Date().toLocaleTimeString())
      }
    },
    assignPersonToNewThread(event) {
      this.newThread.recipientID = event.itemData.id
    },
    assignTeamToNewThread(event) {
      this.newThread.teamID = event.itemData.id
    }
  },
  props: {
  },
  computed: {
    sortedThreads() {
      var threads = Array(this.threads.length)
      for (let index = 0; index < this.threads.length; index++) {
        const thread = this.threads[index];
        const lastMessage = thread.lastMessage != null ? thread.lastMessage.contents : ''
        const lastMessageSentAt = thread.lastMessage != null ? formatDate(thread.lastMessage.sentAt) : ''
        const newThread = {
          id: thread.id,
          title: thread.title,
          // profile: thread.threadImageThumbnailURL,
          profile: thread.threadImageThumbnailURL,
          // superscript: 'thead.sentTime',
          subtext: lastMessage,
          subtext2: lastMessageSentAt,
          unread: thread.unreadMessages > 0
        }
        threads[index] = (newThread)
      }
      return threads
    },
    reversedMessages() {
      return this.messages.reverse()
    },
    formatedPeople() {
      const people = this.people
      var formatedPeople = []
      for (let index = 0; index < people.length; index++) {
        const person = people[index]
        if (person.id != this.personID) {
          formatedPeople.push({
            name: person.firstName + " " + person.lastName,
            id: person.id
          })
        }
      }
      return formatedPeople
    }
  }
}
</script>

<style scoped>
  .inbox-container {
    display: grid;
    grid-template-columns: 240px 1fr;
  }

  .threads-card-wrapper {
    overflow-y: auto;
    /* height: calc(100vh - 40px); */
    height: 100vh;
    width: 100%;
    position: relative;
    /* border-right: #f0f0f0 1px solid; */
  }
  .thread-wrapper {
    /* height: calc(100vh - 40px); */
    height: calc(92vh);
    position: relative;
    /* background: red; */
    flex: 1;
    border-radius: 10px;
    margin: calc( 10px + 4vh) 7.5px;
    box-shadow: 0px 3px 13px -2px #00000040;
    max-width: 600px;
    min-width: 400px;
  }
  .thread {
    display: grid;
    grid-template-rows: 35px auto 47px;
    height: calc(92vh);
    position: relative;
  }
  .thread-header {
    padding: 10px 15px;
    font-weight: 600
    /* background: white; */
    /* border-left: #f0f0f0 1px solid; */
  }
  .new-message-box {
    width: 100%;
    height: 47px;
    display: grid;
    grid-template-columns: 1fr 50px;
    border-top: 1px #E6E9EC solid;
    /* border-left: 1px #E6E9EC solid; */
    /* align-content: center; */
    /* justify-items: center; */
  }
  .new-message-box input{
    padding: 15px;  
    padding-right: 0px;
    position: relative;
    top: -1px;
    border-top: 1px #E6E9EC solid;
    border-radius: 10px;
  }
  .new-message-box input:active,
  .new-message-box input:focus{
    outline: none;
  }  
  .new-message-box i{
    text-align: center;
    font-size: 20px;
    padding-top: 12.5px;

    color: #4e4e4e;
    cursor: pointer;
  } 
  .messages {
    /* height: calc(94vh - 97px); */
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
    padding-bottom: 15px;
  }
  
  .message-box-wrapper {
    display: flex;
    flex-direction: column;
  }
  .message-box {
    /* display: flex; */
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 35px minmax(0, 1fr);
    padding: 5px;
    margin-top: 20px;
  }
  .message-box.self {
    grid-template-columns: minmax(0, 1fr) 35px;
    text-align: right;
  }
  .message-box .profile-pic {
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    border-radius: 50%;

    grid-column: 1/2;
    grid-row: 2/3;
    margin: 2.5px;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .message-box .time {
    width: 100%;    
    grid-column: 1/3;
    grid-row: 1/2;
    text-align: center;
    color: #6b6b6b;
    font-size: 11px;
    line-height: 4
  }
  .message-box .message-info {
    padding: 0px 10px;
    
    grid-column: 2/3;
    grid-row: 2/3;
  }
  .message-box .user {
    font-weight: 600;
    padding-bottom: 5px;
    font-size: 14px;
  }
  .message-box .message-content {
    font-size: 14px;    
    padding-left: 0px;
    padding-right: 60px;
    word-wrap: break-word;
    line-height: 1.05;
  }
  .message-box.self .message-info {
    position: relative;
    grid-column: 1/2;
  }
  .message-box.self .profile-pic {
    grid-column: 2/3;
  }
  .message-box.self .message-content{
    padding-left: 60px;
    padding-right: 0px;
    padding-top: 3px;
  }
  .message-box.simple {
    margin-top: 0px;
  }
  .message-box.simple .message-info{
    padding-left: 40px;
  }  
  .message-box.repeat {
    margin-top: 0px;
  }
  .message-box.repeat .user,
  .message-box.repeat .profile-pic{
    display: none;
  }
  .new-item .new-message{
    margin: 0px 10px;
    padding-left: 20px;
  }
  .new-item .details{
    height: 400px;
  }
  .new-item .details textarea{
    margin-top: 25px
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
  .inbox-container {
    /* grid-template-columns: 1fr;  */
  }
  .threads-card-wrapper {
    height: calc(100vh - 35px);    
    padding-top: 35px;
  }
 }

@media all and (max-width: 480px) {  
  .inbox-container {
    grid-template-columns: 1fr; 
  }
  .threads-card-wrapper {
    height: calc(100vh - 35px);    
    padding-top: 35px;
  }
  .thread-wrapper {
    display: none;
  }
  .threads{
    width: 100%;
    height: calc(100vh - 75px);
    margin-top: 25px;
  }
  .thread-boxes {
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    /* justify-content: center; */
  }
  .thread-box {
    /* max-width: 275px; */
    width: 90%;
  }
 }
</style>