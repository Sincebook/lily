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
        <van-nav-bar title="No.00001"></van-nav-bar>
        <img style="width: 80%" src="../../assets/1.jpg" alt="" />
        <div style="margin: 10px">
          <span> 田园牧歌-农场主 </span>
          <span> </span>
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
      />
    </van-popup>
    <van-popup
      v-model="addDoor"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-address-edit
        :area-list="areaList"
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </van-popup>
  </div>
</template>

<script>
// import { Toast, Dialog } from "vant";
import { areaList } from '@vant/area-data';

export default {
  name: "result",
  data() {
    return {
      open: true,
      isClick: true,
      show: false,
      door: false,
      addDoor: false,
      chosenAddressId: "1",
      areaList,
      searchResult: [],
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
      
    };
  },
  created() {
    console.log(this.$route.query);
  },
  methods: {
    openDoor() {
      this.show = true;
    },
    address() {
      this.door = true;
    },
    onAdd() {},
    addAddress() {
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
