<template>
  <div>
    <van-nav-bar title="订单管理">
    </van-nav-bar>
    <shopper-footer active="'send-gift-o'"/>
  </div>
</template>

<script>
import ShopperFooter from '../components/ShopperFooter.vue';
export default {
  name: "ListManger",
  components: { ShopperFooter }
};
</script>

<style>
</style>