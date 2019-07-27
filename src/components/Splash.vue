<template>
  <div id="splash-container">
    <router-link to="login" id="login">
      LOGIN
    </router-link>
    <div id="video-board">
      <div id="main-video-container">
      <!-- <video-bg :sources="[mainVideoURL]" :img="mainImageURL"></video-bg> -->
      <video autoplay muted loop id="main-video" type="video/mp4" src="https://togethercdn.global.ssl.fastly.net/website_background.mp4"></video>      
        <!-- <img id="main-video" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"> -->
      </div>
      <!-- <img id="scribble-circle" class="noselect" src="@/assets/svg/scribble-circle.svg"> -->
      <div id="main-title" class="">
        <h1 id="bringing">BRINGING YOUR CHURCH</h1>
        <!-- <h1 id="together">together</h1> -->
        <img id="together" src="https://togethercdn.global.ssl.fastly.net/website_title.png" alt="" srcset="">
        <!-- <div id="join" class="basic-button noselect">
          JOIN
        </div> -->
      </div>
      <!-- <button id="join" class="basic-button green">JOIN</button> -->
      <div class="next-page noselect">
        <i class="material-icons">keyboard_arrow_down</i>
      </div>
    </div>
    <div id="showcase">
      <h1>How do we do it?</h1>
      <h3 class="showcase-item-title">{{selectedShowcase}}</h3>
      <transition-group class="phones" name="slide-left" mode="in-out">
        <img key="a" v-show="selectedShowcase == 'PEOPLE'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/people-phone.png" class="phone-1">
        <img key="b" v-show="selectedShowcase == 'PEOPLE'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/friends-phone.png" class="phone-2">

        <img key="c" v-show="selectedShowcase == 'TEAMS'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/teams-phone.png" class="phone-1">
        <img key="d" v-show="selectedShowcase == 'TEAMS'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/teams-details-phone.png" class="phone-2">

        <img key="e" v-show="selectedShowcase == 'CALENDAR'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/calendar-phone.png" class="phone-1">
        <img key="f" v-show="selectedShowcase == 'CALENDAR'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/calendar-details-phone.png" class="phone-2">

        <img key="g" v-show="selectedShowcase == 'MESSAGING'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/messaging-phone.png" class="phone-1">
        <img key="h" v-show="selectedShowcase == 'MESSAGING'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/messaging-details-phone.png" class="phone-2">
      </transition-group>
      <div class="toggle">
        <button
           @click="selectedShowcase = 'PEOPLE'"
          :class="{'selected': selectedShowcase == 'PEOPLE'}"
        ><i class="material-icons">person</i>people</button>
        <button          
          @click="selectedShowcase = 'TEAMS'"
          :class="{'selected': selectedShowcase == 'TEAMS'}"
        ><i class="material-icons">group</i>teams</button>
        <button
          @click="selectedShowcase = 'CALENDAR'"
          :class="{'selected': selectedShowcase == 'CALENDAR'}"
        ><i class="material-icons">event</i> calendar</button>
        <button
          @click="selectedShowcase = 'MESSAGING'"
          :class="{'selected': selectedShowcase == 'MESSAGING'}"
        ><i class="material-icons">send</i>messaging</button>
      </div>
      <transition-group name="slide-right" class="computers">
        <img key="1" v-show="selectedShowcase == 'PEOPLE'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/people-computer.png" class="computer-1">

        <img key="2" v-show="selectedShowcase == 'TEAMS'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/teams-computer.png" class="computer-1">

        <img key="3" v-show="selectedShowcase == 'CALENDAR'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/calender-computer.png" class="computer-1">
        
        <img key="4" v-show="selectedShowcase == 'MESSAGING'" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/messaging-computer.png" class="computer-1">
      </transition-group>
    </div>
    <div id="features">
      <h1>All of this to help your church</h1>
      <div id="feature-wrapper">        
        <div id="feature-description">
          <h3>{{selectedFeature.title}}</h3>
          <div class="description">{{selectedFeature.description}}</div>
        </div>
        <div id="feature-grid">
          <div class="feature noselect"
          v-for="(feature, index) in features"
          :key="index"
          :class="{'selected': selectedFeature.title == feature.title}"
          @click="selectedFeature = feature">
            <i class="material-icons"
            :class="{'coming-soon-padding': feature.inDev == true}">{{feature.icon}}</i>
            <div class="title">{{feature.title}}</div>
            <div class="coming-soon" v-if="feature.inDev">coming soon</div>
          </div>
        </div>
      </div>
    </div>
    <div id="pricing">
      <h1>Use it all for FREE!</h1>
      <div id="price-visualizer">
        <div class="church-size">
          <div for="" class="header">
            How many people do you think will use the app?
          </div>
          <div class="number">
            <input type="number" class="" v-model="churchSize" min="0" max="5000">
            <span>{{churchSize == maxChurchSize ? '+' : ''}}</span>
          </div>
          <div class="slider-wrapper">
            <vue-slider v-model="churchSizePercentage"
              :dotSize="20"          
              :process-style="{ backgroundColor: '#55efc4' }"
              :tooltip="'none'"
              :dot-style="{ backgroundColor: 'white', borderColor: 'white' }"
              :min="0"
              :max="100"/>
          </div>
        </div>
        <div class="monthly-payment">
          <div for="" class="header">
            You church will pay:
          </div>
          <!-- <div type="number" class="number">{{'$' + monthlyPayment}}</div> -->
          <div type="number" class="number">{{'free'}}</div>
          <div for="" class="footer">
            per month
          </div>
        </div>
      </div>
      <div class="explain">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sunt, cumque omnis impedit ratione nulla quas et, magnam ipsam corrupti rerum dignissimos rem explicabo ipsum eos, id similique quidem. Quis?</div>
      <!-- <button class="basic-button orange">FIND OUT MORE</button> -->
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  name: '',
  data () {
    return {
      selectedShowcase: 'PEOPLE',
      selectedFeature: {},
      mainVideoURL: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
      mainImageURL: 'https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      features: [
        {
          title: 'People',
          icon: 'person',
          description: 'Users create a personal account on the mobile side with their individual information which is shown to the administration of the church. These accounts allow them to sign up for events and teams, message other people, post personal prayers, add friends, and stay connected.',
        },
        {
          title: 'Events',
          icon: 'event',
          description: 'Announce event dates, times and locations that will allow for your members to sign up, serve, or RSVP for. By doing this, members can add specific events to their individual or group/team calendars and administrators can see all event attendees.An event can include the people of that event, order of service, videos and pictures, quick links, as well as an action step for the individual: whether the church wants them to sign up, serve, or RSVP.'
        },
        {
          title: 'Small Groups',
          icon: 'people',
          description: 'Establish your church’s small groups, as well as their topics and leaders. See the people in each group, as well as when and where that group meets '
        },
        {
          title: 'Serve Teams',
          icon: 'people',
          description: 'Organize your church’s serve teams by listing the descriptions of the various types and allowing for volunteer signups. Show when and where each team meets during the week or on Sundays.'
        },
        {
          title: 'Services',
          icon: 'list',
          description: 'Let your church know when and where you are meeting for Sunday services. Announce sermon series or even reading plans leading up to Sunday.'
        },
        {
          title: 'Giving',
          icon: 'panorama_fish_eye',
          description: 'Manage your tithes, offerings, and donations all in one place. We have parterned with Dime – Giving  (should be a link to their website) to offer an easy, safe, secure and fast option for mobile giving.'
        },
        {
          title: 'Financial',
          icon: 'credit_card',
          inDev: true,
          description: 'While Partnering with Dime, they will display your church’s financial statements and the generosity of your members all in one place. They also can display your accounting information if you choose to partner with their services for that as well.'
        },
        {
          title: 'Messaging',
          icon: 'message',
          description: 'Allows for your people to connect between groups, teams and the general congregation. Users will be able to harness direct messaging, team messaging and individual messaging in discussion forums that will all appear on the message tab of the mobile app. Members can even direct message the church itself. Here, administration will be able to read it in their inbox on the website or on the mobile app.'
        },
        // {
        //   title: 'Meals',
        //   icon: 'message'
        // },
        // {
        //   title: 'Push Notification',
        //   icon: 'notifications'
        // },
        // {
        //   title: 'Prayer Wall',
        //   icon: 'notes'
        // },
        // {
        //   title: 'Analyatics',
        //   icon: 'bar_chart',
        //   inDev: true
        // },
        // {
        //   title: 'Safe Check In',
        //   icon: 'child_friendly'
        // }
      ],
      churchSizePercentage: 20,
      maxChurchSize: 5000
    }
  },
  components: {
    VueSlider
  },
  methods: {
    loadDrift() {
      
    }
  },
  props: {
  },
  mounted() {
    this.selectedFeature = this.features[0] 
  },
  computed: {
    churchSize: {
      get() {
        // FORMULA FOR CHURCH SIZE = c(e^(slowness * churchSizePerctage) - 1)
        const slowness = 3
        const c = this.maxChurchSize / (Math.exp(slowness) - 1) // so that scale*(e^1 - 1) = 5000
        const percentage = this.churchSizePercentage / 100
        const churchSize = c * (Math.exp(slowness * percentage) - 1)
        return Math.round(churchSize)
      },
      set(newValue) {        
        // FORMULA FOR CHURCH SIZE PERCENTAGE = c(e^(slowness * churchSizePerctage) - 1)
        if (newValue >= this.maxChurchSize) {
          newValue = this.maxChurchSize
        }
        const slowness = 3
        const c = this.maxChurchSize / (Math.exp(slowness) - 1) // so that scale*(e^1 - 1) = 5000
        var percentage = newValue / c
        percentage += 1
        percentage = Math.log(percentage)
        percentage /= slowness
        this.churchSizePercentage = percentage * 100
      }
    },
    monthlyPayment() {
      const size = this.churchSize
      if (size == 0) {
        return 0
      } else if (size <= 100) {
        return 20
      } else if (size <= 250) {
        return 30
      } else if (size <= 500) {
        return 50
      } else if (size <= 1000) {
        return 75
      } else if (size <= 2000) {
        return 110
      } else if (size <= 3000) {
        return 150
      } else if (size <= 4000) {
        return 200
      }
      return 250
    }
  }
}

