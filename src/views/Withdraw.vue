<template>
  <div class="Withdraw">
    <van-nav-bar title="提现" left-arrow @click-left="clickleft()">
      <template #right>
        <!-- <van-icon name="add-o" /> -->
        <van-icon @click="showDialog" name="add-o" size="18" />
      </template>
    </van-nav-bar>
    <van-cell center>
      <template #title>
        <span class="custom-title"
          >可提现：{{ canWithdrawdata.canWithdraw / 100 }}</span
        >
      </template>
      <template #right-icon>
        <van-button
          :disabled="canWithdrawdata.canWithdraw == 0"
          plain
          type="info"
          @click="withdraw"
          >提现</van-button
        >
      </template>
    </van-cell>
    <van-cell center>
      <template #title>
        <span class="custom-title"
          >不可提现：{{ canWithdrawdata.hasWithdraw / 100 }}</span
        >
      </template>
      <!-- <template #label>
        <span class="custom-title">单元格</span>
      </template> -->
    </van-cell>
    <van-cell>
      <template #title>
        <van-nav-bar title="提现历史"></van-nav-bar>
      </template>
      <template #label>
        <div v-for="item in findWithdrawsdata" :key="item.id">
          <van-grid :border="false" column-num="3" :center="false">
            <van-grid-item>
              <div>{{ item.uptime }}</div>
            </van-grid-item>
            <van-grid-item>
              <div style="text-align: left !important">
                <span>提现金额：{{ item.money / 100 }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div style="text-align: center !important">
                <span v-if="item.status == 0" style="color: red">未打款</span>
                <span v-else>已打款</span>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </template>
    </van-cell>
    <van-dialog
      style="text-align: center"
      v-model="show"
      title="商户二维码"
      @confirm="confirm"
      @cancel="cancel"
    >
      <van-uploader
        v-model="imagedata"
        multiple
        :max-count="1"
        :after-read="afterRead"
        style="margin-top: 10px"
      />
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Card, ContactCard, Toast, Uploader } from "vant";
import { findWithdraws, canWithdraw, withdraw } from "../ajax/withdrawAPI";
// import { findById } from "../ajax/shopperAPI";
import { upload, look } from "../ajax/ordersAPI";
Vue.use(NavBar, Card, ContactCard, Uploader);
export default {
  data() {
    return {
      show: false,
      showData: {},
      canWithdrawdata: {},
      imagedata: [
        {
          url: "",
        },
      ],
      findWithdrawsdata: [],
    };
  },
  created() {
    findWithdraws({
      shopper_id: sessionStorage.getItem("shopper_id"),
    }).then((res) => {
      console.log(res);
      this.findWithdrawsdata = res.data;
      for (var i = 0; i < res.data.length; i++) {
        // console.log(this.findWithdrawsdata[i].uptime);
        var date = new Date(parseInt(this.findWithdrawsdata[i].uptime));
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
        this.findWithdrawsdata[i].uptime = Y + M + D + h + m + s;
      }
      //   for (var i = 0; i < res.data.length; i++) {
      //     this.findWithdrawsdata[i].uptime = this.int2Date(
      //       this.findWithdrawsdata[i].uptime
      //     );
      //   }
    });
    canWithdraw({
      shopper_id: sessionStorage.getItem("shopper_id"),
    }).then((res) => {
      console.log(res);
      this.canWithdrawdata = res.data;
    });
    look({
      shopper_id: sessionStorage.getItem("shopper_id"),
    }).then((res) => {
      console.log(res);
      this.imagedata[0].url = res.data;
      //   console.log(this.imagedata[0]);
    });
    // findAll({}).then((res) => {
    //   this.showData = res.data;
    //   console.log(this.showData);
    // });
  },
  methods: {
    clickleft() {
      window.history.go(-1);
      // console.log("返回上一级");
    },
    showDialog() {
      this.show = true;
    },
    confirm() {
      //   console.log("确定");
    },
    cancel() {
      //   console.log("取消");
    },
    withdraw() {
      withdraw({
        shopper_id: sessionStorage.getItem("shopper_id"),
      }).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.canWithdrawdata.canWithdraw = 0;
          Toast("提现成功");
        } else {
          Toast("提现失败");
        }
      });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const file1 = file.file;
      console.log(file1);
      // console.log("123");
      upload({
        shopper_id: sessionStorage.getItem("shopper_id"),
        image: file1,
      }).then((res) => {
        console.log(res);
        if (res.code === "0") {
          Toast("上传成功");
        }
      });
    },
    uploadImage() {},
  },
};
</script>

<style scoped>
.van-dialog__content {
  margin: auto !important;
  text-align: center !important;
}
</style>
