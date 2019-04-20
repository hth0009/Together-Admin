<template>
  <div id="navbar">
    <router-link to="" class="noselect brand"><img :src="'/static/image/white-logo.png'" alt=""></router-link>
      <div id="navbar-buttons">
      <router-link to="/home" class="noselect"
       :class="{selected: $route.fullPath.split('/')[1] == 'home'}">home</router-link>
      <router-link to="/app/inbox" class="noselect"
        :class="{selected: $route.fullPath.split('/')[1] == 'app'}">app</router-link>
      <!-- <span>|</span> -->
      <router-link to="/calendar" class="noselect"
        :class="{selected: $route.fullPath.split('/')[1] == 'calendar'}">events</router-link>
      <!-- <span>|</span> -->
      <!-- <router-link to="/categories" class="noselect"
        :class="{selected: $route.fullPath.split('/')[1] == 'categories'}">categories</router-link> -->
      <div 
        class="profile-pic"
        @click="showSettings = !showSettings"
        :style="{backgroundImage: 'url(' +  churchProfile + ')'}">
      </div>
      <ul class="settings-dropdown noselect"
        v-if="showSettings"
        v-on-clickaway="closeSettings">
        <li><router-link v-on:click.native="showSettings = false" to="/church-info">Church Info</router-link></li>
        <li><router-link v-on:click.native="showSettings = false" to="/staff">Staff</router-link></li>
        <li><router-link v-on:click.native="showSettings = false" to="/subscription">Subscription</router-link></li>
      </ul>
    </div>
    <!-- <span>|</span><router-link to="sermons" class="noselect">sermons</router-link>
    <span>|</span><router-link to="groups" class="noselect">groups</router-link> -->
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'
export default {
  name: 'Header',
  data () {
    return {
      showSettings: false
    }
  },
  mixins: [clickaway],
  computed: {
    ...mapState([
      'churchProfile'
    ]),
  },
  methods: {
    closeSettings() {
      this.showSettings = false
    }
  }
}
</script>

<style scoped>
#navbar {
  width: 100%;
  height: 40px;
  /* padding-top: 10px; */
  display: flex;
  /* background: #f8f7f6; */
  background: white;
  position: fixed;
  top: 0px;
  flex-direction: row;
  /* box-shadow: 0px 7px 11px -6px rgba(53, 53, 53, 0.295); */
  z-index: 900;
  border-bottom: #f0f0f0 1px solid;
}
#navbar-buttons {  
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;  
  margin-right: 25px;
}
#navbar-buttons a{
  color: #444444;
  margin: 5px;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 5px 10px;
  position: relative;
}
#navbar-buttons a:hover {
  color: #444444;
}
#navbar-buttons a:before {
  content: "";
  position: absolute;
  z-index: 0;
  width: 0%;
  height: 3px;
  bottom: -2px;
  border-radius: 2px;
  right: 0;
  background-color: black;
  border: 0px black solid;
  visibility: hidden;
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}
#navbar-buttons a:hover:before {
  visibility: visible;
  width: 100%;
}
#navbar-buttons a.selected {
  color: white;
}
#navbar-buttons a.selected:before {
  height: 1em; 
  bottom: -4px; 
  right: -6px;
  border: 4px black solid;
  border-right-width: 6px;
  border-left-width: 6px;
  width: 100%;  
  z-index: -1;
  visibility: visible;
}
#navbar-buttons span{
  color: #cfcfcf;
  padding: 0px 3px;
  font-size: 20px;
}
#navbar .brand{
  background: #1b1b1b;
  /* background: black; */
  justify-self: flex-start;
  position: absolute;
  height: 30px;
  width: 30px;
  margin-left: 15px;
  border-radius: 100px;
  margin-top: 5px;
}
#navbar .brand img{
  height: 15px;
  width: 15px;
  margin-left: 7.5px;
  margin-top: 7.5px;
  image-rendering: crisp-edges;
}

#navbar .profile-pic {
  position: absolute;
  right: 10px;
  top: 7.5px;

  cursor: pointer;

  width: 25px;
  height: 25px;
  border-radius: 50%;
  /* display: inline-flex;
  flex: 1; */

  /* background-repeat: repeat; */
  background-position: center center;
  background-size: cover;
}

#navbar .settings-dropdown {
  position: absolute;
  right: 10px;
  top: 45px;
  background: white;  
  box-shadow: 0px 4px 11px -3px rgba(53, 53, 53, 0.295);
  width: 125px;
}

#navbar .settings-dropdown li{
  font-size: 15px;
  color: #444444;
  cursor: pointer;
}
#navbar .settings-dropdown li a{
  padding: 10px;
  margin: 0px;
  width: 105px;
}
</style>
