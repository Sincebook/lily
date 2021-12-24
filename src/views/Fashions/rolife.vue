<template>
  <div>
      <van-nav-bar
      title="若来Rolife"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <img src="../../assets/rolife/1.png" style="width:100%">
    <van-cell title="田园牧歌系列" value="市场零售价59元" value-class="price"/>
    <img src="../../assets/rolife/2.png" style="width:100%">
    <van-cell title="十二生肖系列" value="市场零售价59元" value-class="price"/>
  </div>
</template>
<script>
export default {
  name:'rolife',
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
  .price {
    color:rgb(218, 27, 27);
  }
</style>