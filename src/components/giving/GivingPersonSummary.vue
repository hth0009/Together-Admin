<template>
  <div id="giving-person-summary" class="giving-panel panel">
    <b-row>
      <b-col sm="9" id="avatar-col">
        <avatar :height="50" :url="'https://togethercdn.global.ssl.fastly.net/assets/t-logo-small-white.png'" 
                :title="'Michael Harrison'" class="mr1em" />
        <span class="bol">
          Michael Harrison
        </span>
      </b-col>
      <b-col sm="3" class="right bold">
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
    <b-row>
      <b-col sm="12" class="px0">
        <table id="giving-table">
          <tr>
            <th>Date</th>
            <th>Fund</th>
            <th>Type</th>
            <th>Gift</th>
            <th>Giving Fee From Org</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>9/7/19</td>
            <td>Building</td>
            <td>Check</td>
            <td>$500</td>
            <td id="giving-fee-td"
                :style="{color: 0 > 0 ? '#FF0000' : ''}">$0</td>
            <td :style="{color: 500 > 0 ? '#08C900' : ''}">$500</td>
          </tr>
        </table>
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

<style scoped>
#avatar-col {
  display: flex;
  align-items: center;
}

th, td {
  padding: .5em 1em;
}
th { font-weight: bold; }
</style>