<template>
  <div class="section fill-height">
    <v-row justify="center" no-gutters class="fill-height" align="center">
      <v-col cols="12" sm="4" md="4" lg="4">
        <v-card rounded="8" elevation="15" :loading="$store.state.loading">
          <div class="pa-5">
            <div class="text-center pa-5">
              <div class="my-5">
                <v-avatar color="grey darken-1" size="100"
                  ><v-img src="@/assets/logo.png"></v-img
                ></v-avatar>
              </div>
              <span
                >Acesse sua conta vedas para ter acesso ao painel
                administrativo</span
              >
            </div>
            <v-form ref="login">
              <v-text-field
                solo
                :rules="[(v) => !!v || 'Esse campo é obrigatorio']"
                placeholder="Login"
                v-model="usuario.usuario_login"
              ></v-text-field>
              <v-text-field
                solo
                autocomplete="new-password"
                :rules="[(v) => !!v || 'Esse campo é obrigatorio']"
                placeholder="Senha"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                v-model="usuario.usuario_senha"
              ></v-text-field>
            </v-form>
            <v-btn
              :loading="$store.state.loading"
              depressed
              @click="login"
              large
              color="primary"
              block
              >Entrar</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
        usuario_login: null,
        usuario_senha: null,
      },
      show: false,
    };
  },
  methods: {
    login() {
      if (this.$refs.login.validate()) {
        this.$store
          .dispatch("user/request", {
            state: "user",
            method: "POST",
            data: this.usuario,
            url: "/login-adm",
            noMsg: true,
          })
          .then((resp) => {
            localStorage.setItem("token", resp.data.token);
            this.$router.push("/");
          })
          .catch((error) => {
            this.$store.commit("message", [error, "error"]);
          });
      }
    },
  },
};
</script>

<style>
.section {
  background-color: #0093e9;
  background-image: linear-gradient(180deg, #0093e9 0%, #4fb1de 100%);
}
</style>
