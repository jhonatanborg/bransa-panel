<template>
  <div class="py-5 my-5 col-sm-8">
    <v-row dense justify="start" align="center" no-gutters>
      <v-col cols="12" sm="12">
        <div class="mb-5">
          <span>Mensagem de aviso para os clientes</span>
          <div>
            <small
              >Escreva uma mensagem para seus clientes aqui. Está mensagem irá
              aparecer no topo do site</small
            >
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="12">
        <div>
          <v-textarea
            rows="3"
            outlined
            v-model="message"
            label="Mensagem"
          ></v-textarea>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn @click="sendMsg()" large depressed color="primary" block
          >Confirmar</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getMessage();
  },
  data() {
    return {
      message: null,
    };
  },
  computed: {
    msg() {
      return this.$store.state.user.message;
    },
  },
  methods: {
    sendMsg() {
      if (this.message) {
        this.$store
          .dispatch("user/request", {
            method: "POST",
            data: { mensagem: this.message },
            url: "/mensagem",
            noMsg: true,
          })
          .then((resp) => {
            this.$store.commit("user/request", ["message", resp.data.mensagem]);
          });
      }
    },
    getMessage() {
      this.$store
        .dispatch("user/request", {
          method: "GET",
          url: "/mensagem/?empresa_id=4",
          noMsg: true,
        })
        .then((resp) => {
          this.message = resp.data[0].mensagem;
          this.$store.commit("user/request", [
            "message",
            resp.data[0].mensagem,
          ]);
        });
    },
  },
};
</script>

<style></style>
