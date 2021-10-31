<template>
  <div>
    <van-nav-bar title="商品管理" right-plus>
      <template #right>
        <van-icon name="add-o" size="18" />
      </template>
    </van-nav-bar>
    <van-card
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    >
      <template #footer>
        <van-button size="mini">删除</van-button>
      </template>
    </van-card>
    <shopper-footer active="'send-gift-o'"/>
  </div>
</template>

<script>
import ShopperFooter from '../components/ShopperFooter.vue';
export default {
  name: "ItemManger",
  components: { ShopperFooter }

};
</script>

<style>
</style>