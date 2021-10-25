<template>
  <div>
    <v-card @click="edit(product, index, indexCategorie)" flat max-width="100%">
      <div class="pa-5">
        <div>
          <v-img
            contain
            aspect-ratio="1.1"
            :src="image(product.produto_imagem)"
          >
          </v-img>
        </div>
        <div class="title-product">
          <span v-text="product.produto_descricao"> </span>
        </div>
        <div class="my-2">
          <small v-text="'CÓD: ' + product.produto_codigo"></small>
        </div>
        <div>
          <span v-text="convertMoney(product.produto_valor)"> </span>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import Mixins from "@/mixins/mixins.js";

export default {
  props: {
    product: Object,
    index: Number,
    indexCategorie: Number,
  },
  mixins: [Mixins],
  computed: {},
  methods: {
    edit(produto, index, indexCategorie) {
      produto.index = index;
      produto.indexCategorie = indexCategorie;
      this.$store.commit("product/request", ["editProduct", produto]);
      this.$store.commit("product/request", ["dialogProduct", true]);
    },
    image(image) {
      if (!image) {
        return "https://i.imgur.com/jcWYGjx.png";
      } else if (image && image.toString().indexOf("blob") >= 0) {
        console.log("entrou no blob");
        return image;
      } else {
        return this.$store.state.server + image;
      }
    },
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
  border-radius: 4px;
}
.title-product {
  margin-top: 10px;
  font-size: 15px;
  line-height: 15px;
  text-transform: lowercase;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
