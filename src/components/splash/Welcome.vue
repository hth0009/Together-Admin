<template>
  <div id="welcome" class="gs-flex-row">
    <div>
      <img id="together-title" class="mb2em" alt srcset
          src="https://togethercdn.global.ssl.fastly.net/assets/logo/title_black.png"
      />

      <p class="together-subtext mb1em">
        A church and ministry management<br/>software connecting the global church.
      </p>
      <p class="together-subtext mb2em"> No sign up or monthly payments. </p>

      <button id="joinTheGlobalChurchBtn" class="gs-basic-button inverted"
              @click="joinGlobalChurch()">
        Join the Global Church Today
      </button>
      <p id="joinTheGlobalChurchSubtext"> 30 Second Organization Sign Up. 5 Minute Learning Curve </p>
    </div>

    <div>
      <h2>Cross globe animation here</h2>
    </div>
    
  </div>
</template>

<script>
export default {
  methods: {
    joinGlobalChurch() {
      return;
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
#welcome {
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}
#together-title {
  height: 2em;
}
.together-subtext {
  font-size: 8pt;
  font-weight: 700;
}
#joinTheGlobalChurchBtn {
  width: 100%;
  margin-bottom: 8px;
}
#joinTheGlobalChurchSubtext {
  font-size: 6pt;
  font-weight: 600;
}


</style>