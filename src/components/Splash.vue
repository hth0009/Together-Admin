<<<<<<< HEAD
<template>
  <div id="splash-container">
    <navbar/>
    <register-church ref="register"></register-church>
    <div id="video-board">
      <div id="main-left-panel">
        <!-- <svg id="main-blob" xmlns="http://www.w3.org/2000/svg" width="1067.589" height="1044.218" viewBox="0 0 1067.589 1044.218">
          <path id="Path_25" data-name="Path 25" d="M-1414.081,65.147c172.7,74.657,237.793,198.227,258.3,445.549,23.247,280.41-68.954,137.076-72.732,324.065s-158.657,273.872-332.424,273.872-447.639-158.657-453.306-372.089c-4.4-165.835-169.213-256.077-190.392-344.012s-18.594-158.588-.455-210.129,98.285-89.822,176.867-117.988C-2027.524,64.453-1412.6,65.342-1414.081,65.147Z" transform="translate(2219.621 -64.415)" fill="#0ad2cf"/>
        </svg> -->
        <svg xmlns="http://www.w3.org/2000/svg"  id="main-blob"  width="841.029" height="857.742" viewBox="0 0 841.029 857.742">
          <path id="Path_52" data-name="Path 52" d="M-1585.03,55.53c136.05,58.814,187.329,156.16,203.482,351,18.313,220.9-54.321,107.987-57.3,255.293s-124.988,215.752-261.879,215.752-352.643-124.987-357.107-293.125c-3.468-130.642-133.3-201.733-149.988-271.007s-14.648-124.933-.359-165.536,87.225-81.955,150.346-105.1S-1917.983,19.7-1799.4,19.853C-1676.022,20.016-1584.435,55.608-1585.03,55.53Z" transform="translate(2219.621 -19.829)" fill="#0ad2cf"/>
        </svg>


        <div id="main-title" class>
          <img
            id="together"
            src="https://togethercdn.global.ssl.fastly.net/website_title.png"
            alt
            srcset
          />
          <div class="subtitle">
            <p>
              a church engagement platform that
              provides your church all the tools they
              need to connect with your people
              <br />
              <br />
              <br />for free
            </p>
          </div>
        </div>        
        <button
          id="join"
          class="basic-button noselect"
          @click="openRegisterWindow"
        >SIGN YOUR CHURCH UP</button>
      </div>
      <div class="computer-video-wrapper">
        <div class="main-computer-wrapper">
          <div class="main-computer">
            <img key="b" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/clean-cutout-computer.png"/>
          </div>          
          <div id="main-video-container">
            <video
              autoplay
              muted
              loop
              id="main-video"
              type="video/mp4"
              src="https://togethercdn.global.ssl.fastly.net/assets/home-page/website-background.mp4"
            ></video>
          </div>
        </div>
        <div class="main-phone-wrapper">
          <img src="https://togethercdn.global.ssl.fastly.net/assets/mockups/clean-cutout-iphone.png">
          <div class="main-phone-video-container">
            <video
            autoplay
            muted
            loop
            id="main-video"
            type="video/mp4"
            src="https://togethercdn.global.ssl.fastly.net/assets/home-page/website-background.mp4"
            ></video>
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="problems">
      <h1>Running a church can be complicated</h1>
      <div class="big-words">
      <div class="big-word">{{this.selectedProblem1}}</div>
      <div class="big-word">{{this.selectedProblem2}}</div>
      <div class="big-word">{{this.selectedProblem3}}</div>
      </div>
    </div>-->
    <div id="showcase">
      <svg id="showcase-blob-blue" xmlns="http://www.w3.org/2000/svg" width="437.651" height="638.846" viewBox="0 0 437.651 638.846"><path id="Path_26" data-name="Path 26" d="M-1799.247,26.738c133.671,41.491,180.581,112.137,194.117,275.41s-40.15,79.815-42.349,188.692-92.38,159.466-193.559,159.466A204.055,204.055,0,0,1-1875.9,647.1c-54.969-9.588-118.438-40.077-164.694-84.265,1.037-.757,1.037-540.443.741-540.122C-1954.6,6.395-1859.935,7.9-1799.247,26.738Z" transform="translate(-1602.945 650.306) rotate(-180)" fill="#0ad2cf"/></svg>
      <svg id="showcase-blob-green" xmlns="http://www.w3.org/2000/svg" width="303.368" height="240.069" viewBox="0 0 303.368 240.069"><path id="Path_38" data-name="Path 38" d="M-2024.086,18.791c64.134,19.907,105.816,74.144,104.76,126.382s-76.267,172.8-124.811,172.8-113.605-7.575-115.188-67.2,35.2-71.081,35.2-134.4S-2088.22-1.116-2024.086,18.791Z" transform="translate(317.973 2159.375) rotate(90)" fill="#00e55c"/></svg>
      <h1>
        We help your
        <span
          :class="{'selected': selectedShowcase == 'PEOPLE' || selectedShowcase == 'TEAMS'}"
        >church</span> do
        <span :class="{'selected': selectedShowcase == 'CALENDAR'}">things</span>
        <span :class="{'selected': selectedShowcase == 'MESSAGING'}"> well</span>
      </h1>
      <!-- <h1>How do we do it?</h1> -->
      <div class="toggle">
        <button
          @click="selectedShowcase = 'PEOPLE'"
          :class="{'selected': selectedShowcase == 'PEOPLE'}"
        >
          <i class="material-icons">person</i>people
        </button>
        <button
          @click="selectedShowcase = 'TEAMS'"
          :class="{'selected': selectedShowcase == 'TEAMS'}"
        >
          <i class="material-icons">group</i>teams
        </button>
        <button
          @click="selectedShowcase = 'CALENDAR'"
          :class="{'selected': selectedShowcase == 'CALENDAR'}"
        >
          <i class="material-icons">event</i> calendar
        </button>
        <button
          @click="selectedShowcase = 'MESSAGING'"
          :class="{'selected': selectedShowcase == 'MESSAGING'}"
        >
          <i class="material-icons">send</i>messaging
        </button>
      </div>
      <h3 class="showcase-item-title">{{selectedShowcase}}</h3>
      <div class="computer-cutout-wrapper">
        <div class="computer-cutout">
          <img
            key="b"
            src="https://togethercdn.global.ssl.fastly.net/assets/mockups/cutout-computer.png"
          />
          <transition-group name="fade-right" class="computer-screens" mode="in-out">
            <img
              key="1"
              v-show="selectedShowcase == 'PEOPLE'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/people-computer.png"
            />

            <img
              key="2"
              v-show="selectedShowcase == 'TEAMS'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/teams-computer.png"
            />

            <img
              key="3"
              v-show="selectedShowcase == 'CALENDAR'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/calendar-details-computer.png"
            />

            <img
              key="4"
              v-show="selectedShowcase == 'MESSAGING'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/messaging-computer.png"
            />
          </transition-group>
        </div>
      </div>
      <div class="phone-cutout-wrapper">
        <div class="phone-1-cutout phone-cutout">
          <img
            key="b"
            src="https://togethercdn.global.ssl.fastly.net/assets/mockups/cutout-phone.png"
          />
          <transition-group class="phone-screens" name="fade-left" mode="in-out">
            <img
              key="a"
              v-show="selectedShowcase == 'PEOPLE'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/people-phone.png"
            />

            <img
              key="c"
              v-show="selectedShowcase == 'TEAMS'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/teams-phone.png"
            />

            <img
              key="e"
              v-show="selectedShowcase == 'CALENDAR'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/calendar-details-phone.png"
            />

            <img
              key="g"
              v-show="selectedShowcase == 'MESSAGING'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/messaging-phone.png"
            />
          </transition-group>
        </div>
        <div class="phone-2-cutout phone-cutout">
          <img
            key="b"
            src="https://togethercdn.global.ssl.fastly.net/assets/mockups/cutout-phone.png"
          />
          <transition-group class="phone-screens" name="fade-left" mode="in-out">
            <img
              key="b"
              v-show="selectedShowcase == 'PEOPLE'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/friends-phone.png"
            />

            <img
              key="d"
              v-show="selectedShowcase == 'TEAMS'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/team-details-phone.png"
            />

            <img
              key="f"
              v-show="selectedShowcase == 'CALENDAR'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/calendar-details-phone.png"
            />

            <img
              key="h"
              v-show="selectedShowcase == 'MESSAGING'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/messaging-details-phone.png"
            />
          </transition-group>
        </div>
      </div>
    </div>
    <div id="features">
      <h1>All of this to help your church</h1>
      <div class="features-phone-wrapper">
        <div class="phone-3-cutout phone-cutout">
          <img
            key="b"
            src="https://togethercdn.global.ssl.fastly.net/assets/mockups/cutout-phone.png"
          />
          <transition-group class="phone-screens" name="fade-left" mode="in-out">
            <img
              key="a"
              v-show="selectedFeature.title == 'People'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/people-phone.png"
            />

            <img
              key="c"
              v-show="selectedFeature.title == 'Serve Teams'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/teams-phone.png"
            />

            <img
              key="e"
              v-show="selectedFeature.title == 'Events'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/calendar-details-phone.png"
            />

            <img
              key="g"
              v-show="selectedFeature.title == 'Messaging'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/messaging-phone.png"
            />
          </transition-group>
        </div>
      </div>
      <div class="feature-blobs">
        <svg
          id="feature-blob-1"
          xmlns="http://www.w3.org/2000/svg"
          width="206.262"
          height="237.114"
          viewBox="0 0 206.262 237.114"
        >
          <path
            id="Path_40"
            data-name="Path 40"
            d="M135.289,299.182C199.423,279.275,241.1,225.038,240.05,172.8c-.385-19.067-10.65-47.236-25.919-75.374-.32-.773-210.033.115-211.176-.048,8.4,35.844,32.295,53.187,32.295,104.222C35.25,264.919,71.155,319.089,135.289,299.182Z"
            transform="translate(303.368 -2.955) rotate(90)"
            fill="#00e55c"
          />
        </svg>
        <svg
          id="feature-blob-2"
          xmlns="http://www.w3.org/2000/svg"
          width="768.643"
          height="861.623"
          viewBox="0 0 768.643 861.623"
        >
          <path
            id="Path_39"
            data-name="Path 39"
            d="M-2011.439,215.264c326.406,91.381,370.521,169.455,368.3,279.142s-93.068,160.653-195,160.653-525.119-145.116-528.443-270.314S-2337.844,123.883-2011.439,215.264Z"
            transform="translate(-982.049 -1095.401) rotate(-120)"
            fill="#0ad2cf"
          />
        </svg>
      </div>
      <div id="feature-wrapper">
        <div id="feature-description">
          <h3>{{selectedFeature.title}}</h3>
          <div class="description">{{selectedFeature.description}}</div>
        </div>
        <div id="feature-grid">
          <div
            class="feature noselect"
            v-for="(feature, index) in features"
            :key="index"
            :class="{'selected': selectedFeature.title == feature.title}"
            @click="selectedFeature = feature"
          >
            <i
              class="material-icons"
              :class="{'coming-soon-padding': feature.inDev == true}"
            >{{feature.icon}}</i>
            <div class="title">{{feature.title}}</div>
            <div class="coming-soon" v-if="feature.inDev">coming soon</div>
          </div>
        </div>
      </div>1
    </div>
    <div id="how">
      <h1>HOW?</h1>
    </div>
    <div id="personal-simple-free">
      <personal-simple-free/>
    </div>
    <!-- <div id="personal-simple-free">
      <div class="bars">
        <svg
          id="top-squig"
          xmlns="http://www.w3.org/2000/svg"
          width="1920"
          height="104.06"
          viewBox="0 0 1920 104.06"
        >
          <path
            data-name="Path 45"
            d="M0,0S129.838-38.447,391.9-43.358,1163.1,58.864,1448.467,60.506,1920,0,1920,0V60.506H0Z"
            transform="translate(0 43.522)"
            fill="#00cec9"
          />
        </svg>

        <div class="bar left top" id="personal">
          <h2 class="title">Personal</h2>
          <div class="description">Get to know your people as they get involved</div>
        </div>
        <div class="earth-blob">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="568.568"
            height="782.572"
            viewBox="0 0 568.568 782.572"
          >
            <path
              id="Path_44"
              data-name="Path 44"
              d="M-1946.022,972.694s-237.037,31.3-270.406-44.667c-101.005-465.805-361.073-334.27-284.139-501.97,71.508-111.586,247.211-67.735,311.576-156.057,68.489-93.008,242.969-71.288,242.969-71.288Z"
              transform="translate(2514.59 -196.51)"
              fill="#00e55c"
            />
          </svg>
        </div>
        <div class="cloud1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="316.299"
            height="98.448"
            viewBox="0 0 316.299 98.448"
          >
            <path
              id="Path_51"
              data-name="Path 51"
              d="M-221.057,3738.179c-22.271-23.92-105.58-23.1-161.669-19.8S-521.3,3741.479-518,3781.071c2.158,25.893,75.885,32.994,112.178,19.8s69.939,9.773,112.178,13.2C-171.567,3823.963-198.787,3762.1-221.057,3738.179Z"
              transform="translate(518.096 -3716.68)"
              fill="#fff"
            />
          </svg>
        </div>
        <div class="cloud2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="106.847"
            height="99.709"
            viewBox="0 0 106.847 99.709"
          >
            <path
              id="Path_50"
              data-name="Path 50"
              d="M-551.277,4111.007c-62.284,5.361-96.272,29.092-99.074,45.9-3.3,19.8-39.217,59.681,82.86,53.083,5.371-.291,10.537-.745,15.672-1.368C-552.417,4207.423-550.107,4111.541-551.277,4111.007Z"
              transform="translate(657.788 -4111.007)"
              fill="#fff"
            />
          </svg>
        </div>
        <div class="cloud3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="356.424"
            height="117.486"
            viewBox="0 0 356.424 117.486"
          >
            <path
              id="Path_49"
              data-name="Path 49"
              d="M-384.628,4261.418c-93.225-4.368-115.422,28.1-124.3,30.8s-130.959,5.411-75.468,43.287,153.156,51.4,199.768,37.876,141.736-11.526,141.736-12.682,1.155-67,0-68.482S-384.628,4261.418-384.628,4261.418Z"
              transform="translate(598.804 -4261.014)"
              fill="#fff"
            />
          </svg>
        </div>
        <div class="bar right" id="simple">
          <h2 class="title">Simple</h2>
          <div class="description">We take care of the hard stuff, so you can focus on what matters.</div>
        </div>
        <div class="bar left" id="free">
          <h2 class="title">Free</h2>
          <div class="description">Never budget to use our platform.</div>
        </div>
        <svg
          id="bottom-squig"
          xmlns="http://www.w3.org/2000/svg"
          width="1920"
          height="62.548"
          viewBox="0 0 1920 62.548"
        >
          <path
            id="Path_46"
            data-name="Path 46"
            d="M0,278H1920s-493.309,62.548-973.309,62.548S0,278,0,278Z"
            transform="translate(0 -278)"
            fill="#00cec9"
          />
        </svg>
      </div>
    </div> -->
    <!-- <div id="pricing">
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
          <div type="number" class="number">{{'$' + monthlyPayment}}</div>
          <div type="number" class="number">{{'free'}}</div>
          <div for="" class="footer">
            per month
          </div>
        </div>
      </div>
      <div class="explain">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sunt, cumque omnis impedit ratione nulla quas et, magnam ipsam corrupti rerum dignissimos rem explicabo ipsum eos, id similique quidem. Quis?</div>
    </div>-->
    <!-- <div id="get-started">
      <div class="texts">
        <h1 id="get-started-header">Get Started Today</h1>
        <h4 id="together-thing">Sign your church up for the Together today!</h4>
      </div>
      <div class="buttons">
        <button
          id="sign-up"
          class="basic-button noselect"
          @click="openRegisterWindow"
        >SIGN YOUR CHURCH UP</button>
        <div id="contact-us" class="noselect">CONTACT US</div>
      </div>
    </div> -->
    <div id="contact-us">
      <contact-us/>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import Navbar from "./Navbar.vue"
