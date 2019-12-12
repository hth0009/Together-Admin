<template>
<div id="stillHaveQuestionWrapper" class="animated fadeIn fast">
  <b-row class="mb2em">
    <b-col lg="8" offset-lg="2" sm="10" class="stillHaveQuestionsCol mb2em mt4em">
      <h5 class="mb1em black">Best Part? You don't have to wait for your 
         software contract to end. Why? Because
        <span class="gs-light"> it doesn't cost anything to </span> 
        <span>start</span> connecting your people through Together.
      </h5>
      <join-global-church class="mb1em"/>
    </b-col>
    <b-col lg="8" offset-lg="2" sm="10" class='stillHaveQuestionsCol contactUs'>
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
  margin-top: 4em;
}

.stillHaveQuestionsCol {
  text-align: center;
}

#contactUs {
  height: 30em;
}

#header-text {
  font-size: 14pt;
  font-weight: 700;
}

#contact-container {
  height: 30vh !important;
}

</style>