</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Bad+Script&display=swap');
</style>

<style scoped>
.slide-left-enter-active {
  transition: opacity .5s ease-in, transform .5s ease-out;  
  transition-delay: .1s;
}
.slide-left-leave-active {
  transition: opacity .5s ease-in-out, transform .5s ease-in-out;  
}
.slide-left-leave-to /* .fade-leave-active in <2.1.8 */ {
  transform: translateY(-800px) rotate(5deg); 
}
.slide-left-enter {  
  transform: translateY(800px) rotate(-5deg); 
}

.slide-right-enter-active {
  transition: opacity .5s ease-in, transform .5s ease-out;  
  transition-delay: .1s;
}
.slide-right-leave-active {
  transition: opacity .5s ease-in-out, transform .5s ease-in-out;  
}
.slide-right-leave-to /* .fade-leave-active in <2.1.8 */ {
  transform: translateY(800px) rotate(5deg); 
}
.slide-right-enter {  
  transform: translateY(-800px) rotate(-5deg); 
}

#splash-container {
  /* perspective: 2px; */
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

#login {
  padding: 7.5px 15px;
  text-align: center;
  cursor: pointer;
  background: #00cec9;
  color: white;
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 100;
  text-decoration: none;
  border-radius: 25px;
  border: 5px #00cec9 solid;
  /* border: 3px white solid; */
}

