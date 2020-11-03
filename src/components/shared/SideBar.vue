<template>
  <div>
    <v-sheet rounded="lg">
      <v-list rounded>
        <v-list-item v-for="(item, index) in menu" :key="index" link>
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"> </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item link color="grey lighten-4" @click="logout()">
          <v-list-item-content>
            <v-list-item-title> Sair </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    menu: [
      {
        title: "Home",
        icon: "mdi-home-outline",
        route: "/",
      },
      {
        title: "Produtos",
        icon: "mdi-cart",
        route: "list-products",
      },
      // {
      //   title: "Usuários",
      //   icon: "mdi-account-multiple",
      //   route: "users",
      // },
      // {
      //   title: "Mihha empresa",
      //   icon: "mdi-home-outline",
      //   route: "about",
      // },
    ],
  }),
  methods: {
    logout() {
      localStorage.clear();
      window.location.reload();
    },
  },
};
</script>
