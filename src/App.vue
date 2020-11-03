<template>
  <v-app id="inspire">
    <router-view></router-view>
    <MessageError />
  </v-app>
</template>

<script>
import MessageError from "@/components/shared/MessageError.vue";
export default {
  components: {
    MessageError,
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
