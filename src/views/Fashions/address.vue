<template>
  <div>
    <van-nav-bar
      title="我的地址"
      left-text="返回"
      right-text="添加"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-empty
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="当前没有收货地址~"
    />
  </div>
</template>

<script>
export default {
  name: "address",
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/Fashions/address");
    },
  },
};
</script>

<style scoped>
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
</style>