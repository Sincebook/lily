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
      >立即开柜</van-button
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
  name: "EsayOkBuy",
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
    openDoor() {
      if (this.$route.query.serial_num && this.open) {
        mhorder_Get({
          serial_num: this.$route.query.serial_num,
        }).then((res) => {
          if (res.code === "0") {
                console.log(res.data);
                Dialog.alert({
                  title: "柜门已打开",
                  message: "请取走货物后，关闭柜门，谢谢！",
                  theme: "round-button",
                  confirmButtonText: "确定",
                }).then(() => {
                  window.location.href =
                    "http://kaoyan.since88.cn/wechat/authorize?returnUrl=lily&cId=766186421&dId=-1";
                });
            } else {
              Toast.fail(res.data);
            }
        })
      } else {
        Toast.fail('没有订单');
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
