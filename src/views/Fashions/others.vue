<template>
  <div>
    <van-nav-bar
      title="欧皇手办"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <img src="../../assets/others/1.jpeg" style="width: 100%" />
    <van-cell
      title="原神-可利手办"
      value="市场零售价199元"
      value-class="price"
    />
    <img src="../../assets/others/2.jpg" style="width: 100%" />
    <van-cell
      title="明日方舟-阿米娅"
      value="市场零售价199元"
      value-class="price"
    />
  </div>
</template>

<script>
export default {
  name: "others",
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