import ContactUs from "./ContactUs.vue";
import PersonalSimpleFree from "./PersonalSimpleFree";

import RegisterChurch from "@/components/RegisterChurch";

export default {
  name: "Hello",
  data() {
    return {
      selectedShowcase: "PEOPLE",
      selectedFeature: {},
      selectedProblem1: "",
      selectedProblem2: "",
      selectedProblem3: "",
      scrollWindow: {},
      problems: [
        "communication",
        "giving",
        "connection",
        "taxes",
        "scheduling",
        "organization",
        "outreach",
        "commitment",
        "social",
        "messaging",
        "scheduling",
        "volunteers",
        "development"
      ],
      mainVideoURL: "http://media.w3.org/2010/05/sintel/trailer.mp4",
      mainImageURL:
        "https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      features: [
        {
          title: "People",
          icon: "person",
          description:
            "Users create a personal account on the mobile side with their individual information which is shown to the administration of the church. These accounts allow them to sign up for events and teams, message other people, post personal prayers, add friends, and stay connected."
        },
        {
          title: "Events",
          icon: "event",
          description:
            "Announce event dates, times and locations that will allow for your members to sign up, serve, or RSVP for. By doing this, members can add specific events to their individual or group/team calendars and administrators can see all event attendees.An event can include the people of that event, order of service, videos and pictures, quick links, as well as an action step for the individual: whether the church wants them to sign up, serve, or RSVP."
        },
        {
          title: "Small Groups",
          icon: "people",
          description:
            "Establish your church's small groups, as well as their topics and leaders. See the people in each group, as well as when and where that group meets "
        },
        {
          title: "Serve Teams",
          icon: "people",
          description:
            "Organize your church's serve teams by listing the descriptions of the various types and allowing for volunteer signups. Show when and where each team meets during the week or on Sundays."
        },
        {
          title: "Services",
          icon: "list",
          description:
            "Let your church know when and where you are meeting for Sunday services. Announce sermon series or even reading plans leading up to Sunday."
        },
        {
          title: "Giving",
          icon: "panorama_fish_eye",
          description:
            "Manage your tithes, offerings, and donations all in one place. We have parterned with Dime – Giving  (should be a link to their website) to offer an easy, safe, secure and fast option for mobile giving."
        },
        {
          title: "Financial",
          icon: "credit_card",
          inDev: true,
          description:
            "While Partnering with Dime, they will display your church's financial statements and the generosity of your members all in one place. They also can display your accounting information if you choose to partner with their services for that as well."
        },
        {
          title: "Messaging",
          icon: "message",
          description:
            "Allows for your people to connect between groups, teams and the general congregation. Users will be able to harness direct messaging, team messaging and individual messaging in discussion forums that will all appear on the message tab of the mobile app. Members can even direct message the church itself. Here, administration will be able to read it in their inbox on the website or on the mobile app."
        }
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
      maxChurchSize: 5000,
      registering: false
    };
  },
  components: {
    VueSlider,
    RegisterChurch,
    Navbar,
    ContactUs,
    PersonalSimpleFree
  },
  methods: {
    loadDrift() {},
    openRegisterWindow() {
      console.log(this.$refs);
      this.$refs.register.open();
      this.registering = true;
    },
    handleScroll() {
      const index1 =
        Math.round((this.scrollWindow.scrollTop + 10) / 75) %
        this.problems.length;
      const index2 =
        Math.round((this.scrollWindow.scrollTop + 100) / 75) %
        this.problems.length;
      const index3 =
        Math.round((this.scrollWindow.scrollTop + 200) / 75) %
        this.problems.length;
      this.selectedProblem1 = this.problems[index1];
      this.selectedProblem2 = this.problems[index2];
      this.selectedProblem3 = this.problems[index3];
    }
  },
  props: {},
  mounted() {
    this.selectedFeature = this.features[0];
    this.scrollWindow = document.getElementById("splash-container");
    this.scrollWindow.addEventListener(
      "scroll",
      function() {
        this.handleScroll();
      }.bind(this)
    );
  },
  destroyed() {
    this.scrollWindow.removeEventListener(
      "scroll",
      function() {
        this.handleScroll();
      }.bind(this)
    );
  },
  computed: {
    churchSize: {
      get() {
        // FORMULA FOR CHURCH SIZE = c(e^(slowness * churchSizePerctage) - 1)
        const slowness = 3;
        const c = this.maxChurchSize / (Math.exp(slowness) - 1); // so that scale*(e^1 - 1) = 5000
        const percentage = this.churchSizePercentage / 100;
        const churchSize = c * (Math.exp(slowness * percentage) - 1);
        return Math.round(churchSize);
      },
      set(newValue) {
        // FORMULA FOR CHURCH SIZE PERCENTAGE = c(e^(slowness * churchSizePerctage) - 1)
        if (newValue >= this.maxChurchSize) {
          newValue = this.maxChurchSize;
        }
        const slowness = 3;
        const c = this.maxChurchSize / (Math.exp(slowness) - 1); // so that scale*(e^1 - 1) = 5000
        var percentage = newValue / c;
        percentage += 1;
        percentage = Math.log(percentage);
        percentage /= slowness;
        this.churchSizePercentage = percentage * 100;
      }
    },
    monthlyPayment() {
      const size = this.churchSize;
      if (size == 0) {
        return 0;
      } else if (size <= 100) {
        return 20;
      } else if (size <= 250) {
        return 30;
      } else if (size <= 500) {
        return 50;
      } else if (size <= 1000) {
        return 75;
      } else if (size <= 2000) {
        return 110;
      } else if (size <= 3000) {
        return 150;
      } else if (size <= 4000) {
        return 200;
      }
      return 250;
    }
  }
};
</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Bad+Script&display=swap");
</style>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 3rem;
  padding-top: 50px;
  text-align: center;
}

