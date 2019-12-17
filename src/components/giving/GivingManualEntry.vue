<template>
  <div id="giving-manual-entry" class="giving-panel bold">
    <b-row>
      <b-col sm="8">
        <h4 class="black">Auburn Community Church</h4>
      </b-col>
      <b-col sm="4" class="right">
        <span class="">Manual Entry</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6">
        <button class="gs-basic-button">Amount</button>
      </b-col>
      <b-col sm="6" class="right">
        
        <div class="gs-form-group">
                  <label for>Payment Date</label>
                  <flat-pickr
                    class="gs-basic-input"
                    :config="datePickerConfig"
                    v-model="manualEntry.date"
                  ></flat-pickr>
                </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" class="">
        Person
      </b-col>
      <b-col sm="12">
        <button class="gs-basic-button">Search</button>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        Select Fund
      </b-col>
      <b-col sm="12" style="display: flex">
        <button class="gs-basic-button">Building</button>
        <button class="gs-basic-button">General</button>
        <button class="gs-basic-button">Youth Ministry</button>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        Type
      </b-col>
      <b-col sm="12" style="display: flex">
        <button class="gs-basic-button">Check</button>
        <button class="gs-basic-button">Cash</button>
      </b-col>
    </b-row>
    <div>
      <button class="gs-basic-button mr-5" style="float: right;">Create</button>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'

export default {
  data() {
    return {
      manualEntry: {},
      datePickerConfig: {
        allowInput: true,
        altInput: true
      },
    }
  },
  components: {    
    flatPickr
  },
}
</script>

<style scoped>
.row {
  margin-bottom: 1em !important;
}
</style>