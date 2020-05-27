import Vue from 'vue'
import CompositionApi from "@vue/composition-api"

import App from './pages/layouts/default.vue'
import './assets/index.css'
import router from "./router/index";

Vue.config.productionTip = false;
Vue.use(CompositionApi);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
