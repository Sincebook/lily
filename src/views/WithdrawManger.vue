<template>
  <div class="WithdrawManger">
    <van-nav-bar title="提现管理"> </van-nav-bar>
    <!-- <van-cell center v-for="item in findAllData" :key="item.id">
      <template #title>
        <span class="custom-title"
          >商户编号：{{ item.shopper_id }} 提现金额：</span
        >
      </template>
      <template #label>
        <span class="custom-title">提现时间</span>
      </template>
      <template #right-icon>
        <van-button plain type="info">打款</van-button>
      </template>
    </van-cell> -->
    <van-cell style="font-size: 12px !important; color: black !important">
      <template #title>
        <div v-for="(item, num) in findAllData" :key="num">
          <van-grid :border="false" column-num="3" :center="false">
            <van-grid-item>
              <div>{{ item.uptime }}</div>
            </van-grid-item>
            <van-grid-item>
              <div style="text-align: left !important">
                <div>提现金额：{{ item.money / 100 }}</div>
                <div>商户id：{{ item.shopperId }}</div>
              </div>
              <!-- <div>商户id：</div> -->
            </van-grid-item>
            <!-- <span v-if="k.status == 0" style="color: red">未打款</span>
              <span v-else>已打款</span> -->
            <van-grid-item>
              <div style="text-align: center !important">
                <van-button
                  plain
                  type="info"
                  v-if="item.status == 0"
                  @click="withdraws(item.shopperId, item.id, num)"
                  >打款</van-button
                >
                <!-- <span v-if="k.status == 0" style="color: red">未打款</span> -->
                <span v-else>已打款</span>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </template>
    </van-cell>
    <van-dialog
      v-model="show"
      title="打款"
      style="text-align: center"
      :confirm="confirm"
      show-cancel-button
      confirm-button-text="立即打款"
    >
      <img :src="image" style="width: 50%; margin-top: 10px" />
    </van-dialog>
    <admin-footer active="'cash-back-record'" />
  </div>
</template>

<script>
import AdminFooter from "../components/AdminFooter";
import Vue from "vue";
import { NavBar, Card, ContactCard, Toast } from "vant";
import { findAll, payToShopper } from "../ajax/withdrawAPI";
import { look } from "../ajax/ordersAPI";
Vue.use(NavBar, Card, ContactCard);
export default {
  components: {
    AdminFooter,
  },
  data() {
    return {
      show: false,
      image: "",
      findAllData: [],
      item_id: "",
      item_key: "",
    };
  },
  created() {
    findAll({}).then((res) => {
      this.findAllData = res.data;
      console.log(res);
      //   console.log(res.data.uptime);
      for (var i = 0; i < res.data.length; i++) {
        // console.log(this.findWithdrawsdata[i].uptime);
        var date = new Date(parseInt(res.data[i].uptime));
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        var h =
          (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
          ":";
        var m =
          (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes()) + ":";
        var s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        this.findAllData[i].uptime = Y + M + D + h + m + s;
      }
    });
  },
  methods: {
    clickleft() {
      window.history.go(-1);
      // console.log("返回上一级");
    },
    confirm() {
      payToShopper({
        id: this.item_id,
      }).then((res) => {
        console.log(res);
        if (res.code === "0") {
          this.findAllData[this.item_key].status = 1;
          Toast("打款成功");
        }
      });
      console.log("立即打款");
    },
    withdraws(shopper_id, item_id, num) {
      console.log(shopper_id, item_id, num);
      this.item_id = item_id;
      this.item_key = num;
      look({
        shopper_id: shopper_id,
      }).then((res) => {
        console.log(res);
        this.image = res.data;
        console.log(this.image);
      });
      this.show = true;
    },
  },
};
</script>

<style scoped>
.van-dialog__content {
  margin: auto !important;
  text-align: center !important;
}
</style>
