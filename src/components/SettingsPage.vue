<template>
  <div class="app-page">
    <div id="app-navbar">
      <div id="app-navbar-buttons">
        <router-link to="/app/inbox" class="noselect">inbox</router-link>
        <span>|</span>
        <router-link to="/app/people" class="noselect">people</router-link>
        <span>|</span>
        <router-link to="/app/teams" class="noselect">teams</router-link>
        <span>|</span>
        <router-link to="/app/audio" class="noselect">audio</router-link>
        <span>|</span>
        <router-link to="/app/this-sunday" class="noselect">this sunday</router-link>
        <span>|</span>
        <router-link to="/app/reading-plan" class="noselect">reading plan</router-link>
        <span>|</span>
        <router-link to="/app/prayer" class="noselect">prayer</router-link>
      </div>
      <!-- <span>|</span><router-link to="sermons" class="noselect">sermons</router-link>
      <span>|</span><router-link to="groups" class="noselect">groups</router-link> -->
    </div>
    <div id="app-page-content">      
      <!-- <div>{{$route.params.subpage}}</div> -->
      <inbox v-if="$route.params.subpage == 'inbox'"></inbox>
      <people v-if="$route.params.subpage == 'people'"></people>
      <teams v-if="$route.params.subpage == 'teams'"></teams>
      <audio-page v-if="$route.params.subpage == 'audio'"></audio-page>
      <reading-plan v-if="$route.params.subpage == 'reading-plan'"></reading-plan>
    </div>
  </div>
</template>

<script>
import Inbox from '@/components/Inbox'
import People from '@/components/People'
import Teams from '@/components/Teams'
import AudioPage from '@/components/AudioPage'
import ReadingPlan from '@/components/ReadingPlan'

  export default {
    name: "SettingPage",
    data() {
      return {
        
      }
    },
    components: {
      Inbox, People, Teams, AudioPage, ReadingPlan
    }
  }
</script>

<style scoped>
.app-page {  
  height: calc(100vh - 80px);
}
#app-navbar {
  width: 100%;
  height: 40px;
  /* padding-top: 10px; */
  display: flex;
  background: #f8f7f6;
  position: fixed;
  top: 40px;
  flex-direction: row;
  box-shadow: 0px 3px 9px -4px rgba(53, 53, 53, 0.295);
  z-index: 800;
}
#app-navbar-buttons {  
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;  
  margin-right: 25px;
}
#app-navbar-buttons a{
  color: #444444;
  text-decoration: none;
  margin: 5px;
  display: inline-block;
  font-size: 15px;
}
#app-navbar-buttons span{
  color: #cfcfcf;
  padding: 0px 3px;
  font-size: 20px;
}
#app-page-content {
  margin-top: 40px;
  height: calc(100vh - 80px);
  position: relative;
  overflow: hidden;
}
</style>