<template>
  <div class="audio-container">
    <h2>Audio</h2>
    <div class="audio-wrapper">
      <div class="audio-table-wrapper">
        <input type="text" class="basic-input" placeholder="search" v-model="audioSearch">
        <vue-table
          :data="gridData"
          :columns="gridColumns"
          :column-type="columnType"
          :filter-key="audioSearch"
          :id-key="'id'"
          :highlighted-entry="selectedAudio['id']"
          @value="recieveID"></vue-table>
      </div>
      <div class="audio-view" v-show="selectedID != ''">
        <div class="audio-header">
          <div :style="{backgroundImage: 'url(' +  selectedAudio.icon + ')'}"
          class="icon"></div>
          <h3>{{selectedAudio.title}}</h3>
        </div>
        <audio-player class="audio-player"
          :url="selectedAudio.url" ></audio-player>
        <div class="audio-info">
          <!-- <button class="section-toggle">Teams</button> -->
          <div class="general-info-panel">
            <h4>General Info</h4>
            <p>Length: {{selectedAudio.length}}</p>
            <p>Views: {{selectedAudio.views}}</p>
          </div>
        </div>        
        <div class="comments-panel">
          <h4>Comments <span>| {{selectedAudio.comments.length}}</span></h4>
          <div class="comments">
            <div class="comment-box" v-for="comment in selectedAudio.comments" :key="comment.id">
              <div class="icon" :style="{backgroundImage: 'url(' +  comment.person.icon + ')'}"></div>
              <div class="comment-info">
                <div class="person-name">{{comment.person.name}}</div>
                <div class="comment-content">{{comment.comment}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTable from '@/components/Table'
import AudioPlayer from '@/components/AudioPlayer'

export default {
  name: 'Audio',
  data () {
    return {
      gridColumns: ['title', 'date', 'length'],
      columnType: {title: 'text', date: 'text', length: 'text'},
      gridData: [
        {icon: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80', title: 'Reframing Jesus: Please Don\'t Settle', date: '1/27/2019', id: 5345, length: '1:23:34', views: '542', url: 'http://static1.squarespace.com/static/563fb2d1e4b07f78f2db4c32/t/5c4f392b0e2e72daaee4c1b0/1548696764069/Reframing+Jesus_+Please+Don%27t+Settle.mp3/original/Reframing+Jesus_+Please+Don%27t+Settle.mp3', icon: 'https://images.unsplash.com/photo-1502006025672-cbfacb752806?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'},
        {icon: 'https://images.unsplash.com/photo-1486645725491-57c86b563b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', title: 'Reframing Jesus: The Sheep Have a Gate', date: '1/19/2019', id: 5787, length: '1:21:12', views: '987', url: 'http://static1.squarespace.com/static/563fb2d1e4b07f78f2db4c32/t/5c453896562fa759dd6010c1/1548040680401/Reframing+Jesus_+The+Sheep+Have+A+Gate.mp3/original/Reframing+Jesus_+The+Sheep+Have+A+Gate.mp3', icon: 'https://images.unsplash.com/photo-1502006025672-cbfacb752806?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'},
        {icon: 'https://images.unsplash.com/photo-1485811904074-04513843270c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', title: 'Reframing Jesus: Grace in the Presence' ,date: '1/13/2019', id: 6759, length: '1:37:00', views: '980', url: 'http://static1.squarespace.com/static/563fb2d1e4b07f78f2db4c32/t/5c3cf0d6032be429c12df414/1547498242443/Reframing+Jesus_+Grace+In+The+Presence.mp3/original/Reframing+Jesus_+Grace+In+The+Presence.mp3', icon: 'https://images.unsplash.com/photo-1502006025672-cbfacb752806?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'},
        {icon: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', title: 'Trust the Promise: God with Us' , date: '12/27/2018', id: 8745, length: '1:19:34', views: '1039', url: 'http://static1.squarespace.com/static/563fb2d1e4b07f78f2db4c32/t/5c3cf0d6032be429c12df414/1547498242443/Reframing+Jesus_+Grace+In+The+Presence.mp3/original/Reframing+Jesus_+Grace+In+The+Presence.mp3', icon: 'https://images.unsplash.com/photo-1502006025672-cbfacb752806?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'}
      ],
      audioSearch: '',
      selectedID: '',
      selectedAudio: {}
    }
  },
  components: {
    VueTable, AudioPlayer
  },
  methods: {
    recieveID(id) {
      this.selectedID = id
      var key = 'id'
      this.selectedAudio = {...this.gridData.find(function (item) {
        return item[key] === id
      })}
      this.selectedAudio['address'] = '2202 Straford Park, Lexington Lexington 40505'
      this.selectedAudio['phone'] = '(606) 637-0799'
      this.selectedAudio['email'] = 'email@email.com'
      this.selectedAudio['teams'] = [
        {
          "name": "Crazy Love",
          "icon": "https://images.unsplash.com/photo-1532498551838-b7a1cfac622e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          "isLeader": false,
          "isServeTeam": false
        },
        {
          "name": "Worship Team",
          "icon": "https://images.unsplash.com/photo-1508349356983-7838c2b04eb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
          "isLeader": true,
          "isServeTeam": true
        }
      ]
      this.selectedAudio["comments"] = [
        {
          comment: 'this is the best sermon ever',
          person: {
            "name": "Bob Jackson",
            "icon": "https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",  
          }
        },
        {
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          person: {
            "name": "John Doe",
            "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
          }
        },
        {
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          person: {
            "name": "John Doe",
            "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
          }
        },
        {
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          person: {
            "name": "John Doe",
            "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
          }
        },
        {
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          person: {
            "name": "John Doe",
            "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
          }
        },
        {
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          person: {
            "name": "John Doe",
            "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
          }
        },
        {
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          person: {
            "name": "John Doe",
            "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
          }
        },
        {
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          person: {
            "name": "John Doe",
            "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
          }
        },
        {
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          person: {
            "name": "John Doe",
            "icon": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
          }
        }
      ]      
      this.selectedAudio["skills"] = [
        { 
          title: 'Singing',
          confirmed: false
        }, { 
          title: 'Drums',
          confirmed: true
        }, { 
          title: 'Videography',
          confirmed: false
        }, { 
          title: 'Preaching',
          confirmed: false
        }
      ],
      this.selectedAudio = {...this.selectedAudio}
    }
  },
  props: {
  },
  mounted() {    
    this.recieveID(5345)
  },
  computed: {
  }
}
</script>

<style scoped>
.audio-container {
  height: 100%;
}
h2 {
  padding-top: 30px;
  padding-left: 20px;
  height: 40px;
}

.audio-wrapper {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
  position: relative;
  height: calc(100% - 70px);
  overflow: hidden;
}

.audio-table-wrapper {
  padding: 20px 30px;
  flex: 1;
}

.audio-view {  
  width: 100%;
  height: 100%;
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  flex: 1;
  height: 100%;
  overflow-y: auto;
}
.audio-view::before {
  content: '';
  border-left: 1px solid #D0D3D6;
  position: absolute;
  height: 60vh;
  left: 0;
  top: 20%;
}
.audio-header {  
  position: relative;
}
.audio-header h3 {
  display: inline;
  margin-right: 20px;
  /* padding: 10px; */
}
.audio-header .icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: inline-flex;
  flex: 1;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  /* position: absolute;
  right: 20px;
  top: 0px; */
}
.audio-view h4{
  margin-top: 20px; 
  margin-bottom: 15px;
}
.audio-view p{
  margin: 10px 10px;
}

.comments {
  max-height: 400px;
  overflow-y: auto;
}
.comment-box {
  margin: 5px;
  padding: 10px;
  transition: all .3s ease;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border-left: 2px white solid;
  cursor: pointer;
}  
.comment-box:hover {
  box-shadow: 0px 2px 4px -2px rgba(128, 128, 128, 0.507);    
}
.comment-box.selected {
  box-shadow: 0px 4px 5px -3px rgba(128, 128, 128, 0.507);
}
.comment-box .icon {
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
.comment-box .comment-info{
  flex: 1;
  padding-left: 10px;
}
.comment-box .comment-info .person-name{
  font-size: 12px;
}
</style>