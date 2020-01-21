<template>
  <div id="giving-top-nav">
    <b-row class="mb2em top-nav-row">
      <b-col sm="3">
        <input type="text" name="giving-search" class="gs-floating" placeholder="search..." id="giving-search">
      </b-col>
      <b-col sm="2">
        <button id="giving-filter" class="gs-floating-button">Filter</button>
      </b-col>
      <b-col sm="1" class="top-nav-icon">
        <font-awesome-icon :icon="['fas', 'redo']" />
      </b-col>
      <b-col sm="6" class="giving-creation-actions top-nav-row">
        <button class="gs-floating-button white" style="background-color: #183661" @click="startManualEntry()">
          <span v-show='!showCollapsedTableView'>Manual Entry</span>
          <font-awesome-icon v-show="showCollapsedTableView" :icon="['far', 'plus-square']" style="font-size: 2em;" />
        </button>
        <button class="gs-floating-button white" style="background-color: #1c4b82" @click="startCreateFund()">
          <span v-show='!showCollapsedTableView'>Create Fund</span>
          <font-awesome-icon v-show="showCollapsedTableView" :icon="['far', 'file']" style="font-size: 2em;" />
        </button>
        <button class="gs-floating-button white" style="background-color: #f17e7e" @click="startCreateReport()">
          <span v-show='!showCollapsedTableView'>Create Report</span>
          <font-awesome-icon v-show="showCollapsedTableView" :icon="['far', 'chart-bar']" style="font-size: 2em;" />
        </button>
        <font-awesome-icon v-show="showCollapsedTableView" class="top-nav-icon" 
                           @click="showFullTableView()"
                           style="margin-left: 10px; cursor: pointer;" 
                           :icon="['fas', 'arrow-right']" />
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
  .top-nav-row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
  #giving-filter {
    color:#FC8888;
  }
  .giving-creation-actions {
    display: flex;
    justify-content: flex-end;
  }
</style>