<template>
  <div>
    <van-nav-bar title="商品管理" right-plus>
      <template #right>
        <van-icon name="add-o" size="18" />
      </template>
    </van-nav-bar>
    <div v-for="item in items" :key="item.id">
      <van-card
        :price="item.price"
        :desc="item.detail"
        :title="item.name"
        :thumb="item.img"
      >
        <template #footer>
          <van-button size="mini">删除</van-button>
        </template>
      </van-card>
    </div>

    <shopper-footer />
  </div>
</template>

<script>
import ShopperFooter from "../components/ShopperFooter.vue";
import { goods_findByShopperId } from "../ajax/CabinetManager";
export default {
  name: "ItemManger",
  components: { ShopperFooter },
  data() {
    return {
      items: {}
    }
  },
  created() {
    goods_findByShopperId({ shopper_id: "2" }).then((res) => {
      console.log(res)
      this.items = res.data
    });
  },
  methods: {
    test() {},
  },
};
</script>

<style>
</style>