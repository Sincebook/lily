<template>
  <div>
    <van-nav-bar title="订单管理" fixed placeholder>
      <template #right>
        <van-icon name="add-o" size="18" @click="addTrace()" />
      </template>
    </van-nav-bar>
    <van-search
      v-model="soso"
      placeholder="请输入产品跟踪服务号"
      @input="search"
    />
    <van-empty v-if="this.orders.length<1" image="search" description="当前订单为空" />
    <div v-for="order in orders" :key="order.id">
      <van-cell-group>
        <van-cell
          :title="order.name"
          :value="'订单金额:￥' + order.price / 100"
          @cell-value-color="rgb(0, 100, 120)"
        />
        <van-cell
          :title="'跟踪服务号:' + order.traceNum"
          :value="
            order.status == 2
              ? '已完成'
              : order.status == 1
              ? '已支付'
              : '未完成'
          "
          :label="'购买时间：' + formatDate(Number(order.uptime)) + ''"
        />
      </van-cell-group>
      <br />
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }"
      > <van-nav-bar title="添加产品跟踪号"/>
      
      <van-form>
        <van-field
          v-model="name"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="trace_num"
          type="number"
          name="跟踪号"
          label="跟踪号"
          placeholder="跟踪号"
          :rules="[{ required: true, message: '请填写跟踪号' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit" @click="traceAdd"
            >提交</van-button
          >
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { orders_Find } from "../ajax/ordersAPI";
import { trace_add } from "../ajax/traceApi";
import { Toast } from 'vant';
import dayjs from "dayjs";
export default {
  name: "ListManger",
  data() {
    return {
      soso: "",
      shopper_id: "3",
      orders: "",
      theOrders: "",
      sosoSize: 0,
      show: false,
      trace_num:"jklil",
      name:''
    };
  },
  created() {
    orders_Find({ shopper_id: sessionStorage.getItem('shopper_id') }).then((res) => {
      this.orders = res.data;
      this.theOrders = JSON.parse(JSON.stringify(res.data));
    });
  },
  methods: {
    formatDate(_data) {
      return dayjs(_data).format("YYYY-MM-DD HH:mm:ss");
    },
    search() {
      if (this.soso.length > this.sosoSize) this.sosoSize++;
      if (this.soso.length == this.sosoSize) {
        this.sosoSize--;
        this.orders = JSON.parse(JSON.stringify(this.theOrders));
      }
      console.log(this.orders[0].traceNum === this.soso);
      // this.items = this.items.filter(item=>item.id!==_data);
      this.orders = this.orders.filter(
        (order) => order.traceNum
      );
    },
    addTrace() {
      this.show = true;
    },
    traceAdd() {
      trace_add({name:this.name,trace_num:this.trace_num,shopper_id:sessionStorage.getItem('shopper_id')}).then(res => {
        if (res.code === '0') {
          this.show = false;
          this.name = '';
          this.trace_num = '';
          Toast.success('添加成功');
        }
      })
    }
  },
};
</script> 

<style>
</style>