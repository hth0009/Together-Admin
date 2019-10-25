<template>
  <div id="splash-container">  
    <sweet-modal ref="earlyAccessModal">      
      <h1>GET EARLY ACCESS</h1>  
      <contact-us
        @successfullySent="closeEarlyAccess"
      />
    </sweet-modal>
    <navbar :displayScrollValue="30" />
    <div id="splash-wrapper">
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
              provides your church all the tools you
              need to connect with your people
              <br />
              <br />
              <br />for free
            </p>
          </div>
          <button
            id="early-access"
            class="gs-basic-button big"
            @click="openEarlyAccess()"
          >GET EARLY ACCESS</button>
        </div>
        <div id="hero-computers">
          <div class="computer-video-wrapper">
            <div class="main-computer-wrapper">
              <div class="main-computer">
                <img
                  key="b"
                  src="https://togethercdn.global.ssl.fastly.net/assets/mockups/clean-cutout-computer.png"
                />
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
              <img
                src="https://togethercdn.global.ssl.fastly.net/assets/mockups/clean-cutout-iphone.png"
              />
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
    </div>
    <b-container id="dime-partnership" class="mb6em">
      <h1>YOUR COST</h1>
      <b-row class="mb2em">
        <b-col col lg="6" md='12' class="mb1em">
          <div id='your-cost-left-col'>
            <h2 id="your-zero-cost">$0</h2>
            <h2 id='your-cost-giving'>GIVING</h2>
            <span class="mb4">3.0% + $.30 All Card Types</span>
            1.0% + $.50 for ACH
          </div>
        </b-col>
        <b-col col lg="6" md="12" id='your-cost-right-col'>
          <div v-for="detail in yourCostDetails"  class="your-cost-detail"
               :key="detail.id" :style="{color: detail.color}">
            {{detail.name}}
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div id="your-cost-no-statements" style="color: #2AE5E1">
            No contracts. No cancellation fees. No budgeting. No risk.
          </div>
        </b-col>
      </b-row>
    </b-container>
    <!-- <div id="problems">
        <h1>Running a church can be complicated</h1>
        <div class="big-words">
        <div class="big-word">{{this.selectedProblem1}}</div>
        <div class="big-word">{{this.selectedProblem2}}</div>
        <div class="big-word">{{this.selectedProblem3}}</div>
        </div>
    </div>-->
    <b-container id="features" class="mb6em"> 
      <h1>YOUR PRODUCT</h1>
      <b-row id="feature-container">
        <b-col id="feature-details" col md="12" xl="3">
          <h3 class="features-item-title">{{selectedShowcase}}</h3>
          <p v-show="selectedShowcase == 'PEOPLE'">Whether on your website login seeing the full database of the people that have joined your organization, or viewing all the people within your organization on the mobile app to see who you will add to your community as your friends, this is a platform that is centered around ALL people of the church.</p>
          <p v-show="selectedShowcase == 'TEAMS'">It only makes sense that when there are people around a common goal, there are different teams within that organization to accomplish all tasks needed to get done. From your serve teams to help Sunday run to your community groups that meet during the week, teams is the feature to see your people come together.</p>
          <p v-show="selectedShowcase == 'MESSAGING'">When people of an organization have joined teams within the organization, communication is key to make sure that you are getting done everything that needs to happen. Messaging allows messages between teams you are a part of as well as staff members alike. </p>
          <p v-show="selectedShowcase == 'GIVING'">Giving is vital to any ministry. The church can not do what it can do without the generous hearts of it's people bringing back to God what He has entrusted them. With the ability to quickly give to their local organizations and cover the payment processing fee, your people will love the ease of this feature! </p>
        </b-col>
        <b-col id="feature-devices" cols="12" md="12" xl="9">
          <div class="computer-cutout-wrapper">
            <div class="computer-cutout">
              <img
                key="b"
                src="https://togethercdn.global.ssl.fastly.net/assets/mockups/cutout-computer.png"
              />
              <transition-group name="fade-up" class="computer-screens" mode="in-out">
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
            <div class="phone-3-cutout phone-cutout">
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
        </b-col>
        <b-col class="toggle full" cols="12">
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
          <!-- <button
            @click="selectedShowcase = 'CALENDAR'"
            :class="{'selected': selectedShowcase == 'CALENDAR'}"
          >
            <i class="material-icons">event</i> calendar
          </button> -->
          <button
            @click="selectedShowcase = 'MESSAGING'"
            :class="{'selected': selectedShowcase == 'MESSAGING'}"
          >
            <i class="material-icons">send</i>messaging
          </button>
          <!-- <button
            @click="selectedShowcase = 'GLOBAL'"
            :class="{'selected': selectedShowcase == 'GLOBAL'}"
          >
            <i class="material-icons">scatter_plot</i>global
          </button> -->
          <button
            @click="selectedShowcase = 'GIVING'"
            :class="{'selected': selectedShowcase == 'GIVING'}"
          >
            <i class="material-icons">favorite</i>giving
          </button>
          <!-- <button
            @click="selectedShowcase = 'DATA INTEGRATION'"
            :class="{'selected': selectedShowcase == 'DATA INTEGRATION'}"
          >
            <i class="material-icons">cloud_done</i>data integration
          </button> -->
        </b-col>
      </b-row>
    </b-container>
    <b-container id="recap" class="mb6em">
      <h1>WHY US</h1>
      <b-row align-h="around">
        <b-col class="recap-item" cols="12" md="4" xl="3">
          <h5>Your Product</h5>
          <br />
          <p>Your database, planning and management tool, engagement platform, giving and financials, analytics, social media, and mass messaging - It’s all free. Sign up today to try them out.</p>
        </b-col>
        <b-col class="recap-item" cols="12" md="4" xl="3">
          <h5>Your Cost</h5>
          <br />
          <p>We understand church budgets are tight. We set our platform up this way to so you don't have to budget for anything. We share in a little bit of your donations to better build out platforms to connect your people.</p>
        </b-col>
        <b-col class="recap-item" cols="12" md="4" xl="3">
          <h5>Your Value</h5>
          <br />
          <p>Running a church is hard. Making sure ALL of your members are all plugged in is even harder. Let us build out the platform to encourage engagement. Increase engagement, increase giving, increase retention - all for free.</p>
        </b-col>
      </b-row>
    </b-container>
    <!-- <div id="personal-simple-free">
      <personal-simple-free/>
    </div>-->
    <b-container id="contact-us" class="mb1em">
      <h1>CONTACT US</h1>
      <b-row>
        <contact-us />
      </b-row>
    </b-container>
    <!-- <div id="footer">
      <div id="footer-router-links">
        <h2>Legal</h2>
        <h2>Product</h2>
        <h2>Pricing</h2>
        <h2>Media</h2>
        <h2>Story</h2>
        <h2>Contact Us</h2>
        <h2>FAQ</h2>
        <h2>Privacy</h2>
      </div>
    </div> -->
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import { SweetModal } from "sweet-modal-vue";
import "vue-slider-component/theme/antd.css";
import Navbar from "./Navbar.vue";
import ContactUs from "./ContactUs.vue";
import PersonalSimpleFree from "./PersonalSimpleFree";

