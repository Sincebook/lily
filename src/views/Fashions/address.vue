<template>
  <div>
    <van-nav-bar
      title="我的地址"
      left-text="返回"
      right-text="添加"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div>
      <van-panel
        v-for="list in lists"
        :key="list.id"
        :title="list.name"
        :desc="list.address"
        :status="list.phone"
      >
      </van-panel>
    </div>

    <van-empty
      v-if="!lists"
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="当前没有收货地址~"
    />
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
import { getInfo, addInfo } from "../../ajax/luckyboxApi";
import { areaList } from "@vant/area-data";
import { Toast } from "vant";
export default {
  name: "myaddress",
  data() {
    return {
      addDoor: false,
      areaList,
      lists: [],
      searchResult: [],
    };
  },
  created() {
    const wxuser_id = localStorage.getItem("wxuser_id");
    getInfo({ wxuser_id }).then((res) => {
      if (res.code === "0") {
        this.lists = res.data;
      }
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.addDoor = true;
    },
    onSave(values) {
      console.log(values);
      const wxuser_id = localStorage.getItem("wxuser_id");
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
              this.lists=res.data;
            }
          });
          this.addDoor = false;
          this.door = true;
        } else {
          Toast.fail("保存失败");
        }
      });
    },
  },
};
</script>

<style scoped>
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>