import Vue from "vue";
import Vuex from "vuex";

import Feathers from "./feathers";
import { set } from "@vue/composition-api";

Vue.use(Vuex);

const actions = {
  async initialise(context) {
    const applications = await Feathers.service("visa").find();
    context.commit("patch", { totalApplications: applications.total });
    context.commit("patch", { applications: applications.data });
  },
  async discard(context, id) {
    let remaining = context.state.applications.filter(
      (single) => single._id !== id
    );
    context.commit("patch", { applications: remaining });
    context.commit("patch", {
      totalApplications: context.state.totalApplications - 1,
    });

    Feathers.service("visa").remove(id);
  },
};

const mutations = {
  patch(state, payload) {
    if (!Object.keys(payload) || !Object.keys(payload).length === 0) {
      console.error(
        "patch payload should be an object that has more than one key"
      );
    }
    let key = Object.keys(payload)[0];
    set(state, key, payload[key]);
  },
  input(state, payload) {
    if (!Object.keys(payload) || !Object.keys(payload).length === 0) {
      console.error(
        "patch payload should be an object that has more than one key"
      );
    }
    let key = Object.keys(payload)[0];
    set(state.current, key, payload[key]);
  },
};

const getters = {
  userHasApplications(state) {
    if (state.loggedIn) {
      return (
        state.applications &&
        !(state.applications.length === 0 && !state.current)
      );
    } else return false;
  },
};

const store = new Vuex.Store({
  strict: true,
  state: {
    current: null,
    applications: null,
    error: null,
    step: null,
    loggedIn: false,
  },
  mutations: mutations,
  actions: actions,
  getters: getters
});

export default store;


// convert the data returned from find into an object for easy get and update
// function normalizeArray(data) {
//   if (Array.isArray(data) && data.length !== 0) {
//     let normalized = {};
//     data.forEach((visa) => {
//       normalized[visa._id] = visa;
//     });
//     return normalized;
//   } else return data;
// }

// watchEffect(()=> {
//   const State= Store.state;
//   if (isLoggedIn.value){
//     let notNew= State.applications && !(State.applications.length===0 && !State.current)
//    if (!notNew) {
//      steps.value=[0,1,4];
//    }else {
//      initialStep.value=3;
//    }}
// })

