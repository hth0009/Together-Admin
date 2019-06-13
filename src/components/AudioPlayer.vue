<template>
  <div class="audio-player">    
    <div class="play-container">
        <div class="play" @click="play()" 
        v-show="!playing">
        <i class="material-icons">
        play_arrow
        </i>
        </div>
        <div class="pause" @click="pause()"
        v-show="playing">
        <i class="material-icons">
        pause
        </i></div>
    </div>
    <div class="file-name">{{ name }}</div>
    <input type="range" 
        @change="scrubAudio()" 
        v-model="audioProgress"
        :style="{background: 'linear-gradient(to right, #E6E9EC '+ audioProgress + '%, white ' + audioProgress + '%)'}">
    <audio ref="audioPlayer" :src="url" preload="auto"></audio>        
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      playing: false,
      audioProgress: 0,
      player : {}
    }
  },
  components: {
  },
  methods: {
    play () {
      this.playing = true
      this.player.play()
    },
    pause() {
      this.playing = false
      this.player.pause()
    },
    scrubAudio() {
      this.player.currentTime = this.audioProgress/100 * this.player.duration
    }
  },
  props: {
    url: ,
    name: 
  },
  mounted() {   
    this.player = this.$refs.audioPlayer 
  },
  computed: {
  }
}
</script>

<style scoped>
  .audio-player {
    padding: 15px;
    margin: 6px;
    height: 30px;
    display: flex;
    flex-direction: row;
    box-shadow: 0px 4px 4px -2px rgba(128, 128, 128, 0.507);
    align-items: center;
    justify-content: flex-end;
    position: relative;
  }  
  .audio-player input[type="range"]{
    -webkit-appearance: none;
    -moz-apperance: none;
    height: 6px;
    position: absolute;
    z-index: 0;
    left: 0px;
    width: 100%;
    height: 100%;
}

input[type='range']::-webkit-slider-thumb {
  opacity: 0;
}

  .play-container {
    /* width: 17.5px;
    height: 17.5px; */
    cursor: pointer;
    position: absolute;
    z-index: 1;
    top: 17.5px;
    left: 10px;
  }
  .file-name {
    position: absolute;
    z-index: 1;
    left: 50px;
    pointer-events: none;
  }
</style>