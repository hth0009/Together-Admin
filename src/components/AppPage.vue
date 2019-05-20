<template>
  <div class="app-page">
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
    <div id="app-navbar"
      :class="{'toggled': showSidebar}">
      <div id="app-header" class="noselect">
        <img class="logo" src="/static/image/black-logo.png" alt="" srcset="">
      </div>
      <div id="app-navbar-buttons">
        <router-link v-on:click.native="showSidebar = false" to="/app/home" class="noselect"
          >home</router-link>
        <router-link v-on:click.native="showSidebar = false" to="/app/inbox" class="noselect"
          >inbox</router-link>
        <router-link  v-on:click.native="showSidebar = false" to="/app/teams" class="noselect"
          >teams</router-link>
        <router-link  v-on:click.native="showSidebar = false" to="/app/prayer" class="noselect"
          >prayer</router-link>
        <router-link  v-on:click.native="showSidebar = false" to="/app/people" class="noselect"
          >people</router-link>
        <router-link  v-on:click.native="showSidebar = false" to="/app/this-sunday" class="noselect"
          >this sunday</router-link>
        <router-link  v-on:click.native="showSidebar = false" to="/app/events" class="noselect"
          >events</router-link>
      </div>
      <div id="app-footer">
        <router-link  v-on:click.native="showSidebar = false" to="/privacy-policy" class="noselect"
          :class="{selected: $route.params.subpage == ''}">help</router-link>
        <router-link  v-on:click.native="showSidebar = false" to="/privacy-policy" class="noselect"
          :class="{selected: $route.params.subpage == ''}">privacy</router-link>
        <router-link  v-on:click.native="showSidebar = false" to="/privacy-policy" class="noselect"
          :class="{selected: $route.params.subpage == ''}">about us</router-link>
      </div>
    </div>
    <div id="app-page-content">            
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
      }
    },
    components: {
      Inbox, People, Teams, Prayer, EventDetails, Events, Home
      // AudioPage, ReadingPlan
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
}
#app-navbar {
  min-width: 145px;
  width: 145px;
  /* padding: 10px 20px; */
  padding-right: 20px;
  z-index: 800;
  display: grid;
  grid-template-rows: 100px auto 100px;

  transition: min-width .3s ease;
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
  background-color: #69CDCF;
  border: 0px #69CDCF solid;
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
  border: 4px #69CDCF solid;
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
#app-header .logo{
  height: 30px;
  opacity: .75;
  image-rendering: crisp-edges;
} 

#app-footer {
  margin-bottom: 10px;
  padding-right: 0px;

  grid-row: 3/4;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  flex: 1;  
}
#app-footer a{
  color: #8a8a8a;
  text-decoration: none;
  margin-bottom: 10px;
  display: inline-flex;
  font-size: 14px;
  text-align: right;
  
  position: relative;
  text-decoration: none;
  z-index: 100;
}

#app-page-content {
  /* margin-top: 40px; */
  /* height: calc(100vh - 40px); */
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

#app-navbar-toggle {
  position: fixed;
  left: 15px;
  top: 15px;
  cursor: pointer;
  z-index: 900;
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
  top: 21px;
  font-size: 15px;
  font-weight: bold;
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

@media all and (min-width: 480px) and (max-width: 768px) {  
  #app-navbar {
    display: none;
    min-width: 0px;
    padding: 0px;
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
 }

@media all and (max-width: 480px) {
  #app-navbar {
    display: none;
    min-width: 0px;
    padding: 0px;
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
 }
</style>



<style scoped>
/* //////////////////////////////////////////
////////////  FOR SUB PAGES /////////////////
////////////////////////////////////////// */

  #app-page-content >>> .selected-view {
    /* margin-top: 40px; */
    padding-left: 20px;
    position: relative;
    /* height: calc(100vh - 80px); */
    overflow-y: auto;
  }
  #app-page-content >>> .selected-view .header {
    display: grid;
    grid-template-columns: 110px auto;
    grid-template-rows: 30px 15px 30px 30px;
    margin-top: 40px;
  }
  #app-page-content >>> .selected-view .profile-pic {
    grid-row: 1/5;

    width: 85px;
    height: 85px;
    border-radius: 50%;

    margin: 7.5px;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  #app-page-content >>> .selected-view  h3 {
    padding-top: 10px;
    font-size: 17px;
    white-space: nowrap;
  }
  #app-page-content >>> .selected-view  .subtitle {
    font-size: 14px;
  }
</style>
