<template>
  <div class="good">
    <img class="itemImg" :src="good.img" alt="" />
    <van-cell center :title="good.name" title-class="name" :value="'￥'+good.price / 100" value-class="price" label="购买后，柜门将自动打开" />
    <van-divider>商品详情</van-divider>
    <p style="padding: 0 1em 1em;color:#666">{{good.detail}}</p>
    <img :src="good.img2?good.img2:''" style="width:100%"/>
    <img :src="good.img3" style="width:100%"/>
    <br><br><br><br>
    <van-button type="danger"  block @click="createOrder" style="bottom:0;position:fixed">立即购买</van-button>
  </div>
</template>
<script>
import Vue from "vue";
import { Button, ImagePreview, Divider } from "vant";
import { Toast, Dialog } from "vant";
import { cabinetdoor_look } from "../ajax/cabinetdoorAPI";
import { orders_Create } from "../ajax/ordersAPI";
import "vant/lib/index.css";
import { final } from "../utils/wxpay";
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
      good: [
        {
          id: 0,
          shopper_id: 0,
          name: "",
          price: "",
          detail: "",
          img: "",
          img2: "",
          img3: "",
        },
      ],
      show: false,
      showQrCode: false,
      items: [...Array(20).keys()],
    };
  },
  //生命周期钩子函数，就是一个vue实例被生成后调用这个函数
  created() {
    console.log(this.$route.query);

    cabinetdoor_look({
      cabinet_num: this.$route.query.cId,
      cabinetdoor_num: this.$route.query.dId,
    })
      .then((json) => {
        console.log(json.data);
        if (json.code === "0") {
          this.good = json.data;
          console.log(this.good.name);
        } else {
          Dialog.alert({
            title: "当前货物已空",
            message: "请扫描其他柜门上的二维码进行购买，如有问题请联系管理员",
          }).then(() => {
            Toast();
          });
        }
      })
      .catch((err) => {
        return err;
      });
  },
  methods: {
    // 轮播图预览
    Preview_img(images, index) {
      ImagePreview({
        images: images, //图片数组
        showIndex: true,
        loop: false,
        startPosition: index,
      });
    },
    createOrder() {
      if (this.$route.query.uId) {
        orders_Create({
          wxuser_id: this.$route.query.uId,
          cabinet_num: this.$route.query.cId,
          cabinetdoor_num: this.$route.query.dId,
          shopper_secret: this.$route.query.sps
        }).then((res) => {
          if (res.code === "0") {
            let serial_num = res.data.serialNum;
            testpay({ serial_num }).then((res) => {
              console.log(res);
              let wx_package = res.data.package;
              const { appId, timeStamp, nonceStr, paySign } = res.data;
              final(appId, timeStamp, nonceStr, wx_package, paySign, serial_num);
            });
          } else {
            Dialog.alert({
              title: res.errMsg,
              message: "请扫描其他柜门上的二维码进行购买，如有问题请联系管理员",
            }).then(() => {
            });
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
.price {
    color: red;
    font-size: 20px;
    width: 100%;
}
.name {
    font-size:16px;
    color:#000;
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