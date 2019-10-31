<template>
<div id="stillHaveQuestionWrapper" class="gs-flex-col animated fadeIn fast">
  <b-row class="mb2em" style="display: flex; align-items: center;">
    <b-col lg="6" class='stillHaveQuestionsCol' style="margin-top: -12em">
      <p class="mb1em">Question? Contact us!</p>
      <contact-us/>
    </b-col>
    <b-col lg="4" class="stillHaveQuestionsCol">
      <p class="mb2em">Best Part? You don't have to wait for your 
         software contract to end. Why? Because
        it doesn't cost anything to <span>start</span> connection your people through Together.
      </p>
      <join-global-church class="mb1em"/>
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
  align-items: center;
}

.stillHaveQuestionsCol {
  height: 80vh;
  align-items: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
}

#header-text {
  font-size: 14pt;
  font-weight: 700;
}

#contact-container {
  height: 30vh !important;
}

</style>