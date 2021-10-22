<template>
  <div>
    <van-nav-bar title="柜子管理 - 柜子名" />
    <van-list>
      <van-cell clickable @click="qrCode()">
        <div class="lr">
          <div class="infobox">
            <div class="number">01</div>
            <div class="img" style="background-image: url('https://img01.yzcdn.cn/vant/custom-empty-image.png')"></div>
            <div class="info">123456</div>
          </div>
          <div class="buttons">
            <van-button @click.stop type="danger">取出</van-button>
            <van-button @click.stop="show=true" plain type="info">存货</van-button>
          </div>
        </div>
      </van-cell>
    </van-list>
    <van-popup v-model="show" position="bottom">
      <div class="popup">
        <van-cell v-for="i of items" :key="i" clickable @click="show=false">
          <div class="popup-item">
            <div class="img">img</div>
            <div class="title">Goods #{{ i }}</div>
            <div class="price">￥100</div>
          </div>
        </van-cell>
      </div>
    </van-popup>
    <van-popup v-model="showQrCode">
      <div class="qr">
        <img src="data:image/png;base64,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" />
        <van-button type="info" plain>保存二维码</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import {Button, Cell, List, NavBar, Tabbar, TabbarItem, Toast} from 'vant';
import 'vant/lib/index.css';

Vue.use(Button);
Vue.use(Cell);
Vue.use(List);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);

export default {
  name: "SiteManager",
  props: ['cabinetId'],
  data() {
    return {
      show: false,
      showQrCode: false,
      items: [...Array(20).keys()]
    }
  },
  methods: {
    qrCode() {
      this.showQrCode = true
    },
    showPopup() {
      this.show = true;
    },
    onClickLeft() {
      Toast("left")
    },
    onClickRight() {
      Toast("right")
    }
  }
}
</script>

<style scoped>
.lr {
  display: grid;
  grid-template-columns: 1fr auto;
}

.infobox {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.5ch;
  height: 100%;
}

.infobox > .number {
  row-span: 2;
}

.infobox > .img {
  row-span: 2;
  overflow: hidden;
  height: 2.5rem;
  width: 2.5rem;
  background-clip: content-box;
  background-position: center;
  background-size: contain;
}

.infobox > .info {
  flex: auto;
}

.buttons {
  display: grid;
  height: 100%;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  grid-column-gap: 0.5ch;
}

.popup {
  min-height: 20vh;
  height: auto;
  max-height: 50vh;
}

.popup-item {
  display: grid;
  grid-row-gap: 0;
  grid-column-gap: 1ch;
  grid-template-rows: auto auto;
  grid-template-columns: auto 1fr;
}

.popup-item > .img {
  grid-row: span 2;
  overflow: hidden;
  height: 100%;
  width: 3rem;
  background: gray;
}

.popup-item > .title {
}

.popup-item > .price {
  color: coral;
}

.qr {
  padding: 1rem;
}

.qr > button {
  width: 100%;
}
</style>
