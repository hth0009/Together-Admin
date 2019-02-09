<template>
  <div class="inbox-container">
    <div class="threads">
      <div class="search-wrapper">
        <input type="text" class="basic-input"
          placeholder="search people"
          v-model="threadSearch">
      </div>
      <div class="thread-boxes">
        <div v-for="thread in sortedThreads" :key="thread.id"
          class="thread-box"
          :class="{unread: thread.unread,
            selected: thread.id === selectedMessage.id}">
            <div class="profile-pic" :style="{backgroundImage: 'url(' +  thread.senderProfilePic + ')'}"></div>
            <div class="thread-info">
              <div class="sender"> {{thread.sender}} </div>
              <div class="message"> {{thread.recentMessage.substring(0, 30) + ""}} </div>
            </div>
        </div>
      </div>
    </div>
    <div class="thread-wrapper">
    <div class="thread">
      <div class="new-message-box">
        <input type="text">
      </div>
      <div class="messages">
        <div class="message-box-wrapper">
          <div v-for="(message, index) in messages" :key="message.id"
          class="message-box"
          :class="{self: message.sender.self,
          simple: index > 0 && !message.sender.self && messages[index - 1].sender.username == message.sender.username}">
            <div v-if="!message.sender.self && index == 0 || index > 0 && !message.sender.self && messages[index - 1].sender.username != message.sender.username"
              class="profile-pic" :style="{backgroundImage: 'url(' +  message.sender.profilePic + ')'}"></div>
            <div class="message-info">
              <div v-if="!message.sender.self && index == 0 || index > 0 && !message.sender.self && messages[index - 1].sender.username != message.sender.username"
                class="user">{{message.sender.name}}</div>
              <div class="message-content">{{message.message}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
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
      selectedMessage: 
        {
          sender: "Sarah Thompson",
          recentMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          unread: true,
          sentTime: '',
          senderProfilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
          id: 'aljk40'
        },
      messages: [
        {
          timeSent: '',
          sender: {
            name: 'Sarah',
            username: 'sarahbeara',          
            profilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
            self: false
          },
          message: 'Hi there. I have a question about how to get plugged in.',
        },
        {
          timeSent: '',
          sender: {
            name: 'Bob',
            username: 'bob',          
            profilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
            self: true
          },
          message: 'How can I help?',
        },
        {
          timeSent: '',
          sender: {
            name: 'Sarah',
            username: 'sarahbeara',          
            profilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
            self: false
          },
          message: 'I\'ve been wanting to serve on a creative team, but I can\'t find any information on one',
        },
        {
          timeSent: '',
          sender: {
            name: 'Bob',
            username: 'bob',          
            profilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
            self: true
          },
          message: 'We actually have been looking for sommeone to lead that team! Would you like to grab a meal and talk about setting up a serve team?',
        },
        {
          timeSent: '',
          sender: {
            name: 'Sarah',
            username: 'sarahbeara',          
            profilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
            self: false
          },
          message: 'That sounds great',
        },
        {
          timeSent: '',
          sender: {
            name: 'Sarah',
            username: 'sarahbeara',          
            profilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
            self: false
          },
          message: 'I just invited you to a meal!',
        },
        {
          timeSent: '',
          sender: {
            name: 'Sarah',
            username: 'sarahbeara',          
            profilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
            self: false
          },
          message: 'Can\'t wait to see you there!',
        },
        {
          timeSent: '',
          sender: {
            name: 'Sarah',
            username: 'sarahbeara',          
            profilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
            self: false
          },
          message: 'Thanks!',
        },
      ]
    }
  },
  components: {
  },
  methods: {
  },
  props: {
  },
  mounted() {    
  },
  computed: {
    sortedThreads() {
      return this.threads
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
  .threads {
    height: calc(100vh - 80px);
    width: 250px;
    border-right: 1px #E6E9EC solid;
  }
  .search-wrapper {
    border-bottom: 1px #E6E9EC solid;
    height: 57px;
  }
  .search-wrapper .basic-input {
    margin: 10px 5px;
  }
  .thread-boxes {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc( 100% - 58px);
  }
  .thread-box {
    margin: 5px;
    padding: 10px;
    transition: all .3s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-left: 2px white solid;
    cursor: pointer;
  }  
  .thread-box.unread {
    border-left: 2px #69CDCF solid;
  }
  .thread-box:hover {
    box-shadow: 0px 2px 4px -2px rgba(128, 128, 128, 0.507);    
  }
  .thread-box.selected {
    box-shadow: 0px 4px 5px -3px rgba(128, 128, 128, 0.507);
  }
  .thread-box .profile-pic {
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
  .thread-box .thread-info{
    flex: 1;
    padding-left: 10px;
  }
  .thread-box .profile-pic img{
  }
  .thread-box .sender{
    /* margin: 5px; */
    font-size: 12px;
    font-weight: bold;
  }
  .thread-box .message{
    font-size: 12px;
  }

  
  .thread-wrapper {
    height: calc(100vh - 80px);
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
</style>