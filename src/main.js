// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VModal from 'vue-js-modal'
import VueYoutube from 'vue-youtube'
import store from './store'
/* ///////////////////////////////
///////SYNC FUSION IMPORTS////////
/////////////////////////////// */

import { DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns'
import { DatePickerPlugin } from '@syncfusion/ej2-vue-calendars'
// import { TabPlugin } from '@syncfusion/ej2-vue-navigations'

/* ///////////////////////
///////SYNC FUSION////////
/////////////////////// */

Vue.use(DropDownListPlugin)
Vue.use(DatePickerPlugin)
// Vue.use(TabPlugin)

/* ///////////////////////
///////////OTHER//////////
/////////////////////// */

Vue.config.productionTip = false
Vue.use(VModal)
Vue.use(VueYoutube)

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
