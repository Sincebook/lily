<template>
  <div>
    <van-nav-bar
      title="青壹坊"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  name: "popmart",
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
};
</script>

<style>
</style>