h1 {
  padding-top: 50px;
  font-weight: lighter;
  text-align: center;
  color: #00cec9;
}

.parallax-container {  
  /* transform-style: preserve-3d; */
}
/* .forefront-element {
  position: relative;
  z-index: 600;
  transform: translateZ(1px) scale(.5) translateX(1%) translateY(-65%);
} */
#video-board {
  position: relative;
}
#main-video-container{
  /* width: 100vw; */
  position: relative;
  height: 100vh;
  overflow: hidden;
}
#main-video {  
  /* min-width: 100vmin;
  min-height: 100vmin; */
  max-height: 177vmax;
  max-width: 177vmax;
  width: auto;
  height: auto;
  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 0;
}
#scribble-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  top: 45vh;
  width: 600px;
  height: 300px;
  pointer-events: none;
  /* mix-blend-mode: difference; */
}
#main-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #ffffff;
  width: 90vw;
  font-weight: 100;
  top: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  mix-blend-mode: difference;
  align-items: center;
}
#main-title h1{
  width: 100%;
  text-align: center;
  color: white;
  /* text-shadow: 0px 1px 9px #00000042; */
}
#bringing{
  font-size: 22.5px;
  mix-blend-mode: difference;
}
#together{
  font-size: 50px;
  /* font-family: serif; */
  font-family: 'Bad Script', cursive;
  text-transform: uppercase;
  padding: 5px 0px;
  letter-spacing: 10px;
  vertical-align: middle;
  mix-blend-mode: difference;
  height: 45px;
  /* text-transform: lowercase; */
  /* font-stretch: expanded; */
}
#join {  
  position: absolute;
  top: 60vh;
  left: 50%;
  transform: translate(-50%,-50%);
}
/* #join{
  margin: 10px auto;
  text-align: center;
  width: 120px;
  padding-bottom: 5px;
  cursor: pointer;
  transition: all .3s ease;
  position: relative;
  z-index: 100;
  transition: all 0.1s ease-in-out .2s;
} 
#join:hover {
  width: 55px;
  color: black;
}
#join::before { 
  content: "";
  position: absolute;
  z-index: -1;
  height: 1px;
  bottom: -2px;
  border-radius: 2px;
  right: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  border: 0px rgb(255, 255, 255) solid;
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
}
#join:hover::before {
  height: 32px;
} */
.next-page {
  cursor: pointer;
  font-size: 30px;
  position: absolute;
  color: white;
  padding: 10px;
  background: linear-gradient(45deg, #05e0a2 20%, #00cec9 80%);
  transform: rotate(90deg);
  width: 25px;
  height: 25px;
  border-radius: 40px;
  top: 95vh;
  left: 50vw;
  z-index: 200;
  transform: translate(-50%, -50%);
  vertical-align: middle;
  cursor: pointer;
  text-shadow: 0px 1px 9px #0000006e;
  /* line-height: .5; */
}
#showcase {
  height: 100vh;
  position: relative;
}
#showcase .showcase-item-title {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 15vh;
}
#showcase .phones {
  width: 47.5vw;
  position: absolute;
  right: 5vw;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100vh;
}
#showcase .phones .phone-1{
  max-height: 40vh;
  width: auto;
  max-width: 17.5vw;
  height: auto;
  position: absolute;
  right: 0px;
  z-index: 100;
  bottom: 15vh;
}
#showcase .phones .phone-2{
  max-height: 45vh;
  width: auto;
  max-width: 20vw;
  height: auto;
  position: absolute;
  right: 120px;
  bottom: 15vh;
  z-index: 50;
}
#showcase .computers {
  width: 47.5vw;
  position: absolute;
  right: 5vw;
  height: 100vh;
}
#showcase .computers .computer-1{
  /* max-height: 75vh; */
  width: auto;
  height: auto;
  max-height: 65vh;
  max-width: 75vw;
  /* min-height: 400px; */
  min-width: 40vw;
  position: absolute;
  bottom: 15vh;
  right: 0vw;
  z-index: 25;

}
#showcase .toggle {
  width: 50px;
  height: 140px;
  position: absolute;
  left: 5vw;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  z-index: 300;

  /* box-shadow: 0px 5px 13px -2px #00000040;
  background: white;
  border-radius: 10px; */
}
#showcase .toggle button{
  color: #9b9b9b;
  text-decoration: none;
  margin: 7.5px 0px;
  display: inline-flex;
  align-items: flex-end;
  font-size: 15px;
  text-align: right;
  background: none;
  border: none;
  outline: none;
  
  position: relative;
  text-decoration: none;
  z-index: 100;

  transition: color .3s ease;
}
#showcase .toggle button i{
  font-size: 1rem;
  margin-right: 5px;
}
#showcase .toggle button:hover {
  color: #888b8b;
}
#showcase .toggle button:before {
  content: "";
  position: absolute;
  z-index: 0;
  width: 0%;
  height: .2rem;
  bottom: -.1rem;
  border-radius: 2px;
  right: 0;
  background-color: #00cec9;
  border: 0px #00cec9 solid;
  visibility: hidden;
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}
#showcase .toggle button:hover:before {
  visibility: visible;
  width: 100%;
}
#showcase .toggle button.selected,
#showcase .toggle button.selected i {
  color: white;
}
#showcase .toggle button.selected:before {
  height: 1.5rem; 
  bottom: -.25rem; 
  right: -.1rem;
  border: .1rem #00cec9 solid;
  width: 100%;  
  z-index: -1;
  visibility: visible;
}

