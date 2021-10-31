<template>
  <div>
    <!-- header -->
    <div class="header">
      <van-nav-bar
        title="商户详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <!-- 商户信息 -->
      <!-- <van-cell value="商户信息" /> -->
      <van-contact-card
        type="edit"
        :name="shoppers.name"
        :tel="shoppers.phone"
        :editable="true"
        @click="onEdit"
      />
      <van-dialog
        message-align="center"
        v-model="diashow"
        title="修改商户信息"
        show-cancel-button
        @confirm="confirm"
      >
        <van-cell-group>
          <van-field
            v-model="shoppersname"
            label="姓名："
            placeholder="请输入商户姓名"
            required
          />
          <van-field
            v-model="shoppersPhone"
            label="电话："
            placeholder="请输入商户电话"
            required
          />
          <van-field
            v-model="shoppers.phone2"
            label="电话1："
            placeholder="请输入商户电话"
          />
          <van-field
            v-model="shoppers.phone3"
            label="电话2："
            placeholder="请输入商户电话"
          />
        </van-cell-group>
      </van-dialog>
      <!-- 站点信息 -->
      <!-- <van-cell value="现有站点" /> -->
      <van-panel title="现有站点">
        <div class="nowNums">
          <van-swipe-cell v-bind:key="i" v-for="(item, i) in cabinet">
            <van-card
              class="goods-card"
              thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
            >
              <template #title>
                <van-cell>
                  <template #default>
                    <span>编号：</span><span>{{ item.cabinetNum }}</span>
                  </template>
                </van-cell>
              </template>
              <template #desc>
                <van-cell>
                  <template #title>
                    <span>规格：</span><span>{{ item.size }}</span>
                  </template>
                  <template #default>
                    <span>状态：</span><span>{{ item.online }}</span>
                  </template>
                </van-cell>
              </template>
            </van-card>
            <template #right>
              <van-button
                square
                text="删除"
                @click="onDelete(item.id)"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </div>
        <van-contact-card add-text="新增站点" type="add" @click="showPopup" />
      </van-panel>
      <!-- 新增卡点 -->
      <van-popup
        v-model="show"
        closeable
        position="bottom"
        custom-style="text-align:center"
        :style="{ height: '60%' }"
      >
        <van-nav-bar title="新增站点" />
        <van-form @submit="onSubmit">
          <van-field
            v-model="cabinet_num"
            name="编号"
            label="编号"
            placeholder="请输入站点编号"
            required
            clearable
          />
          <van-field
            v-model="cabinetName"
            name="名称"
            label="名称"
            placeholder="请输入站点名称"
            required
            clearable
          />
          <van-field
            v-model="size"
            name="规格"
            label="规格"
            placeholder="请输入站点规格"
            required
            clearable
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >添 加</van-button
            >
          </div>
        </van-form>
      </van-popup>
      <van-panel title="管理员信息" class="footer">
        <div>
          <van-cell-group>
            <van-field
              v-model="shoppers.phone"
              label="商户1"
              placeholder="请输入商户电话"
              required
              clearable
            />
            <van-field
              v-model="shoppers.phone2"
              label="商户2"
              placeholder="请输入商户电话"
              clearable
            />
            <van-field
              v-model="shoppers.phone3"
              label="商户3"
              placeholder="请输入商户电话"
              clearable
            />
          </van-cell-group>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Icon,
  NavBar,
  ContactCard,
  Card,
  SwitchCell,
  Field,
  Button,
  Form,
  Cell,
  CellGroup,
  Panel,
  Dialog,
} from "vant";

