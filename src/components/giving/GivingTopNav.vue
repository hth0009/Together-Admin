<template>
  <div id="giving-top-nav">
    <b-row class="mb2em">
      <b-col sm="3">
        <input type="text" name="giving-search" class="floating" placeholder="search..." id="giving-search">
      </b-col>
      <b-col sm="2">
        <button name="giving-filter" id="giving-filter" class="gs-floating-button">Filter</button>
      </b-col>
      <b-col sm="1" id="redo-icon">
        <font-awesome-icon :icon="['fas', 'redo']" />
      </b-col>
      <b-col sm="6" class="giving-creation-actions">
        <button class="gs-floating-button" @click="startManualEntry()">Manual Entry</button>
        <button class="gs-floating-button">Create Fund</button>
        <button class="gs-floating-button">Create Report</button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('giving', ['showCollapsedTableView']),
  },
  methods: {
  ...mapMutations('giving', [ 'setShowCollapsedTableView' ]),
    startManualEntry() {
      this.setShowCollapsedTableView(!this.showCollapsedTableView);
    }
  },
}
</script>

<style scoped>
  .floating {
    padding: 10px 20px 10px 20px;
    box-shadow: 0px 5px 13px -2px #00000040;
    line-height: 1rem;
    font-weight: 600;
    border-radius: 1em;
    width: 100%
  }
  #redo-icon {
    display: flex;
    margin-top: 1em;
  }
  .giving-creation-actions {
    display: flex;
    justify-content: flex-end;
  }
</style>