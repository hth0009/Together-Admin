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
    <div id="mockups">
      <!-- <div class="floating-image"></div> -->
    </div>
    <!-- <div id="mission-vision" class='parallax-container'>
      <div class="cards forefront-element parallax">
        <div class="card one">
          <h2>ORGANIZE</h2>
            <div class="info">
              <div class="svg-wrapper">
                <svg height="135" width="225" transform="rotate()">
                  <defs> 
                    <linearGradient id="lgrad1" x1="0%" y1="100%" x2="100%" y2="0%" > 
                      <stop offset="0%" style="stop-color:rgb(38,255,172);stop-opacity:1" />
                      <stop offset="100%" style="stop-color:rgb(151,172,232);stop-opacity:1" />
                    </linearGradient> 
                    <linearGradient id="lgrad2" x1="100%" y1="2%" x2="0%" y2="98%" > 
                      <stop offset="0%" style="stop-color:rgb(255,175,166);stop-opacity:1" />
                      <stop offset="100%" style="stop-color:rgb(232,232,56);stop-opacity:1" />
                    </linearGradient> 
                    <linearGradient id="lgrad3" x1="100%" y1="72%" x2="0%" y2="28%" >
                      <stop offset="0%" style="stop-color:rgb(28,255,240);stop-opacity:1" />
                      <stop offset="100%" style="stop-color:rgb(232,232,56);stop-opacity:1" />
                    </linearGradient> 
                  </defs>
                  <g>
                    <title>computer</title>
                    <rect rx="4" id="svg_1" height="125" width="200" y="2.5" x="13" stroke-width="7" stroke="#aaa" fill="none"/>
                    <rect rx="4" id="svg_2" height="8" width="225" y="123" x="0" stroke-opacity="null" stroke-width="7" fill="#bbb"/>
                  </g>
                </svg>
              </div>
              <p>Accessible after creating a church account and logging onto togetheradmin.com. Here the church will be able to access and input their church’s data (such as serve teams, events, scheduling, push notifications, sermons, prayers, and more).</p>
            </div>
          </div>
        <div class="card two">
          <h2>ENGAGE</h2>
          <div class="info">
            <div class="svg-wrapper">
              <svg height="235" width="120" transform="rotate(0)">
                <g>
                  <title>phone</title>
                  <rect stroke="#aaa" rx="19" id="svg_1" height="225" width="110"  y="5" x="5" stroke-width="8" fill="none"/>
                  <rect rx="2" id="svg_3" height="4" width="40" y="215" x="42" fill="#999"/>
                </g>
              </svg>
            </div>
            <p>This information will all then be transferred over to our mobile platform. Every church will have a unique “churchcode” for their administration and members to connect to the Together app. Once plugged in, this churchcode will allow all users to add people as friends, sign up for events and serve teams, see a running prayer wall, and soon access sermons and other provided church media..</p>
          </div>
        </div>
      </div>
    </div> -->
    <div id="features">
      <h1>Everything your church needs</h1>
      <div id="feature-grid">
        <div class="feature noselect"
        v-for="(feature, index) in features"
        :key="index"
        :class="{'selected': feature.selected}">
          <i class="material-icons"
          :class="{'coming-soon-padding': feature.inDev == true}">{{feature.icon}}</i>
          <div class="title">{{feature.title}}</div>
          <div class="coming-soon" v-if="feature.inDev">coming soon</div>
          <div class="description">
            {{feature.description}}
          </div>
        </div>
      </div>
    </div>
    <div id="pricing">
      <h1>Priced to the size of your church!</h1>
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
          <div type="number" class="number">{{'$' + monthlyPayment}}</div>
          <div for="" class="footer">
            per month
          </div>
        </div>
      </div>
      <div class="explain">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sunt, cumque omnis impedit ratione nulla quas et, magnam ipsam corrupti rerum dignissimos rem explicabo ipsum eos, id similique quidem. Quis?</div>
      <button class="basic-button purple">FIND OUT MORE</button>
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
      mainVideoURL: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
      mainImageURL: 'https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      features: [
        {
          title: 'People',
          icon: 'person',
          // description: 'blah blah',
          selected: true
        },
        {
          title: 'Events',
          icon: 'event'
        },
        {
          title: 'Small Groups',
          icon: 'people'
        },
        {
          title: 'Serve Teams',
          icon: 'people'
        },
        {
          title: 'Services',
          icon: 'list'
        },
        {
          title: 'Giving',
          icon: 'panorama_fish_eye',
          inDev: true,
        },
        {
          title: 'Financial',
          icon: 'credit_card',
          inDev: true,
        },
        {
          title: 'Messaging',
          icon: 'message'
        },
        // {
        //   title: 'Meals',
        //   icon: 'message'
        // },
        {
          title: 'Push Notification',
          icon: 'notifications'
        },
        {
          title: 'Prayer Wall',
          icon: 'notes'
        },
        {
          title: 'Analyatics',
          icon: 'bar_chart',
          inDev: true
        },
        {
          title: 'Safe Check In',
          icon: 'child_friendly'
        }
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
  font-weight: lighter;
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
  height: 90vh;
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
  background: -moz-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* ff3.6+ */
  background: -webkit-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* ie10+ */
  background: linear-gradient(294deg, #a29bfe 0%, #55efc4 100%); /* w3c */
  transform: rotate(90deg);
  width: 25px;
  height: 25px;
  border-radius: 40px;
  top: 90vh;
  left: 50vw;
  z-index: 200;
  transform: translate(-50%, -50%);
  vertical-align: middle;
  cursor: pointer;
  text-shadow: 0px 1px 9px #0000006e;
  /* line-height: .5; */
}
#mission-vision {
  height: 500px;
  /* background: rgb(191, 191, 192); */
  /* width: 100vw; */
  position: relative;
  z-index: 200;
}
#mission-vision .cards{
  position: relative;
  padding: 0px 10%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 150px 150px 150px 300px 125px 250px;
  grid-gap: 30px;
}
#mission-vision .card {
  background: white;
  /* border-radius: 5px; */
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.267);
}
#mission-vision .card .info{
  background: white;
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  padding: 20px 30px 20px;
  margin-top: 20px;
  height: 600px;
}
#mission-vision .card .info .svg-wrapper{
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#mission-vision .card .info p{
  margin-bottom: 20px;
  padding: 5px;
  font-size: 1.2rem;
}
.card h2{
  text-align: center;
  color: white;
  font-size: 30px;
  padding-top: 30px;
}
#mission-vision .card.one{
  grid-column: 1/2;
  grid-row: 1/5;
  background: -moz-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* ff3.6+ */
  background: -webkit-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* ie10+ */
  background: linear-gradient(294deg, #a29bfe 0%, #55efc4 100%); /* w3c */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#55efc4', endColorstr='#a29bfe',GradientType=1 ); /* ie6-9 */
  /* background-image: url('https://images.unsplash.com/photo-1496902526517-c0f2cb8fdb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'); */
}
#mission-vision .card.two{
  grid-column: 2/3;
  grid-row: 1/5;
  background: -moz-linear-gradient(331deg, #74b9ff 0%, #74b9ff 1%, #d656ce 100%); /* ff3.6+ */
  background: -webkit-linear-gradient(331deg, #74b9ff 0%, #74b9ff 1%, #d656ce 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(331deg, #74b9ff 0%, #74b9ff 1%, #d656ce 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(331deg, #74b9ff 0%, #74b9ff 1%, #d656ce 100%); /* ie10+ */
  background: linear-gradient(119deg, #74b9ff 0%, #74b9ff 1%, #d656ce 100%); /* w3c */
  /* background-image: url('https://images.unsplash.com/photo-1523626797181-8c5ae80d40c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80') */
}
#mission-vision .card.three{
  grid-column: 3/4;
  grid-row: 1/5;
  background: -moz-linear-gradient(331deg, #D656CE 0%, #55efc4 100%); /* ff3.6+ */
  background: -webkit-linear-gradient(331deg, #D656CE 0%, #55efc4 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(331deg, #D656CE 0%, #55efc4 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(331deg, #D656CE 0%, #55efc4 100%); /* ie10+ */
  background: linear-gradient(119deg, #D656CE 0%, #55efc4 100%); /* w3c */
  /* background-image: url('https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80') */
}

#mockups {
  height: 50vh;
  position: relative;
  background: #c2b2b22c;
}
#mockups .floating-image{  
  width: 100%;
  height: 80vh;

  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 100;

  background-image: url('https://s3.wasabisys.com/cdn.togetheradmin.com/mockups.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}


#features {
  background: #f1f1f1;

  min-height: 100vh;
}
#features h1{
  text-align: center;
  color: #60b3f7;
  margin-bottom: 100px;
  padding-top: 120px;
}
#feature-grid {
  padding: 0px 15% 50px 15%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 1fr;
}
#feature-grid::before {
  content: '';
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}
#feature-grid > *:first-child {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}
#feature-grid .feature{
  border: 1px #60b3f7 solid;
  color: #60b3f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: normal;
}
#feature-grid .feature i{
  width: 100%;
  font-size: 4rem;
  text-align: center;
  margin-bottom: 15px;
  /* text-shadow: 0px 1px 6px #0000002c; */
}
#feature-grid .feature i.coming-soon-padding{
  margin-top: 20px;
}
#feature-grid .feature .title{
  width: 100%;
  font-size: 1.1rem;
  text-align: center;
  font-weight: 600;
  /* text-shadow: 0px 1px 6px #0000002c; */
}
#feature-grid .feature .coming-soon{
  width: 100%;
  font-size: 1.1rem;
  text-align: center;
  font-weight: 600;
  background: #60b3f7;
  font-size: .7rem;
  width: 80px;
  border-radius: 30px;
  margin-top: 10px;
  color: white;
  padding: 2px 4px;
}

#pricing {
  background: #60b3f7;

  min-height: 99.5vh;
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