<template>
  <div id="welcome" class="center animated fadeIn fast">
    <div id="together-hero-card">
      <img id="together-title" class="mb2em" alt srcset
          src="https://togethercdn.global.ssl.fastly.net/assets/logo/title_black.png"
      />

      <p class="together-subtext mb1em">
        A church and ministry management<br/>software connecting the global church.
      </p>
      <p class="together-subtext mb2em"> No sign up or monthly payments. </p>

      <join-global-church/>
      
    </div>
    <nav-tabs/>
  </div>
</template>

<script>
import JoinGlobalChurch from './JoinGlobalChurch.vue';
import NavTabs from '@/components/splash/NavTabs'
export default {
  data() {
    return {
      videoUrl: 'https://togethercdn.global.ssl.fastly.net/assets/home-page/website-background.mp4',
    }
  },
  components: {
    JoinGlobalChurch, NavTabs,
  },
}
</script>

<style scoped>
#welcome {
  justify-content: space-evenly;
  align-items: center;
  height: 80%;
  flex-flow: row wrap;
}
#together-hero-card {
  padding: 4em;
  margin-top: 6em !important;
  margin-bottom: 6em !important; 
}
#together-title {
  height: 4em;
}
.together-subtext {
  font-size: 1rem;
  font-weight: 700;
}

.fullscreen-bg {
    position: relative;
}

@media all and (min-width: 1024px) and (max-width: 1280px) {
}

@media all and (min-width: 768px) and (max-width: 1024px) {
}

@media all and (min-width: 480px) and (max-width: 768px) {
}

@media all and (max-width: 480px) {
}

</style>