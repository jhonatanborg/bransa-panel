<template>
  <v-card @click="edit(product, index, indexCategorie)" link flat outlined>
    <v-list-item two-line>
      <v-list-item-avatar tile size="100">
        <v-img
          height="100px"
          width="100%"
          v-if="product.produto_imagem"
          :src="image(product.produto_imagem)"
        >
        </v-img>
        <v-img height="100px" width="100%" v-else :src="image(null)"> </v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <div>
          <span class="title-product" v-text="product.produto_descricao">
          </span>
        </div>
        <v-list-item-subtitle v-text="convertMoney(product.produto_valor)">
        </v-list-item-subtitle>
        <v-list-item-subtitle v-text="'CÓD:' + product.produto_codigo">
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
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
  methods: {
    edit(product, index, indexCategorie) {
      product.index = index;
      product.indexCategorie = indexCategorie;
      this.$store.commit("product/request", ["editProduct", product]);
      this.$store.commit("product/request", ["dialogProduct", true]);
    },
    image(image) {
      if (image && image.indexOf("blob") >= 0) {
        return image;
      } else if (!image) {
        return "https://i.imgur.com/ha7VmCQ.png";
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  font-size: 14px;
}
</style>