#features {
  border-top: 40px #f1f1f1 solid;
  border-bottom: 40px #f1f1f1 solid;

  min-height: 100vh;
  position: relative;
}
#features h1{
  text-align: center;
  color: #00cec9;
  margin-bottom: 50px;
  padding-top: 120px;
}
#feature-wrapper {
  width: 100vw;
}

#feature-description {
  width: 100vw;
  height: 185px;
}
#feature-description h3{
  padding-left: 15vw;
}
#feature-description .description{
  padding: 25px 15vw 0px 15vw;
  line-height: 1.5rem;
  /* text-align: center; */
}
#feature-grid {
  padding: 50px 15vw;
  width: auto;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
#feature-grid .feature{
  color: #818181;
  box-shadow: 0px 5px 13px -2px #00000040;
  border-radius: 10px;
  padding: 5px;
  
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: normal;
  width: 100px;
  height: 100px;
  margin: 10px;

  transition: box-shadow .2s ease;
}
#feature-grid .feature.selected{
  box-shadow: 0px 2px 0px -2px #00000040;
}
#feature-grid .feature i{
  width: 100%;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 5px;
  /* text-shadow: 0px 1px 6px #0000002c; */
}
#feature-grid .feature i.coming-soon-padding{
  /* margin-top: 20px; */
}
#feature-grid .feature .title{
  width: 100%;
  font-size: .8rem;
  text-align: center;
  font-weight: 500;
  /* text-shadow: 0px 1px 6px #0000002c; */
}
#feature-grid .feature .coming-soon{
  display: none;
  width: 100%;
  font-size: 1.1rem;
  text-align: center;
  font-weight: 600;
  background: #00cec9;
  font-size: .7rem;
  width: 80px;
  border-radius: 30px;
  margin-top: 10px;
  color: white;
  padding: 2px 4px;
}

