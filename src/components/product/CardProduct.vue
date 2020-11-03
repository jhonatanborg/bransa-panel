<template>
  <v-hover v-slot="{ hover }">
    <v-card link flat outlined>
      <v-list-item two-line>
        <v-list-item-avatar tile size="100">
          <v-img
            height="100px"
            width="100%"
            v-if="product.image"
            :src="image(product.image.image)"
          >
          </v-img>
          <v-img height="100px" width="100%" v-else :src="image(null)"> </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="product.produto_descricao">
          </v-list-item-title>
          <v-list-item-subtitle v-text="convertMoney(product.produto_valor)">
          </v-list-item-subtitle>
          <v-list-item-subtitle v-text="'CÓD:' + product.produto_codigo">
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-expand-transition>
        <div
          v-if="hover"
          class="d-flex pa-5 transition-fast-in-fast-out primary v-card--reveal display-3 white--text"
          style="height: 100%"
        >
          <v-icon
            @click="edit(product, index, indexCategorie)"
            size="40"
            color="white"
            >mdi-image-edit-outline</v-icon
          >
        </div>
      </v-expand-transition>
    </v-card>
  </v-hover>
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
      console.log(indexCategorie);
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
</style>
