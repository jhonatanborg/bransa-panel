<template>
  <div>
    <v-row dense justify="start" align="center" no-gutters>
      <v-col cols="12">
        <small>Pesquisar</small>
        <v-text-field
          v-model="search"
          :loading="$store.state.loading"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          placeholder="Buscar por categoria"
          append-icon="mdi-magnify"
          return-object
        ></v-text-field>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-row dense justify="space-between" align="center">
          <v-col cols="12">
            <v-row justify="start">
              <v-col cols="auto">
                <v-chip
                  small
                  :loading="$store.state.loading"
                  outlined
                  v-if="filter.start !== 1"
                  color="primary"
                  @click="getProducts(filter, true)"
                  >Voltar</v-chip
                ></v-col
              >
              <v-col
                v-for="(categorie, index) in categories"
                :key="index"
                link
                cols="auto"
                @click="categorieFilter = index"
              >
                <v-chip
                  small
                  link
                  dark
                  :color="categorieFilter === index ? 'red lighten-1' : 'grey'"
                >
                  <b v-text="categorie.produto_grupo"></b>
                </v-chip>
              </v-col>
              <v-col cols="auto">
                <v-chip
                  :loading="$store.state.loading"
                  color="primary"
                  @click="getProducts(filter)"
                  small
                  link
                  dark
                  >Avançar</v-chip
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="py-5">
      <span> Seus produtos: </span>
    </div>
    <v-row v-if="selectCategorie">
      <v-col
        v-for="(product, index) in selectCategorie.produtos"
        :key="index"
        cols="12"
        sm="4"
        md="2"
      >
        <CardProduct
          :product="product"
          :index="index"
          :indexCategorie="categorieFilter"
        />
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
    this.getProducts();
  },
  data() {
    return {
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      links: ["Dashboard", "Messages", "Profile", "Updates"],
      filter: {
        start: 1,
        end: 8,
      },
      categorieFilter: 0,
    };
  },
  watch: {
    search(val) {
      if (val) {
        this.$store.dispatch("product/request", {
          state: "produtos",
          method: "POST",
          data: {
            produto_grupo: val,
          },
          url: "/category/",
          noMsg: true,
        });
      }
    },
  },
  computed: {
    categories() {
      return this.$store.state.product.produtos || [];
    },
    selectCategorie() {
      if (this.categories) {
        return this.categories[this.categorieFilter];
      }
      return 0;
    },
    products() {
      return this.$store.getters["product/getProducts"] || {};
    },
  },
  methods: {
    getProducts(filter, minus) {
      let url;
      if (!minus && filter) {
        filter = {
          start: parseInt(filter.start) + 1,
          end: 8,
        };
        this.filter = filter;
        url = `/products-paginate/${filter.start}/${filter.end}`;
      } else if (!minus && !filter) {
        url = `/products-paginate/${this.filter.start}/${this.filter.end}`;
      } else if (filter.start !== 1) {
        filter = {
          start: parseInt(filter.start) - 1,
          end: 8,
        };
        this.filter = filter;
        url = `/products-paginate/${filter.start}/${filter.end}`;
      }
      this.$store.dispatch("product/request", {
        state: "produtos",
        method: "GET",
        url,
        noMsg: true,
      });
    },
    getFeatured() {
      this.$store
        .dispatch("product/request", {
          state: "featured",
          method: "GET",
          url: "/products-featured",
          noMsg: true,
        })
        .then(this.$router.push({ name: "featured" }));
    },
  },
};
</script>
<style></style>
