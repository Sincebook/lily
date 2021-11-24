<template>
  <div>
    <van-nav-bar title="站点管理 - 站点名" />
    <van-loading v-if="loading" style="padding: 1rem; display: flex; justify-content: center" />
    <template v-else>
      <van-list v-if="stations.length">
        <van-cell v-for="station in stations" :key="station.id" is-link :to="'/CabinetManger/' + station.id" style="align-items: center">
          <div class="lr">
            <div class="name">{{ station.name }}</div>
            <div class="badges">
              <van-tag plain v-if="station.type > 0 && station.type <= typeName.length" type="primary">
                {{ typeName[station.type - 1] }}
              </van-tag>
              <van-tag plain v-else type="danger">未知类型</van-tag>

              <van-tag v-if="station.online" type="success">在线</van-tag>
              <van-tag v-else type="danger">离线</van-tag>
            </div>
          </div>
          <div class="lr">
            <div class="notes bl">{{ station.cellCount }} 柜门</div>
            <div class="notes br">当前商品数量:{{ station.cellAvailable }}</div>
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
      typeName: ['医疗站', '盲盒', '售货柜', '储物柜']
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
          console.log(json)
          that.stations = json.data.map(entry => ({
            id: entry.cabinetNum,
            name: entry.cabinetName,
            online: !!parseInt(entry.online),
            cellCount: entry.size,
            cellAvailable: entry.goodsNum,
            type: entry.type
          }));
          that.loading = false;
        }).catch(() => {
          Toast('网络错误');
          that.loading = false;
        })
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

.badges>*:not(:first-child) {
  margin-left: 0.5ch;
}

.notes {
  font-size: small;
  color: darkgray;
}
</style>
