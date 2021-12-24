<template>
  <div>
    <van-nav-bar
      title="青壹坊"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
      <img src="../../assets/treeinart/1.jpeg" style="width:100%">
    <van-cell title="印象西游系列" value="市场零售价59元" value-class="price"/>
    <img src="../../assets/treeinart/2.jpg" style="width:100%">
    <van-cell title="梦红楼系列" value="市场零售价59元" value-class="price"/>
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