.fade-right-enter-active {
  transition: opacity 0.3s ease-in, transform 0.5s ease-out;
  transition-delay: 0.1s;
  z-index: 100;
  position: relative;
}
.fade-right-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  z-index: 0;
  position: relative;
}
.fade-right-leave-to {
  z-index: 0;
  opacity: 0;
}
.fade-right-enter {
  transform: translateX(-15px);
  opacity: 0;
  z-index: 100;
}
.fade-left-enter-active {
  transition: opacity 0.3s ease-in, transform 0.5s ease-out;
  transition-delay: 0.1s;
  z-index: 100;
  position: relative;
}
.fade-left-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  z-index: 0;
  position: relative;
}
.fade-left-leave-to {
  z-index: 0;
  opacity: 0;
}
.fade-left-enter {
  transform: translateX(75px);
  opacity: 0;
  z-index: 100;
}

#splash-container {
  /* perspective: 2px; */
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.no-scroll {
  height: 100vh;
  overflow: hidden;
}

#login {
  padding: 7.5px 15px;
  text-align: center;
  cursor: pointer;
  background: #00cec9;
  color: white;
  position: absolute;
  right: 30px;
  top: 20px;
  z-index: 100;
  text-decoration: none;
  border-radius: 25px;
  border: 5px #00cec9 solid;
  /* border: 3px white solid; */
}

.parallax-container {
  /* transform-style: preserve-3d; */
}
/* .forefront-element {
  position: relative;
  z-index: 600;
  transform: translateZ(1px) scale(.5) translateX(1%) translateY(-65%);
} */
#together-badge {
  position: absolute;
  height: 70px;
  top: 50px;
}
#video-board {
  position: relative;
  height: 850px;
  /* overflow: hidden; */
}
#main-left-panel {
  margin-left: 10vw;
  position: relative;
  z-index: 50;
}
#main-blob {
  position: absolute;
  top: -100px;
  left: -200px;
  z-index: -1;  
  height: 1000px;
}
#main-title {
  position: absolute;
  top: 0;
  top: 40vh;
}
#main-title h1 {
}
.subtitle {
  margin-left: 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5rem;
  color: white;
  width: 30%;
}
#together {
  height: 60px;
  margin-bottom: 15px;
}
#join {
  position: absolute;
  top: 0;
  margin-top: 85vh;
  font-size: 22px;
  font-weight: 600;
  box-shadow: 0px 5px 13px -2px #00000040;
}
.computer-video-wrapper {
  position: relative;
  left: 45vw;
  top: calc(65vh + 10vw);
  transform: translateY(-50%);
  z-index: 100;
}
.main-computer-wrapper {
  position: absolute;
  height: 30vw;
  bottom: 0px;
}
.main-computer {
  height: 100%;
  width: auto;
}
.main-computer img {
  height: 100%;
  z-index: 100;
}
#main-video-container {
  position: absolute;
  z-index: -1;
  overflow: hidden;
  left: 12%;
  top: 5%;
  bottom: 10%;
  width: 78%;
}
#main-video {
  height: 100%;
}
.main-phone-wrapper img {
  height: 100%;
}
.main-phone-wrapper {
  position: absolute;
  bottom: 0px;
  height: 20vw;
  z-index: 400;
  left: 35vw;
  margin-left: 50px;
}
.main-phone-video-container {
  position: absolute;
  z-index: -1;
  left: 12%;
  width: 85%;
  top: 2%;
  height: 96%;
  overflow: hidden;
  border-radius: 10px;
}
#scribble-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 45vh;
  width: 600px;
  height: 300px;
  pointer-events: none;
  /* mix-blend-mode: difference; */
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
  font-size: 1rem;
  padding: 10px;
  position: absolute;
  color: white;
  padding: 10px 20px;
  text-shadow: 0px 0px 6px #000000b9;
  /* background: linear-gradient(45deg, #05e0a2 20%, #00cec9 80%); */
  transform: rotate(90deg);
  border-radius: 40px;
  top: 97.5vh;
  left: 50vw;
  z-index: 200;
  transform: translate(-50%, -50%);
  vertical-align: middle;
  cursor: pointer;
  /* line-height: .5; */
}
/* .next-page {
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
} */
#problems {
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-image: url(https://togethercdn.global.ssl.fastly.net/assets/home-page/lots-of-people.png);

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#problems h1 {
  background: white;
  color: #808080;
  padding: 50px;
}
#problems .big-words {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  height: 110vh;
}
#problems .big-word {
  display: block;
  font-size: 5rem;
  font-weight: 900;
  color: white;
  /* mix-blend-mode: difference; */
  text-transform: uppercase;
  background: #00cec9;
  padding: 10px 30px;
  letter-spacing: 10px;
  margin: 40px 0px;
  word-wrap: unset;
  overflow: hidden;
  white-space: nowrap;
  cursor: default;
  /* text-align: center; */
}

#showcase {
  height: 850px;
  position: relative;
}
#showcase h1 {
  color: #979797;
}
#showcase h1 span {
  transition: all 0.3s ease;
  bottom: 0px;
  position: relative;
}
#showcase h1 span.selected {
  color: #00cec9;
  bottom: 3px;
  left: 0px;
  text-shadow: -2px 3px 4px #00000023;
}
#showcase .showcase-item-title {
  text-align: center;
  /* position: absolute; */
  margin-top: 50px;
  display: block;
}

.computer-cutout-wrapper {
  height: 500px;

  position: absolute;
  left: 50vw;
  transform: translateX(-50%);
  bottom: 10vh;
  z-index: 300;
}
.computer-cutout {
  height: 100%;
  position: absolute;
  transform: translateX(-50%);
  bottom: 0px;
  z-index: 100;
}
.computer-cutout::after {
  content: "";
  background: white;
  height: 80%;
  width: 80%;
  display: inline-block;
  position: absolute;
  z-index: -1;
  right: 10%;
  top: 10%;
}
.computer-cutout img {
  height: 100%;
  width: auto;
  position: relative;
  z-index: 200;
}
#showcase .computer-screens {
  position: absolute;
  z-index: 50;
  left: 13%;
  top: 11%;
  bottom: 12%;
  /* overflow: hidden; */
}
#showcase .computer-screens img {
  width: auto;
  height: 100%;
  position: absolute;
}

