<template>
  <div>
    <van-swipe :autoplay="4500">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" style="width: 100%" />
      </van-swipe-item>
    </van-swipe>
    <van-cell
      center
      title="Since · 潮玩系列盲盒"
      title-class="name"
      :value="'￥' + 28.8"
      value-class="price"
      label="全系列正版、一件包邮"
    />
    <van-notice-bar left-icon="volume-o" :scrollable="false">
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item v-for="report in reports" :key="report.id">
          <img :src="report.headImg" class="headImg" />
          {{ report.wxuserName.substring(0,1) + '****' }} 荣获 {{mhtype[parseInt(report.poolType)] +'系列【' + report.poolName +"】"}}
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <van-divider>商品详情</van-divider>
    <div style="padding: 0 1.5em 1.5em; color: #555; font-size: 14px">
      本品为潮玩盲盒，由正版Pop
      Mart系列摆件、若来Rolife系列摆件、青壹坊系列摆件、游戏或动漫手办、景品等组成，购买后将从以上内容中随机抽取一个。原价59元一发、限时五折28.8元。
    </div>
    <img src="../assets/2.jpg" style="width: 50%; float: left" />
    <img src="../assets/3.jpg" style="width: 50%; float: left" />
    <img src="../assets/1.png" style="width: 100%; float: left" />
    <img src="../assets/2.png" style="width: 50%" />
    <img src="../assets/3.png" style="width: 50%" />
    <van-cell title="查看全系列盲盒池" is-link to="/Fashion">
      <van-tag type="danger">new</van-tag>
    </van-cell>
    <van-divider>温馨提示</van-divider>
    <div style="padding: 0 1.5em 1.5em; color: #555; font-size: 14px">
      1、盲盒为特殊产品，售出后无特殊原因，不退不换。<br />
      2、有问题请关注公众号【森思公司】联系7*24客服。<br />
    </div>
    <br /><br /><br />
    <van-button
      type="danger"
      block
      @click="createOrder"
      style="bottom: 0; position: fixed"
      >立即购买</van-button
    >
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { createOnline,findAll } from "../ajax/luckyboxApi";
import { final3 } from "../utils/wxpay";
import { testpay } from "../ajax/test";
export default {
  name: "LuckyBox",
  data() {
    return {
      images: [
        "https://sincelibrary.oss-cn-shanghai.aliyuncs.com/test/reports/20211221/c70ae1f034954c318027e9a7c2a4e219.jpg",
        "https://sincelibrary.oss-cn-shanghai.aliyuncs.com/test/reports/20211221/d0511d5d8225449f9e31d5c4db89e719.jpg",
        "https://sincelibrary.oss-cn-shanghai.aliyuncs.com/test/reports/20211221/a46985fa51f74716a40cd87947839286.jpg",
      ],
      reports:[],
      mhtype: ["Pop Mart", "若来Rolife", "青壹坊", "欧皇手办"],
    };
  },
  created() {
    Dialog.alert({
      title: "活动提醒",
      message: "Since潮玩盲盒上线，限时五折！！！",
      theme: "round-button",
      confirmButtonText: "确定",
    }).then(() => {});
    localStorage.setItem('wxuser_id', this.$route.query.uId);
    findAll().then(res => {
      console.log(res);
      this.reports = res.data;
    })

  },
  methods: {
    createOrder() {
      const wxuser_id = this.$route.query.uId
      if (wxuser_id) {
        createOnline({
          wxuser_id: this.$route.query.uId,
        }).then((res) => {
          if (res.code === "0") {
            let serial_num = res.data.serialNum;
            testpay({ serial_num }).then((res) => {
              console.log(res);
              let wx_package = res.data.package;
              const { appId, timeStamp, nonceStr, paySign } = res.data;
              final3(
                appId,
                timeStamp,
                nonceStr,
                wx_package,
                paySign,
                serial_num,
                wxuser_id
              );
            });
          } else {
            Dialog.alert({
              title: res.errMsg,
              message: "购买失败，请联系客服",
            }).then(() => {});
          }
        });
      } else {
        Toast.fail("用户未授权");
      }
    },
  },
};
</script>
<style scoped>
.headImg {
  width: 1.2em;
  border-radius: 50%;
  vertical-align: middle;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.price {
  color: red;
  font-size: 18px;
  width: 100%;
}
.name {
  font-size: 16px;
  color: #000;
}
.itemImg {
  width: 100%;
}
.detailIamge {
  width: 100%;
  height: 100%;
}
.buyBg {
  background-color: red;
  color: rgb(255, 255, 255);
}

.van-divider {
  line-height: 2px;
}
.pro {
  color: orange;
}
</style>