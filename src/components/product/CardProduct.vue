<template>
  <v-hover v-slot="{ hover }">
    <v-card link flat outlined>
      <v-list-item two-line>
        <v-list-item-avatar tile size="100">
          <v-img
            height="100px"
            width="100%"
            src="https://apoioentrega.vteximg.com.br/arquivos/ids/461444-1000-1000/189021.jpg?v=637352770502370000"
          >
          </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="product.produto_descricao">
          </v-list-item-title>
          <v-list-item-subtitle v-text="product.produto_valor">
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
          <v-icon size="40" color="white">mdi-image-edit-outline</v-icon>
        </div>
      </v-expand-transition>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    product: Object,
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