#showcase .phone-cutout-wrapper {
  height: 350px;

  position: absolute;
  left: calc(50vw + 225px);
  bottom: 10vh;
  /* bottom: calc(10vh + 26px); */
  z-index: 300;
}
.phone-cutout {
  position: absolute;
  bottom: 0px;
  z-index: 100;
}
.phone-cutout::after {
  content: "";
  background: white;
  position: absolute;
  z-index: -1;
  right: 4.5%;
  width: 80%;
  top: 3%;
  height: 94.5%;
}
.phone-1-cutout {
  height: 100%;
}
.phone-2-cutout {
  height: 80%;
  left: 125px;
}
.phone-1-cutout img,
.phone-2-cutout img,
.phone-3-cutout img {
  height: 100%;
  width: auto;
  position: relative;
  z-index: 200;
}
.phone-screens {
  position: absolute;
  z-index: 50;
  right: 5%;
  width: 79%;
  top: 3%;
  height: 94.5%;
  overflow: hidden;
}
.phone-screens img {
  width: 100%;
  height: 100%;
  position: absolute;
}
#showcase-blob-blue {
  position: absolute;
  transform: scale(0.9) translate(10%, 10%);
  right: 0;
  top: -150px;
}
#showcase-blob-green {
  z-index: -1;
  position: absolute;
  transform: scale(0.9) translate(10%, 10%);
  left: 20px;
  top: -120px;
}
#showcase .phones .phone-1 {
  /* max-height: 40vh;
  width: auto;
  max-width: 17.5vw;
  height: auto;
  position: absolute;
  right: 0px;
  z-index: 100;
  bottom: 15vh; */
}
#showcase .phones .phone-2 {
  /* max-height: 45vh;
  width: auto;
  max-width: 20vw;
  height: auto;
  position: absolute;
  right: 120px;
  bottom: 15vh;
  z-index: 50; */
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
  z-index: 500;

  /* box-shadow: 0px 5px 13px -2px #00000040;
  background: white;
  border-radius: 10px; */
}
#showcase .toggle button {
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

  transition: color 0.3s ease;

  cursor: pointer;
}
#showcase .toggle button i {
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
  height: 0.2rem;
  bottom: -0.1rem;
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
  transition: all 0.3s ease-in-out 0s;
}
#showcase .toggle button.selected:before {
  height: 1.5rem;
  bottom: -0.25rem;
  right: -0.1rem;
  border: 0.1rem #00cec9 solid;
  width: 100%;
  z-index: -1;
  visibility: visible;
}

