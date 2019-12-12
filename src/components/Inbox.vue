<template>
  <div class="inbox-container">
    <sweet-modal icon="success" ref="newMessageSelect">
      <h3>New Message Created!</h3>
    </sweet-modal>    
    <div class="page-wrapper">
      <div class="page-card-wrapper"
        :class="{'inactive': selectedID != '' || -1}">
        <cards
          :cardList="sortedThreads"
          :loading="loading"
          :selectedID="selectedID + ''"
          :hasAddNew="true"
          @selected="recieveID"
          @onAddNew="createNewItem"
          />
      </div>
      <div class="thread-wrapper" v-if="!creatingNewItem && selectedID != -1">
        <div class="thread">
          <div class="thread-header noselect">{{selectedThread.title}}</div>
          <div class="messages">
            <div class="message-box-wrapper">
              <div v-for="(message, index) in selectedThread.messages" :key="message.id"
              class="message-box"
              :class="{
                  'self': personID == message.fromID,
                  'repeat': index > 0 && selectedThread.messages[index - 1].person.id == selectedThread.messages[index].person.id 
                }">
                <!-- <div
                  class="profile-pic" :style="{backgroundImage: 'url(' +  message.fromIDIcon + ')'}"></div> -->
                <div class="time" v-if="index == 0">{{getDateFormate(message.sentAt)}}</div>
                <div class="time" v-else>{{getDateFormate(message.sentAt, selectedThread.messages[index - 1].sentAt)}}</div>
                <div
                  class="profile-pic"
                >
                  <avatar
                    :height="30"
                    :url="message.person.personImageThumbnailURL"
                    :title="message.person.firstName + ' ' + message.person.lastName"
                  />
                </div>
                <div class="message-info">
                  <div
                    class="user">{{message.person.firstName + " " + message.person.lastName}}</div>
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
          <!-- <div class="type">            
            <custom-radio v-model="newThread.type" :options="['direct', 'team']"></custom-radio>
          </div> -->
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
import { SweetModal } from 'sweet-modal-vue'

import store from '../store'
import {formatDate} from '../utils/helpers'
import { clearInterval } from 'timers'; 

import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';

export default {
  name: 'Messages',
  data () {
    return {
      threadSearch: '',
      // threads: [],
      // threadsLoading: false,
      thread: {},
      selectedID: -1,
      messages: [],
      personID: -1,
      peopleHash: {},
      displayThread: -1,
      newMessageContent: '',
      // creatingNewItem: false,
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
    Cards, CustomRadio, Avatar, SweetModal
  },
  mounted() {
    // this.personID = store.state.personID
    // this.threadsLoading = true
    
    if(this.threads.length < 1) {
      this.getThreads();
    }
    this.selectThread(this.$route.params.id)
  },
  watch: {
    newThreadType: {
      handler: function(newValue) {
        console.log(newValue)
      },
      deep: true
    },
    selectedID(val) {
      const reloadNumber = Number(this.messagesReload)
      if (!!reloadNumber) {
        // window.clearInterval(reloadNumber)
      }
      if (val != -1 && val != undefined) {
        // this.messagesReload = setInterval(function() {
        //   this.updateMessages(val)
        // }.bind(this), 5000)
      }
    }
  },
  methods: {    
    ...mapMutations('messages', [
      'setThreads',
      'setThread',
      'setSelectedThread',
      'setLoading',
      'setThreadLoading',
      'setCreatingNewItem'
    ]),
    ...mapActions('messages', ['getThreads', 'getSelectedThread']),    
    recieveID(id) {
      if (!id) {
        return;
      }
      if (id === -1) {
        this.selectedID = id;
        this.$router.push(`/app/messages/`);
        return;
      }
      if(this.creatingNewItem) {
        this.cancelCreatingNewItem();
      }
      this.$router.push(`/app/messages/${id}`);
      this.selectedID = id;
      return this.getSelectedThread({ threadID: id});
    },
    // getThreads() {
    //   const response = Threads.getThreads().then(response => {
    //     console.log(response)
    //     this.threads = response.data.messagethreads
    //   })
    //   return response
    // },
    // async getTeams() {
    //   // const response = await Teams.getTeamsByID(this.personID)
    //   const response = await Teams.getTeamsByChurch()
    //   let teams = response['team(s)']
    //   this.teams = teams
    // },
    // async getPeople() {
    //   // const response = await Teams.getTeamsByID(this.personID)
    //   const response = await People.getPeople()
    //   let people = response['person(s)']
    //   this.people = people
    // },
    // async getThread(id) {
    //   // const response = await Threads.getThread(id)
    //   // // console.log(thread)
    //   // let thread = response.thread
    //   // Threads.patchMessageRead(thread.threadPersonID)
    //   // let members = thread.members['threadMembers(s)']
    //   // this.peopleHash = []
    //   // for (let index = 0; index < members.length; index++) {
    //   //   const member = members[index].person;
    //   //   this.peopleHash[member.id] = member
    //   // }
    //   // this.thread = thread
    // },
    // async getMessages(id) {
    //   const response = await Message.getMessages(id)
    //   let messages = response['message(s)']
    //   return messages
    // },
    // async postMessage(fromID, threadID, content) {
    //   const response = await Message.postMessage(fromID, threadID, content)
    // },
    // async postDirectThread(senderID, recipientID, title) {
    //   const response = await Threads.postDirectThread(senderID, recipientID, title).then(response => {
    //     console.log(response)
    //     const newID = response.data.newResourceID
    //     this.postMessage('', newID, this.newThread.firstMessage).then(() => {
    //       this.$refs.newMessageSelect.open()
    //       this.selectThread(newID)
    //       this.newThread = {
    //         recipientID: -1,
    //         teamID: -1,
    //         firstMessage: '',
    //         type: 0
    //       }
    //     })
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
    // // On new thread member selected
    // assignMember (member) {
    //   console.log(member)
    // },
    getDateFormate(date1, date2) {
      return formatDate(date1, date2)
    },
    createNewItem() {
      this.selectedID = -1;
      this.$router.push(`/app/messages/`)

      this.creatingNewItem = true;
    },
    selectThread(id) {
      if (!id) {
        return
      }
      if (id == '-1') {
        this.selectedID = id
        this.$router.push(`/app/messages/`)
        return
      }
      
      // clearInterval(this.messageReload)

      this.$router.push(`/app/messages/${id}`)

      this.selectedID = id
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
      const threadID = this.selectedID
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
    async createThread() {      
      this.$root.$emit('loading', true)
      const thread = this.newThread
      if (thread.type == 0) {
        await this.postDirectThread(this.personID, thread.recipientID, 'New Direct Message: ' + new Date().toLocaleTimeString())
      }
      this.$root.$emit('loading', false)
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
    // reversedMessages() {
    //   return this.messages.reverse()
    // },
    // formatedPeople() {
    //   const people = this.people
    //   var formatedPeople = []
    //   for (let index = 0; index < people.length; index++) {
    //     const person = people[index]
    //     if (person.id != this.personID) {
    //       formatedPeople.push({
    //         name: person.firstName + " " + person.lastName,
    //         id: person.id
    //       })
    //     }
    //   }
    //   return formatedPeople
    // },    
    ...mapState('messages', ['threads', 'selectedThread', 'loading', 'threadLoading', 'creatingNewItem']),
  }
}
</script>

<style scoped>

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
    overflow: hidden;
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