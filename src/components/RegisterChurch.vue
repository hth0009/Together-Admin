<template>
  <div id="register-church-container" v-if="show">
    <transition name="dt-fade-medium">
      <div id="register-background" class="gs-white-overlay-background">
      </div>
    </transition>
    <div class="gs-top-right-exit noselect" @click="close()">
      <i class="material-icons">close</i>
    </div>
    <div id="registration-box" :class="{floating: !inline}" v-if="currentCardIndex == 0">
      <form class="gs-card-with-shadow gs-card-rise"        
        @submit.prevent="beginRegestration"
      >
        <div class="header noselect">
          <div>join</div><img class="together-logo" src="https://togethercdn.global.ssl.fastly.net/website_title.png" alt="" srcset="">
          <!-- <h6>Sign {{churchName.length > 0 ? churchName : 'your church or ministry'}} up for Together</h6> -->
          <h6>Sign your church or ministry up for Together</h6>
        </div>        
        <div>
          <ejs-textbox v-model="churchName" resize="none" floatLabelType="Auto" :placeholder="'Church/Ministry Name'" autocomplete="off"
          required></ejs-textbox>
        </div>
        <div>
        <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Street" name="street"
          required></ejs-textbox>
        </div>
        <div style="width: 50%; display: inline-block;">
          <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="City" name="city"
          required></ejs-textbox>
        </div>
        <div style="width: 19%; display: inline-block; margin-left: 1%">
          <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="State" name="state"
          required></ejs-textbox>
        </div>
        <div style="width: 28%; display: inline-block; float: right">
          <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Zip Code" name="zip"
          required></ejs-textbox>
        </div>
        <div class="join-container gs-container center-horizontal">
          <button class="gs-basic-button">BEGIN</button>
        </div>
      </form>
    </div>
    <div id="registration-list" v-if="currentCardIndex > 0">
      <div id="registration-progress-bar">
        <progress-bar
          :percent="(currentCardIndex/numberOfCards)"
        ></progress-bar>
      </div>
      <div id="registration-carousel">
        <div id="carousel-nav">
          <div class="left noselect"
            @click="decrementIndex()"
          ><i class="material-icons">keyboard_arrow_left</i></div>
          <div class="right noselect"
            v-if="maxIndex > currentCardIndex"
            @click="incrementIndex()"
          ><i class="material-icons">keyboard_arrow_right</i></div>
        </div>
        <div class="cards">
          <transition name="fade-fast" mode="out-in">
            <div :key="'about me'" v-if="currentCardIndex == 1" class="gs-card-with-shadow gs-card-rise card"
              style="min-height: 350px"
            >
              <h3>Tell us about you</h3>
              <custom-radio v-model="isLoggingIn" :options="['sign up', 'login']"></custom-radio>
              <div v-show="isLoggingIn == 0">
                <form @submit.prevent="incrementIndex">
                  <div style="width: 48%; float: left">
                    <ejs-textbox v-model="firstName" resize="none" floatLabelType="Auto" :placeholder="'First Name'" name="fname"
                    required></ejs-textbox>
                  </div>
                  <div style="width: 48%; float: right">
                    <ejs-textbox v-model="lastName" resize="none" floatLabelType="Auto" :placeholder="'Last Name'" enableRtl="true" name="lname"
                    required></ejs-textbox>
                  </div>
                  <div>
                    <ejs-textbox v-model="username" resize="none" floatLabelType="Auto" :placeholder="'Username'" name="username"
                    required></ejs-textbox>
                  </div>
                  <div>
                    <ejs-textbox v-model="email" resize="none" floatLabelType="Auto" :placeholder="'Email'" name="email"
                    required></ejs-textbox>
                  </div>
                  <div>
                    <ejs-textbox v-model="password" resize="none" floatLabelType="Auto" :placeholder="'Password'" name="password" type="password"
                    required></ejs-textbox>
                  </div>
                  <div>
                    <ejs-textbox v-model="role" resize="none" floatLabelType="Auto" :placeholder="'What is your role in your church/ministry?'" type="text"
                    required></ejs-textbox>
                  </div>
                  <div class="gs-container center-horizontal join-container">
                    <button class="gs-basic-button">SIGN UP</button>
                  </div>
                </form>
              </div>
              <div v-show="isLoggingIn == 1">
                <form @submit.prevent="incrementIndex">
                  <div>
                    <ejs-textbox v-model="email" resize="none" floatLabelType="Auto" :placeholder="'Username or Email'" name="login"
                    required></ejs-textbox>
                  </div>
                  <div>
                    <ejs-textbox v-model="password" resize="none" floatLabelType="Auto" :placeholder="'Password'" name="password" type="password"
                    required></ejs-textbox>
                  </div>
                  <div>
                    <ejs-textbox v-model="role" resize="none" floatLabelType="Auto" :placeholder="'What is your role in your church/ministry?'" type="text"
                    required></ejs-textbox>
                  </div>
                  <div class="gs-container center-horizontal join-container">
                    <button class="gs-basic-button">LOGIN</button>
                  </div>
                </form>
              </div>
            </div>
            <div :key="'501c3'" v-if="currentCardIndex == 2" class="gs-card-with-shadow gs-card-rise card">
              <h3>Confirm</h3>
              <h6>Enter your 501c3 number to verify your church's or ministry's status</h6>
              <form @submit.prevent="incrementIndex" class="form-501c3">
                <div style="height: 60px;">
                  <label for="ein">EIN Number</label>
                  <ejs-maskedtextbox v-model="einNumber" mask="00-0000000" :placeholder="'EIN Number'" name="ein"
                  required></ejs-maskedtextbox>          
                  <!-- <ejs-textbox resize="none" floatLabelType="Auto" autocomplete="off" v-model="einNumber" :maxLength="9" :placeholder="'EIN Number (XX-XXXXXXX)'" name="ein" type="number"
                  required></ejs-textbox> -->
                </div>
                <div class="gs-container center-horizontal join-container">
                  <button class="gs-basic-button">OK</button>
                </div>
              </form>
            </div>
            <div :key="'beliefs'" v-if="currentCardIndex == 3" class="gs-card-with-shadow gs-card-rise card">
              <h3>Our Beliefs</h3>
              <h6>Let's make sure we're on the same page</h6>
              <div class="long-text">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet iusto provident consectetur consequatur rem quibusdam! Veniam ea autem debitis illum et, voluptatibus impedit atque suscipit nihil, perferendis quaerat rerum optio veritatis inventore similique eos maiores in cumque sunt sint cupiditate est id repudiandae libero. Quidem suscipit doloribus eaque quasi? Vero impedit et dicta officia! Repudiandae magni praesentium ipsam rerum quaerat necessitatibus excepturi sunt doloremque, minus asperiores eius nihil maxime. Voluptate, placeat at culpa modi porro impedit laudantium voluptas doloribus saepe suscipit et velit repellendus veritatis cum nemo sed, cupiditate consectetur dolore maiores voluptatem nam perspiciatis! Ipsa, doloribus officia nostrum amet similique labore? Voluptate veniam consequatur quisquam impedit aperiam rerum reprehenderit praesentium expedita error nam cumque harum tempora consectetur id soluta totam sunt dignissimos suscipit distinctio autem, inventore officia, quibusdam laboriosam assumenda! Vero autem amet nobis sequi blanditiis dicta. Deserunt quis reiciendis illo earum exercitationem accusantium quia voluptatem excepturi ullam. Ex, nulla. Similique sed expedita harum obcaecati accusamus impedit quas cum corporis tempora praesentium natus perferendis non, sit eius optio vero tenetur numquam. Magnam rem accusantium a eos porro quas perferendis hic consequuntur nemo praesentium voluptates dolorum, laborum iure eveniet, itaque adipisci impedit quia quisquam cum voluptatem corrupti voluptas! Sed, vitae qui nulla recusandae dignissimos delectus eos eveniet quae molestias corporis, est facere! Earum praesentium aut asperiores voluptatem, delectus blanditiis rerum magni quas iure minus, odit ducimus beatae qui, nesciunt nisi voluptas mollitia. Quidem numquam incidunt nisi ducimus porro assumenda reiciendis totam quae voluptas cumque repudiandae aliquam culpa amet, est vero? Natus reprehenderit odio non ab. Ab reiciendis, ratione beatae id consequuntur eveniet molestiae cumque explicabo quo at, neque porro iusto. Temporibus, architecto est aperiam in excepturi repudiandae veritatis odio dolor modi earum a velit blanditiis impedit illo reiciendis autem hic iusto debitis enim esse at magnam quis. Quaerat, necessitatibus suscipit?</p>
              </div>
              <form @submit.prevent="incrementIndex">
                <div class="gs-container center-horizontal">
                  <button class="gs-basic-button red">DENY</button>
                  <button class="gs-basic-button green">ACCEPT</button>
                </div>
              </form>
            </div>
            <div :key="'terms'" v-if="currentCardIndex == 4" class="gs-card-with-shadow gs-card-rise card">
              <h3>Terms of Service</h3>
              <div class="long-text">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet iusto provident consectetur consequatur rem quibusdam! Veniam ea autem debitis illum et, voluptatibus impedit atque suscipit nihil, perferendis quaerat rerum optio veritatis inventore similique eos maiores in cumque sunt sint cupiditate est id repudiandae libero. Quidem suscipit doloribus eaque quasi? Vero impedit et dicta officia! Repudiandae magni praesentium ipsam rerum quaerat necessitatibus excepturi sunt doloremque, minus asperiores eius nihil maxime. Voluptate, placeat at culpa modi porro impedit laudantium voluptas doloribus saepe suscipit et velit repellendus veritatis cum nemo sed, cupiditate consectetur dolore maiores voluptatem nam perspiciatis! Ipsa, doloribus officia nostrum amet similique labore? Voluptate veniam consequatur quisquam impedit aperiam rerum reprehenderit praesentium expedita error nam cumque harum tempora consectetur id soluta totam sunt dignissimos suscipit distinctio autem, inventore officia, quibusdam laboriosam assumenda! Vero autem amet nobis sequi blanditiis dicta. Deserunt quis reiciendis illo earum exercitationem accusantium quia voluptatem excepturi ullam. Ex, nulla. Similique sed expedita harum obcaecati accusamus impedit quas cum corporis tempora praesentium natus perferendis non, sit eius optio vero tenetur numquam. Magnam rem accusantium a eos porro quas perferendis hic consequuntur nemo praesentium voluptates dolorum, laborum iure eveniet, itaque adipisci impedit quia quisquam cum voluptatem corrupti voluptas! Sed, vitae qui nulla recusandae dignissimos delectus eos eveniet quae molestias corporis, est facere! Earum praesentium aut asperiores voluptatem, delectus blanditiis rerum magni quas iure minus, odit ducimus beatae qui, nesciunt nisi voluptas mollitia. Quidem numquam incidunt nisi ducimus porro assumenda reiciendis totam quae voluptas cumque repudiandae aliquam culpa amet, est vero? Natus reprehenderit odio non ab. Ab reiciendis, ratione beatae id consequuntur eveniet molestiae cumque explicabo quo at, neque porro iusto. Temporibus, architecto est aperiam in excepturi repudiandae veritatis odio dolor modi earum a velit blanditiis impedit illo reiciendis autem hic iusto debitis enim esse at magnam quis. Quaerat, necessitatibus suscipit?</p>
              </div>
              <form @submit.prevent="incrementIndex">
                <div class="gs-container center-horizontal">
                  <button class="gs-basic-button red">DENY</button>
                  <button class="gs-basic-button green">ACCEPT</button>
                </div>
              </form>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar'