#features {
  min-height: 850px;
  position: relative;
}
#features h1 {
  text-align: center;
  color: #00cec9;
  margin-bottom: 60px;
  padding-top: 110px;
  font-weight: 400;
  font-size: 40px;
}
#feature-wrapper {
  width: 100vw;
}
.features-phone-wrapper {
  height: 350px;

  position: absolute;
  left: calc(12vw);
  bottom: 36vh;
  /* bottom: calc(10vh + 26px); */
  z-index: 300;
}
.phone-3-cutout {
  height: 100%;
}
.feature-blobs {
  position: relative;
}
#feature-blob-1 {
  z-index: -1;
  position: absolute;
  right: 0;
  top: 200px;
  transform: scale(0.9) translate(10%, 0);
}
#feature-blob-2 {
  z-index: -1;
  position: absolute;
  left: -110px;
  top: -300px;
  transform: scale(0.85);
}
#feature-description {
  width: 90vw;
  height: 380px;
  font-size: 25px;
}
#feature-description h3 {
  padding-left: 28vw;
  color: black;
  font-size: 55px;
  font-weight: 600;
}
#features h4 {
  text-align: center;
  font-weight: 400;
}
#feature-description .description {
  padding: 5px 0vw 0px 28vw;
  line-height: 2rem;
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
#feature-grid .feature {
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
  width: 6vw;
  height: 6vw;
  margin: 12px;

  transition: box-shadow 0.2s ease;
}
#feature-grid .feature.selected {
  box-shadow: 0px 1px 0px -2px #00000040;
}
#feature-grid .feature i {
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 5px;
  /* text-shadow: 0px 1px 6px #0000002c; */
}
#feature-grid .feature i.coming-soon-padding {
  /* margin-top: 20px; */
}
#feature-grid .feature .title {
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
  font-weight: 500;
  /* text-shadow: 0px 1px 6px #0000002c; */
}
#feature-grid .feature .coming-soon {
  display: none;
  width: 100%;
  font-size: 1.1rem;
  text-align: center;
  font-weight: 600;
  background: #00cec9;
  font-size: 0.7rem;
  width: 80px;
  border-radius: 30px;
  margin-top: 10px;
  color: white;
  padding: 2px 4px;
}
#how {
  text-align: center;
  margin-bottom: 60px;
}
#how h1 {
  color: black;
  font-weight: 400;
}
#personal-simple-free {
  height: 600px;
}
#simple {
  margin: 25px 0px;
}
#personal-simple-free .bars {
  padding: 50px 0px;
  display: block;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: stretch;
  position: relative;
}
.earth-blob {
  position: absolute;
  z-index: 100;
  vertical-align: right;
  bottom: 80px;
  transform: scale(0.75) translate(25%, 0);
  right: 0;
}
.cloud1 {
  position: absolute;
  z-index: 100;
  vertical-align: right;
  bottom: 550px;
  transform: scale(0.75);
  right: 0;
}
.cloud2 {
  position: absolute;
  z-index: 160;
  vertical-align: right;
  bottom: 300px;
  transform: scale(0.75) translate(25%, 0);
  right: 0;
}
.cloud3 {
  position: absolute;
  z-index: 160;
  vertical-align: right;
  bottom: 160px;
  transform: scale(0.75) translate(25%, 0);
  right: 0;
}
#personal-simple-free #top-squig {
  position: absolute;
  top: 50px;
  /* transform: translateX(5px) */
}
#simple {
  position: relative;
  z-index: 150;
}
#personal-simple-free .bars .bar {
  padding: 40px 20vw;
  background: #00cec9;
  color: white;
}
#personal-simple-free .bars .bar.top {
  margin-top: 104px;
}
#personal-simple-free .bars .title {
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 10px;
}
#personal-simple-free .bars .description {
  font-size: 1.5rem;
  line-height: 1.25;
  width: 500px;
}
#personal-simple-free .bar.left .title {
  line-height: 1.25;
}
#personal-simple-free .bar.right .title {
  line-height: 1.25;
  text-align: right;
}
#personal-simple-free .bar.left .description {
  line-height: 1.25;
}
#personal-simple-free .bar.right .description {
  line-height: 1.25;
  text-align: right;
  margin-left: calc(60vw - 510px);
}
#pricing {
  background: #00cec9;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#pricing h1 {
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
#price-visualizer .church-size .header {
  color: white;
  font-size: 30px;
  width: 100%;
  text-align: right;
  padding-bottom: 10px;
  font-weight: normal;
  align-self: flex-end;
}
#price-visualizer .church-size .number {
  color: white;
  font-size: 80px;
  width: 100%;
  text-align: right;
  font-weight: 900;
  align-self: center;
  display: flex;
  justify-content: flex-end;
}
#price-visualizer .church-size .number input {
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
#price-visualizer .church-size .number span {
  color: white;
  font-size: 80px;
  text-align: right;
  font-weight: 900;
  display: inline;
  line-height: initial;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
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
#price-visualizer .monthly-payment .header {
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
#price-visualizer .monthly-payment .number {
  color: white;
  font-size: 80px;
  width: 100%;
  text-align: left;
  font-weight: 500;
  line-height: 1;
  align-self: center;
}
#price-visualizer .monthly-payment .footer {
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
#pricing .explain {
  color: white;
  padding: 20px 10%;
}
#pricing button {
  margin: 30px auto;
}
#get-started {
  height: 700px;
  text-align: center;
  vertical-align: middle;
  position: relative;
}
#get-started-header {
  font-weight: 600;
  margin: 20px 0;
  color: black;
  padding: 0;
}
#together-thing {
  font-weight: 500;
  font-size: 23px;
  margin: 20px 0;
  color: black;
}
#sign-up {
  font-size: 22px;
  font-weight: 600;
  margin-top: 15vh;
  padding: 15px 25px;
}
#contact-us {
  margin-top: 50px;
  height: 750px;
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
@media all and (max-width: 425px) {
  #main-left-panel {
    margin-left: 0;
  }
  #together-badge {
    height: 15vw;
    max-height: 75px;
    left: 50vw;
    transform: translateX(-50%);
  }
  .main-phone-wrapper {
    margin-left: 0;
    height: 35vw;
  }
  #login {
    background: none;
    border: none;
    font-weight: 600;
    text-shadow: 0px 1px 6px #0000002c
  }
  #main-title {
    top: 125px;
    left: 50vw;
    transform: translateX(-50%);
  }
  #main-blob {
    top: -200px;
    left: 50vw;
    transform: scale(0.8) translateX(-50%);
  }
  #together {
    height: 10vw;
    margin-bottom: 5vw;
    max-height: 50px;
  }
  .subtitle {
    font-size: 15px;
    line-height: 1.2rem;
    font-weight: 600;
    width: 100%;
  }
  .computer-video-wrapper {
    left: 11vw;
    top: 78vh;
  }
  .main-computer-wrapper {
    height: 46vw;
    bottom: 0;
  }
  #join {
    font-size: 12px;
    left: 50%;
    transform: translateX(-50%);
  }
  #showcase {
    height: 52vh;
  }
  #showcase-blob-blue {
    transform: scale(0.3) translate(117%, 35%);
    top: -31vh;
  }
  #showcase-blob-green {
    transform: scale(0.3) translate(-175%, -40%);
    top: -30vh;
    left: 20px;
  }
  #showcase h1 {
    text-align: right;
    width: 80%;
    right: 12px;
    font-size: 1.6rem;
    position: absolute;
    color: black;
    margin-right: 4vw;
    top: -15%;
  }
  #showcase .showcase-item-title {
    display: none;
  }
  #showcase .computer-cutout-wrapper {
    height: 175px;
    left: 50vw;
    bottom: 12vh;
  }
  #showcase .phone-cutout-wrapper {
    height: 125px;
    left: calc(12vw + 220px);
    bottom: 12vh;
  }
  .phone-2-cutout {
    left: 32px;
  }
  #showcase .toggle {
    top: 82%;
    flex-direction: row;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    left: 45vw;
  }
  #showcase .toggle .material-icons {
    display: none;
  }
  #showcase .toggle button {
    padding: 1px 12px;
    color: black;
    font-weight: 600;
  }
  #showcase .toggle button.selected {
    border-radius: 50px;
  }
  #features h1 {
    font-weight: 600;
    font-size: 22px;
  }
  .features-phone-wrapper {
    height: 145px;
    left: calc(4vw);
    bottom: 304px;
  }
  #feature-description {
    width: 92vw;
    height: 210px;
    font-size: 12px;
  }
  #feature-description h3 {
    padding-left: 30vw;
    font-size: 21px;
    font-weight: 600;
  }
  #feature-description .description {
    padding: 5px 0 0 30vw;
    line-height: 1.15rem;
  }
  #feature-grid {
    padding: 50px 12vw;
  }
  #feature-grid .feature {
    padding: 14px;
    width: 8vw;
    height: 8vw;
    margin: 4px;
  }
  #feature-grid .feature i {
    font-size: 1rem;
  }
  #feature-grid .feature .title {
    font-size: 0.5rem;
  }
  #feature-blob-1 {
    top: 120px;
    transform: scale(0.3) translate(115%, 0);
  }
  #feature-blob-2 {
    left: -352px;
    top: -326px;
    transform: scale(0.35);
  }
  .earth-blob {
    bottom: -162px;
    transform: scale(0.3) translate(118%, 0);
  }
  .cloud1 {
    bottom: 240px;
    transform: scale(0.3);
    right: -60px;
  }
  .cloud2 {
    bottom: 115px;
    transform: scale(0.3) translate(117%, 0);
  }
  .cloud3 {
    bottom: 60px;
    transform: scale(0.3) translate(117%, 0);
  }
  #bottom-squig {
    width: 120%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 14px;
  }
  #personal-simple-free .bars .title {
    font-size: 1.35rem;
  }
  #personal-simple-free .bars .bar {
    padding: 17px 10vw;
  }
  #personal-simple-free .bars .description {
    font-size: .8rem;
    width: 72%;
  }
  #personal-simple-free .bar.right .description{
    margin-left: 0;
    width: 75%;
    padding-left: 25%;
  }
  #simple {
    margin: 14px 0;
  }
  #personal-simple-free #top-squig {
    width: 168%;
    top: 92px;
  }
  #get-started {
    height: 67vh;
    bottom: 45px;
  }
  #get-started-header {
    font-size: 1.5rem;
    text-align: left;
  }
  #together-thing {
    font-size: .9rem;
    text-align: left;
  }
  .texts {
    width: 80%;
    margin-left: 30px;
  }
  .buttons {
    text-align: left;
    margin-left: 22px
  }
  #sign-up {
    font-size: 16px;
    padding: 10px 14px;
    margin-top: 5vh;
  }
  #contact-us {
    margin-left: 14px;
    margin-top: 12px;
  }
}
=======
<template>
  <div id="splash-container">
    <navbar :parentDivID="'splash-container'" :displayScrollValue="30"/>
    <register-church ref="register"></register-church>
    <div id="hero">
      <div id="main-title" class>
        <img
          id="together-title"
          src="https://togethercdn.global.ssl.fastly.net/assets/logo/title_black.png"
          alt
          srcset
        />
        <div id="subtitle">
          <p>
            a church engagement platform that
            provides your church all the tools they
            need to connect with your people
            <br />
            <br />
            <br />for free
          </p>
        </div>
        <button id="early-access" class="gs-basic-button big">GET EARLY ACCESS</button>
      </div>
      <div id="hero-computers">        
        <div class="computer-video-wrapper">
          <div class="main-computer-wrapper">
            <div class="main-computer">
              <img key="b" src="https://togethercdn.global.ssl.fastly.net/assets/mockups/clean-cutout-computer.png"/>
            </div>          
            <div id="main-computer-video-container">
              <video
                autoplay
                muted
                loop
                id="main-computer-video"
                type="video/mp4"
                src="https://togethercdn.global.ssl.fastly.net/assets/home-page/website-background.mp4"
              ></video>
            </div>
          </div>
          <div class="main-phone-wrapper">
            <img src="https://togethercdn.global.ssl.fastly.net/assets/mockups/clean-cutout-iphone.png">
            <div class="main-phone-video-container">
              <video
              autoplay
              muted
              loop
              id="main-computer-video"
              type="video/mp4"
              src="https://togethercdn.global.ssl.fastly.net/assets/home-page/website-background.mp4"
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="problems">
      <h1>Running a church can be complicated</h1>
      <div class="big-words">
      <div class="big-word">{{this.selectedProblem1}}</div>
      <div class="big-word">{{this.selectedProblem2}}</div>
      <div class="big-word">{{this.selectedProblem3}}</div>
      </div>
    </div>-->
    <div id="features">
      <h1>
        You get all of this
      </h1>
      <!-- <h1>How do we do it?</h1> -->
      <div class="toggle">
        <button
          @click="selectedShowcase = 'PEOPLE'"
          :class="{'selected': selectedShowcase == 'PEOPLE'}"
        >
          <i class="material-icons">person</i>people
        </button>
        <button
          @click="selectedShowcase = 'TEAMS'"
          :class="{'selected': selectedShowcase == 'TEAMS'}"
        >
          <i class="material-icons">group</i>teams
        </button>
        <button
          @click="selectedShowcase = 'CALENDAR'"
          :class="{'selected': selectedShowcase == 'CALENDAR'}"
        >
          <i class="material-icons">event</i> calendar
        </button>
        <button
          @click="selectedShowcase = 'MESSAGING'"
          :class="{'selected': selectedShowcase == 'MESSAGING'}"
        >
          <i class="material-icons">send</i>messaging
        </button>
      </div>
      <h3 class="features-item-title">{{selectedShowcase}}</h3>
      <div id="feature-devices">
      <div class="computer-cutout-wrapper">
        <div class="computer-cutout">
          <img
            key="b"
            src="https://togethercdn.global.ssl.fastly.net/assets/mockups/cutout-computer.png"
          />
          <transition-group name="fade-right" class="computer-screens" mode="in-out">
            <img
              key="1"
              v-show="selectedShowcase == 'PEOPLE'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/people-computer.png"
            />

            <img
              key="2"
              v-show="selectedShowcase == 'TEAMS'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/teams-computer.png"
            />

            <img
              key="3"
              v-show="selectedShowcase == 'CALENDAR'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/calendar-details-computer.png"
            />

            <img
              key="4"
              v-show="selectedShowcase == 'MESSAGING'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/messaging-computer.png"
            />
          </transition-group>
        </div>
      </div>
      <div class="phone-cutout-wrapper">
        <div class="phone-1-cutout phone-cutout">
          <img
            key="b"
            src="https://togethercdn.global.ssl.fastly.net/assets/mockups/cutout-phone.png"
          />
          <transition-group class="phone-screens" name="fade-left" mode="in-out">
            <img
              key="a"
              v-show="selectedShowcase == 'PEOPLE'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/people-phone.png"
            />

            <img
              key="c"
              v-show="selectedShowcase == 'TEAMS'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/teams-phone.png"
            />

            <img
              key="e"
              v-show="selectedShowcase == 'CALENDAR'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/calendar-details-phone.png"
            />

            <img
              key="g"
              v-show="selectedShowcase == 'MESSAGING'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/messaging-phone.png"
            />
          </transition-group>
        </div>
        <div class="phone-2-cutout phone-cutout">
          <img
            key="b"
            src="https://togethercdn.global.ssl.fastly.net/assets/mockups/cutout-phone.png"
          />
          <transition-group class="phone-screens" name="fade-left" mode="in-out">
            <img
              key="b"
              v-show="selectedShowcase == 'PEOPLE'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/friends-phone.png"
            />

            <img
              key="d"
              v-show="selectedShowcase == 'TEAMS'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/team-details-phone.png"
            />

            <img
              key="f"
              v-show="selectedShowcase == 'CALENDAR'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/calendar-details-phone.png"
            />

            <img
              key="h"
              v-show="selectedShowcase == 'MESSAGING'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/messaging-details-phone.png"
            />
          </transition-group>
        </div>
      </div>
      </div>
    </div>
    <div id="features">
      <h1>What you get</h1>
      <div class="features-phone-wrapper">
        <div class="phone-3-cutout phone-cutout">
          <img
            key="b"
            src="https://togethercdn.global.ssl.fastly.net/assets/mockups/cutout-phone.png"
          />
          <transition-group class="phone-screens" name="fade-left" mode="in-out">
            <img
              key="a"
              v-show="selectedFeature.title == 'People'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/people-phone.png"
            />

            <img
              key="c"
              v-show="selectedFeature.title == 'Serve Teams'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/teams-phone.png"
            />

            <img
              key="e"
              v-show="selectedFeature.title == 'Events'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/calendar-details-phone.png"
            />

            <img
              key="g"
              v-show="selectedFeature.title == 'Messaging'"
              src="https://togethercdn.global.ssl.fastly.net/assets/mockups/messaging-phone.png"
            />
          </transition-group>
        </div>
      </div>
      <div id="feature-wrapper">
        <div id="feature-description">
          <h3>{{selectedFeature.title}}</h3>
          <div class="description">{{selectedFeature.description}}</div>
        </div>
        <div id="feature-grid">
          <div
            class="feature noselect"
            v-for="(feature, index) in features"
            :key="index"
            :class="{'selected': selectedFeature.title == feature.title}"
            @click="selectedFeature = feature"
          >
            <i
              class="material-icons"
              :class="{'coming-soon-padding': feature.inDev == true}"
            >{{feature.icon}}</i>
            <div class="title">{{feature.title}}</div>
            <div class="coming-soon" v-if="feature.inDev">coming soon</div>
          </div>
        </div>
      </div>1
    </div>
    <div id="personal-simple-free">
      <personal-simple-free/>
    </div>
    <!-- <div id="personal-simple-free">
      <div class="bars">
        <svg
          id="top-squig"
          xmlns="http://www.w3.org/2000/svg"
          width="1920"
          height="104.06"
          viewBox="0 0 1920 104.06"
        >
          <path
            data-name="Path 45"
            d="M0,0S129.838-38.447,391.9-43.358,1163.1,58.864,1448.467,60.506,1920,0,1920,0V60.506H0Z"
            transform="translate(0 43.522)"
            fill="#00cec9"
          />
        </svg>

        <div class="bar left top" id="personal">
          <h2 class="title">Personal</h2>
          <div class="description">Get to know your people as they get involved</div>
        </div>
        <div class="earth-blob">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="568.568"
            height="782.572"
            viewBox="0 0 568.568 782.572"
          >
            <path
              id="Path_44"
              data-name="Path 44"
              d="M-1946.022,972.694s-237.037,31.3-270.406-44.667c-101.005-465.805-361.073-334.27-284.139-501.97,71.508-111.586,247.211-67.735,311.576-156.057,68.489-93.008,242.969-71.288,242.969-71.288Z"
              transform="translate(2514.59 -196.51)"
              fill="#00e55c"
            />
          </svg>
        </div>
        <div class="cloud1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="316.299"
            height="98.448"
            viewBox="0 0 316.299 98.448"
          >
            <path
              id="Path_51"
              data-name="Path 51"
              d="M-221.057,3738.179c-22.271-23.92-105.58-23.1-161.669-19.8S-521.3,3741.479-518,3781.071c2.158,25.893,75.885,32.994,112.178,19.8s69.939,9.773,112.178,13.2C-171.567,3823.963-198.787,3762.1-221.057,3738.179Z"
              transform="translate(518.096 -3716.68)"
              fill="#fff"
            />
          </svg>
        </div>
        <div class="cloud2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="106.847"
            height="99.709"
            viewBox="0 0 106.847 99.709"
          >
            <path
              id="Path_50"
              data-name="Path 50"
              d="M-551.277,4111.007c-62.284,5.361-96.272,29.092-99.074,45.9-3.3,19.8-39.217,59.681,82.86,53.083,5.371-.291,10.537-.745,15.672-1.368C-552.417,4207.423-550.107,4111.541-551.277,4111.007Z"
              transform="translate(657.788 -4111.007)"
              fill="#fff"
            />
          </svg>
        </div>
        <div class="cloud3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="356.424"
            height="117.486"
            viewBox="0 0 356.424 117.486"
          >
            <path
              id="Path_49"
              data-name="Path 49"
              d="M-384.628,4261.418c-93.225-4.368-115.422,28.1-124.3,30.8s-130.959,5.411-75.468,43.287,153.156,51.4,199.768,37.876,141.736-11.526,141.736-12.682,1.155-67,0-68.482S-384.628,4261.418-384.628,4261.418Z"
              transform="translate(598.804 -4261.014)"
              fill="#fff"
            />
          </svg>
        </div>
        <div class="bar right" id="simple">
          <h2 class="title">Simple</h2>
          <div class="description">We take care of the hard stuff, so you can focus on what matters.</div>
        </div>
        <div class="bar left" id="free">
          <h2 class="title">Free</h2>
          <div class="description">Never budget to use our platform.</div>
        </div>
        <svg
          id="bottom-squig"
          xmlns="http://www.w3.org/2000/svg"
          width="1920"
          height="62.548"
          viewBox="0 0 1920 62.548"
        >
          <path
            id="Path_46"
            data-name="Path 46"
            d="M0,278H1920s-493.309,62.548-973.309,62.548S0,278,0,278Z"
            transform="translate(0 -278)"
            fill="#00cec9"
          />
        </svg>
      </div>
    </div> -->
    <!-- <div id="pricing">
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
          <div type="number" class="number">{{'$' + monthlyPayment}}</div>
          <div type="number" class="number">{{'free'}}</div>
          <div for="" class="footer">
            per month
          </div>
        </div>
      </div>
      <div class="explain">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sunt, cumque omnis impedit ratione nulla quas et, magnam ipsam corrupti rerum dignissimos rem explicabo ipsum eos, id similique quidem. Quis?</div>
    </div>-->
    <!-- <div id="get-started">
      <div class="texts">
        <h1 id="get-started-header">Get Started Today</h1>
        <h4 id="together-thing">Sign your church up for the Together today!</h4>
      </div>
      <div class="buttons">
        <button
          id="sign-up"
          class="basic-button noselect"
          @click="openRegisterWindow"
        >SIGN YOUR CHURCH UP</button>
        <div id="contact-us" class="noselect">CONTACT US</div>
      </div>
    </div> -->
    <div id="contact-us">
      <contact-us/>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import Navbar from "./Navbar.vue"
