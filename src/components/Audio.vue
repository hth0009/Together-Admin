<template>  
  <div class="audio-container">
    <h3>Audio</h3>
    <div class="audio-box ">
      <div class="audio-files">
        <audio-player
          :name="audioFile.name"
          :url="audioFile.url"></audio-player>
      </div>
      <file-uploader @files='updateFiles'></file-uploader>
    </div>
  </div>
</template>

<script>
import FileUploader from '@/components/FileUploader'
import AudioPlayer from '@/components/AudioPlayer'

export default {
  name: 'Audio',
  data () {
    return {
      id: 'audio-input',
      audioProgresses: [],
      audioFile: {
        name: 'Sermon Recording',
        id: 'asdf',
        url: 'http://static1.squarespace.com/static/563fb2d1e4b07f78f2db4c32/t/5c0e99f540ec9a6c3b0f167c/1544461127697/Trust+The+Promise_+Peace+%3D+Promises.mp3/original/Trust+The+Promise_+Peace+%3D+Promises.mp3'
      },
      playing: false,
      acceptTimeChange: true
    }
  },
  components: {
    FileUploader,
    AudioPlayer
  },
  methods: {
    updateFiles (files) {
      // this.audioFiles = files
    },
  },
  watch: {
  },
  props: {
  },
  mounted() {   
    this.audioFiles = [...this.audioFiles]
  },
  computed: {
  }
}
</script>

<style scoped>
  .audio-container {
  }
  h3 {
    margin-bottom: 10px;
  }
  .audio-box {    
    height: 100%;
    max-height: 300px;
    min-height: 50px;
    width: 100%;
    border: 1px #D0D3D6 solid;
    padding: 0px;
    display: flex;
    flex-direction: column;
  }
  .audio-files {
    /* display: flex;
    flex-direction: column; */
    overflow-y: auto;
    max-height: 250px;
  }
  
</style>