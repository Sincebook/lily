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
    <van-field name="uploader" label="商品图片：">
      <template #input>
        <van-uploader
          v-model="fileList"
          :deletable="false"
          :after-read="afterRead"
          multiple
          :max-count="3"
          :max-size="1024 * 1024"
          @oversize="onOversize"
        />
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
      name: "",
      price: "",
      detail: "",
      img: "",
      img2: "",
      img3: "",
      shopper_id: "2",
      fileList: [],
      uploadNum: 0,
    };
  },
  methods: {
    onOversize() {
      Toast("文件大小不能超过 1MB");
    },
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      goodsImg({ image: file.file }).then((res) => {
        if (res.code === "0") {
          file.status = "success";
          this.fileList[this.uploadNum].url = res.data;
          this.uploadNum++;
        }
      });
    },
    jumpTo() {
      console.log("12321");
      this.$router.go(-1);
    },
    upload() {
      let that = this;
      console.log(this.fileList);
      if (that.fileList.length >= 1 && this.name && this.price && this.detail) {
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "上传中",
        });
        if (this.fileList[1]) {
          if (this.fileList[2]) {
            goodsAdd({
              shopper_id: sessionStorage.getItem("shopper_id"),
              name: that.name,
              price: that.price * 100,
              detail: that.detail,
              img: that.fileList[0].url,
              img2: that.fileList[1].url,
              img3: that.fileList[2].url,
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
          } else {
            goodsAdd({
              shopper_id: sessionStorage.getItem("shopper_id"),
              name: that.name,
              price: that.price * 100,
              detail: that.detail,
              img: that.fileList[0].url,
              img2: that.fileList[1].url,
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
        } else {
          goodsAdd({
            shopper_id: sessionStorage.getItem("shopper_id"),
            name: that.name,
            price: that.price * 100,
            detail: that.detail,
            img: that.fileList[0].url,
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
      } else {
        Toast("数据不能为空");
      }
    },
    reset() {
      this.fileList = [];
      this.name = "";
      this.price = "";
      this.detail = "";
      this.img = "";
      this.img2 = "";
      this.img3 = "";
      this.uploadNum = 0
    },
  },
};
</script>

<style>
</style>