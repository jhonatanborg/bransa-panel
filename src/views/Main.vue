<template>
  <v-app id="App" class="home">
    <AppBar />
    <v-main class="light-blue accent-4 fill-height">
      <v-container fluid>
        <v-row justify="center">
          <v-col>
            <v-card
              :loading="$store.state.loading"
              min-height="70vh"
              rounded="lg"
            >
              <div class="pa-5 grey lighten-5 overflow-y-hidden">
                <router-view></router-view>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
// @ is an alias to /src
import AppBar from "@/components/shared/AppBar.vue";

export default {
  name: "Home",
  components: {
    AppBar,
  },
  mounted() {
    this.verifyLogin();
  },
  methods: {
    verifyLogin() {
      this.$store
        .dispatch("user/request", {
          state: "user",
          method: "GET",
          url: "/verify-adm",
          noMsg: true,
        })
        .catch((error) => {
          this.$store.commit("message", [error, "error"]);
          localStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
    },
  },
};
</script>
<style>
#App {
  font-family: "Monda", sans-serif !important;
}
</style>
