<template>
<div id="stillHaveQuestionWrapper" class="animated fadeIn fast bold">
  <b-row>
    <b-col lg="8" offset-lg="2" sm="10" class="stillHaveQuestionsCol mb2em mt2em">
      <h5 class="mb1em black">Best Part? You don't have to wait for your 
         software contract to end. Why? Because
        it doesn't cost anything to 
        <span>start</span> connecting your people through Together.
      </h5>
      <join-global-church class="mb1em"/>
    </b-col>
    <b-col lg="8" offset-lg="2" sm="10" class='stillHaveQuestionsCol contactUs'>
      <p class="mb1em">Question? Contact us!</p>
      <contact-us class="mb2em"/>
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
.stillHaveQuestionsCol {
  text-align: center;
}

#header-text {
  font-size: 14pt;
  font-weight: 700;
}

</style>