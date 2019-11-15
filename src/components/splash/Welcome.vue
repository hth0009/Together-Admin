<template>
  <div id="welcome" class="gs-flex-row center animated fadeIn fast">
    <div class="fullscreen-bg">
      <video class="fullscreen-bg_video animated fadeIn fast" :src="videoUrl" loop autoplay muted></video>
    </div>
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
  </div>
</template>

<script>
import JoinGlobalChurch from './JoinGlobalChurch.vue';
export default {
  data() {
    return {
      videoUrl: 'https://togethercdn.global.ssl.fastly.net/assets/home-page/website-background.mp4',
    }
  },
  components: {
    JoinGlobalChurch
  },
}
</script>

<style scoped>
#welcome {
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  flex-flow: row wrap;
}
#together-hero-card {
  background-color: white;
  opacity: .8;
  box-shadow: 0px 5px 13px -2px #00000040;
  border-radius: 1em;
  padding: 4em;
}
#together-title {
  height: 4em;
}
.together-subtext {
  font-size: 1rem;
  font-weight: 700;
}

.fullscreen-bg {
    position: fixed;
    top: 10%;
    right: 20%;
    bottom: 10%;
    left: 10%;
    overflow: hidden;
    z-index: -100;
    border-radius: 1em;
}

.fullscreen-bg__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>