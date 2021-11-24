<template>
  <div>
    <van-nav-bar title="管理中心" />
    <van-cell title="订单管理" is-link to="/ListManger">
    </van-cell>
    <van-cell title="营收分析" is-link to="/ShopManger">
    </van-cell>
    <van-cell title="提现中心" is-link to="/ShopManger">
      <van-tag type="primary">次日</van-tag>
    </van-cell>
    <van-cell title="产品跟踪员" is-link to="/ShopManger">
    </van-cell>
    <shopper-footer />
  </div>
</template>
<script>
import ShopperFooter from "../components/ShopperFooter.vue";
export default {
  name: "Setting",
  components: { ShopperFooter },
};
</script>

<style>
</style>