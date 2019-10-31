<template>
<div id="stillHaveQuestionWrapper" class="gs-flex-col">
  <b-row class="mb2em">
    <b-col lg="6" offset-lg="3">
      <p >Best Part? You don't have to wait for your </p>
        <p> software contract to end. Why? Because
        it doesn't cost anything to <span>start</span> connection your people through Together.
      </p>
    </b-col>
  </b-row>
  <join-global-church class="mb1em"/>
  <b-row>
    <b-col lg="6" offset-lg="3">
      <p class="mb1em">Question? Contact us!</p>
      <contact-us/>
    </b-col>
  </b-row>
</div>
</template>

<script>
import JoinGlobalChurch from './JoinGlobalChurch'
import ContactUs from "../ContactUs.vue";

export default {
  components: {
    JoinGlobalChurch,
    ContactUs,
  } 
}
</script>

<style scoped>
#stillHaveQuestionWrapper {
  justify-content: center;
  text-align: center;
}

#header-text {
  font-size: 14pt;
  font-weight: 700;
}

#contact-container {
  height: 30vh !important;
}

</style>