<template>
  <div id="giving-manual-entry" class="giving-panel panel bold">
    <b-row>
      <b-col sm="8">
        <h4 class="black">Auburn Community Church</h4>
      </b-col>
      <b-col sm="4" class="right">
        <span class="">Manual Entry</span>
      </b-col>
    </b-row>
    <b-row class="gs-flex-row">
      <b-col sm="6">
        <label for="name-amount-input">Amount</label>
        <input type="number" name="giving-amount-input" class="gs-floating" placeholder="$50">
      </b-col>
      <b-col sm="6" class="right">
        <label for>Payment Date</label>
        <flat-pickr
          class="gs-basic-input"
          :config="datePickerConfig"
          v-model="manualEntry.date"
        ></flat-pickr>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" class="mb_5em">
        Person
      </b-col>
      <b-col sm="6">
        <input type="text" name="giving-person-input" class="gs-floating" placeholder="search...">
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" class="mb_5em">
        Select Fund
      </b-col>
      <b-col sm="12" style="display: flex">
        <custom-radio class="toggle" v-model="manualEntry.fund" :options="['Building', 'General', 'Youth Ministry']"></custom-radio>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" class="mb_5em">
        Type
      </b-col>
      <b-col sm="12" style="display: flex">
        <custom-radio class="toggle" v-model="manualEntry.paymentType" :options="['Check', 'Cash']"></custom-radio>
      </b-col>
    </b-row>
    <div>
      <button class="gs-floating-button primary mr-5" style="float: right;">Create</button>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import CustomRadio from '@/components/CustomRadio'

export default {
  data() {
    return {
      manualEntry: { paymentType: 0, fund: 0, },
      datePickerConfig: {
        allowInput: true,
        altInput: true
      },
    }
  },
  components: {    
    flatPickr, CustomRadio
  },
}
</script>

<style scoped>
</style>