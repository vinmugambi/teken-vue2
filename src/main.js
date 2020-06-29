import Vue from "vue";

import store from "./store.js"
import CompositionApi from "@vue/composition-api";

import App from "./pages/layouts/default.vue";
import "./assets/index.css";
import router from "./router/index.js";

Vue.config.productionTip = false;
Vue.use(CompositionApi);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
