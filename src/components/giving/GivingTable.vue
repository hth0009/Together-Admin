<template>
  <div id="giving-table">
    <b-row>
      <b-col sm="12" class="px0">
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
          <tr :class="{'selected': true}" style="cursor: pointer;" 
              @click='setSelectedPerson({}); setShowPersonSummary(true)'>
            <td>Michael Harrison</td>
            <td>9/7/19</td>
            <td v-if="!showCollapsedTableView">Building</td>
            <td v-if="!showCollapsedTableView">Check</td>
            <td v-if="!showCollapsedTableView">$500</td>
            <td v-if="!showCollapsedTableView" id="giving-fee-td"
                :style="{color: 0 > 0 ? '#FF0000' : ''}">$0</td>
            <td :style="{color: 500 > 0 ? '#08C900' : ''}">$500</td>
          </tr>
        </table>
      </b-col>
      
    </b-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      people: [],
    }
  },
  computed: {
    ...mapState('giving', ['showCollapsedTableView']),
  },
  methods: {
    ...mapMutations('giving', ['setSelectedPerson', 'setShowPersonSummary'])
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
th { font-weight: bold; }
.selected {
  background-color: rgba(85, 192, 228, .15)
}
</style>