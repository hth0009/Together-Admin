<template>
  <table>
    <thead>
      <tr>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key, profile: columnType[key] === PROFILE_PIC}"
          :key="key">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData" :key="entry[idKey]"
        @click="submitEvent(entry[idKey])"
        :class="{highlighted: entry[idKey] == highlightedEntry}">
        <td v-for="key in columns" :key="key"
        :class="{profile: columnType[key] === PROFILE_PIC}">
          {{columnType[key] === PROFILE_PIC ? "" : entry[key]}}
          <div class="profile-pic" v-if="columnType[key] === PROFILE_PIC"
          :style="{backgroundImage: 'url(' + entry[key] + ')'}"></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'Table',
  data () {    
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
      PROFILE_PIC: 'profile',
      TEXT: 'text'
    }
  },
  props: {
    data: Array,
    columns: Array,
    columnType: Object,
    filterKey: String,
    idKey: String,
    highlightedEntry: Number
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    submitEvent: function (id) {
      this.$emit('value', id)
    }
  },
  mounted() {    
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      var columnType = this.columnType
      const TEXT = this.TEXT
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            if (columnType[key] != TEXT) return
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
}
</script>

<style scoped>
table {
  border-radius: 3px;
  background-color: #fff;
  font-size: 13px;
}

th {
  color: #000000;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


th, td {
  min-width: 120px;
  padding: 10px 15px;  
  text-align: left; 
  vertical-align: middle;
}
th.profile {
  visibility: hidden;
}
th.profile, td.profile {
  width: 10px;
  max-width: 10px;
  min-width: 10px;
  /* padding: 10px 0px 10px 20px; */
  padding-left: 10px;
  /* padding: 0px; */
}
td.profile .profile-pic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: inline-flex;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

th.active {
  color: #69CDCF;
}

th.active .arrow {
  opacity: 1;
}

tr:hover td{
  background: #E6E9EC;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #808080;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #808080;
}
.highlighted {
  box-shadow: 0px 2px 5px -2px rgba(128, 128, 128, 0.507);
}
</style>