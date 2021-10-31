<template>
  <van-tabbar route>
    <van-tabbar-item name="shop-o" icon="home-o" to="/StationManger">站点管理</van-tabbar-item>
    <van-tabbar-item name="search" icon="send-gift-o" to="/ItemManger">商品管理</van-tabbar-item>
    <van-tabbar-item name="setting" icon="completed" to="/ListManger">订单管理</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "ShopperFoot",
  
};
</script>

<style>
</style>