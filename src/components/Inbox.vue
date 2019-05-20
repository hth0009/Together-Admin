<template>
  <div class="inbox-container">
    <div class="threads-card-wrapper"
      :class="{'inactive': selectedThreadID != '' || -1}">
      <cards
        :cardList="sortedThreads"
        :loading="threadsLoading"
        :selectedID="selectedThreadID + ''"
        @selected="selectThread"
        />
      <div id="add-new-thread"
        @click="'hi'">
        <i class="material-icons noselect">add</i>
      </div>
    </div>
    <div class="thread-wrapper">
      <div class="thread">
        <div class="thread-header">{{thread.title}}</div>
        <div class="messages" v-if="displayThread == 2">
          <div class="message-box-wrapper">
            <div v-for="(message, index) in reversedMessages" :key="message.id"
            class="message-box"
            :class="{
                'self': id === message.fromID,
                'repeat': index > 0 && reversedMessages[index - 1].fromID == reversedMessages[index].fromID 
              }">
              <!-- <div
                class="profile-pic" :style="{backgroundImage: 'url(' +  message.fromIDIcon + ')'}"></div> -->
              <div class="time" v-if="index == 0">{{formatDate(message.sentAt)}}</div>
              <div class="time" v-else>{{formatDate(message.sentAt, reversedMessages[index - 1].sentAt)}}</div>
              <div
                class="profile-pic" :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1536562833330-a59dc2305a5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)'}"></div>
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
            <input type="text" v-model="newMessageContent"  v-on:keyup.enter="sendMessage">
            <i @click="sendMessage" class="material-icons noselect">send</i>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
import Threads from '@/services/threads'
import Message from '@/services/messages'
import Cards from '@/components/CardList'

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
      id: 1,
      peopleHash: {},
      displayThread: -1,
      newMessageContent: '',
    }
  },
  components: {
    Cards
  },
  methods: {    
    async getThreads() {
      const response = await Threads.getThreads()
      let threads = response['thread(s)']
      this.threads = threads
    },
    async getThread(id) {
      const response = await Threads.getThread(id)
      let thread = response.thread
      let members = thread.members['threadMembers(s)']
      this.peopleHash = []
      for (let index = 0; index < members.length; index++) {
        const member = members[index];
        this.peopleHash[member.personID] = member
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
    selectThread(id) {
      if (id == undefined) {
        return
      }

      this.$router.push(`/app/inbox/${id}`)

      this.selectedThreadID = id
      this.messages = []

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
      const fromID = this.id
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
    formatDate(messageDate, nextDate = '') {
      messageDate += 'Z'
      nextDate += 'Z'
      const date1 = new Date(messageDate)
      const date2 = new Date(nextDate)      
      var diffTime = Math.abs(date2.getTime() - date1.getTime());
      diffTime /= 1000
      // If meesage sent within 2.5 min of previous message, don't display time
      if (diffTime < 150) {
        return ''
      }
      // If message was sent today, format for HH:MM AM/PM
      else if (date1.toDateString() == new Date().toDateString()) {
        return this.getHHMM(date1)
      }
      // If less than a week (604800) diff in seconds from today, display week day
      else if (diffTime < 604800) {
        if (date1.toDateString() == date2.toDateString()) {
          return ''
        }
        return this.getDayOfWeek(date1)
      }
      // Else, format to MM/DD/YYYY
      else {        
        if (date1.toDateString() == date2.toDateString()) {
          return ''
        }
        return this.getMMDDYY(date1)
      }
    },
    getMMDDYY(dt) {
      var res = "";
      res += this.formatDigits(dt.getMonth() + 1);
      res += "/";
      res += this.formatDigits(dt.getDate());
      res += "/";
      res += this.formatDigits(dt.getFullYear());
      return res;
    },
    getHHMM(dt) {
      var res = "" 
      res += this.formatDigits(dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours());
      res += ":";
      res += this.formatDigits(dt.getMinutes());
      res += " " + dt.getHours() > 11 ? " PM" : " AM";
      if (res.charAt(0) == '0') {
        res = res.slice(1, 8)
      }
      return res;
    },
    getDayOfWeek(dt){
      var res = ""

      var weekday = new Array(7);
      weekday[0] =  "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      res = weekday[dt.getDay()];

      return res
    },
    formatDigits(val) {
        val = val.toString();
        return val.length == 1 ? "0" + val : val;
    }
  },
  props: {
  },
  mounted() {    
    this.threadsLoading = true
    this.selectThread(this.$route.params.id)
    this.getThreads().then(() => {this.threadsLoading = false})
  },
  computed: {
    sortedThreads() {
      var threads = Array(this.threads.length)
      for (let index = 0; index < this.threads.length; index++) {
        const thread = this.threads[index];
        const lastMessage = thread.lastMessage != null ? thread.lastMessage.contents : ''
        const newThread = {
          id: thread.id,
          title: thread.title,
          // profile: thread.threadImageThumbnailURL,
          profile: 'https://images.unsplash.com/photo-1536562833330-a59dc2305a5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          // superscript: 'thead.sentTime',
          subtext: lastMessage,
          unread: thread.unreadMessages > 0
        }
        threads[index] = (newThread)
      }
      return threads
    },
    reversedMessages() {
      return this.messages.reverse()
    }
  }
}
</script>

<style scoped>
  .inbox-container {
    display: grid;
    grid-template-columns: 250px 1fr;
  }

  .threads-card-wrapper {
    overflow-y: auto;
    /* height: calc(100vh - 40px); */
    height: 100vh;
    width: 100%;
    position: relative;
    border-right: #f0f0f0 1px solid;
  }
  .thread-wrapper {
    /* height: calc(100vh - 40px); */
    height: 100vh;
    position: relative;
    /* background: red; */
    flex: 1;
  }
  .thread {
    display: grid;
    grid-template-rows: 30px auto 47px;
    height: 100%;
  }
  .thread-header {
    padding: 10px 15px;
    background: white;
    border-left: #f0f0f0 1px solid;
  }
  .new-message-box {
    width: 100%;
    height: 47px;
    display: grid;
    grid-template-columns: 1fr 50px;
    border-top: 1px #E6E9EC solid;
    border-left: 1px #E6E9EC solid;
    /* align-content: center; */
    /* justify-items: center; */
  }
  .new-message-box input{
    padding: 15px;  
    padding-right: 0px; 
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
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
  }
  
  .message-box-wrapper {
    display: flex;
    flex-direction: column;
  }
  .message-box {
    /* display: flex; */
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 35px auto;
    padding: 10px;
    margin-top: 20px;
  }
  .message-box.self {
    grid-template-columns: auto 35px;
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
    font-weight: bold;
    padding-bottom: 5px;
    font-size: 14px;
  }
  .message-box .message-content {
    font-size: 14px;    
    padding-left: 0px;
    padding-right: 60px;
  }
  .message-box.self .message-info {
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

  
#add-new-thread {
  width: 25px;
  height: 25px;
  padding: 5px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: #00cec9;
  border-radius: 50px;
  cursor: pointer;
  z-index: 100;
}

#add-new-thread i {    
  color: white;
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