<template>
  <div id="selected-view" class="selected-view">
    <div id="giving-wrapper" class="page-wrapper two-cols no-search">
      <div class="giving-panel">
        <giving-top-nav></giving-top-nav>
        <giving-table></giving-table>
      </div>
      <div v-if="showCollapsedTableView" class="panel gs-containter vertical">hey</div>
    </div>
  </div>
  
</template>

<script>
import GivingTable from '@/components/giving/GivingTable'
import GivingTopNav from '@/components/giving/GivingTopNav'
import { mapState } from 'vuex';

export default {
  components: {
    GivingTable, GivingTopNav
  },
  data() {
    return {
      test: 'giving works'
    };
  },
  computed: {
    ...mapState ('giving', ['showCollapsedTableView']),
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


</style>