import ContactUs from "./ContactUs.vue";
import PersonalSimpleFree from "./personalsimplefree"

import RegisterChurch from "@/components/RegisterChurch";

export default {
  name: "Hello",
  data() {
    return {
      selectedShowcase: "PEOPLE",
      selectedFeature: {},
      selectedProblem1: "",
      selectedProblem2: "",
      selectedProblem3: "",
      scrollWindow: {},
      problems: [
        "communication",
        "giving",
        "connection",
        "taxes",
        "scheduling",
        "organization",
        "outreach",
        "commitment",
        "social",
        "messaging",
        "scheduling",
        "volunteers",
        "development"
      ],
      mainVideoURL: "http://media.w3.org/2010/05/sintel/trailer.mp4",
      mainImageURL:
        "https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      features: [
        {
          title: "People",
          icon: "person",
          description:
            "Users create a personal account on the mobile side with their individual information which is shown to the administration of the church. These accounts allow them to sign up for events and teams, message other people, post personal prayers, add friends, and stay connected."
        },
        {
          title: "Events",
          icon: "event",
          description:
            "Announce event dates, times and locations that will allow for your members to sign up, serve, or RSVP for. By doing this, members can add specific events to their individual or group/team calendars and administrators can see all event attendees.An event can include the people of that event, order of service, videos and pictures, quick links, as well as an action step for the individual: whether the church wants them to sign up, serve, or RSVP."
        },
        {
          title: "Small Groups",
          icon: "people",
          description:
            "Establish your church's small groups, as well as their topics and leaders. See the people in each group, as well as when and where that group meets "
        },
        {
          title: "Serve Teams",
          icon: "people",
          description:
            "Organize your church's serve teams by listing the descriptions of the various types and allowing for volunteer signups. Show when and where each team meets during the week or on Sundays."
        },
        {
          title: "Services",
          icon: "list",
          description:
            "Let your church know when and where you are meeting for Sunday services. Announce sermon series or even reading plans leading up to Sunday."
        },
        {
          title: "Giving",
          icon: "panorama_fish_eye",
          description:
            "Manage your tithes, offerings, and donations all in one place. We have parterned with Dime – Giving  (should be a link to their website) to offer an easy, safe, secure and fast option for mobile giving."
        },
        {
          title: "Financial",
          icon: "credit_card",
          inDev: true,
          description:
            "While Partnering with Dime, they will display your church's financial statements and the generosity of your members all in one place. They also can display your accounting information if you choose to partner with their services for that as well."
        },
        {
          title: "Messaging",
          icon: "message",
          description:
            "Allows for your people to connect between groups, teams and the general congregation. Users will be able to harness direct messaging, team messaging and individual messaging in discussion forums that will all appear on the message tab of the mobile app. Members can even direct message the church itself. Here, administration will be able to read it in their inbox on the website or on the mobile app."
        }
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
      maxChurchSize: 5000,
      registering: false
    };
  },
  components: {
    VueSlider,
    RegisterChurch,
    Navbar,
    ContactUs,
    PersonalSimpleFree
  },
  methods: {
    loadDrift() {},
    openRegisterWindow() {
      console.log(this.$refs);
      this.$refs.register.open();
      this.registering = true;
    },
    handleScroll() {
      const index1 =
        Math.round((this.scrollWindow.scrollTop + 10) / 75) %
        this.problems.length;
      const index2 =
        Math.round((this.scrollWindow.scrollTop + 100) / 75) %
        this.problems.length;
      const index3 =
        Math.round((this.scrollWindow.scrollTop + 200) / 75) %
        this.problems.length;
      this.selectedProblem1 = this.problems[index1];
      this.selectedProblem2 = this.problems[index2];
      this.selectedProblem3 = this.problems[index3];
    }
  },
  props: {},
  mounted() {
    this.selectedFeature = this.features[0];
    this.scrollWindow = document.getElementById("splash-container");
    this.scrollWindow.addEventListener(
      "scroll",
      function() {
        this.handleScroll();
      }.bind(this)
    );
  },
  destroyed() {
    this.scrollWindow.removeEventListener(
      "scroll",
      function() {
        this.handleScroll();
      }.bind(this)
    );
  },
  computed: {
    churchSize: {
      get() {
        // FORMULA FOR CHURCH SIZE = c(e^(slowness * churchSizePerctage) - 1)
        const slowness = 3;
        const c = this.maxChurchSize / (Math.exp(slowness) - 1); // so that scale*(e^1 - 1) = 5000
        const percentage = this.churchSizePercentage / 100;
        const churchSize = c * (Math.exp(slowness * percentage) - 1);
        return Math.round(churchSize);
      },
      set(newValue) {
        // FORMULA FOR CHURCH SIZE PERCENTAGE = c(e^(slowness * churchSizePerctage) - 1)
        if (newValue >= this.maxChurchSize) {
          newValue = this.maxChurchSize;
        }
        const slowness = 3;
        const c = this.maxChurchSize / (Math.exp(slowness) - 1); // so that scale*(e^1 - 1) = 5000
        var percentage = newValue / c;
        percentage += 1;
        percentage = Math.log(percentage);
        percentage /= slowness;
        this.churchSizePercentage = percentage * 100;
      }
    },
    monthlyPayment() {
      const size = this.churchSize;
      if (size == 0) {
        return 0;
      } else if (size <= 100) {
        return 20;
      } else if (size <= 250) {
        return 30;
      } else if (size <= 500) {
        return 50;
      } else if (size <= 1000) {
        return 75;
      } else if (size <= 2000) {
        return 110;
      } else if (size <= 3000) {
        return 150;
      } else if (size <= 4000) {
        return 200;
      }
      return 250;
    }
  }
};
</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Bad+Script&display=swap");
</style>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 3rem;
  margin: 50px 0px 50px 10%;
  display: inline-block;
  position: relative;
  z-index: 100;

  color: black;
}
h1::before {
  content: "";
  z-index: -1;

  height: 4px;
  width: calc(100% + 40px);
  
  position: absolute;
  left: 40px;
  bottom: 0px;

  background-color: #00cec9;  
  border-radius: 2px;
}

