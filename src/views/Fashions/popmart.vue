<template>
  <div>
    <van-nav-bar
      title="泡泡玛特"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <img src="../../assets/popmart/1.png" style="width:100%">
    <van-cell title="熊猫热潮系列" value="市场零售价69元" value-class="price"/>
    <img src="../../assets/popmart/2.png" style="width:100%">
    <van-cell title="密森古堡系列" value="市场零售价69元" value-class="price"/>
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

<style scoped>
  .price {
    color:rgb(218, 27, 27);
  }
</style>