<template>
  <div class="app-page">
    <div id="app-navbar-header" 
      :class="{'toggled': showSidebar}">
      <div id="app-navbar-toggle" @click="showSidebar = !showSidebar">
        <transition name="rotate-fade">
          <i class="material-icons noselect"
            v-if="showSidebar == false">
            menu
          </i>     
        </transition>
        <transition name="rotate-fade">
          <i class="material-icons noselect"      
            v-if="showSidebar == true"
            >
            clear
          </i>
        </transition>
        <div class="current-page" v-show="showSidebar == false">{{$route.path.split('/')[2]}}</div>
      </div>
    </div>
    <div id="app-navbar"
      :class="{'toggled': showSidebar}">
      <div id="app-header" class="noselect">
        <!-- <img class="logo" src="/static/image/black-logo.png" alt="" srcset=""> -->
        <div class="brand noselect">TOGETHER</div>
      </div>
      <transition-group name="fadeLeft" id="app-navbar-buttons">
        <router-link :key="1" v-on:click.native="showSidebar = false" to="/app/home" class="noselect"
          >home</router-link>
        <router-link :key="2" v-on:click.native="showSidebar = false" to="/app/inbox" class="noselect"
          >inbox</router-link>
        <router-link :key="3"  v-on:click.native="showSidebar = false" to="/app/people" class="noselect"
          >people</router-link>
        <router-link :key="4"  v-on:click.native="showSidebar = false" to="/app/teams" class="noselect"
          >teams</router-link>
        <router-link :key="5"  v-on:click.native="showSidebar = false" to="/app/prayer" class="noselect"
          >prayer</router-link>
        <router-link :key="6"  v-on:click.native="showSidebar = false" to="/app/calendar" class="noselect"
          >calendar</router-link>
        <router-link :key="7"  v-on:click.native="showSidebar = false" to="/app/staff" class="noselect"
          >staff</router-link>
        <!-- <router-link :key="7"  v-on:click.native="showSidebar = false" to="/app/this-sunday" class="noselect"
          >this sunday</router-link> -->
      </transition-group>
      <div id="app-footer">
        <div class="profiles">
          <router-link  v-on:click.native="showSidebar = false" to="/app/my-church" class="noselect">
            <div class="profile-pic" :style="{backgroundImage: 'url(' + $store.state.churchIcon +')'}"></div>
          </router-link>
          <router-link  v-on:click.native="showSidebar = false" to="/app/me" class="noselect">
            <div class="profile-pic" :style="{backgroundImage: 'url(' + $store.state.userIcon +')'}"></div>
          </router-link>
        </div>
        <div class="links">
          <router-link  v-on:click.native="showSidebar = false" to="/privacy-policy" class="noselect"
            >help</router-link>
          <router-link  v-on:click.native="showSidebar = false" to="/privacy-policy" class="noselect"
            >privacy</router-link>
          <router-link  v-on:click.native="showSidebar = false" to="/privacy-policy" class="noselect"
            >about us</router-link>
        </div>
      </div>
    </div>
    <div id="app-page-content"
      :class="{'toggled': showSidebar}">            
      <router-view></router-view>
      <div style="overflow-y: auto; height: calc(100vh - 40px)" v-if="$route.params.subpage == 'this-sunday'">
        <event-details></event-details>
      </div>
    </div>
  </div>
</template>

<script>
import Inbox from '@/components/Inbox'
import People from '@/components/People'
import Teams from '@/components/Teams'
import Prayer from '@/components/Prayer'
import EventDetails from '@/components/EventDetails'
import Events from '@/components/Calendar'
import Home from '@/components/Home'

// import AudioPage from '@/components/AudioPage'
// import ReadingPlan from '@/components/ReadingPlan'

  export default {
    name: "AppPage",
    data() {
      return {
        showSidebar: false,
        profilePic: ''
      }
    },
    components: {
      Inbox, People, Teams, Prayer, EventDetails, Events, Home
      // AudioPage, ReadingPlan
    },
    mounted() {
      this.profilePic = this.$store.state.profilePic
    },
    methods: {
      hideSidebar() {
        this.showSidebar = false
      }
    },
  }
</script>

