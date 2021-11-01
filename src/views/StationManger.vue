<template>
  <div>
    <van-nav-bar title="站点管理 - 站点名" />
    <van-loading v-if="loading" style="padding: 1rem; display: flex; justify-content: center" />
    <template v-else>
      <van-list v-if="stations.length">
        <van-cell v-for="station in stations" :key="station.id" is-link :to="'/CabinetManger/' + station.id" style="align-items: center">
          <div class="lr">
            <div class="name">{{ station.name }}</div>
            <van-tag v-if="station.online" type="success">在线</van-tag>
            <van-tag v-else type="danger">离线</van-tag>
          </div>
          <div class="lr">
            <div class="notes bl">{{ station.cellCount }} 柜门</div>
            <div class="notes br">剩余柜子 {{ station.cellAvailable }}</div>
          </div>
        </van-cell>
      </van-list>
      <van-empty v-else description="未查询到站点" />
    </template>
    <shopper-footer active="'home-o'"/>
  </div>
</template>

<script>
import Vue from 'vue';
import {Cell, Empty, List, NavBar, Tabbar, TabbarItem, Toast} from 'vant';
import 'vant/lib/index.css';
import ShopperFooter from "@/components/ShopperFooter";
import {cabinet_findByShopperId} from "@/ajax/StationManager";

Vue.use(Cell);
Vue.use(Empty);
Vue.use(List);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);

export default {
  name: "SiteManager",
  components: {
    ShopperFooter
  },
  data() {
    return {
      loading: true,
      stations: [],
    }
  },
  created() {
    console.log(this.GLOBAL)
    let that = this;
    cabinet_findByShopperId({'shopper_id': sessionStorage.getItem('shopper_id')})
        .then(json => {
          if (json.code !== '0') {
            Toast(json.errMsg);
            that.loading = false;
            return;
          }

          that.stations = json.data.map(entry => ({
            id: entry.cabinetNum,
            name: '接口未返回名称',
            online: !!parseInt(entry.online),
            cellCount: entry.size,
            cellAvailable: 0
          }));
          that.loading = false;
        }).catch(() => {
          Toast('网络错误');
          that.loading = false;
        })
    // setTimeout(function() {
    //   that.stations = [
    //     {
    //       id: 0,
    //       name: '智能柜名称',
    //       online: true,
    //       cellCount: 18,
    //       cellAvailable: 13
    //     },
    //     {
    //       id: 1,
    //       name: '智能柜名称345R',
    //       online: true,
    //       cellCount: 66,
    //       cellAvailable: 0
    //     },
    //     {
    //       id: 2,
    //       name: '智能柜名称6513',
    //       online: false,
    //       cellCount: 18,
    //       cellAvailable: 13
    //     },
    //     {
    //       id: 3,
    //       name: 'SDGFHFX',
    //       online: true,
    //       cellCount: 18,
    //       cellAvailable: 13
    //     },
    //     {
    //       id: 4,
    //       name: '智能柜 FGSH',
    //       online: true,
    //       cellCount: 18,
    //       cellAvailable: 13
    //     },
    //     {
    //       id: 5,
    //       name: '智能柜名称',
    //       online: true,
    //       cellCount: 18,
    //       cellAvailable: 13
    //     },
    //     {
    //       id: 6,
    //       name: '智能柜名称',
    //       online: true,
    //       cellCount: 18,
    //       cellAvailable: 13
    //     },
    //     {
    //       id: 7,
    //       name: '智能柜名称',
    //       online: true,
    //       cellCount: 18,
    //       cellAvailable: 13
    //     },
    //     {
    //       id: 8,
    //       name: '智能柜名称',
    //       online: true,
    //       cellCount: 18,
    //       cellAvailable: 13
    //     },
    //     {
    //       id: 9,
    //       name: '智能柜名称',
    //       online: true,
    //       cellCount: 18,
    //       cellAvailable: 13
    //     },
    //     {
    //       id: 10,
    //       name: '智能柜名称',
    //       online: true,
    //       cellCount: 18,
    //       cellAvailable: 13
    //     },
    //     {
    //       id: 11,
    //       name: '智能柜名称',
    //       online: true,
    //       cellCount: 18,
    //       cellAvailable: 13
    //     },
    //   ];
    //   // that.stations = [];
    //   that.loading = false;
    // }, 1000)
  },
  methods: {
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

.notes {
  font-size: small;
  color: darkgray;
}
</style>
