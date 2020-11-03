import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";

const product = {
  namespaced: true,
  state: () => ({
    dialogProduct: false,
    produtos: [],
    editProduct: null,
  }),

  getters: {},
  mutations: {
    setProduct(state, data) {
      if (
        state.produtos[state.editProduct.indexCategorie].produtos[
          state.editProduct.index
        ].image
      ) {
        state.produtos[state.editProduct.indexCategorie].produtos[
          state.editProduct.index
        ].image.image = data;
      } else {
        state.produtos[state.editProduct.indexCategorie].produtos[
          state.editProduct.index
        ].image = { image: data };
      }
    },

    ...mutationsGlobal,
  },
  actions: { ...actionsGlobal },
};

export default product;
