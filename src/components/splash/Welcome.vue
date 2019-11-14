<template>
  <div id="welcome" class="gs-flex-row center animated fadeIn fast">
    <div>
      <img id="together-title" class="mb2em" alt srcset
          src="https://togethercdn.global.ssl.fastly.net/assets/logo/title_black.png"
      />

      <p class="together-subtext mb1em">
        A church and ministry management<br/>software connecting the global church.
      </p>
      <p class="together-subtext mb2em"> No sign up or monthly payments. </p>

      <join-global-church/>
      
    </div>

    <div>
      <h2>Cross globe animation here</h2>
      <font-awesome-icon icon="user-secret" />
    </div>
    
  </div>
</template>

<script>
import JoinGlobalChurch from './JoinGlobalChurch.vue';
export default {
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
#together-title {
  height: 3em;
}
.together-subtext {
  font-size: .8rem;
  font-weight: 700;
}



</style>