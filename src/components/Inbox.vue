<template>
  <div class="inbox-container">
    <div class="card-container"><cards
      :cardList="sortedThreads"
      :loading="threadsLoading"
      @selected="selectThread"
      />
    </div>
    <!-- <div class="threads">
      <div class="search-wrapper">
        <input type="text" class="basic-input"
          placeholder="search"
          v-model="threadSearch">
      </div>
      <div class="thread-boxes">
        <div v-for="thread in sortedThreads" :key="thread.id"
          class="thread-box"
          :class="{unread: thread.unreadMessages > 0,
          selected: thread.id === selectedThreadID}"
          @click="selectThread(thread.id)">
            <div class="profile-pic" :style="{backgroundImage: 'url(' +  thread.threadImageThumbnailURL + ')'}"></div>
            <div class="thread-info">
              <div class="sender"> {{thread.title}} </div>
              <div v-if="thread.lastMessage != null" class="message"> {{thread.lastMessage.contents.substring(0, 30) + ""}} </div>
            </div>
        </div>
      </div>
    </div> -->
    <div class="thread-wrapper">
      <div class="thread">
        <div class="new-message-box">
          <input type="text">
        </div>
        <div class="messages" v-if="displayThread == 2">
          <div class="message-box-wrapper">
            <div v-for="(message, index) in messages" :key="message.id"
            class="message-box"
            :class="{self: id == message.fromID,
            simple: index > 0 && id != message.fromID && messages[index - 1].fromID == message.fromID}">
              <div v-if="id != message.fromID && index == 0 || index > 0 && id != message.fromID && messages[index - 1].fromID != message.fromID"
                class="profile-pic" :style="{backgroundImage: 'url(' +  message.fromIDIcon + ')'}"></div>
              <div class="message-info">
                <div v-if="id != peopleHash[message.fromID] != undefined && index == 0 || index > 0 && id != message.fromID && messages[index - 1].fromID != message.fromID
                  && hasThreadInfo"
                  class="user">{{peopleHash[message.fromID].firstName + " " + peopleHash[message.fromID].lastName}}</div>
                <div class="message-content">{{message.contents}}</div>
              </div>
            </div>
          </div>
        </div>
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
      threads: [
        {
          sender: "Sarah Thompson",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: true,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
          id: 'aljk40'
        },
        {
          sender: "John Smith",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: false,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1486645725491-57c86b563b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
          id: '9hohu'
        },
        {
          sender: "Lauren White",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: false,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1485811904074-04513843270c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          id: '9phyp'
        },
        {
          sender: "Bob Jackson",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: true,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          id: '9hph8'
        },
        {
          sender: "Bob Jackson",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: true,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
        },
        {
          sender: "Bob Jackson",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: true,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
        },
        {
          sender: "Bob Jackson",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: true,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
        },
        {
          sender: "Bob Jackson",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: true,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
        },
        {
          sender: "Bob Jackson",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: true,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
        },
        {
          sender: "Bob Jackson",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: true,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
        },
        {
          sender: "Bob Jackson",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: true,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
        }
      ],
      threadsLoading: false,
      thread: {},
      selectedThreadID: -1,
      messages: [
      ],
      id: 1,
      peopleHash: {},
      hasThreadInfo: false,
      hasMessageInfo: false,
      displayThread: 0
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
      this.hasThreadInfo = true
    },
    async getMessages(id) {
      this.messages = []
      const response = await Message.getMessages(id)
      let messages = response['message(s)']
      this.messages = messages
      this.hasMessageInfo = true
    },
    selectThread(id) {
      this.hasThreadInfo = false
      this.hasMessageInfo = false
      this.selectedThreadID = id

      // displayThread waits for getThread() and getMessages()
      // to finish. When displayThread equals 2 we know both
      // functions have run
      this.displayThread = 0
      this.thread = {}
      this.getThread(id).then(() => {this.displayThread += 1})
      this.getMessages(id).then(() => {this.displayThread += 1})
    }
  },
  props: {
  },
  mounted() {    
    this.threadsLoading = true
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
    display: flex;
    flex-direction: row;
    justify-content: stretch;
  }

  .card-container {
    border-right: 1px #E6E9EC solid;
  }
  .thread-wrapper {
    height: calc(100vh - 40px);
    position: relative;
    /* background: red; */
    flex: 1;
  }
  .thread {
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
  }
  .new-message-box {
    width: 100%;
    height: 47;
  }
  .new-message-box input{
    width: calc(100% - 30px);
    padding: 15px;    
    border-top: 1px #E6E9EC solid;
  }
  .new-message-box input:active,
  .new-message-box input:focus{
    outline: none;
  }
  .messages {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
  }
  
  .message-box .profile-pic {
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    border-radius: 50%;
    display: inline-flex;
    flex: 1;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .message-box {
    display: flex;
    padding: 10px;
    margin-top: 20px;
  }
  .message-box .message-info {
    padding: 0px 10px;
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
  .message-box.self {
    display: flex;
    flex-direction: row-reverse;
    text-align: right;
  }
  .message-box.self .message-content{
    padding-left: 60px;
    padding-right: 0px;
  }
  .message-box.simple {
    margin-top: 0px;
  }
  .message-box.simple .message-info{
    padding-left: 40px;
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
  .card-container {
    height: calc(100vh - 75px);    
    padding-top: 35px;
  }
 }

@media all and (max-width: 480px) {
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