Vue.use(
  Icon,
  NavBar,
  ContactCard,
  Card,
  SwitchCell,
  Field,
  Button,
  Form,
  Cell,
  CellGroup,
  Panel,
  Dialog
);
import { findByShopperId, deleteById, add } from "../ajax/cabinetAPI";
import { findById, modifyById } from "../ajax/shopperAPI";
export default {
  name: "ShopDetails",
  data() {
    return {
      // username: "",
      // password: "",
      // message: "1234",
      show: false,
      diashow: false,
      cabinet_num: "",
      cabinetName: "",
      size: "",
      shoppers: {
        id: "1",
        name: "小明",
        phone: "123456789",
        phone2: "",
        phone3: "",
      },
      value: "",
      cabinet: [
        {
          id: "1",
          shopperId: "123",
          cabinetNum: "01",
          size: "2",
          online: "空",
          uptime: "",
        },
      ],
    };
  },
  computed: {
    shoppersname: {
      get: function () {
        return this.shoppers.name;
      },
      set: function (newValue) {
        this.shoppers.name = newValue;
      },
    },
    shoppersPhone: {
      get: function () {
        return this.shoppers.phone;
      },
      set: function (newValue) {
        this.shoppers.phone = newValue;
      },
    },
    shoppersPhone2: {
      get: function () {
        return this.shoppers.phone2;
      },
      set: function (newValue) {
        this.shoppers.phone2 = newValue;
      },
    },
    shoppersPhone3: {
      get: function () {
        return this.shoppers.phone3;
      },
      set: function (newValue) {
        this.shoppers.phone3 = newValue;
      },
    },
  },
  methods: {
    onClickLeft() {
      // Toast("返回");
      this.$router.replace("/ShopManger");
    },
    onEdit() {
      // Toast("编辑");
      this.diashow = true;
      // console.log(this.shoppersname, this.shoppersPhone);
    },
    // 商户信息修改
    confirm() {
      console.log("111");
      console.log(this.shoppersname, this.shoppersPhone);
      const name = this.shoppersname;
      const phone = this.shoppersPhone;
      const phone2 = this.shoppersPhone2;
      const phone3 = this.shoppersPhone3;
      modifyById({
        id: 3,
        name: name,
        phone: phone,
        phone2: phone2,
        phone3: phone3,
      }).then((res) => {
        console.log(res);
        // this.shoppers = res.data;
        // console.log("修改");
        // console.log(name, phone);
      });
    },
    // onAdd() {
    //   Toast("新增");
    // },
    onSubmit() {
      // console.log("submit", values);
      console.log(this.cabinet_num, this.cabinetName, this.size);
      // if (this.cabinet_num != "" && this.cabinetSize != "") {
      add({
        shopper_id: this.$route.query.shopper_id,
        cabinet_num: this.cabinet_num,
        cabinet_name: this.cabinetName,
        size: this.size,
      }).then((res) => {
        console.log(res);
      });
      // }
      this.show = false;
    },
    onDelete(i) {
      // Toast("删除");
      // console.log(i);
      deleteById({
        id: i,
      }).then((res) => {
        console.log(res);
      });
      console.log(this.sites.length);
    },
    showPopup() {
      this.show = true;
    },
  },
  created: function () {
    const id = this.$route.query.shopper_id;
    const that = this;
    // console.log("111");
    findById({
      id: id,
    }).then((res) => {
      console.log(res.data);
      that.shoppers = res.data;
    });

    findByShopperId({
      shopper_id: id,
    }).then((res) => {
      console.log(res.data);
      that.cabinet = res.data;
    });
  },
};
</script>

<style>
.van-cell__value {
  position: relative;
  overflow: hidden;
  color: #969799;
  text-align: left !important;
  vertical-align: middle;
  word-wrap: break-word;
}
.van-dialog {
  text-align: center !important;
}
.nowNums {
  height: 312px !important;
  overflow-y: scroll !important;
}
.footer {
  background: #fff;
  /* position: fixed !important;
  bottom: 20px !important; */
}
.van-panel__content {
  /* height: 413px !important; */
}
.van-popup {
  text-align: center !important;
}
.van-button--round {
  padding: 0px 60px !important;
  margin-top: 10px !important;
}
.van-icon {
  color: black !important;
}
.van-nav-bar__text {
  color: black !important;
}
.van-contact-card::before {
  background: #fafafa !important;
}
.goods-card {
  margin: 0 !important;
  background-color: white !important;
}

.delete-button {
  height: 100% !important;
}
</style>