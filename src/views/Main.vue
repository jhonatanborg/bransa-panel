<template>
  <v-app class="home">
    <v-main class="primary lighten-3">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="3">
            <SideBar />
          </v-col>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg" class="pa-5">
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
// @ is an alias to /src
import SideBar from "@/components/shared/SideBar.vue";

export default {
  name: "Home",
  components: {
    SideBar,
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
