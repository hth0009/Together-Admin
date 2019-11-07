<template>
<div id="cost-wrapper" class=" animated fadeIn fast">
  <b-row class="mb2em">
    <b-col col lg="3" offset-lg="3" md='12' class="mb1em">
      <div class="center" id='your-cost-left-col'>
        <h2 id="your-zero-cost">$0</h2>
        <p class="mb2em">Startup or monthly payments</p>
        <p id="fee-per-transaction" class="mb1em"> <strong> FEE PER TRANSACTION<br>Through Giving </strong></p>
        <p class="mb1em font-size-9pt">3.0% + $.30 All Card Types</p>
        <p class="mb4 font-size-9pt"> 1.0% + $.50 for ACH </p>
      </div>
    </b-col>
    <b-col col lg="6" md="12" id='your-cost-right-col'>
      <div v-for="detail in yourCostDetails"  class="your-cost-detail"
            :key="detail.id" :style="{color: detail.color}">
        {{detail.name}}
      </div>
    </b-col>
  </b-row>
</div>
</template>

<script>
export default {
  name: 'Cost',
  data() {
    return {
      yourCostDetails: [
        { name: 'Giving', color: '#5FBAFF' },
        { name: 'Mass Message Tool', color: '#FF84B5' },
        { name: 'Engagement Software', color: '#FF7276' },
        { name: 'Database and Data Storage', color: '#7256EF' },
        { name: 'Basic Planning and Management', color: '#18C6A3' },
      ],
    }
  },
}
</script>

<style scoped>
#fee-per-transaction {
  font-size: 10pt;
}
.font-size-9pt { font-size: 9pt; }
#cost-wrapper {
  padding-top: 20vh;
}
#your-cost-left-col {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-right: 3em;
}

#your-cost-right-col {
  border-left: solid grey 1px;
  display: flex;
  padding-left: 4em !important;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
}

#your-zero-cost {
  font-size: 4rem;
  color: black;
  font-weight: 100;
}

#your-cost-giving {
  font-size: 1.2rem;
  color: black;
  font-weight: 100;
  margin-bottom: .5em;
}

.your-cost-detail {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1em;
}

#your-cost-no-statements {
  color: #2AE5E1;
  text-align: center;
  font-size: .8rem;
  font-weight: 700;
}
</style>