.fade-right-enter-active {
  transition: opacity 0.3s ease-in, transform 0.5s ease-out;
  transition-delay: 0.1s;
  z-index: 100;
  position: relative;
}
.fade-right-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  z-index: 0;
  position: relative;
}
.fade-right-leave-to {
  z-index: 0;
  opacity: 0;
}
.fade-right-enter {
  transform: translateX(-15px);
  opacity: 0;
  z-index: 100;
}
.fade-left-enter-active {
  transition: opacity 0.3s ease-in, transform 0.5s ease-out;
  transition-delay: 0.1s;
  z-index: 100;
  position: relative;
}
.fade-left-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  z-index: 0;
  position: relative;
}
.fade-left-leave-to {
  z-index: 0;
  opacity: 0;
}
.fade-left-enter {
  transform: translateX(75px);
  opacity: 0;
  z-index: 100;
}

.no-scroll {
  height: 100vh;
  overflow: hidden;
}

#login {
  padding: 7.5px 15px;
  text-align: center;
  cursor: pointer;
  background: #00cec9;
  color: white;
  position: absolute;
  right: 30px;
  top: 20px;
  z-index: 100;
  text-decoration: none;
  border-radius: 25px;
  border: 5px #00cec9 solid;
  /* border: 3px white solid; */
}

#splash-container {
  /* perspective: 2px; */
  max-width: 80rem;
  margin: 0px auto;
  overflow-x: hidden;
  overflow-y: auto;
}
#together-badge {
  position: absolute;
  height: 70px;
  top: 50px;
}

#hero {
  padding: 0px 5%;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  min-height: 100vh;
  grid-column-gap: 7.5%;
}
#main-title,
#hero-computers {
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#together-title {
  width: 85%;
  max-width: 400px;
}
#subtitle {
  margin: 50px 20px;
  width: 70%;
  margin-left: 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5rem;
  color: black;
}
#early-access {
  /* width: 80%; */
}

.computer-video-wrapper {
  position: relative;
  z-index: 100;
  width: 100%;
}
.main-computer-wrapper {
  position: relative;
}
.main-computer {
  width: auto;
}
.main-computer img {
  width: 100%;
  z-index: 100;
}
#main-computer-video-container {
  position: absolute;
  z-index: -1;
  overflow: hidden;
  left: 12%;
  top: 5%;
  bottom: 10%;
  width: 78%;
}
#main-computer-video {
  height: 100%;
}
.main-phone-wrapper {
  position: absolute;
  bottom: 0px;
  width: 22.5%;
  z-index: 400;
  left: 60%;
  margin-left: 75px;
}
.main-phone-wrapper img {
  width: 100%;
}
.main-phone-video-container {
  position: absolute;
  z-index: -1;
  left: 12%;
  width: 85%;
  top: 2%;
  height: 96%;
  overflow: hidden;
  border-radius: 10px;
}
#scribble-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 45vh;
  width: 600px;
  height: 300px;
  pointer-events: none;
  /* mix-blend-mode: difference; */
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
  font-size: 1rem;
  padding: 10px;
  position: absolute;
  color: white;
  padding: 10px 20px;
  text-shadow: 0px 0px 6px #000000b9;
  /* background: linear-gradient(45deg, #05e0a2 20%, #00cec9 80%); */
  transform: rotate(90deg);
  border-radius: 40px;
  top: 97.5vh;
  left: 50vw;
  z-index: 200;
  transform: translate(-50%, -50%);
  vertical-align: middle;
  cursor: pointer;
  /* line-height: .5; */
}
/* .next-page {
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
} */
#problems {
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-image: url(https://togethercdn.global.ssl.fastly.net/assets/home-page/lots-of-people.png);

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#problems .big-words {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  height: 110vh;
}
#problems .big-word {
  display: block;
  font-size: 5rem;
  font-weight: 900;
  color: white;
  /* mix-blend-mode: difference; */
  text-transform: uppercase;
  background: #00cec9;
  padding: 10px 30px;
  letter-spacing: 10px;
  margin: 40px 0px;
  word-wrap: unset;
  overflow: hidden;
  white-space: nowrap;
  cursor: default;
  /* text-align: center; */
}

#features {
  position: relative;
}
#features h1 span {
  transition: all 0.3s ease;
  bottom: 0px;
  position: relative;
}
#features h1 span.selected {
  color: #00cec9;
  bottom: 3px;
  left: 0px;
  text-shadow: -2px 3px 4px #00000023;
}
#features .features-item-title {
  text-align: center;
  /* position: absolute; */
  margin-top: 50px;
  display: block;
}

.computer-cutout-wrapper {
  height: 500px;

  position: absolute;
  left: 50vw;
  transform: translateX(-50%);
  bottom: 10vh;
  z-index: 300;
}
.computer-cutout {
  height: 100%;
  position: absolute;
  transform: translateX(-50%);
  bottom: 0px;
  z-index: 100;
}
.computer-cutout::after {
  content: "";
  background: white;
  height: 80%;
  width: 80%;
  display: inline-block;
  position: absolute;
  z-index: -1;
  right: 10%;
  top: 10%;
}
.computer-cutout img {
  height: 100%;
  width: auto;
  position: relative;
  z-index: 200;
}
#features .computer-screens {
  position: absolute;
  z-index: 50;
  left: 13%;
  top: 11%;
  bottom: 12%;
  /* overflow: hidden; */
}
#features .computer-screens img {
  width: auto;
  height: 100%;
  position: absolute;
}

#features .phone-cutout-wrapper {
  height: 350px;

  position: absolute;
  left: calc(50vw + 225px);
  bottom: 10vh;
  /* bottom: calc(10vh + 26px); */
  z-index: 300;
}
.phone-cutout {
  position: absolute;
  bottom: 0px;
  z-index: 100;
}
.phone-cutout::after {
  content: "";
  background: white;
  position: absolute;
  z-index: -1;
  right: 4.5%;
  width: 80%;
  top: 3%;
  height: 94.5%;
}
.phone-1-cutout {
  height: 100%;
}
.phone-2-cutout {
  height: 80%;
  left: 125px;
}
.phone-1-cutout img,
.phone-2-cutout img,
.phone-3-cutout img {
  height: 100%;
  width: auto;
  position: relative;
  z-index: 200;
}
.phone-screens {
  position: absolute;
  z-index: 50;
  right: 5%;
  width: 79%;
  top: 3%;
  height: 94.5%;
  overflow: hidden;
}
.phone-screens img {
  width: 100%;
  height: 100%;
  position: absolute;
}
#features-blob-blue {
  position: absolute;
  transform: scale(0.9) translate(10%, 10%);
  right: 0;
  top: -150px;
}
#features-blob-green {
  z-index: -1;
  position: absolute;
  transform: scale(0.9) translate(10%, 10%);
  left: 20px;
  top: -120px;
}
#features .phones .phone-1 {
  /* max-height: 40vh;
  width: auto;
  max-width: 17.5vw;
  height: auto;
  position: absolute;
  right: 0px;
  z-index: 100;
  bottom: 15vh; */
}
#features .phones .phone-2 {
  /* max-height: 45vh;
  width: auto;
  max-width: 20vw;
  height: auto;
  position: absolute;
  right: 120px;
  bottom: 15vh;
  z-index: 50; */
}

#features .toggle {
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
  z-index: 500;

  /* box-shadow: 0px 5px 13px -2px #00000040;
  background: white;
  border-radius: 10px; */
}
#features .toggle button {
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

  transition: color 0.3s ease;

  cursor: pointer;
}
#features .toggle button i {
  font-size: 1rem;
  margin-right: 5px;
}
#features .toggle button:hover {
  color: #888b8b;
}
#features .toggle button:before {
  content: "";
  position: absolute;
  z-index: 0;
  width: 0%;
  height: 0.2rem;
  bottom: -0.1rem;
  border-radius: 2px;
  right: 0;
  background-color: #00cec9;
  border: 0px #00cec9 solid;
  visibility: hidden;
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}
#features .toggle button:hover:before {
  visibility: visible;
  width: 100%;
}
#features .toggle button.selected,
#features .toggle button.selected i {
  color: white;
  transition: all 0.3s ease-in-out 0s;
}
#features .toggle button.selected:before {
  height: 1.5rem;
  bottom: -0.25rem;
  right: -0.1rem;
  border: 0.1rem #00cec9 solid;
  width: 100%;
  z-index: -1;
  visibility: visible;
}

