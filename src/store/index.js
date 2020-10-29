import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import product from "./modules/product";
import utils from "./modules/utils";
import actionsGlobal from "./actions";
import mutationsGlobal from "./mutations";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, product, utils },
  state: {
    exitModal: false,
    loading: false,
    server: process.env.VUE_APP_BACKEND,
  },
  mutations: {
    loading(state, data) {
      state.loading = data;
    },
    ...mutationsGlobal,
  },
  actions: {
    ...actionsGlobal,
  },
});
