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
        <v-img height="300px" :src="returnImage(imageProduct)">
          <v-row class="fill-height" align="center" justify="center">
            <a
              ><div class="text-center">
                <v-avatar
                  @click="setImage"
                  link
                  size="120"
                  color="primary lighten-2"
                >
                  <input
                    hidden
                    id="image-upload"
                    label="Escolha uma imagem"
                    @change="onChange"
                    dense
                    flat
                    accept="image/*"
                    type="file"
                  />
                  <v-icon color="primary " size="50">mdi-image-plus</v-icon>
                </v-avatar>
              </div></a
            >
          </v-row>
        </v-img>
        <div class="my-5">
          <v-btn @click="uploadImage" large block color="primary"
            >Salvar Imagem</v-btn
          >
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
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
    };
  },
  computed: {
    productSelected() {
      return this.$store.state.product.editProduct || {};
    },
  },
  methods: {
    validate() {},
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
        this.productSelected.image &&
        this.productSelected.image.image &&
        this.productSelected.image.image.indexOf("blob") >= 0
      ) {
        return this.productSelected.image.image;
      } else if (
        this.productSelected.image &&
        this.productSelected.image.image
      ) {
        return (this.imageProduct =
          this.$store.state.server + this.productSelected.image.image);
      } else {
        return "https://i.imgur.com/ha7VmCQ.png";
      }
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
          this.$store.commit("product/setProduct", this.imageProduct);
          this.close();
        });
    },
  },
};
</script>

<style></style>
