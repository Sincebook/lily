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
      @click="openDoor"
      style="width: 80%; margin: 10%"
      >立即开奖</van-button
    >
    <div
      v-if="show"
      style="
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        z-index: 999;
      "
    >
      <div
        class="rotate-scale-up-diag-1"
        style="
          text-align: center;
          width: 300px;
          margin: 200px auto;
          background: white;
        "
      >
        <van-nav-bar
          :title="'No.' + result.record_id.toString().padStart(8, '0')"
        ></van-nav-bar>
        <img style="width: 80%" :src="result.img" alt="" />
        <div style="margin: 10px">
          <span> {{ mhtype[parseInt(result.type)] }}-{{ result.name }} </span>
          <br />
        </div>
        <van-button type="danger" style="width: 100%" @click="address"
          >收入囊中</van-button
        >
      </div>
      <br />
    </div>
    <van-popup
      v-model="door"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <van-button
        type="info"
        size="small"
        style="margin: 10px"
        @click="addAddress"
        >新增地址</van-button
      >
      <van-address-list
        v-model="chosenAddressId"
        add-button-text="确认发货"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
      />
    </van-popup>
    <van-popup
      v-model="addDoor"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-nav-bar title="添加收货地址"></van-nav-bar>
      <van-address-edit
        :area-list="areaList"
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </van-popup>
  </div>
</template>

<script>
// import { Toast, Dialog } from "vant";
import { areaList } from "@vant/area-data";
import {
  getOnline,
  getInfo,
  addInfo,
  finishInfo,
  delInfo,
} from "../../ajax/luckyboxApi";
import { Toast, Dialog } from "vant";
export default {
  name: "result",
  data() {
    return {
      open: true,
      isClick: true,
      show: false,
      door: false,
      addDoor: false,
      chosenAddressId: "",
      areaList,
      searchResult: [],
      result: {
        record_id: "",
        name: "",
        img: "",
        type: "",
      },
      mhtype: ["Pop Mart", "若来Rolife", "青壹坊", "欧皇手办"],
      list: [],
    };
  },
  created() {
    console.log(this.$route.query);
  },
  methods: {
    openDoor() {
      const { wxuser_id, serial_num } = this.$route.query;
      if (wxuser_id && serial_num && this.open) {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "抽取中",
        });
        this.open = false;
        getOnline({ serial_num }).then((res) => {
          Toast.clear();
          if (res.code === "0") {
            console.log(res, wxuser_id);
            this.result = res.data;
            this.show = true;
          } else {
            Toast.fail(res.errMsg);
          }
        });
      } else {
        Toast.fail("订单无效");
      }
    },
    address() {
      const { wxuser_id } = this.$route.query;
      getInfo({ wxuser_id }).then((res) => {
        if (res.code === "0") {
          for (let i = 0; i < res.data.length; i++) {
            const { id, name, phone, address } = res.data[i];
            this.list[i] = { id, name, tel: phone, address };
          }
          if (this.list.length != 0) {
            this.chosenAddressId = this.list[0].id;
          }
          this.door = true;
        } else {
          this.addDoor = true;
        }
      });
    },
    onAdd() {
      const { serial_num } = this.$route.query;
      console.log(this.chosenAddressId);
      if (this.chosenAddressId) {
        let address = {};
        for (let item in this.list) {
          if (item.id == this.chosenAddressId) {
            address = item;
          }
        }
        console.log(address);
        finishInfo({ serial_num, info_id: this.chosenAddressId }).then(
          (res) => {
            if (res.code === "0") {
              Dialog.alert({
                title: "抽取完成",
                message: "将在48小时内完成发货，耐心等待哦~",
                theme: "round-button",
                confirmButtonText: "再来一发",
              }).then(() => {
                window.location.href =
                  "http://kaoyan.since88.cn/wechat/authorize?returnUrl=lily&cId=0&dId=0";
              });
            } else {
              Toast.fail("数据有误");
            }
          }
        );
      } else {
        Toast.fail("请选择地址");
      }
    },
    onEdit(values) {
      const { wxuser_id } = this.$route.query;
      console.log(values);
      Dialog.confirm({
        title: "温馨提示",
        message: "你确认要删除该地址吗？",
      })
        .then(() => {
          delInfo({
            wxuser_id,
            info_id: values.id,
          }).then((res) => {
            if (res.code === "0") {
              getInfo({ wxuser_id }).then((res) => {
                if (res.code === "0") {
                  for (let i = 0; i < res.data.length; i++) {
                    const { id, name, phone, address } = res.data[i];
                    this.list[i] = { id, name, tel: phone, address };
                  }
                  if (this.list.length != 0) {
                    this.chosenAddressId = this.list[0].id;
                  } else {
                    this.chosenAddressId = '';
                  }
                }
              });
              Toast.success("删除成功");
            }
          });
        })
        .catch(() => {});
    },
    onSave(values) {
      console.log(values);
      const { wxuser_id } = this.$route.query;
      const { name, city, county, addressDetail, tel, province } = values;
      addInfo({
        wxuser_id,
        name,
        phone: tel,
        address: province + city + county + addressDetail,
      }).then((res) => {
        if (res.code === "0") {
          getInfo({ wxuser_id }).then((res) => {
            if (res.code === "0") {
              for (let i = 0; i < res.data.length; i++) {
                const { id, name, phone, address } = res.data[i];
                this.list[i] = { id, name, tel: phone, address };
              }
              if (this.list.length != 0) {
                this.chosenAddressId = this.list[0].id;
              }
            }
          });
          this.addDoor = false;
          this.door = true;
        } else {
          Toast.fail("保存失败");
        }
      });
    },
    addAddress() {
      this.door = false;
      this.addDoor = true;
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
.rotate-scale-up-diag-1 {
  -webkit-animation: rotate-scale-up-diag-1 0.7s linear both;
  animation: rotate-scale-up-diag-1 0.7s linear both;
}
@-webkit-keyframes rotate-scale-up-diag-1 {
  0% {
    -webkit-transform: scale(1) rotate3d(1, 1, 0, 0deg);
    transform: scale(1) rotate3d(1, 1, 0, 0deg);
  }
  50% {
    -webkit-transform: scale(2) rotate3d(1, 1, 0, -180deg);
    transform: scale(2) rotate3d(1, 1, 0, -180deg);
  }
  100% {
    -webkit-transform: scale(1) rotate3d(1, 1, 0, -360deg);
    transform: scale(1) rotate3d(1, 1, 0, -360deg);
  }
}
@keyframes rotate-scale-up-diag-1 {
  0% {
    -webkit-transform: scale(1) rotate3d(1, 1, 0, 0deg);
    transform: scale(1) rotate3d(1, 1, 0, 0deg);
  }
  50% {
    -webkit-transform: scale(2) rotate3d(1, 1, 0, -180deg);
    transform: scale(2) rotate3d(1, 1, 0, -180deg);
  }
  100% {
    -webkit-transform: scale(1) rotate3d(1, 1, 0, -360deg);
    transform: scale(1) rotate3d(1, 1, 0, -360deg);
  }
}
</style>
