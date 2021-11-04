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
    <van-button type="danger" round block @click="openDoor" style="bottom:0;position:fixed">打开柜门</van-button>
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
import { order_Get } from "../ajax/ordersAPI";
export default {
  name: "OkBuy",
  data() {
    return {
      order: {
        phone: "",
        code: "",
        trace_num: "",
      },
      open: true,
      phoneRule: [
        {
          required: true,
        },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: "手机号码格式错误！",
        },
      ],
      info: "发送验证码",
      isClick: true,
    };
  },
  created() {
    console.log(this.$route.query);
  },
  methods: {
   
    openDoor(values) {
      console.log("openDoor", values);
      if (
        this.order.phone &&
        this.order.code &&
        this.order.trace_num &&
        this.$route.query.serial_num &&
        this.open
      ) {
        order_Get({
          phone: this.order.phone,
          code: this.order.code,
          trace_num: this.order.trace_num,
          serial_num: this.$route.query.serial_num,
        }).then((res) => {
          if (res.code === "0") {
            this.open = false;
            console.log(res.data);
            Dialog.alert({
              title: '柜门已打开',
              message: "请取出货物后关闭柜门，谢谢您的光临！",
            }).then(() => {

            });
          } else {
              Toast.fail(res.errMsg);
          }
        });
      } else {
        Toast.fail("请填写相关信息");
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
