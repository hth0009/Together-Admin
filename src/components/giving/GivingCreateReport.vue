<template>
  <div id="giving-create-report" class="giving-panel panel bold">
    <b-row>
      <b-col sm="8">
        <h4 class="black">Auburn Community Church</h4>
      </b-col>
      <b-col sm="4" class="right">
        <span class="">Create Report</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12"> <p>Transactional Summary</p> </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" class="mb_5em gs-small-label">
        Fund (Select at least one)
      </b-col>
      <b-col sm="12" style="display: flex">
        <custom-radio class="toggle" v-model="report.fund" :options="['Building', 'General', 'Youth Ministry']"/>
      </b-col>
    </b-row>

    <b-row class="gs-flex-row">
      <b-col sm="6" md="4">
        <label for>Date Started</label>
        <flat-pickr
          class="gs-basic-input"
          :config="datePickerConfig"
          v-model="report.startDate"
        ></flat-pickr>
      </b-col>
      <span style="padding-top: 1.5em">-</span>
      <b-col sm="6" md="4">
        <label for>Date Ended</label>
        <flat-pickr
          class="gs-basic-input"
          :config="datePickerConfig"
          v-model="report.endDate"
        ></flat-pickr>
      </b-col>
    </b-row>


    <b-row>
      <b-col sm="12" class="gs-small-label mb1em">
        Additional Comments on Transactional Summary
      </b-col>
      <b-col sm="12" style="padding: 0em 2em;">
        <textarea class="gs-floating" name="" id="" cols="40" rows="10"
                  v-model="report.comments"></textarea>
      </b-col>
    </b-row>

    <div id="create-report-buttons">
      <button class="gs-floating-button green" @click="downloadCSV()">DOWNLOAD CSV</button>
      <button class="gs-floating-button primary" @click="downloadPDF()">DOWNLOAD PDF</button>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import CustomRadio from '@/components/CustomRadio'

export default {
  data() {
    return {
      report: {},
      datePickerConfig: {
        allowInput: true,
        altInput: true
      },
    }
  },
  components: {    
    CustomRadio, flatPickr,
  },
  methods: {
    downloadCSV() {
      return;
    },
    downloadPDF() {
      return;
    },
  },
}
</script>

<style scoped>
#create-report-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>