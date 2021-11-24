<template>
  <div  class="ShopperIncomeManger">
    <van-nav-bar
        title="收入管理"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    <div v-show="flag" class="main">
      <!-- 显示各个柜子 -->
      <van-cell
        v-for="(item, index) in showData"
        :key="index"
        :title="'柜子编号：' + item.cabinet_num"
      >
        <template #label>
          <van-grid :border="false" column-num="3">
            <van-grid-item style="color: #000">
              <div>今日收入</div>
              <div>{{ item.收入.dayGet / 100 ? item.收入.dayGet / 100 : 0 }}元</div>
            </van-grid-item>
            <van-grid-item style="color: #000">
              <div>本月收入</div>
              <div>{{ item.收入.monthGet / 100 ? item.收入.monthGet / 100 : 0 }}元</div>
            </van-grid-item>
            <van-grid-item style="color: #000">
              <div>总收入</div>
              <div>{{ item.收入.allGet / 100 ? item.收入.allGet / 100 : 0 }}元</div>
            </van-grid-item>
          </van-grid>
        </template>
      </van-cell>
    </div>

    <!-- 固定在下面显示当日收入和当月收入 -->
    <van-cell-group v-if="flag" class="footer">
      <van-cell :title="day" :value="daySum" @click="showDay = true" />
      <van-cell :title="month" :value="monthSum" @click="showMonth = true" />
    </van-cell-group>

  <div v-else>
    <van-empty description="暂无收入记录" />
  </div>

    <!-- 选择年月日的弹出框 -->
    <van-dialog v-model="showDay" :show-confirm-button="false">
      <van-datetime-picker
        v-model="currentDay"
        type="date"
        title="请选择年月日"
        :show-toolbar="true"
        @confirm="confirmDay"
        @cancel="showDay = false"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-dialog>

    <!-- 选择月份的弹出框 -->
    <van-dialog v-model="showMonth" :show-confirm-button="false">
      <van-datetime-picker
        v-model="currentMonth"
        title="请选择年月"
        type="year-month"
        @confirm="confirmMonth"
        @cancel="showMonth = false"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-dialog>
  </div>

</template>

<script>
import {
  findEarningsByshopperId,
  findByDay,
  findByMonth,
} from '../ajax/IncomeApi'
export default {
  name: 'ShopperIncomeManger',
  data() {
    return {
      flag:true,
      showDay: false,
      showMonth: false,
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(),
      currentDay: new Date(),
      currentMonth: new Date(),
      day: '',
      month: '',
      showData: '',
      daySum: '--------',
      monthSum: '--------'
    }
  },
  created() {
    this.day = `${this.currentDay.getFullYear()}-${this.currentDay.getMonth() + 1}-${this.currentDay.getDate()}`
    this.month = `${this.currentMonth.getFullYear()}-${this.currentMonth.getMonth() + 1}`

    // 显示改商户每一个柜子的收入
    findEarningsByshopperId({
      "shopper_id": sessionStorage.getItem('shopper_id')
    }).then(res => {
      console.log(res);
      if (res.code === '0') {
        if(res.data.length==0){
          this.flag=false
        }else{
          
        this.showData = res.data
        console.log("data:"+this.showData.length);
        }
      }
    })

    this.getByDay(this.day);
    this.getByMonth(this.month + "-1");
  },
  methods: {
    onClickLeft() {
      window.history.go(-1)
    },
    confirmDay() {
      const date = new Date(this.currentDay);
      this.day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      this.showDay = false
      this.getByDay(this.day);
    },
    confirmMonth() {
      const date = new Date(this.currentMonth)
      this.month = `${date.getFullYear()}-${date.getMonth() + 1}`
      this.showMonth = false
      this.getByMonth(this.month + "-1");
    },
    // 显示该商户当天总收入
    getByDay(dayItem) {
      findByDay({
        "shopper_id": sessionStorage.getItem('shopper_id'),
        "date": dayItem
      }).then(res => {
        console.log(res);
        if (res.code === '0') {
          this.daySum = "当日收入：" + (res.data.totalDay / 100 ? res.data.totalDay / 100 : 0) + "元"
        }
      })
    },
    // 显示改商户当月的总收入
    getByMonth(monthItem) {
      findByMonth({
        "shopper_id": sessionStorage.getItem('shopper_id'),
        "date": monthItem
      }).then(res => {
        console.log(res);
        if (res.code === '0') {
          this.monthSum = "当月收入：" + (res.data.totalMonth / 100 ? res.data.totalMonth / 100 : 0) + "元"
        }
      })
    }
  },
}
</script>

<style scoped>
.ShopperIncomeManger {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main {
  /* 撑满剩余部分 */
  flex: 9;
  overflow: scroll;
  margin-bottom: 20%;
}

.footer {
  flex: 1;
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  z-index: 999;
}
</style>
