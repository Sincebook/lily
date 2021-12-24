<template>
  <div>
    <van-nav-bar
      title="我的物品"
      left-text="返回"
      right-text="收货地址"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div>
      <van-panel
        v-for="list in lists"
        :key="list.id"
        :title="list.poolName"
        :desc="'订单号：'+list.serialNum"
        :status="'No.' + list.id.toString().padStart(8, '0')"
      >
      <div style="text-align:center">
        <img :src="list.poolImg" style="width:90%;" alt="">
      </div>
      </van-panel>
    </div>
    <br>
    <van-empty
      v-show="!lists"
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="当前没有物品哦~"
      
    />
  </div>
</template>

<script>
import { findInfo } from "../../ajax/luckyboxApi";
export default {
  name: "mine",
  data() {
    return {
      lists: [],
      mhtype: ["Pop Mart", "若来Rolife", "青壹坊", "欧皇手办"],
    };
  },
  created() {
    const wxuser_id = localStorage.getItem("wxuser_id");
    findInfo({ wxuser_id }).then((res) => {
      
      if (res.code === "0") {
        console.log(res.data)
        this.lists = res.data;
      }
    });
  },
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

<style>
</style>