<style scoped>
.app-page {  
  /* height: calc(100vh - 40px); */
  height: 100%;
  display: flex;
  /* flex-basis: 300px auto */
}
#app-navbar {
  /* min-width: 145px; */
  flex: 0 0 200px;
  /* padding: 10px 20px; */
  z-index: 800;
  display: grid;
  /* grid-template-rows: 100px 1fr 100px; */

  transition: min-width .3s ease;
  padding-right: 10px;
}
#app-navbar-buttons {  
  grid-row: 2/3;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  flex: 1;  
}
#app-navbar-buttons a{
  color: #444444;
  text-decoration: none;
  margin-bottom: 20px;
  display: inline-flex;
  font-size: 15px;
  text-align: right;
  
  position: relative;
  text-decoration: none;
  z-index: 100;
}
#app-navbar-buttons a:hover {
  color: #444444;
}
#app-navbar-buttons a:before {
  content: "";
  position: absolute;
  z-index: 0;
  width: 0%;
  height: 3px;
  bottom: -2px;
  border-radius: 2px;
  right: 0;
  background-color: #00cec9;
  border: 0px #00cec9 solid;
  visibility: hidden;
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}
#app-navbar-buttons a:hover:before {
  visibility: visible;
  width: 100%;
}
#app-navbar-buttons a.router-link-active {
  color: white;
}
#app-navbar-buttons a.router-link-active:before {
  height: 1.1em; 
  bottom: -5px; 
  right: -5px;
  border: 4px #00cec9 solid;
  width: calc(100% + 2px);  
  z-index: -1;
  visibility: visible;
}
#app-navbar-buttons span{
  color: #cfcfcf;
  padding: 0px 3px;
  font-size: 20px;
}

#app-header {
  cursor: default;
  padding: 10px 0px;
  padding-left: 7px;
  /* color: #84DBBC; */
  /* letter-spacing: 8px; */
  /* font-size: 17.5px; */
  /* text-align: center; */
}
#app-header .brand{
  text-align: center;
  margin-top: 4px;
  margin-left: 5px;
  color: #00cec9;
  font-weight: 500;
  writing-mode: vertical-rl;
  /* text-orientation: upright; */
} 
#app-header .logo{
  height: 30px;
  opacity: .75;
  image-rendering: crisp-edges;
} 

#app-footer {
  margin-bottom: 10px;
  padding-right: 0px;

  grid-row: 3/4;

  display: grid;
  grid-template-columns: 40px auto;
  align-items: flex-end;
}

#app-footer .profiles a{
  padding: 0px;
  margin: 0px;
  margin-top: 10px;
  height: auto;
}
#app-footer .profiles{
  /* padding: 2.5px; */
  padding-left: 10px;
}

.profile-pic {
  cursor: pointer;

  width: 30px;
  height: 30px;
  border-radius: 50%;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
#app-footer .links{
  display: flex;
  justify-content: end;
  align-items: flex-end;
  flex-direction: column;
  flex: 1;  
}

#app-footer a{
  color: #8a8a8a;
  text-decoration: none;
  margin-top: 10px;
  display: inline-flex;
  font-size: 14px;
  text-align: right;
  
  position: relative;
  text-decoration: none;
  z-index: 100;
}

#app-page-content {
  /* height: calc(100vh - 40px); */
  width: 100%;
  position: relative;
  overflow: hidden;
  /* padding-top: 2.5%; */
  /* padding-left: 4%; */
}
#app-navbar-header {
  background: white;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 900;
  width: 100%;
  height: 40px;
  display: none;
}
#app-navbar-toggle {
  position: relative;
  left: 15px;
  top: 10px;
  cursor: pointer;
  z-index: 500;
  display: none;
  width: 24px;
  height: 24px;
}
#app-navbar-toggle i{
  position: absolute;  
  text-rendering: optimizeLegibility;
  color: #222222;
}
#app-navbar-toggle .current-page {  
  position: fixed;
  left: 50px;
  top: 17px;
  font-size: 15px;
  font-weight: 600;
}

.rotate-fade-enter-active, .rotate-fade-leave-active {
  transition: opacity .5s;
  transition: transform .3s;
}
.rotate-fade-enter, .rotate-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: rotate(-130deg)
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
@media all and (min-width: 480px) and (max-width: 1024px) {
  #app-page-content {
    /* padding-top: 10px; */
  }
  #app-header .brand{
    margin-top: 20px;
    margin-left: 10px;
  }
  #app-navbar {
    display: none;
    min-width: 0px;
    padding: 0px;
  }
  #app-page-content.toggled {
    /* padding-left: 0px; */
  }
  #app-navbar.toggled {
    display: grid;
    min-width: 100%;
  }
  #app-navbar.toggled #app-navbar-buttons {
    justify-content: center;
    align-items: center;
  }
  #app-navbar-toggle {
    display: inline;
  }
  #app-header {
    text-align: center;
    padding-top: 20px;
  }
  #app-footer {
    padding-right: 10px;
  }
  #app-navbar-header {
    display: block;
    background: none;
  }
}

