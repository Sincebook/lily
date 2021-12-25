<template>
  <div class="order">
    <van-nav-bar title="支付结果"></van-nav-bar>
    <div class="icon">
      <br />
      <br />
      <van-icon name="checked" />
      <br /><br />
      <span style="color: #6fc773; font-size: 20px">购买成功</span>
    </div>
    <br /><br />
    <van-button
      type="danger"
      round
      block
      @click="openDoor"
      style="bottom: 50; position: fixed"
      >立即开奖</van-button
    >
    <!-- <van-goods-action>
      <van-goods-action-button
        text="立即开柜"
        @click="openDoor"
        class="orderBg"
      />
    </van-goods-action> -->
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import { mhorder_Get } from "../ajax/ordersAPI";
export default {
  name: "OkBuy",
  data() {
    return {
      open: true,
      isClick: true,
    };
  },
  created() {
    console.log(this.$route.query);
  },
  methods: {
    openDoor(values) {
      const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: "开奖倒计时 1 秒",
      });
      console.log("openDoor", values);
      const {serial_num, mh_num } = this.$route.query;
      if (serial_num && this.open) {
        mhorder_Get({
          serial_num,
          mh_num
        }).then((res) => {
          let second = 1;
          const timer = setInterval(() => {
            second--;
            if (second) {
              toast.message = `开奖倒计时 ${second} 秒`;
            } else {
              clearInterval(timer);
              Toast.clear();
              this.open = false;
              if (res.code === "0") {
                console.log(res.data);
                Dialog.alert({
                  title: "盲盒抽取结果",
                  message: res.data,
                  theme: "round-button",
                  confirmButtonText: "再来一发",
                }).then(() => {
                 this.$route.go(-1);
                });
              } else {
                Dialog.alert({
                  title: "盲盒抽取结果",
                  message: res.errMsg,
                  theme: "round-button",
                  confirmButtonText: "再来一发",
                }).then(() => {
                  this.$route.go(-1);
                });
              }
            }
          }, 1000);
        });
      } else {
        Toast.fail("结果已出");
      }
    },
  },
};
</script>
<style scoped>
.order {
  border: 2rem;
}
.icon {
  margin: 0, auto;
  text-align: center;
}
.van-icon-checked:before {
  font-size: 120px;
}
.van-icon:before {
  display: block;
  margin: 0, auto;
  color: #6fc773;
}
</style>
