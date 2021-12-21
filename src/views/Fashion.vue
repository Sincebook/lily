<template>
  <div>
    <van-nav-bar
      title="盲盒池"
      left-text="返回"
      right-text="我的物品"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell-group>
      <van-cell title="泡泡玛特" label="创造潮流，传递美好"  is-link to="/Fashions/popmart">
          <van-tag type="danger" >Pop Mart</van-tag>
      </van-cell>
      <van-cell title="若来"  label="你若盛开，清风自来" is-link to="/Fashions/rolife">
        <van-tag type="warning" >Rolife</van-tag>
      </van-cell>
      <van-cell title="青壹坊" label="梦红楼、西游、遇见大唐" is-link to="/Fashions/treeart">
        <van-tag type="success" >TreeInArt</van-tag>
      </van-cell>
      <van-cell title="精品手办" label="梦红楼、西游、遇见大唐" is-link to="/Fashions/others">
        <van-tag type="primary" >Tree</van-tag>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "Fashion",
  methods: {
    onClickLeft() {},
    onClickRight() {},
  },
};
</script>

<style>
</style>