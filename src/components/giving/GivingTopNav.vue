<template>
  <div id="giving-top-nav">
    <b-row class="mb2em">
      <b-col sm="3">
        <input type="text" name="giving-search" class="gs-floating" placeholder="search..." id="giving-search">
      </b-col>
      <b-col sm="2">
        <button id="giving-filter" class="gs-floating-button">Filter</button>
      </b-col>
      <b-col sm="1" class="top-nav-icon">
        <font-awesome-icon :icon="['fas', 'redo']" />
      </b-col>
      <b-col sm="6" class="giving-creation-actions">
        <button class="gs-floating-button" style="background-color: #D2D1CC" @click="startManualEntry()">Manual Entry</button>
        <button class="gs-floating-button" style="background-color: #E5E9DD" @click="startCreateFund()">Create Fund</button>
        <button class="gs-floating-button" style="background-color: #F6F3F0" @click="startCreateReport()">Create Report</button>
        <font-awesome-icon v-show="showCollapsedTableView" class="top-nav-icon" 
                          @click="showFullTableView()"
                           style="margin-left: 10px; cursor: pointer;" :icon="['fas', 'arrow-right']" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('giving', ['showManualEntry', 'showCreateFund', 'showCreateReport', 'showCollapsedTableView']),
  },
  methods: {
  ...mapMutations('giving', [ 'setShowManualEntry', 'setShowCreateFund', 'setShowCreateReport', 'showFullTableView' ]),
    startManualEntry() { this.setShowManualEntry(!this.showManualEntry); },
    startCreateFund() { this.setShowCreateFund(!this.showCreateFund); },
    startCreateReport() { this.setShowCreateReport(!this.showCreateReport); },
  },
}
</script>

<style scoped>
  #giving-filter {
    color:#FC8888;
  }
  .top-nav-icon {
    display: flex;
    margin-top: 1.2em;
  }
  .giving-creation-actions {
    display: flex;
    justify-content: flex-end;
  }
</style>