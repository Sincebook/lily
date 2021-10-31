<template>
  <div class="home">
    <van-nav-bar title="首页" />
    <div class="header">
      <img class="since" alt="Vue logo" src="../assets/logo.png" />
    </div>
    <van-cell title="管理员登录" is-link to="/AdminLogin">
      <van-tag type="primary">RR</van-tag>
    </van-cell>
    <van-cell title="商户管理" is-link to="/ShopManger">
      <van-tag type="primary">RR</van-tag>
    </van-cell>
    <van-cell title="商户详情" is-link to="/ShopDetails">
      <van-tag type="primary">CC</van-tag>
    </van-cell>
    <van-cell title="商户登录" is-link to="/ShopLogin">
      <van-tag type="primary">氪氪</van-tag>
    </van-cell>
    <van-cell title="站点管理" is-link to="/StationManger">
      <van-tag type="primary">氪氪</van-tag>
    </van-cell>
    <van-cell title="柜子管理" is-link to="/CabinetManger">
      <van-tag type="primary">氪氪</van-tag>
    </van-cell>
    <van-cell title="商品管理" is-link to="/ItemManger">
      <van-tag type="primary">大大</van-tag>
    </van-cell>
    <van-cell title="订单管理" is-link to="/ListManger">
      <van-tag type="primary">大大</van-tag>
    </van-cell>
    <van-cell title="商品" is-link to="/Item">
      <van-tag type="primary">静静</van-tag>
    </van-cell>
    <van-cell title="购买" is-link to="/Buy">
      <van-tag type="primary">静静</van-tag>
    </van-cell>
     <since-footer />
  </div>
</template>

<script>
// @ is an alias to /src
import SinceFooter from '../components/SinceFooter.vue';

export default {
  name: "Home",
  components: {
    SinceFooter,
  },
};
</script>
<style scoped>
.header {
  text-align: center;
  background: #eee;
}
.since {
  width: 80%;
}
</style>
