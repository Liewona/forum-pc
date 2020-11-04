<template>
  <div>
    <detail-item></detail-item>
  </div>
</template>

<script>
import DetailItem from "@/components/forums/DetailItem.vue";

export default {
  components: {
    DetailItem
  },
  created() {
    console.log(this.$route.params);
  }
};
</script>

<style>

</style>