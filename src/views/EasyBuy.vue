<template>
  <div>
    <van-nav-bar title="无人售货柜" right-plus fixed placeholder></van-nav-bar>
    <van-empty v-if="!this.allGoods" image="search" description="当前商品列表为空" />
    <div v-for="goods in allGoods" :key="goods.cabinetdoor_num">
      <div>
         <div class="vantCard">
            <van-tag :tabindex="goods.cabinetdoor_num" class="index">{{goods.cabinetdoor_num}}.</van-tag>
            <van-cell center :title="goods.name" :icon="goods.img" :label="'￥' + goods.price / 100" label-class="price">
              <van-tag color="red" @click="buyGoods(goods.cabinetdoor_num)">立即购买</van-tag>
            </van-cell>
         </div>
         <div class="divide"></div>
      </div>
    </div>
  </div>
</template>

<script>            
import { findInfoByCabinetDoor } from '../ajax/cabinetdoorAPI';
import { orders_Create } from '../ajax/ordersAPI';
import { testpay } from "../ajax/test";
import { final1 } from "../utils/wxpay";
import { Dialog, Toast } from 'vant';
export default {
  name: "EasyBuy",
  data() {
    return {
      allGoods: "",
    };
  },
  created() {
    this.easyBuyFindAll();
  },
  methods: {
    easyBuyFindAll(){
      // sessionStorage.getItem('cabinet_num')
      findInfoByCabinetDoor({ cabinet_num : 766186421}).then((res) => {
        console.log(res+"***********有数据吗");
        if(res.code==0){
          this.allGoods = JSON.parse(JSON.stringify(res.data));
          console.log(res.data)
        }
      });
    },
    buyGoods:function(_data) {
      if(this.$route.query.uId){
        console.log(_data+"号柜门要开啦")
        orders_Create({
          wxuser_id: this.$route.query.uId,
          cabinet_num: this.$route.query.cId,
          cabinetdoor_num:_data
        }).then((res) =>{
            if(res.code === '0'){
                let serial_num = res.data.serialNum;
                testpay({ serial_num }).then((res) => {
                  console.log(res);
                  let wx_package = res.data.package;
                  const { appId, timeStamp, nonceStr, paySign } = res.data;
                  final1(
                    appId,
                    timeStamp,
                    nonceStr,
                    wx_package,
                    paySign,
                    serial_num
                  );
              });
            }else{
              Dialog.alert({
                title: res.errMsg,
                message: "请选择其他商品进行购买，如有问题请联系管理员",
              }).then(() => {});
            }
          })
      }else{
        Toast.fail("购买失败")
      }
    },
  },
  
};
</script>

<style scoped>
.cardItem{
  display: inline-block;
}
.index{
  float: center;
  vertical-align: middle;
  line-height: 60px;
  background-color: rgb(255, 255, 255);
  color: rgb(26, 26, 26);
  font-size: 16px;
  
}
.vantCard{
  padding-left: 4px;
  display: flex;
  width: 100%;
  /* background-color: lightcoral; */
}
.nowBuy{
  display: inline;
  float: right;
  color: red

}
.price{
  color: red;
  font-size: 14px;
}

.van-cell__left-icon {
    height: 40px;
    font-size: 40px;
    line-height: 40px;
}
.van-cell{
  padding: 0px;
  padding-right:16px ;
}
.divide{
  border-bottom: 1px solid #f6f7f8;
}
</style>