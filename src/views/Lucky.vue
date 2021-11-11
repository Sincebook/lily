<template>
  <div class="good">
    <img class="itemImg" src="../assets/1.jpg" alt="" />
    <van-cell
      center
      title="Since文创智慧盲盒"
      title-class="name"
      value="￥1.11"
      value-class="price"
      label="购买后，柜门将随机打开"
    />
    <!-- <van-notice-bar
  left-icon="volume-o"
  text="因本品属于医疗产品，为了更好的跟踪服务，请您填写相关信息。"
/> -->
    <van-notice-bar left-icon="volume-o" :scrollable="false">
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item v-for="report in reports" :key="report.id">
          <img :src="report.headImg" class="headImg" />
          {{ report.name.replace(/()./g, "*") }} 荣获 {{ report.describes }}
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <van-divider>商品详情</van-divider>
    <p style="padding: 0 1em 1em; color: #666; font-size: 14px">
      本品为幸运盲盒，由正版青壹坊惊喜盒组成。下单后将随机打开柜子，幸运者将有概率一键全开！同时提醒，有一定概率空奖。
    </p>

    <img src="../assets/2.jpg" style="width: 100%" />
    <img src="../assets/3.jpg" style="width: 100%" /><br /><br /><br />
    <br /><br />
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
import Vue from "vue";
import { Button, ImagePreview, Divider } from "vant";
import { Toast, Dialog } from "vant";
import { mhorders_Create } from "../ajax/ordersAPI";
import { findReport, findReports } from "../ajax/reportApi";
import "vant/lib/index.css";
import { final1 } from "../utils/wxpay";
import { testpay } from "../ajax/test";
Vue.use(Button);
Vue.use(ImagePreview);
Vue.use(Divider);
export default {
  name: "Item",
  props: ["goodId"],
  data() {
    return {
      cabinet_num: "593506563",
      cabinetdoor_num: "3",
      show: false,
      showQrCode: false,
      items: [...Array(20).keys()],
      reports: [],
      lucky:'',
      nickname:''
    };
  },
  //生命周期钩子函数，就是一个vue实例被生成后调用这个函数
  created() {
    console.log(this.$route.query);
    findReports().then((res) => {
      if (res.code === "0") {
        console.log(res);
        this.reports = res.data;
      }
    });
    findReport({ wxuser_id: this.$route.query.uId }).then((res) => {
      console.log(res);
    });
    Dialog.alert({
      title: Math.ceil(Math.random()*100),
      message: "当前幸运值",
      theme: "round-button",
      confirmButtonText: "开始抽奖",
    }).then(() => {});
  },
  methods: {
    createOrder() {
      if (this.$route.query.uId) {
        mhorders_Create({
          wxuser_id: this.$route.query.uId,
          cabinet_num: this.$route.query.cId,
        }).then((res) => {
          if (res.code === "0") {
            let serial_num = res.data.serialNum;
            testpay({ serial_num }).then((res) => {
              console.log(res);
              let wx_package = res.data.package;
              const { appId, timeStamp, nonceStr, paySign } = res.data;
              final1(
                appId,
                timeStamp,
                nonceStr,
                wx_package,
                paySign,
                serial_num
              );
            });
          } else {
            Dialog.alert({
              title: res.errMsg,
              message: "请扫描其他柜门上的二维码进行购买，如有问题请联系管理员",
            }).then(() => {});
          }
        });
      } else {
        Toast.fail("购买失败");
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
  font-size: 20px;
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
</style>