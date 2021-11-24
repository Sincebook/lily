<template>
  <van-tabbar route v-model="active" placeholder>
    <van-tabbar-item name="home-o" icon="home-o" to="/ShopManger">商户管理</van-tabbar-item>
    <van-tabbar-item name="bill-o" icon="bill-o" to="/IncomeManger">收入管理</van-tabbar-item>
    <van-tabbar-item name="cash-back-record" icon="cash-back-record" to="/WithdrawManger">提现管理</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "AdminFooter",
  data() {
    return {
      active:'home-o'
    }
  }
};
</script>

<style>
</style>