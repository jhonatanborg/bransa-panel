import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";

const user = {
  namespaced: true,
  state: () => ({
    user: null,
    message: null,
  }),

  getters: {},
  mutations: {
    ...mutationsGlobal,
  },
  actions: { ...actionsGlobal },
};

export default user;
