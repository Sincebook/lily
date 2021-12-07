<template>
  <div>
    <van-nav-bar title="排行榜" left-arrow @click-left="onClickLeft" fixed  placeholder />
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="欧皇榜" name="1">
        <van-loading v-if="luckys.length==0" type="spinner" style="text-align:center"/>
        <div class="card" v-for="lucky in luckys" :key="lucky.wxuserId">
            <img :src="lucky.headImg" class="headImg" alt="">
            <div class="nickname" v-if="lucky.name.charCodeAt(0)>50000">{{lucky.name.substring(0,2)+ '***'}}</div>
            <div class="nickname" v-if="lucky.name.charCodeAt(0)<50000">{{lucky.name.substring(0,1)+ '****'}}</div>
            <div class="num">抽中<b style="color:red">{{lucky.nums}}</b>次</div>
        </div>
        <div style="text-align:center" v-if="luckys.length!=0">
          <small>仅显示前10名</small>
        </div>
      </van-collapse-item>
      <van-collapse-item title="土豪榜" name="2">
        <van-loading v-if="richs.length==0" type="spinner" style="text-align:center"/>
        <div class="card" v-for="rich in richs" :key="rich.wxuserId">
             <img :src="rich.headImg" class="headImg" alt="">
            <div class="nickname">{{rich.name.substring(0,1) + '****'}}</div>
            <div class="num">抽取<b style="color:rgb(5,241,19)">{{rich.nums}}</b>次</div>
        </div>
        <div style="text-align:center" v-if="luckys.length!=0">
          <small>仅显示前10名</small>
        </div>
      </van-collapse-item>
      <van-collapse-item title="非酋榜" name="3">
        <van-loading v-if="unluckys.length==0" type="spinner" style="text-align:center"/>
        <div class="card" v-for="unlucky in unluckys" :key="unlucky.wxuserId">
            <img :src="unlucky.headImg" class="headImg" alt="">
            <div class="nickname">{{unlucky.name.substring(0,1) + '****'}}</div>
            <div class="num"><b style="color:red">{{unlucky.nums}}</b>次未抽中</div>
        </div>
        <div style="text-align:center" v-if="luckys.length!=0">
          <small>仅显示前10名</small>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { findRich, findLucky, findUnlucky } from "../ajax/reportApi";
export default {
  name: "OkBuy",
  data() {
    return {
        activeName: '1',
        luckys:[],
        richs:[],
        unluckys:[]
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
      findUnlucky().then(res => {
          console.log(res)
          if (res.code === "0") {
              this.unluckys = res.data
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