@media all and (min-width: 480px) and (max-width: 768px) {

}

@media all and (max-width: 480px) {
  #app-page-content {
    /* padding-top: 10px; */
  }
  #app-header .brand{
    margin-top: 20px;
    margin-left: 10px;
  }
  #app-navbar {
    display: none;
    min-width: 0px;
    padding: 0px;
  }
  #app-page-content.toggled {
    padding-left: 0px;
  }
  #app-navbar.toggled {
    display: grid;
    min-width: 100%;
  }
  #app-navbar.toggled #app-navbar-buttons {
    justify-content: center;
    align-items: center;
  }
  #app-navbar-toggle {
    display: inline;
  }
  #app-header {
    text-align: center;
    padding-top: 20px;
  } 
  #app-footer {
    padding-right: 10px;
  }
  #app-navbar-header {
    display: block;
  }
  #app-navbar-header.toggled {
    background: none;
  }
 }
 
/* //////////////////////////////////////////
////////////  FOR SUB PAGES /////////////////
////////////////////////////////////////// */


  #app-page-content >>> .main-wrapper {
    display: grid;
    grid-template-columns: 250px auto;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    /* overflow-x: auto; */
  }
  
  #app-page-content >>> .page-wrapper {
    /* padding-left: 35px; */
    /* grid-gap: 35px; */
    display: grid;
    grid-template-columns: 240px auto;
    /* grid-template-columns: 250px auto minmax(auto, 0px); */
    /* grid-auto-columns: 250px; */
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    /* overflow-x: auto; */
  }
  #app-page-content >>> .page-wrapper.three-rows {
    grid-template-columns: 240px minmax(auto, 530px) auto;
  }

  #app-page-content >>> .card-list-wrapper {
    overflow-y: auto;
    width: 100%;
    position: relative;
    padding: 0px 15px;
    /* border-right: 1px #E6E9EC solid; */
  }
  #app-page-content >>> .page-card-wrapper {
    height: calc(100vh - 4vh);
    padding: 4vh 0px 0px 0px;
  }
  
  #app-page-content >>> .card-header{
    color: #555555;
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 10px
  }
  /* #app-page-content >>> .card-explanation ~ .card-header {
    margin-bottom: 0px;
  } */
  #app-page-content >>> .card-explanation{
    font-size: .9rem;
    color: #a1a1a1;
    margin-bottom: 10px;
    font-weight: 500;
  }
  #app-page-content >>> .section-header{
    color: #505050;
    font-size: 1rem;
    font-weight: 600;
    margin: 35px 0px 5px 0px
  }
  #app-page-content >>> .section-info{
    color: #6b6b6b;
    font-size: .85rem;
    font-weight: 500;
    margin: 0px 0px 10px 0px
  }

  #app-page-content >>> .card-item {
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-gap: 10px;
    align-items: center;
  }
  #app-page-content >>> .card-item .label{
    display: inline-flex;
    vertical-align: middle;
    
    color: #505050;
    font-size: 1rem;
    font-weight: 600;
    justify-self: flex-end;
  }
  #app-page-content >>> .card-item .label i{
    font-size: 1rem;
    margin-right: 2.5px;
    color: #d3d3d3;
    line-height: normal;
  }
  #app-page-content >>> .item-description{
    color: #6b6b6b;
    font-size: .85rem;
    font-weight: 500;
    margin: 20px 0px 10px 0px
  }

  #app-page-content >>> .selected-view {
    /* margin-top: 40px; */
    /* padding: 0px 15px; */
    position: relative;
    /* height: calc(100vh - 80px); */
    overflow-y: auto;
    min-width: 530px;
  }
  #app-page-content >>> .selected-view h1,
  #app-page-content >>> .selected-view h2,
  #app-page-content >>> .selected-view h3,
  #app-page-content >>> .selected-view h4,
  #app-page-content >>> .selected-view h5 {
    font-weight: 600
  }
  #app-page-content >>> .selected-view .header {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 5px auto 15px auto 5px;
    margin: 40px 0px 20px 10px;
  }
  #app-page-content >>> .selected-view .profile-pic {
    grid-row: 1/5;

    margin: 7.5px;
    margin-right: 15px;
  }

  #app-page-content >>> .selected-view  h3 {
    grid-row: 2;
    grid-column: 2;
    padding-top: 10px;
    font-size: 32px;
  }
  #app-page-content >>> .selected-view .subtitle {
    grid-row: 3;
    grid-column: 2;
    font-size: 18px;
    font-weight: 600;
    color: #707070;
  }
  #app-page-content >>> .selected-view .details {
    max-width: 530px;
    min-width: 450px;
  }
  #app-page-content >>> .selected-view .panel {
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 25px 25px;
    margin: 15px 7.5px;
    box-shadow: 0px 3px 13px -2px #00000040;
    max-width: 550px;
    min-width: 400px;
  }
  #app-page-content >>> .selected-view .panel:last-child {
    margin-bottom: calc(4.5vh + 10px);
  }
  #app-page-content >>> .selected-view .panel h4{
    font-size: 20px;
    color: #424242;
    margin-bottom: 10px;
  }
  #app-page-content >>> .selected-view .panel .explanation{
    font-size: 16px;
    color: #a1a1a1;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  #app-page-content >>> .selected-view .panel .item{
    margin: 0px 0px 10px 10px;
    display: flex;
    align-items: flex-end;
  }
  #app-page-content >>> .selected-view .panel .item i{
    font-size: 18px;
    margin-right: 7.5px;
    color: #e7e7e7;
    margin-top: 1px;
  }
  #app-page-content >>> .selected-view .panel .item .label{
    font-size: 18px;
    display: inline-flex;
    vertical-align: middle;
    
    margin-right: 7.5px;
    color: #4e4e4e;
    font-weight: 500;
  }
  #app-page-content >>> .selected-view .panel .item .content{
    flex: 1;
  }
  
  #app-page-content >>> .new-item {
    display: grid;
    height: calc(100vh - 50px);
    grid-template-rows: 70px auto 70px;
    grid-template-columns: 1fr 15fr;
    align-items: center;
    /* justify-content: center; */
    margin: 25px;
    max-width: 600px;
  }
  #app-page-content >>> .new-item .title{
    grid-column: 1/3;
    grid-row: 1;
    font-size: 1.7rem;
    margin: 20px;
    color: #7a7a7a;
    font-weight: 600;
  }
  #app-page-content >>> .new-item .footer {
    height: 60px;
    padding: 5px;
    grid-row: 3;
    grid-column: 1/3;
    justify-self: flex-end;
  }
  #app-page-content >>> .new-item .details{    
    overflow: hidden;
    grid-column: 2;
    grid-row: 2;
    width: 90%;
    max-width: 500px;
    max-height: 100%;
    /* overflow-y: auto; */
  }
  #app-page-content >>> .new-item .profile-pic {
    grid-row: 1/5;

    width: 65px;
    height: 65px;
    border-radius: 50%;

    margin: 7.5px;
    margin-right: 15px;

    background-color: red;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;

    cursor: pointer;
  }

  #app-page-content >>> .new-item .type{
    margin: 10px 0px;
    width: 100%;
  }
  #app-page-content >>> .new-item .new-item-card{
    height: 350px;
  }
  #app-page-content >>> .new-item .section-header{
    /* margin-top: 10px;
    color: #555555;
    font-size: 2rem;
    font-weight: 600; */
  }
  #app-page-content >>> .new-item .section-header-info{
    margin-bottom: 20px;
    padding-top: 5px;
    color: #818181;
    font-size: .9rem;
    font-weight: 600;
  }
  #app-page-content >>> .new-item .item-description{
    margin-bottom: 20px;
    color: #9c9c9c;
    font-size: .9rem;
    font-weight: 600;
    padding: 5px;
  }


  #app-page-content >>> .editing-panel-wrapper {
    height: 100vh;
    overflow: auto;
  }

  #app-page-content >>> .editing-panel {
    position: relative; 
    /* left: 30px; */
    border-radius: 10px;
    padding: 30px;
    margin: 5vh 20px 4vh 7.5px;
    /* height: calc(90vh - 60px); */
    box-shadow: 0px 3px 13px -2px #00000040;
    max-width: 550px;
    min-width: 350px;
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
  #app-page-content >>> .card-list-wrapper {
    padding-top: 35px;
  }
 }

@media all and (max-width: 480px) {
  #app-page-content >>> .main-wrapper {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  #app-page-content >>> .page-wrapper {
    grid-template-columns: 1fr 0px;
    height: calc(100vh - 35px);    
    margin-top: 35px;
  }
    #app-page-content >>> .card-list-wrapper {
    margin-top: 35px;
  }
    #app-page-content >>> .card-list-wrapper.inactive {
    margin-top: 0px;
    display: none;
  }
 }
</style>
