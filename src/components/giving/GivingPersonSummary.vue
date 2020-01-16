<template>
  <div id="giving-person-summary" class="giving-panel panel bold">
    <b-row>
      <b-col sm="8">
        <avatar :height="50" :url="'https://togethercdn.global.ssl.fastly.net/assets/t-logo-small-white.png'" 
                :title="'Michael Harrison'" />
        Michael Harrison
      </b-col>
      <b-col sm="4" class="right">
        <div class="gs-flex-col">
          Total Given
          <span class="gs-green">$455.22</span>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <button class="gs-floating-button white" style="background-color: #767d63" @click="sendContributionStatement()">
          Send Contribution Statement
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  components: {
    Avatar,
  },
  methods: {
    sendContributionStatement() {
      alert('send Contribution Statement');
    }
  },
}
</script>