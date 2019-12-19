<template>
  <div id="giving-create-fund" class="giving-panel panel bold">
    <b-row>
      <b-col sm="8">
        <h4 class="black">Auburn Community Church</h4>
      </b-col>
      <b-col sm="4" class="right">
        <span class="">Create Fund</span>
      </b-col>
    </b-row>
    <b-row class="gs-flex-row">
      <b-col sm="6">
        <label for="name-amount-input">NEW FUND NAME</label>
        <input type="number" name="giving-amount-input" class="gs-floating" placeholder="...">
      </b-col>
      <b-col sm="3" class="right">
        <label for>START Date</label>
        <flat-pickr
          class="gs-basic-input"
          :config="datePickerConfig"
          v-model="fund.startDate"
        ></flat-pickr>
      </b-col>
      <b-col sm="3" class="right">
        <label for>END Date</label>
        <flat-pickr
          class="gs-basic-input"
          :config="datePickerConfig"
          v-model="fund.endDate"
        ></flat-pickr>
      </b-col>
    </b-row>
    <b-row class="gs-flex-row">
      <b-col sm="8" class="gs-flex-row">
        <toggle-button :value='fund.taxDeductible' id="taxDeductibleToggle" color="#55C0E4"  @change="toggleTaxDeductible"
          :labels="{checked: 'Fund Is Tax Deductible', unchecked: 'Fund Is Not Tax Deductible'}" 
          width='250' height='30' font-size='14'/>
      </b-col>
      <b-col sm="4">
        <button class="gs-floating-button primary mr-5" style="float: right;">Create</button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'

export default {
  data() {
    return {
      fund: { 
        taxDeductible: true,
      },
      datePickerConfig: {
        allowInput: true,
        altInput: true
      },
    }
  },
  components: {    
    flatPickr
  },
  methods: {
    toggleTaxDeductible() {
      this.taxDeductible = !this.taxDeductible;
    }
  },
  
}
</script>

<style scoped>
#taxDeductibleToggle {
  margin-bottom: 0;
}
</style>