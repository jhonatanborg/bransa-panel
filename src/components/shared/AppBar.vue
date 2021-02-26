<template>
  <v-app-bar dense app color="light-blue accent-4" flat>
    <v-avatar class="mr-10" color="grey darken-1" size="32">
      <v-img src="@/assets/logo.png"></v-img>
    </v-avatar>
    <v-spacer></v-spacer>

    <v-btn
      depressed
      dark
      text
      v-for="(item, index) in menu"
      :key="index"
      :to="{ name: item.route }"
    >
      {{ item.title }}
    </v-btn>
    <v-chip class="ma-2" color="grey lighten-4" text-color="black">
      <v-avatar left>
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
      <span> {{ user.usuario_login }} </span>
    </v-chip>

    <v-btn @click="logout" depressed dark text> Sair </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    menu: [
      {
        title: "Produtos",
        icon: "mdi-cart",
        route: "list-products",
      },
      {
        title: "Destaques",
        icon: "mdi-account-multiple",
        route: "featured",
      },
      {
        title: "Aviso",
        icon: "mdi-information",
        route: "information",
      },
    ],
  }),
  computed: {
    user() {
      return this.$store.state.user.user || {};
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      window.location.reload();
    },
  },
};
</script>

<style></style>
