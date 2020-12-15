<template>
  <div id="inspire">
    <router-view></router-view>
    <MessageError />
  </div>
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
.code-product {
  font-size: 15px;
  font-weight: bold;
}
</style>