#pricing {
  background: #00cec9;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#pricing h1{
  text-align: center;
  color: white;
  margin-bottom: 80px;
  padding-top: 100px;
}
#price-visualizer {
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr;
}
#price-visualizer .church-size {
  padding: 10%;
  grid-column: 2/3;
  display: grid;
  grid-template-rows: 80px 100px 40px;
  border-right: 1px #ffffff77 solid;
}
#price-visualizer .church-size .header{
  color: white;
  font-size: 30px;
  width: 100%;
  text-align: right;
  padding-bottom: 10px;
  font-weight: normal;
  align-self: flex-end;
}
#price-visualizer .church-size .number{
  color: white;
  font-size: 80px;
  width: 100%;
  text-align: right;
  font-weight: 900;
  align-self: center;
  display: flex;
  justify-content: flex-end;
}
#price-visualizer .church-size .number input{
  background: none;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  color: white;
  font-size: 80px;
  text-align: right;
  font-weight: 900;
  width: 230px;
}
#price-visualizer .church-size .number span{
  color: white;
  font-size: 80px;
  text-align: right;
  font-weight: 900;
  display: inline;
  line-height: initial;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
}
.slider-wrapper {
  padding: 5px;
  padding-left: 10%;
}
#price-visualizer .monthly-payment {
  padding: 10%;
  grid-column: 3/4;
  display: grid;
  grid-template-rows: 80px 100px 40px;
}
#price-visualizer .monthly-payment .header{
  color: white;
  padding-bottom: 20px;
  font-weight: normal;
  width: 100%;
  text-align: left;
  padding-bottom: 10px;
  font-size: 30px;
  font-weight: 500;
  align-self: flex-end;
}
#price-visualizer .monthly-payment .number{
  color: white;
  font-size: 80px;
  width: 100%;
  text-align: left;
  font-weight: 500;
  line-height: 1;
  align-self: center;
}
#price-visualizer .monthly-payment .footer{
  color: white;
  padding-bottom: 20px;
  font-weight: normal;
  width: 100%;
  text-align: left;
  padding-bottom: 10px;
  font-size: 30px;
  font-weight: 500;
  align-self: flex-start;
}
#pricing .explain{
  color: white;
  padding: 20px 10%;
}
#pricing button{
  margin: 30px auto;
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
@media all and (max-width: 768px) {
  #splash-container {
    perspective: 1px;
    perspective-origin: center;
    overflow-x: hidden;
    overflow-y: visible;
  }
  #main-video {
    display: none;
  }
  #main-title h1{
    color: black;
  }
  #main-title #together{
    filter: invert(100%);
  }
}

@media all and (max-width: 480px) {
}
</style>