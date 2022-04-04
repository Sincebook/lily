<template>
  <div>
    <van-nav-bar title="无人售货柜" right-plus fixed placeholder></van-nav-bar>
    <van-empty v-if="!allGoods.length" image="search" description="当前商品列表为空" />
    <div>
        <div v-for="goods in allGoods" :key="goods.cabinetdoor_num">
      <div>
         <div class="vantCard"  >
            <van-tag v-if="goods.cabinetdoor_num < 10" :tabindex="goods.cabinetdoor_num" class="index">{{ '0' + goods.cabinetdoor_num }}.</van-tag>
            <van-tag v-else :tabindex="goods.cabinetdoor_num" class="index">{{ goods.cabinetdoor_num }}.</van-tag>
            <van-cell center :title="goods.name" :icon="goods.img" size="large"  :label="'￥' + goods.price / 100" label-class="price" @click="details(goods.cabinetdoor_num)">
              <van-button type="danger" size="small" color="linear-gradient(to right, #ff6034, #ee0a24)"   @click="buyGoods(goods.cabinetdoor_num)">立即购买</van-button>
            </van-cell>
         </div>
         <div class="divide"></div>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>            
import { findInfoByCabinetDoor } from '../ajax/cabinetdoorAPI';
import { orders_Create } from '../ajax/ordersAPI';
import { testpay } from "../ajax/test";
import { final } from "../utils/wxpay";
import { Dialog, Toast } from 'vant';
export default {
  name: "NewBuy",
  data() {
    return {
      allGoods: "",
      details_status: true
    };
  },
  created() {
    this.easyBuyFindAll();
  },
  methods: {
    easyBuyFindAll(){
      // sessionStorage.getItem('cabinet_num')
      Toast.loading('加载中');
      findInfoByCabinetDoor({ cabinet_num : this.$route.query.cId}).then((res) => {
        if(res.code==0){
          this.allGoods = JSON.parse(JSON.stringify(res.data));
          console.log(res.data);
          Toast.clear();
        }
      });
    },
    buyGoods:function(_data) {
      this.details_status = false
      if(this.$route.query.uId){
        console.log(_data+"号柜门要开啦")
        orders_Create({
          wxuser_id: this.$route.query.uId,
          cabinet_num: this.$route.query.cId,
          cabinetdoor_num:_data,
          shopper_secret: this.$route.query.sps
        }).then((res) =>{
            if(res.code === '0'){
                let serial_num = res.data.serialNum;
                testpay({ serial_num }).then((res) => {
                  console.log(res);
                  let wx_package = res.data.package;
                  const { appId, timeStamp, nonceStr, paySign } = res.data;
                  final(
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
      // this.details_status = true
    },
    details(values) {
        const {cId, uId} = this.$route.query;
        if (this.details_status) {
            console.log(values);
            this.$router.push('/Item?cId='+cId +'&uId='+uId+ '&dId='+values);
        } else {
            this.details_status = true
        }
        
    }
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
  line-height: 80px;
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
  color: red;
}
.price{
  color: red;
  font-size: 14px;
}

.van-cell__left-icon {
    height: 55px;
    font-size: 55px;
    line-height: 55px;
}
.van-cell{
  padding: 0px;
  padding-right:14px ;
}
.divide{
  border-bottom: 2px solid #f6f7f8;
}
</style>