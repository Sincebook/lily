<template>
  <div class="good">
    <van-swipe :autoplay="3000" class="swiper">
      <img :src="good.img" alt="" />
    </van-swipe>
    <van-card :price="good.price / 100" :title="good.name" />
    <van-divider
      dashed
      contentPosition="center"
      borderColor="#1989fa"
      customStyle="color: #1989fa; border-color: #1989fa; font-size: 18px;"
    >
      ----------------------------------商品介绍----------------------------------
    </van-divider>
    <van-cell-group>
      <van-cell title="" v-model="good.detail" />
      <van-divider
        dashed
        contentPosition="center"
        borderColor="#1989fa"
        customStyle="color: #1989fa; border-color: #1989fa; font-size: 18px;"
      >
      </van-divider>
      <img :src="good.img2" />
      <img :src="good.img3" />
    </van-cell-group>
    <van-goods-action>
      <van-goods-action-button
        text="立即购买"
        @click="createOrder"
        class="buyBg"
      />
    </van-goods-action>
  </div>
</template>
<script>
import Vue from "vue";
import { Button, ImagePreview, Divider } from "vant";
import { cabinetdoor_look } from "../ajax/cabinetdoorAPI";
import { orders_Create } from "../ajax/ordersAPI";
import "vant/lib/index.css";
import { final } from "../utils/wxpay";
import { testpay } from "../ajax/test";
Vue.use(Button);
Vue.use(ImagePreview);
Vue.use(Divider);
export default {
  name: "goodDetail",
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
      cabinet_num: "766186421",
      cabinetdoor_num: "1",
    })
      .then((json) => {
        console.log(json.data);
        if (json.code === "0") {
          this.good = json.data;
          console.log(this.good.name + "%%%%%%%%%%%");
        }
      })
      .catch((err) => {
        console.log(err + "==================");
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
      orders_Create({
        wxuser_id: this.$route.query.uId,
        cabinet_num: this.$route.query.cId,
        cabinetdoor_num: this.$route.query.dId,
      }).then((res) => {
        if (res.code === "0") {
          let serial_num = res.data.serial_num;
          testpay({ serial_num }).then((res) => {
            console.log(res);
            let wx_package = res.data.package;
            const { appId, timeStamp, nonceStr, paySign } = res.data;
            final(appId, timeStamp, nonceStr, wx_package, paySign);
          });
          //
          // onBridgeReady()
        }
      });
    },
  },
};
</script>
<style scoped>
.swiper {
  height: 20rem;
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
.van-card__price {
  position: absolute;
  display: inline-block;
  color: #f35f0a;
  right: 2rem;
  top: 1rem;
  font-size: 35px;
}
.van-card__title {
  max-height: 43px;
  font-weight: 1000;
  line-height: 43px;
  font-size: 35px;
}
.van-card__price-integer {
  font-size: 35px;
  font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
}
.van-card__content {
  min-height: 43px;
}
.van-divider {
  line-height: 2px;
}
</style>