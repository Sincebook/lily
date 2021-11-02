<template>
  <div>
    <van-nav-bar
      title="添加商品"
      left-arrow
      @click-left="jumpTo()"
    ></van-nav-bar>
    <van-field v-model="name" label="商品名称：" placeholder="请输入名称" />
    <van-field
      v-model="price"
      type="number"
      label="商品价格："
      placeholder="请输入价格"
    />
    <van-field
      v-model="detail"
      rows="5"
      autosize
      label="商品详情："
      type="textarea"
      maxlength="500"
      placeholder="请输入详情"
      show-word-limit
    />
    <van-field name="uploader" label="文件上传：">
      <template #input>
        <van-uploader v-model="uploader" />
      </template>
    </van-field>
    <div style="text-align: center">
      <van-button
        size="large"
        round
        type="info"
        style="width: 90%"
        @click="upload"
        >上传</van-button
      >
    </div>
  </div>
</template>

<script>
import { goodsImg, goodsAdd } from "../ajax/GoodApi";
import { Toast } from "vant";
export default {
  name: "AddItem",
  data() {
    return {
      uploader: [],
      name: "",
      price: "",
      detail: "",
      img: "",
      img2: "",
      img3: "",
      shopper_id: "2",
    };
  },
  methods: {
    jumpTo() {
      console.log("12321");
      this.$router.go(-1);
    },
    upload() {
      let that = this;

      if (that.uploader.length >= 1 && this.name && this.price && this.detail) {
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "上传中",
        });
        goodsImg({ image: this.uploader[0].file }).then((res) => {
          that.img = res.data;
          if (this.uploader[1]) {
            goodsImg({ image: this.uploader[1].file }).then((res1) => {
              that.img2 = res1.data;
              if (this.uploader[2]) {
                goodsImg({ image: this.uploader[2].file }).then((res2) => {
                  that.img3 = res2.data;
                  goodsAdd({
                    shopper_id: sessionStorage.getItem('shopper_id'),
                    name: that.name,
                    price: that.price * 100,
                    detail: that.detail,
                    img: that.img,
                    img2: that.img2,
                    img3: that.img3,
                  }).then((res3) => {
                    console.log(res3);
                    toast.clear();
                    if (res3.code === "0") {
                      Toast.success("上传成功");
                      this.reset();
                    } else {
                      Toast.fail("上传失败");
                    }
                  });
                });
              } else {
                goodsAdd({
                  shopper_id: sessionStorage.getItem('shopper_id'),
                  name: that.name,
                  price: that.price * 100,
                  detail: that.detail,
                  img: that.img,
                  img2: that.img2,
                }).then((res3) => {
                  console.log(res3);
                  toast.clear();
                  if (res3.code === "0") {
                    Toast.success("上传成功");
                    this.reset();
                  } else {
                    Toast.fail("上传失败");
                  }
                });
              }
            });
          } else {
            goodsAdd({
              shopper_id: sessionStorage.getItem('shopper_id'),
              name: that.name,
              price: that.price * 100,
              detail: that.detail,
              img: that.img,
            }).then((res3) => {
              console.log(res3);
              toast.clear();
              if (res3.code === "0") {
                Toast.success("上传成功");
                this.reset();
              } else {
                Toast.fail("上传失败");
              }
            });
          }
        });
      } else {
        Toast("数据不能为空");
      }
    },
    reset() {
      this.uploader = []
      this.name = '';
      this.price = '';
      this.detail = '';
      this.img = '';
      this.img2 = '';
      this.img3 = '';
    }
  },
};
</script>

<style>
</style>