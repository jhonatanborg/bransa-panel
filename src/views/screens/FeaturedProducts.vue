<template>
  <div>
    <v-row dense justify="start" align="center" no-gutters>
      <v-col cols="12">
        <span>Produtos em destaques</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, index) in featured" :key="index" cols="12" sm="2">
        <CardProduct :product="item" :index="index" :indexCategorie="1" />
      </v-col>
    </v-row>
    <DialogUpload />
  </div>
</template>

<script>
import CardProduct from "@/components/product/CardProduct.vue";
import DialogUpload from "@/components/product/DialogUpload.vue";

export default {
  components: {
    CardProduct,
    DialogUpload,
  },
  mounted() {
    this.getFeatured();
  },
  computed: {
    featured() {
      return this.$store.state.product.featured || [];
    },
  },
  methods: {
    getFeatured() {
      this.$store
        .dispatch("product/request", {
          method: "GET",
          url: "/products-featured",
          noMsg: true,
        })
        .then((value) => {
          const featureds = value.data.filter(
            (product) => product.produto_destaque === "SIM"
          );
          this.$store.commit("product/request", ["featured", featureds]);
        });
    },
  },
};
</script>

<style></style>