#features {
  min-height: 850px;
  position: relative;
}
#feature-wrapper {
  width: 100vw;
}
.features-phone-wrapper {
  height: 350px;

  position: absolute;
  left: calc(12vw);
  bottom: 36vh;
  /* bottom: calc(10vh + 26px); */
  z-index: 300;
}
.phone-3-cutout {
  height: 100%;
}
.feature-blobs {
  position: relative;
}
#feature-blob-1 {
  z-index: -1;
  position: absolute;
  right: 0;
  top: 200px;
  transform: scale(0.9) translate(10%, 0);
}
#feature-blob-2 {
  z-index: -1;
  position: absolute;
  left: -110px;
  top: -300px;
  transform: scale(0.85);
}
#feature-description {
  width: 90vw;
  height: 380px;
  font-size: 25px;
}
#feature-description h3 {
  padding-left: 28vw;
  color: black;
  font-size: 55px;
  font-weight: 600;
}
#features h4 {
  text-align: center;
  font-weight: 400;
}
#feature-description .description {
  padding: 5px 0vw 0px 28vw;
  line-height: 2rem;
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
#feature-grid .feature {
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
  width: 6vw;
  height: 6vw;
  margin: 12px;

  transition: box-shadow 0.2s ease;
}
#feature-grid .feature.selected {
  box-shadow: 0px 1px 0px -2px #00000040;
}
#feature-grid .feature i {
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 5px;
  /* text-shadow: 0px 1px 6px #0000002c; */
}
#feature-grid .feature i.coming-soon-padding {
  /* margin-top: 20px; */
}
#feature-grid .feature .title {
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
  font-weight: 500;
  /* text-shadow: 0px 1px 6px #0000002c; */
}
#feature-grid .feature .coming-soon {
  display: none;
  width: 100%;
  font-size: 1.1rem;
  text-align: center;
  font-weight: 600;
  background: #00cec9;
  font-size: 0.7rem;
  width: 80px;
  border-radius: 30px;
  margin-top: 10px;
  color: white;
  padding: 2px 4px;
}
#personal-simple-free {
  height: 850px;
}
#simple {
  margin: 25px 0px;
}
#personal-simple-free .bars {
  padding: 50px 0px;
  display: block;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: stretch;
  position: relative;
}
.earth-blob {
  position: absolute;
  z-index: 100;
  vertical-align: right;
  bottom: 80px;
  transform: scale(0.75) translate(25%, 0);
  right: 0;
}
.cloud1 {
  position: absolute;
  z-index: 100;
  vertical-align: right;
  bottom: 550px;
  transform: scale(0.75);
  right: 0;
}
.cloud2 {
  position: absolute;
  z-index: 160;
  vertical-align: right;
  bottom: 300px;
  transform: scale(0.75) translate(25%, 0);
  right: 0;
}
.cloud3 {
  position: absolute;
  z-index: 160;
  vertical-align: right;
  bottom: 160px;
  transform: scale(0.75) translate(25%, 0);
  right: 0;
}
#personal-simple-free #top-squig {
  position: absolute;
  top: 50px;
  /* transform: translateX(5px) */
}
#simple {
  position: relative;
  z-index: 150;
}
#personal-simple-free .bars .bar {
  padding: 40px 20vw;
  background: #00cec9;
  color: white;
}
#personal-simple-free .bars .bar.top {
  margin-top: 104px;
}
#personal-simple-free .bars .title {
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 10px;
}
#personal-simple-free .bars .description {
  font-size: 1.5rem;
  line-height: 1.25;
  width: 500px;
}
#personal-simple-free .bar.left .title {
  line-height: 1.25;
}
#personal-simple-free .bar.right .title {
  line-height: 1.25;
  text-align: right;
}
#personal-simple-free .bar.left .description {
  line-height: 1.25;
}
#personal-simple-free .bar.right .description {
  line-height: 1.25;
  text-align: right;
  margin-left: calc(60vw - 510px);
}
#pricing {
  background: #00cec9;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
#price-visualizer .church-size .header {
  color: white;
  font-size: 30px;
  width: 100%;
  text-align: right;
  padding-bottom: 10px;
  font-weight: normal;
  align-self: flex-end;
}
#price-visualizer .church-size .number {
  color: white;
  font-size: 80px;
  width: 100%;
  text-align: right;
  font-weight: 900;
  align-self: center;
  display: flex;
  justify-content: flex-end;
}
#price-visualizer .church-size .number input {
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
#price-visualizer .church-size .number span {
  color: white;
  font-size: 80px;
  text-align: right;
  font-weight: 900;
  display: inline;
  line-height: initial;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
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
#price-visualizer .monthly-payment .header {
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
#price-visualizer .monthly-payment .number {
  color: white;
  font-size: 80px;
  width: 100%;
  text-align: left;
  font-weight: 500;
  line-height: 1;
  align-self: center;
}
#price-visualizer .monthly-payment .footer {
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
#pricing .explain {
  color: white;
  padding: 20px 10%;
}
#pricing button {
  margin: 30px auto;
}
#get-started {
  height: 700px;
  text-align: center;
  vertical-align: middle;
  position: relative;
}
#get-started-header {
  font-weight: 600;
  margin: 20px 0;
  color: black;
  padding: 0;
}
#together-thing {
  font-weight: 500;
  font-size: 23px;
  margin: 20px 0;
  color: black;
}
#sign-up {
  font-size: 22px;
  font-weight: 600;
  margin-top: 15vh;
  padding: 15px 25px;
}
#contact-us {
  margin-top: 50px;
  height: 750px;
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
@media all and (max-width: 425px) {
  #together-badge {
    height: 15vw;
    max-height: 75px;
    left: 50vw;
    transform: translateX(-50%);
  }
  #login {
    background: none;
    border: none;
    font-weight: 600;
    text-shadow: 0px 1px 6px #0000002c
  }
  #main-blob {
    top: -200px;
    left: 50vw;
    transform: scale(0.8) translateX(-50%);
  }
  #together {
    height: 10vw;
    margin-bottom: 5vw;
    max-height: 50px;
  }
  .subtitle {
    font-size: 15px;
    line-height: 1.2rem;
    font-weight: 600;
    width: 100%;
  }
  .computer-video-wrapper {
    left: 11vw;
    top: 78vh;
  }
  .main-computer-wrapper {
    height: 46vw;
    bottom: 0;
  }
  #join {
    font-size: 12px;
    left: 50%;
    transform: translateX(-50%);
  }
  #features .features-item-title {
    display: none;
  }
  #features .computer-cutout-wrapper {
    height: 175px;
    left: 50vw;
    bottom: 12vh;
  }
  #features .phone-cutout-wrapper {
    height: 125px;
    left: calc(12vw + 220px);
    bottom: 12vh;
  }
  .phone-2-cutout {
    left: 32px;
  }
  #features .toggle {
    top: 82%;
    flex-direction: row;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    left: 45vw;
  }
  #features .toggle .material-icons {
    display: none;
  }
  #features .toggle button {
    padding: 1px 12px;
    color: black;
    font-weight: 600;
  }
  #features .toggle button.selected {
    border-radius: 50px;
  }
  .features-phone-wrapper {
    height: 145px;
    left: calc(4vw);
    bottom: 304px;
  }
  #feature-description {
    width: 92vw;
    height: 210px;
    font-size: 12px;
  }
  #feature-description h3 {
    padding-left: 30vw;
    font-size: 21px;
    font-weight: 600;
  }
  #feature-description .description {
    padding: 5px 0 0 30vw;
    line-height: 1.15rem;
  }
  #feature-grid {
    padding: 50px 12vw;
  }
  #feature-grid .feature {
    padding: 14px;
    width: 8vw;
    height: 8vw;
    margin: 4px;
  }
  #feature-grid .feature i {
    font-size: 1rem;
  }
  #feature-grid .feature .title {
    font-size: 0.5rem;
  }
  #feature-blob-1 {
    top: 120px;
    transform: scale(0.3) translate(115%, 0);
  }
  #feature-blob-2 {
    left: -352px;
    top: -326px;
    transform: scale(0.35);
  }
  .earth-blob {
    bottom: -162px;
    transform: scale(0.3) translate(118%, 0);
  }
  .cloud1 {
    bottom: 240px;
    transform: scale(0.3);
    right: -60px;
  }
  .cloud2 {
    bottom: 115px;
    transform: scale(0.3) translate(117%, 0);
  }
  .cloud3 {
    bottom: 60px;
    transform: scale(0.3) translate(117%, 0);
  }
  #bottom-squig {
    width: 120%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 14px;
  }
  #personal-simple-free .bars .title {
    font-size: 1.35rem;
  }
  #personal-simple-free .bars .bar {
    padding: 17px 10vw;
  }
  #personal-simple-free .bars .description {
    font-size: .8rem;
    width: 72%;
  }
  #personal-simple-free .bar.right .description{
    margin-left: 0;
    width: 75%;
    padding-left: 25%;
  }
  #simple {
    margin: 14px 0;
  }
  #personal-simple-free #top-squig {
    width: 168%;
    top: 92px;
  }
  #get-started {
    height: 67vh;
    bottom: 45px;
  }
  #get-started-header {
    font-size: 1.5rem;
    text-align: left;
  }
  #together-thing {
    font-size: .9rem;
    text-align: left;
  }
  .texts {
    width: 80%;
    margin-left: 30px;
  }
  .buttons {
    text-align: left;
    margin-left: 22px
  }
  #sign-up {
    font-size: 16px;
    padding: 10px 14px;
    margin-top: 5vh;
  }
  #contact-us {
    margin-left: 14px;
    margin-top: 12px;
  }
}
>>>>>>> 544ba1895d58cc3a8de6db67cb0b2ca55043554c
</style>