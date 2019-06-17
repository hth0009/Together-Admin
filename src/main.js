// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VModal from 'vue-js-modal'
import VueYoutube from 'vue-youtube'
import store from './store'
import VueFuse from 'vue-fuse'

/* ///////////////////////////////
///////SYNC FUSION IMPORTS////////
/////////////////////////////// */

import { DropDownListPlugin, AutoCompletePlugin, MultiSelectPlugin, ComboBoxPlugin } from '@syncfusion/ej2-vue-dropdowns'
import { DateTimePickerPlugin, DatePickerPlugin, TimePickerPlugin, DateRangePickerPlugin } from '@syncfusion/ej2-vue-calendars'
import { InPlaceEditorPlugin } from '@syncfusion/ej2-vue-inplace-editor'
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs'
import { CheckBoxPlugin } from '@syncfusion/ej2-vue-buttons'
import { RecurrenceEditorPlugin } from '@syncfusion/ej2-vue-schedule'
import { TooltipPlugin } from "@syncfusion/ej2-vue-popups"

// import { TabPlugin } from '@syncfusion/ej2-vue-navigations'

/* ///////////////////////
///////SYNC FUSION////////
/////////////////////// */

Vue.use(DropDownListPlugin)
Vue.use(DateTimePickerPlugin)
Vue.use(DatePickerPlugin)
Vue.use(InPlaceEditorPlugin)
Vue.use(TextBoxPlugin)
Vue.use(CheckBoxPlugin)
Vue.use(AutoCompletePlugin)
Vue.use(ComboBoxPlugin)
Vue.use(RecurrenceEditorPlugin)
Vue.use(MultiSelectPlugin)
Vue.use(DateRangePickerPlugin)
Vue.use(TimePickerPlugin)
Vue.use(TooltipPlugin)
// Vue.use(TabPlugin)

/* ///////////////////////
///////////OTHER//////////
/////////////////////// */

Vue.config.productionTip = false
// Vue.use(VModal)
Vue.use(VueYoutube)
Vue.use(VueFuse)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    this.$store.dispatch('checkLogin').then(function () {
    }).catch(function (err) {
      console.log(err)
    })
  }
})
