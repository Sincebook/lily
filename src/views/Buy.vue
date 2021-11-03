<template>
  <div class="order">
    <van-nav-bar title="支付结果"></van-nav-bar>
    <div class="icon">
      <br />
      <br />
      <van-icon name="checked" />
      <br /><br />
      <span style="color: #6fc773; font-size: 24px">购买成功</span>
    </div>
    <br /><br />
    <div class="message">
      <span>请填写信息</span>
      <van-form>
        <van-field
          v-model.trim="order.trace_num"
          name="trace_num"
          label="产品服务跟踪号"
          placeholder="请填写产品服务跟踪号"
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
          placeholder="请输入短信验证码"
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
    </div>
    <van-goods-action>
      <van-goods-action-button
        text="立即开柜"
        @click="openDoor"
        class="orderBg"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import { order_Get, order_Code } from "../ajax/ordersAPI";
export default {
  name: "AdminLogin",
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
        this.trace_num &&
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
  font-size: 100px;
}
.van-icon:before {
  display: block;
  margin: 0, auto;
  color: #6fc773;
}
.message {
  text-align: center;
  font-size: 18px;
  background-color: #fcfae3;
  margin-top: 10px;
}
.message > span {
  display: inline-block;
  padding: 5px;
}
.orderBg {
  color: white;
  background: red;
}
::v-deep .van-field__label {
  -webkit-box-flex: 0;
  -webkit-flex: none;
  flex: none;
  box-sizing: border-box;
  width: 8em;
  margin-right: 10px;
  color: #646566;
  text-align: left;
  line-height: 20px;
  height: 20px;
  word-wrap: break-word;
  font-size: 16px;
}
/* .van-cell {
    display: block;
    width: 100%;
    font-size: 20px;
    padding-top: 20px;
} */
::v-deep .van-field__control {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  padding: 0;
  color: #323233;
  line-height: inherit;
  text-align: left;
  background-color: transparent;
  border: 0;
  resize: none;
  font-size: 16px;
}
</style>
