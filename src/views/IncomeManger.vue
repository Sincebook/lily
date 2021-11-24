<template>
  <div class="IncomeManger">
    <van-nav-bar title="收入管理"></van-nav-bar>
    <van-cell v-for="item in showData" :key="item.id" :title="item.shopper_name">
      <template #label>
        <van-grid :border="false" column-num="3">
          <van-grid-item style="color: #000">
            <div>今日收入</div>
            <div>{{item.totalDay?item.totalDay/100:0}}元</div>
          </van-grid-item>
          <van-grid-item style="color: #000">
            <span>本月收入</span>
            <span>{{item.totalmonth?item.totalmonth/100:0}}元</span> 
            </van-grid-item>
          <van-grid-item style="color: #000">
            <span>总收入</span>
            <span>{{item.totalSum?item.totalSum/100:0}}元</span>
          </van-grid-item>
        </van-grid>
      </template>
    </van-cell>
    <admin-footer active="'bill-o'" />
  </div>
</template>
<script>
import AdminFooter from '../components/AdminFooter'
import {
  findAllEarnings,
} from '../ajax/IncomeApi'
export default {
  name: "IncomeManger",
  components: {
    AdminFooter
  },
  data() {
    return {
      showData: ''
    }
  },
  created() {
    findAllEarnings({}).then(res => {
      console.log(res);
      if (res.code === '0') {
        this.showData = res.data
      }
    })
  },
};
</script>

<style scoped>
</style>