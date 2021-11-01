<template>
  <van-tabbar route v-model="active">
    <van-tabbar-item name="home-o" icon="home-o" to="/StationManger">站点管理</van-tabbar-item>
    <van-tabbar-item name="send-gift-o" icon="send-gift-o" to="/ItemManger">商品管理</van-tabbar-item>
    <van-tabbar-item name="completed" icon="completed" to="/ListManger">订单管理</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "ShopperFoot",
  data() {
    return {
      active:'home-o'
    }
  }
};
</script>

<style>
</style>