<template>
  <div>
    <van-nav-bar title="排行榜" left-arrow @click-left="onClickLeft" />
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="欧皇榜" name="1">
        <div class="card" v-for="lucky in luckys" :key="lucky.wxuserId">
            <img :src="lucky.headImg" class="headImg" alt="">
            <div class="nickname">{{lucky.name.substring(0,1) + '****'}}</div>
            <div class="num">抽中<b style="color:red">{{lucky.nums}}</b>次</div>
        </div>
        仅显示前10名
      </van-collapse-item>
      <van-collapse-item title="土豪榜" name="2">
          <div class="card" v-for="rich in richs" :key="rich.wxuserId">
             <img :src="rich.headImg" class="headImg" alt="">
            <div class="nickname">{{rich.name.substring(0,1) + '****'}}</div>
            <div class="num">抽取<b style="color:rgb(5,241,19)">{{rich.nums}}</b>次</div>
        </div>
        仅显示前10名
      </van-collapse-item>
      <van-collapse-item title="非酋榜" name="3">尚未统计完成</van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { findRich, findLucky } from "../ajax/reportApi";
export default {
  name: "OkBuy",
  data() {
    return {
        activeName: '1',
        luckys:[],
        richs:[]
    };
  },
  created() {
      findRich().then(res => {
          console.log(res)
          if (res.code === "0") {
              this.richs = res.data
          }
      });
      findLucky().then(res => {
          console.log(res)
          if (res.code === "0") {
              this.luckys = res.data
          }
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
 .headImg {
     width: 40px;
     border-radius: 50%;
     float: left;
 }
 .nickname {
     line-height: 40px;
     float: left;
     margin-left: 10px;
     color: #333;
 }
 .num {
     line-height: 40px;
     float:right;
 }
 .card {
     width: 100%;
     height: 60px;
 }
</style>
