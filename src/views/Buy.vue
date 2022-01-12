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
    <div class="message">
      <van-notice-bar
  left-icon="volume-o"
  text="因本品属于特殊产品，为了更好的跟踪服务，请您填写相关信息。"
/>
      <van-form>
        <van-field
          v-model.trim="order.trace_num"
          name="trace_num"
          label="产品跟踪服务号"
          placeholder="请填写产品跟踪服务号"
          required
        />
        <van-field
          v-model.trim="order.phone"
          type="tel"
          :rules="phoneRule"
          label="手机号"
          placeholder="请输入手机号"
          clearable
          required
        />
        <van-field
          v-model.trim="order.code"
          center
          clearable
          label="短信验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true }]"
          required
        >
          <template #button>
            <van-button @click="getCode" size="small" type="primary">{{
              info
            }}</van-button>
          </template>
        </van-field>
      </van-form>
      <div style="text-align:center;color:#888;font-size:14px"><br>产品服务热线:400-101-8151</div>
    </div><br><br><br><br><br>
    <van-button type="danger" round block @click="openDoor">打开柜门</van-button>
  
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
import { order_Get, order_Code } from "../ajax/ordersAPI";
export default {
  name: "Buy",
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
    getCode() {
      console.log(this.order.phone);
      if (this.isClick) {
        order_Code({
          phone: this.order.phone,
        })
          .then((res) => {
            console.log(res);
            if (res.code === "0") {
              this.isClick = false;
              let s = 60;
              this.info = s + "s";
              let interval = setInterval(() => {
                s--;
                this.info = s + "s";
                if (s < 0) {
                  this.info = "重新获取";
                  this.isClick = true;
                  clearInterval(interval);
                }
              }, 1000);
            } else {
              Toast.fail(res.errMsg);
            }
          })
          .catch((err) => {
            console.log(err);
            Toast.fail("发送失败，请重试！");
            return err;
          });
      }
    },
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