import RegisterChurch from "@/components/RegisterChurch";
import { LayoutPlugin } from "bootstrap-vue";
import Vue from "vue";
Vue.use(LayoutPlugin);

export default {
  name: "Hello",
  data() {
    return {
      yourCostDetails: [
        { name: 'Database and Data Storage', color: '#7256EF' },
        { name: 'Planning Platform', color: '#0084EA' },
        { name: 'Management Software', color: '#18C5A2' },
        { name: 'Engagement App', color: '#FF7276' },
        { name: 'Mass Message Communicator', color: '#FF84B5' },
        { name: 'Analytic Tool', color: '#18C6A3' },
        { name: 'Giving and Financials', color: '#5FBAFF' },
      ],
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
            `While Partnering with Dime, they will display your church's financial statements and the generosity of your members all in one place. 
              They can also display your accounting information if you choose to partner with their services for that as well.`
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
    PersonalSimpleFree,
    SweetModal
  },
  methods: {
    loadDrift() {},
    openRegisterWindow() {
      this.$refs.register.open();
      this.registering = true;
    },
    openEarlyAccess() {
      this.$refs.earlyAccessModal.open()
    },
    closeEarlyAccess() {
      this.$refs.earlyAccessModal.close();
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
    },
    scrollToTop() {
      window.scrollTo(0,0);
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
    },
  }
};
</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Bad+Script&display=swap");
</style>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 2rem;
  margin: 50px 0px 5rem 0px;
  display: inline-block;
  position: relative;
  z-index: 100;

  color: black;
}
h1::before {
  content: "";
  z-index: -1;

  height: 4px;
  width: calc(100% + 10px);

  position: absolute;
  left: 30px;
  bottom: 0px;

  background-color: #00cec9;
  border-radius: 2px;
}

.fade-up-enter-active {
  transition: opacity 0.4s ease-in, transform 0.5s ease-out;
  transition-delay: 0.1s;
  z-index: 100;
  position: relative;
}
.fade-up-leave-active {
  transition: opacity 0.75s ease-in-out, transform 0.5s ease-in-out;
  z-index: 0;
  position: relative;
}
.fade-up-leave-to {
  z-index: 0;
  opacity: 0;
}
.fade-up-enter {
  transform: translateY(20px);
  opacity: 0;
  z-index: 100;
}
.fade-left-enter-active {
  transition: opacity 0.1s ease-in, transform 0.5s ease-out;
  transition-delay: 0.1s;
  z-index: 100;
  position: relative;
}
.fade-left-leave-active {
  transition: opacity 0.75s ease-in-out, transform 0.5s ease-in-out;
  z-index: 0;
  position: relative;
}
.fade-left-leave-to {
  z-index: 0;
  opacity: 0;
}
.fade-left-enter {
  transform: translateX(100px);
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
  overflow-x: hidden;
  overflow-y: auto;
}
#splash-wrapper {
  max-width: 80rem;
  margin: 0px auto;
}