import CustomRadio from '@/components/CustomRadio'

export default {
  name: 'RegisterChurch',
  data () {
    return {
      show: false,
      firstName: '',
      lastName: '',
      email: '',
      churchName: '',
      password: '',
      currentCardIndex: 0,
      maxIndex: 0,
      numberOfCards: 5,
      einNumber: '',
      isLoggingIn: 0,
      username: '',
      role: ''
    }
  },
  components: {
    ProgressBar, CustomRadio
  },
  methods: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    },
    beginRegestration() {
      this.incrementIndex()
    },
    incrementIndex() {
      this.maxIndex = this.maxIndex < this.currentCardIndex + 1 ? this.maxIndex + 1 : this.maxIndex

      this.currentCardIndex++
    },
    decrementIndex() {
      this.currentCardIndex--
    }
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    fullPage: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<style src="./../assets/css/general-style.css"></style> 
<style src="./../assets/css/general-transitions.css"></style> 

<style scoped>

 

.floating {
  position: fixed;
  top: 50vh;
  left: 50vw;
  z-index: 999;
  transform: translate(-50%, -50%)
}

#registration-box {
  width: 450px;
}
#registration-box .header {
  margin: 0px 0px 20px 0px;
}
.together-logo {
  filter: invert(100%);
  width: 250px;
  margin-bottom: 20px;
}

.join-container {
  margin-top: 20px;
}
#registration-list {
  position: fixed;
  z-index: 700;
}
#registration-progress-bar {
  position: fixed;
  z-index: 400;
  width: 80vw;
  top: 10vh;
  left: 50vw;
  transform: translateX(-50%)
}
#carousel-nav .left,
#carousel-nav .right {
  position: fixed;
  color: #c0c0c0;
  top: 50vh;
}
#carousel-nav i {
  font-size: 20px;
  cursor: pointer;
  height: 25px;
  width: 25px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px #c5c5c5 solid;
}
#carousel-nav .left{
  left: 15px
}
#carousel-nav .right{
  right: 15px
}
#registration-list .cards{
  position: absolute;
  z-index: 700;

  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
}
#registration-list .card{
  min-width: 300px;

  max-width: 80vw;
  max-height: 80vh;
}
.form-501c3 {
  padding-top: 30px;
}
.long-text {
  height: 65vh;
  min-width: 50vw;
  max-width: 80vw;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 10px 0px;
}
.long-text p{
  line-height: 1.5;
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

@media all and (max-width: 480px) {
}
</style>