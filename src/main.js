// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VModal from 'vue-js-modal'
import VueYoutube from 'vue-youtube'
import store from './store'
import VueFuse from 'vue-fuse'
import VuejsClipper from 'vuejs-clipper'
import { SweetModal } from 'sweet-modal-vue'
import PrettyCheckbox from 'pretty-checkbox-vue';

import { DropDownListPlugin, AutoCompletePlugin, MultiSelectPlugin, ComboBoxPlugin } from '@syncfusion/ej2-vue-dropdowns'
import { DateTimePickerPlugin, DatePickerPlugin, TimePickerPlugin, DateRangePickerPlugin } from '@syncfusion/ej2-vue-calendars'
import { InPlaceEditorPlugin } from '@syncfusion/ej2-vue-inplace-editor'
import { TextBoxPlugin, MaskedTextBoxPlugin  } from '@syncfusion/ej2-vue-inputs'
import { CheckBoxPlugin } from '@syncfusion/ej2-vue-buttons'
import { RecurrenceEditorPlugin } from '@syncfusion/ej2-vue-schedule'
import { TooltipPlugin } from "@syncfusion/ej2-vue-popups"
import { RichTextEditorPlugin } from "@syncfusion/ej2-vue-richtexteditor"


import { animate } from "animate.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { LayoutPlugin } from "bootstrap-vue";
Vue.use(LayoutPlugin);

import './assets/css/helpers.css'
import './registerServiceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter, faCross } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStripeS } from '@fortawesome/free-brands-svg-icons'
import { faHeart, faPaperPlane, faUser } from '@fortawesome/free-regular-svg-icons'
library.add(faFilter, faCross, faStripeS, faHeart, faPaperPlane, faUser);
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(DropDownListPlugin)
Vue.use(DateTimePickerPlugin)
Vue.use(DatePickerPlugin)
Vue.use(InPlaceEditorPlugin)
Vue.use(TextBoxPlugin)
Vue.use(MaskedTextBoxPlugin)
Vue.use(CheckBoxPlugin)
Vue.use(AutoCompletePlugin)
Vue.use(ComboBoxPlugin)
Vue.use(RecurrenceEditorPlugin)
Vue.use(MultiSelectPlugin)
Vue.use(DateRangePickerPlugin)
Vue.use(TimePickerPlugin)
Vue.use(TooltipPlugin)
Vue.use(RichTextEditorPlugin)

Vue.config.productionTip = false
Vue.use(VuejsClipper)
Vue.use(VModal)
Vue.use(VueYoutube)
Vue.use(VueFuse)
Vue.use(SweetModal)
Vue.use(PrettyCheckbox);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
