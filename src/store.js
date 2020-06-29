import Vue from "vue";
import Vuex from "vuex";

import Feathers from "./feathers";

Vue.use(Vuex);

const mutations = {
  patch(state, payload) {
    if (!Object.keys(payload) || !Object.keys(payload).length === 0) {
      console.error(
        "patch payload should be an object that has more than one key"
      );
    }
    let key = Object.keys(payload)[0];
    // normalize array for easy update and get
    let data = normalizeArray(payload[key]);
    state[key] = data || payload[key];
  },
};
// convert the data returned from find into an object for easy get and update
function normalizeArray(data) {
  if (Array.isArray(data) && data.length !== 0) {
    let normalized = {};
    data.forEach((visa) => {
      normalized[visa._id] = visa;
    });
    return normalized;
  } else return false;
}

const store = new Vuex.Store({
  strict: true,
  state: {
    current: null,
    others: null,
    error: null,
  },
  mutations: mutations,
});

export default store;
