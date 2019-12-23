<template>
  <div id="selected-view" class="selected-view">
    <div id="giving-wrapper" class="page-wrapper two-cols no-search">
      <div class="giving-panel">
        <giving-top-nav/>
        <giving-table/>
      </div>
      <giving-manual-entry style="width: 650px" v-if="showManualEntry"/>
      <giving-create-fund style="width: 650px" v-if="showCreateFund"/>
      <giving-create-report style="width: 650px" v-if="showCreateReport"/>
    </div>
  </div>
  
</template>

<script>
import GivingTable from '@/components/giving/GivingTable'
import GivingTopNav from '@/components/giving/GivingTopNav'
import GivingManualEntry from '@/components/giving/GivingManualEntry'
import GivingCreateFund from '@/components/giving/GivingCreateFund'
import GivingCreateReport from '@/components/giving/GivingCreateReport'
import { mapState } from 'vuex';

export default {
  components: {
    GivingTable, GivingTopNav, GivingManualEntry, GivingCreateFund, GivingCreateReport,
  },
  data() {
    return {
      test: 'giving works'
    };
  },
  computed: {
    ...mapState ('giving', ['showManualEntry', 'showCreateFund', 'showCreateReport']),
  },
}
</script>

<style scoped>
#giving-wrapper {
  padding-right: 5em !important;
}
.giving-panel {
  margin: 15px 12px;
  padding: 1em !important;
  box-shadow: 0px 5px 13px -2px #00000040;
  border-radius: 10px;
}
.giving-panel >>> .row {
  margin-bottom: 2em !important;
}

.giving-panel >>> input, button {
  outline: none !important;
}
</style>