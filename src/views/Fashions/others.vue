<template>
  <div>
    <van-nav-bar
      title="欧皇手办"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  name: "others",
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
};
</script>

<style>
</style>