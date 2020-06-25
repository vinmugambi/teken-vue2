import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/index.vue";
import Visa from "../pages/visa.vue";
import Magic from "../pages/magic.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/visa",
    name: "Visa",
    component: Visa,
  },
  { path: "/magic", name: "magic", component: Magic },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
