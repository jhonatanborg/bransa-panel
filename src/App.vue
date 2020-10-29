<template>
  <v-app id="inspire">
    <v-main class="primary lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="3">
            <SideBar />
          </v-col>
          <v-col cols="12" sm="9">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/shared/SideBar.vue";
export default {
  components: {
    SideBar,
  },
};
</script>
<style>
.inspire {
  font-family: "Ubuntu", sans-serif;
}
.code-product {
  font-size: 15px;
  font-weight: bold;
}
</style>
