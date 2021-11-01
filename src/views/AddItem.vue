<template>
  <div>
    <van-nav-bar title="添加商品" left-arrow @click-left="jumpTo()"></van-nav-bar>
    <van-field v-model="text" label="商品名称：" placeholder="请输入名称"/>
    <van-field v-model="number" type="number" label="商品价格：" placeholder="请输入价格"/>
    <van-field
      v-model="message"
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
  </div>
</template>

<script>
export default {
  name: "AddItem",
  data() {
    return {
      uploader: [{ url: "https://img01.yzcdn.cn/vant/leaf.jpg" }],
      message: "",
      text: '',
      number:''
    };
  },
  methods: {
    jumpTo() {
      console.log('12321')
      this.$router.go(-1)
    }
  }
};
</script>

<style>
</style>