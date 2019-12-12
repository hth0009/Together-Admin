<template>
  <div id="giving-wrapper" class="page-wrapper one-col">
    <div class="giving-panel">
      <b-row class="mb2em">
        <b-col sm="2">
          <input type="text" name="giving-search" class="floating" placeholder="search..." id="giving-search">
        </b-col>
        <b-col sm="1">
          <button name="giving-filter" id="giving-filter" class="gs-basic-button">Filter</button>
        </b-col>
        <b-col sm="1" id="redo-icon">
          <font-awesome-icon :icon="['fas', 'redo']" />
        </b-col>
        <b-col sm="8" class="giving-creation-actions">
          <button class="gs-basic-button">Manual Entry</button>
          <button class="gs-basic-button">Create Fund</button>
          <button class="gs-basic-button">Create Report</button>
        </b-col>
      </b-row>
      <b-row>
        <table id="giving-table">
          <tr>
            <th>Person</th>
            <th></th>
            <th>Date</th>
            <th>Fund</th>
            <th>Type</th>
            <th>Gift</th>
            <th>Giving Fee From Org</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td colspan="2">hey</td>
            <td>hey</td>
            <td>hey</td>
            <td>hey</td>
            <td>hey</td>
            <td>hey</td>
            <td>hey</td>
          </tr>
        </table>
      </b-row>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 'giving works'
    };
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
  align-items: center;
}
.giving-creation-actions {
  display: flex;
  justify-content: flex-end;
}

#giving-table {
  width: 100%;
}

th, td {
  padding: .5em 1em;
}

</style>