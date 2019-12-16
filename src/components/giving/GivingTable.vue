<template>
  <div id="giving-table">
    <b-row>
      <b-col sm="12">
        <table id="giving-table">
          <tr>
            <th>Person</th>
            <th>Date</th>
            <th v-if="!showCollapsedTableView">Fund</th>
            <th v-if="!showCollapsedTableView">Type</th>
            <th v-if="!showCollapsedTableView">Gift</th>
            <th v-if="!showCollapsedTableView">Giving Fee From Org</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>hey</td>
            <td>hey</td>
            <td v-if="!showCollapsedTableView">hey</td>
            <td v-if="!showCollapsedTableView">hey</td>
            <td v-if="!showCollapsedTableView">hey</td>
            <td v-if="!showCollapsedTableView" id="giving-fee-td">hey</td>
            <td>hey</td>
          </tr>
        </table>
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
}
</script>

<style scoped>

#giving-table {
  width: 100%;
}
#giving-fee-td {
  width: 12em !important;
}
th, td {
  padding: .5em 1em;
}
</style>