<template>
  <v-dialog
    :value="$store.state.product.dialogProduct"
    width="500px"
    @click:outside="close"
  >
    <v-card>
      <div class="pa-5">
        <v-row align="center" dense justify="space-between">
          <v-col cols="auto">
            <div class=""><span>Editar Produto</span></div>
          </v-col>
          <v-col cols="auto">
            <div class="">
              <v-btn @click="close" color="error" x-small icon fab outlined>
                <v-icon color="error">mdi-close</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="font-weight-bold">
              <span v-text="'Código ' + productSelected.produto_codigo"></span>
            </div>
          </v-col>
        </v-row>
        <a
          ><v-img
            contain
            @click="setImage"
            height="300px"
            :src="returnImage(imageProduct)"
          >
            <v-row class="fill-height" align="center" justify="center">
              <a
                ><div class="text-center">
                  <input
                    hidden
                    id="image-upload"
                    label="Escolha uma imagem"
                    @change="onChange"
                    dense
                    flat
                    accept="image/*"
                    type="file"
                  /></div
              ></a>
            </v-row> </v-img
        ></a>
        <!-- <v-textarea
          outlined
          value="Aqui"
          placeholder="Especificações técnicas"
          v-model="description"
        ></v-textarea> -->

        <VueEditor v-model="description" />

        <div class="my-5">
          <v-btn
            v-if="productSelected.produto_destaque === 'NAO'"
            class="my-2"
            depressed
            large
            block
            @click="toggleFeatured('SIM')"
            outlined
            :disabled="$store.state.loading"
            color="primary"
            >Colocar em destaque</v-btn
          >
          <v-btn
            v-else
            class="my-2"
            depressed
            large
            :dark="!$store.state.loading"
            block
            :disabled="$store.state.loading"
            outlined
            @click="toggleFeatured('NAO')"
            color="error"
            >Remover destaque</v-btn
          >
          <v-btn
            :disabled="$store.state.loading"
            @click="saveProduct"
            large
            block
            color="primary"
            >Salvar</v-btn
          >
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      imageSend: null,
      loading: false,
      title: null,
      details: null,
      button: null,
      link: null,
      image: null,
      imageUrl: null,
      imageProduct: null,
      description: null,
    };
  },
  computed: {
    productSelected() {
      return this.$store.state.product.editProduct || {};
    },
  },
  watch: {
    productSelected(value) {
      this.description = value.produto_especificacoes;
    },
  },
  methods: {
    setProductFeatured(value) {
      this.productSelected.produto_destaque = value;
    },
    setImage() {
      document.getElementById("image-upload").click();
    },
    close() {
      this.imageUrl = null;
      this.$store.commit("product/request", ["editProduct", null]);
      this.$store.commit("product/request", ["dialogProduct", false]);
    },
    onChange(e) {
      this.imageUrl = URL.createObjectURL(e.target.files[0]);
      this.imageSend = e.target.files[0];
    },
    returnImage(image) {
      if (this.imageUrl) {
        this.imageProduct = this.imageUrl;
        return this.imageUrl;
      } else if (
        this.productSelected.produto_imagem &&
        this.productSelected.produto_imagem.indexOf("blob") >= 0
      ) {
        return this.productSelected.produto_imagem;
      } else if (this.productSelected.produto_imagem) {
        return (this.imageProduct =
          this.$store.state.server + this.productSelected.produto_imagem);
      } else {
        return "https://i.imgur.com/jcWYGjx.png";
      }
    },
    saveProduct() {
      this.description && this.saveDescription();
      this.imageSend && this.uploadImage();
    },
    uploadImage() {
      const formData = new FormData();
      formData.append("produto_id", this.productSelected.produto_id);
      formData.append("produto_id2", this.productSelected.produto_id2);
      formData.append("imagem", this.imageSend);
      this.$store
        .dispatch("user/request", {
          method: "POST",
          data: formData,
          url: "/image",
          noMsg: true,
        })
        .then((value) => {
          if (this.$route.name !== "featured") {
            value.data.produto_destaque = this.productSelected.produto_destaque;
            this.$store.commit("product/setProduct", value.data);
          } else {
            value.data.index = this.productSelected.index;
            this.$store.commit("product/setProductFeatured", value.data);
          }
          this.close();
        });
    },
    toggleFeatured(produto_destaque) {
      this.$store
        .dispatch("user/request", {
          method: "PUT",
          data: {
            produto_id2: this.productSelected.produto_id2,
            produto_destaque,
          },
          url: "/products/" + this.productSelected.produto_id,
          noMsg: true,
        })
        .then((value) => {
          if (value.data.produto_destaque === "NAO") {
            this.$store.commit("product/removeFeatured", value.data.produto_id);
          }
          this.productSelected.produto_destaque = value.data.produto_destaque;
          this.close();
        });
    },
    saveDescription() {
      this.$store
        .dispatch("user/request", {
          method: "PUT",
          data: {
            produto_id2: this.productSelected.produto_id2,
            produto_especificacoes: this.description,
          },
          url: "/products/" + this.productSelected.produto_id,
          noMsg: true,
        })
        .then((value) => {
          this.description = null;
          this.close();
        });
    },
  },
};
</script>

<style></style>
