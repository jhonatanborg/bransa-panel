import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";

const product = {
  namespaced: true,
  state: () => ({
    dialogProduct: false,
    produtos: [],
    editProduct: null,
    featured: null,
  }),

  getters: {},
  mutations: {
    setProduct(state, data) {
      const products = [...state.produtos];
      products[state.editProduct.indexCategorie].produtos[
        state.editProduct.index
      ] = data;

      state.produtos = products;
    },
    setProductFeatured(state, data) {
      const products = [...state.featured];
      products[data.index] = data;
      state.featured = products;
    },
    removeFeatured(state, data) {
      const products = [...state.featured];
      state.featured = products.filter((item) => item.produto_id !== data);
    },
    ...mutationsGlobal,
  },
  actions: { ...actionsGlobal },
};

export default product;
