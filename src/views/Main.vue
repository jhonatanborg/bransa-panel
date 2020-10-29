<template>
  <div class="home">
    <v-sheet min-height="70vh" rounded="lg" class="pa-5">
      <router-view></router-view>
    </v-sheet>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>