#together-badge {
  position: absolute;
  height: 70px;
  top: 50px;
}

#hero {
  padding: calc(20vh + 50px) 7.5% 15vh 7.5%;
  /* padding-top: ; */
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  /* grid-template-columns: repeat(auto-fit, minmax(75px, 1fr)); */
  grid-column-gap: 7.5%;
  grid-row-gap: 12.5%;
  /* min-height: 700px; */
}
#main-title,
#hero-computers {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#together-title {
  width: 85%;
  max-width: 400px;
}
#subtitle {
  margin: 3rem 20px;
  width: 70%;
  margin-left: 10px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: black;
}
#early-access {
  /* width: 80%; */
}

#your-cost-left-col {
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
}

#your-cost-right-col {
  text-align: center;
  border-left: solid grey 1px;
}

#your-zero-cost {
  font-size: 4rem;
  color: black;
  font-weight: 100;
  margin-bottom: .75em;
}

#your-cost-giving {
  font-size: 1.2rem;
  color: black;
  font-weight: 100;
  margin-bottom: .5em;
}

.your-cost-detail {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1em;
}

#your-cost-no-statements {
  color: #2AE5E1;
  text-align: center;
  font-size: .8rem;
  font-weight: 700;
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
#features {
  position: relative;
  margin-bottom: 50px;
  /* padding: 50px 7.5% 50px 7.5%; */
}
#feature-container {
}
#feature-details {
  margin-bottom: 2rem;
}
#features .features-item-title {
  text-align: left;
  /* position: absolute; */
  margin-top: 10px;
  display: block;

  font-weight: 600;
  color: black;
}
#features p {
  text-align: left;
}
#feature-devices {
  position: relative;
  margin-bottom: 2rem;
}
.computer-cutout-wrapper {
  width: 85%;

  position: relative;
  z-index: 300;
  overflow: hidden;
}
.computer-cutout {
  width: 100%;
  position: relative;
  bottom: 0px;
  z-index: 100;
}
.computer-cutout::after {
  content: "";
  background: white;
  height: 80%;
  width: 47%;
  display: inline-block;
  position: absolute;
  z-index: -1;
  left: 8%;
  top: 10%;
}
.computer-cutout img {
  width: 100%;
  height: auto;
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
  width: 18%;

  position: absolute;
  right: 0px;
  margin-left: 50px;
  bottom: 0px;
}
.phone-cutout {
  position: absolute;
  bottom: 0px;
  width: 22.5%;
  z-index: 400;
  bottom: 0px;
}
.phone-cutout img {
  position: relative;
  width: 100%;
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
  width: 100%;
  right: 60%;
}
.phone-2-cutout {
  width: 80%;
  right: 140%;
}
.phone-3-cutout {
  width: 80%;
  z-index: 300;
  right: 0px;
}
.phone-screens {
  position: absolute;
  z-index: 1;
  left: 15%;
  width: 80%;
  top: 3%;
  height: 93.5%;
  overflow: hidden;
  border-radius: 10px;
}
.phone-screens img {
  height: 100%;
  width: auto;
  position: absolute;
}
#features .toggle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem;
  z-index: 500;
}
#features .toggle button {
  color: #9b9b9b;
  text-decoration: none;
  margin: 7.5px 7.5px;
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
  border-radius: 5px;
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
  height: 2.15rem;
  bottom: -0.5rem;
  right: -0.3rem;
  border: 0.2rem #00cec9 solid;
  padding: 0.3rem;
  width: calc(100% + 0.6rem);
  z-index: -1;
  visibility: visible;
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
#recap {
  margin-bottom: 6rem;
}
.recap-item {
  padding: 1rem;
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
#sign-up {
  font-size: 22px;
  font-weight: 600;
  margin-top: 15vh;
  padding: 15px 25px;
}
#contact-us {
  margin-top: 50px;
  height: 750px;
  max-height: 100vh;
  padding: 0px 15px;
}
#footer {
  min-height: 60px;
  border-top: 2px solid #707070;
}
#footer-router-links {
  margin-top: 22px;
  text-align: center;
  display: grid;
  grid-row-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
#footer-router-links h2 {
  font-size: 1rem;
  color: #00cec9;
  font-weight: 500;
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
  #hero {
    padding-top: 15vh;
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
  #get-started {
    height: 67vh;
    bottom: 45px;
  }
  #get-started-header {
    font-size: 1.5rem;
    text-align: left;
  }
  #together-thing {
    font-size: 0.9rem;
    text-align: left;
  }
  .texts {
    width: 80%;
    margin-left: 30px;
  }
  .buttons {
    text-align: left;
    margin-left: 22px;
  }
  #sign-up {
    font-size: 16px;
    padding: 10px 14px;
    margin-top: 5vh;
  }
}
</style>
