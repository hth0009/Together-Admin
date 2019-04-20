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
    </div>
    <div id="app-navbar"
      :class="{'toggled': showSidebar}">
      <div id="app-navbar-buttons">
        <router-link v-on:click.native="showSidebar = false" to="/app/inbox" class="noselect"
          :class="{selected: $route.params.subpage == 'inbox'}">inbox</router-link>
        <!-- <span>|</span> -->
        <router-link  v-on:click.native="showSidebar = false" to="/app/people" class="noselect"
          :class="{selected: $route.params.subpage == 'people'}">people</router-link>
        <!-- <span>|</span> -->
        <router-link  v-on:click.native="showSidebar = false" to="/app/teams" class="noselect"
          :class="{selected: $route.params.subpage == 'teams'}">teams</router-link>
        <!-- <router-link to="/app/audio" class="noselect"
          :class="{selected: $route.params.subpage == 'audio'}">audio</router-link> -->
        <router-link  v-on:click.native="showSidebar = false" to="/app/this-sunday" class="noselect"
          :class="{selected: $route.params.subpage == 'this-sunday'}">this sunday</router-link>
        <!-- <router-link to="/app/reading-plan" class="noselect"
          :class="{selected: $route.params.subpage == 'reading-plan'}">reading plan</router-link> -->
        <router-link  v-on:click.native="showSidebar = false" to="/app/prayer" class="noselect"
          :class="{selected: $route.params.subpage == 'prayer'}">prayer</router-link>
      </div>
      <!-- <router-link to="sermons" class="noselect">sermons</router-link>
      <router-link to="groups" class="noselect">groups</router-link> -->
    </div>
    <div id="app-page-content">      
      <!-- <div>{{$route.params.subpage}}</div> -->
      <inbox v-if="$route.params.subpage == 'inbox'"></inbox>
      <people v-if="$route.params.subpage == 'people'"></people>
      <teams v-if="$route.params.subpage == 'teams'"></teams>
      <prayer v-if="$route.params.subpage == 'prayer'"></prayer>
      <div style="overflow-y: auto; height: calc(100vh - 40px)" v-if="$route.params.subpage == 'this-sunday'">
        <event-details></event-details>
      </div>
      <!-- <audio-page v-if="$route.params.subpage == 'audio'"></audio-page> -->
      <!-- <reading-plan v-if="$route.params.subpage == 'reading-plan'"></reading-plan> -->
    </div>
  </div>
</template>

<script>
import Inbox from '@/components/Inbox'
import People from '@/components/People'
import Teams from '@/components/Teams'
import Prayer from '@/components/Prayer'
import EventDetails from '@/components/EventDetails'
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
      Inbox, People, Teams, Prayer, EventDetails
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
  height: calc(100vh - 40px);
  display: flex;
}
#app-navbar {
  min-width: 125px;
  width: 125px;
  padding: 20px;
  padding-bottom: 60px;
  z-index: 800;
  display: flex;
  justify-content: center;

  transition: min-width .3s ease;
}
#app-navbar-buttons {  
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
#app-navbar-buttons a.selected {
  color: white;
}
#app-navbar-buttons a.selected:before {
  height: 1em; 
  bottom: -4px; 
  right: -4px;
  border: 4px #69CDCF solid;
  width: 100%;  
  z-index: -1;
  visibility: visible;
}
#app-navbar-buttons span{
  color: #cfcfcf;
  padding: 0px 3px;
  font-size: 20px;
}
#app-page-content {
  /* margin-top: 40px; */
  height: calc(100vh - 40px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

#app-navbar-toggle {
  position: fixed;
  left: 15px;
  top: 50px;
  cursor: pointer;
  z-index: 900;
  display: none;
  width: 24px;
  height: 24px;
}
#app-navbar-toggle i{
  position: absolute;
}

.rotate-fade-enter-active, .rotate-fade-leave-active {
  transition: opacity .5s;
  transition: transform .3s;
}
.rotate-fade-enter, .rotate-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: rotate(130deg)
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
    display: flex;
    min-width: 100%;
  }
  #app-navbar.toggled #app-navbar-buttons {
    justify-content: center;
    align-items: center;
  }
  #app-navbar-toggle {
    display: inline;
  }
 }

@media all and (max-width: 480px) {
  #app-navbar {
    display: none;
    min-width: 0px;
    padding: 0px;
  }
  #app-navbar.toggled {
    display: flex;
    min-width: 100%;
  }
  #app-navbar.toggled #app-navbar-buttons {
    justify-content: center;
    align-items: center;
  }
  #app-navbar-toggle {
    display: inline;
  }
 }
</style>