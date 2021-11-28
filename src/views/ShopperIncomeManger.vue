<template>
<div class="ShopperIncomeManger">
    <van-nav-bar title="收入管理" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 三个接口全部调用完成并且拥有柜子时才显示 -->
    <div v-if="toast >= 3 && this.showData.length!=0">
        <div class="main">
            <!-- 显示各个柜子 -->
            <van-cell v-for="(item, index) in showData" :key="index" :title="'柜子编号：' + item.cabinet_num">
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
        <van-cell-group v-show="daySum!='--------'&&monthSum!='--------'" class="footer">
            <van-cell :title="day" :value="daySum" @click="showDay = true" />
            <van-cell :title="month" :value="monthSum" @click="showMonth = true" />
        </van-cell-group>
    </div>
    <!-- 三个接口全部调用并且没有数据时显示空 -->
    <div v-else-if="this.toast>=3&&this.showData.length===0">
        <van-empty description="暂无收入记录" />
    </div>

    <!-- 选择年月日的弹出框 -->
    <van-dialog v-model="showDay" :show-confirm-button="false">
        <van-datetime-picker v-model="currentDay" type="date" title="请选择年月日" :show-toolbar="true" @confirm="confirmDay" @cancel="showDay = false" :min-date="minDate" :max-date="maxDate" />
    </van-dialog>

    <!-- 选择月份的弹出框 -->
    <van-dialog v-model="showMonth" :show-confirm-button="false">
        <van-datetime-picker v-model="currentMonth" title="请选择年月" type="year-month" @confirm="confirmMonth" @cancel="showMonth = false" :min-date="minDate" :max-date="maxDate" />
    </van-dialog>
</div>
</template>

<script>
import {
    findEarningsByshopperId,
    findByDay,
    findByMonth,
} from '../ajax/IncomeApi'
import {
    Toast
} from 'vant'
export default {
    name: 'ShopperIncomeManger',
    data() {
        return {
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
            monthSum: '--------',
            toast: 0,//用来计算调用接口的次数（本页面加载时需要调用三个接口）
            flag: false//用来标识查询当日或者当月的总收入时是否调用接口，未调用时显示一下加载中，，调用之后加载中消失
        }
    },
    created() {
        const t=Toast.loading({
            duration: 0,
            message: '加载中...',
            forbidClick: true,
        });
        setInterval(() => {
          // 三个接口全部调用之后才清除Toast
            if (this.toast >= 3) {
                t.clear()
            }
        }, 1000)

        this.day = `${this.currentDay.getFullYear()}-${this.currentDay.getMonth() + 1}-${this.currentDay.getDate()}`
        this.month = `${this.currentMonth.getFullYear()}-${this.currentMonth.getMonth() + 1}`

        // 显示改商户每一个柜子的收入
        findEarningsByshopperId({
            "shopper_id": sessionStorage.getItem('shopper_id')
        }).then(res => {
            console.log(res);
            if (res.code === '0') {
                if (res.data.length != 0) {
                    this.showData = res.data
                }
                this.toast++;
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

            this.flag = false

            // 调用接口
            this.getByDay(this.day);
            
            const toastDay = Toast.loading({
                duration: 0,
                message: '加载中...',
                forbidClick: true,
            })
            setInterval(() => {
                if (this.flag) {
                    toastDay.clear()
                }
            }, 1000)
        },
        confirmMonth() {
            const date = new Date(this.currentMonth)
            this.month = `${date.getFullYear()}-${date.getMonth() + 1}`
            this.showMonth = false

            this.flag = false

            // 调用接口
            this.getByMonth(this.month + "-1");

            const toastmonth = Toast.loading({
                duration: 0,
                message: '加载中...',
                forbidClick: true,
            })
            setInterval(() => {
                if (this.flag) {
                    toastmonth.clear()
                }
            }, 1000)
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
                    this.toast++;
                    this.flag = true
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
                    this.toast++;
                    this.flag=true
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
