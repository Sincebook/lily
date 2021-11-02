<template>
  <div>
    <van-nav-bar title="商品管理" right-plus >
      <template #right >
        <van-icon name="add-o" size="18" @click="jumpTO()" />
      </template>
    </van-nav-bar>
    <van-empty v-if="!this.items" image="search" description="当前订单为空" />
    <div v-for="item in items" :key="item.id">
      <van-card
        :price="(item.price / 100)"
        :desc="item.detail"
        :title="item.name"
        :thumb="item.img"
      >
        <template #footer>
          <van-button size="mini" @click="deleteGoods(item.id)"
            >删除</van-button
          >
        </template>
      </van-card>
    </div>

    <shopper-footer />
  </div>
</template>

<script>
import ShopperFooter from "../components/ShopperFooter.vue";
import { goods_findByShopperId } from "../ajax/CabinetManager";
import { goodsDel } from "../ajax/GoodApi";
import { Dialog, Toast } from 'vant';
export default {
  name: "ItemManger",
  components: { ShopperFooter },
  data() {
    return {
      items: {},
    };
  },
  created() {
    goods_findByShopperId({ shopper_id: sessionStorage.getItem('shopper_id') }).then((res) => {
      console.log(res);
      this.items = res.data;
    });
  },
  methods: {
    deleteGoods(_data) {
      console.log(_data);
      Dialog.confirm({
        title: "确定要删除吗？",
        message: "删除后不可恢复",
      })
        .then(() => {
          goodsDel({id: _data}).then(res => {
            if (res.code === '0') {
              Toast.success('删除成功');
              this.items = this.items.filter(item=>item.id!==_data)
            }
          })
        })
        .catch(() => {
          // on cancel
        });
    },
    jumpTO() {
      this.$router.push('/AddItem')
    }
  },
  
};
</script>

<style>
</style>