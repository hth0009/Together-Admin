// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VModal from 'vue-js-modal'
import VueYoutube from 'vue-youtube'
import store from './store'
import Axios from 'axios'

// // AXIOS SETUP
// Vue.prototype.$http = Axios
// const accessToken = localStorage.getItem('accessToken')
// if (accessToken) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = accessToken
// }
// // Vue.prototype.$http.defaults.baseURL = 'https://dk0kosk9uj.execute-api.us-east-2.amazonaws.com/Prod/'
// console.log(Vue.prototype.$http.defaults)

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
      const idToken = this.$store.state.token
      const base = Axios.create({
        baseURL: 'https://api.togetheradmin.com/',
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      })
      console.log('hi')
      Vue.prototype.$http = base
      // this.$router.push('/app/people')
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  }
})

/* AXIOS SETUP */
// const idToken = localStorage.getItem('idToken')
// Vue.prototype.$http = Axios
// if (idToken) {
//   const base = Axios.create({
//     baseURL: 'https://api.togetheradmin.com/',
//     headers: {
//       'Authorization': `Bearer ${idToken}`
//     }
//   })
//   Vue.prototype.$http = base
// }
// console.log(Vue.prototype.$http)
