<template>
  <div>
    <van-nav-bar title="储物柜" right-plus fixed placeholder></van-nav-bar>
    <van-empty v-if="!this.theItems" image="search" description="当前商品列表为空" />
    <div v-for="item in theItems" :key="item.cabinetdoorNum">
      <div>
         <div class="vantCard">
            <van-tag tabindex="" class="index">{{item.cabinetdoorNum}}.</van-tag>
            <van-cell center title="货物" icon="send-gift-o" icon-class="image" >
              <van-tag color="#c89f60" size="large" @click="drawOutThing(item.cabinetdoor_num)">取出</van-tag>
            </van-cell>
         </div>
      </div>
    </div>
       
      
       <div class="save">
           <van-button type="danger" block round  class="toSave" @click="addStorage">
        立即存储
        </van-button>
       </div>
  </div>
</template>

<script>
import { save_findByUid,saveAdd,saveGet } from "../ajax/cabinetAPI";
import { Dialog, Toast } from 'vant';
export default {
  name: "EasyBuy",
  data() {
    return {
      theItems:"",
    };
  },
  created() {
     console.log(this.$route.query);
    // sessionStorage.getItem('cabinet_num')
    this.saveFindAll();
  },
  methods: {
    saveFindAll(){
      save_findByUid({wxuser_id : sessionStorage.getItem('wxuser_id'), cabinet_num : sessionStorage.getItem('cabinet_num')}).then((res) => {
        console.log(res+"***********有数据吗");
        if(res.code==0){
          this.theItems = JSON.parse(JSON.stringify(res.data));
          console.log(this.theItems)
        }
      });
    },
    drawOutThing(_data) {
      console.log(_data);
      Dialog.confirm({
        title: "确定要取出吗？",
        message: "取出后请关上柜门",
      })
       .then(() => {
          saveGet({wxuser_id : sessionStorage.getItem('wxuser_id'), cabinet_num : sessionStorage.getItem('cabinet_num'),cabinetdoor_num:_data }).then(res=>{
            if(res.code==="0"){
              console.log(res.data)
              Toast.success(res.data.cabinetdoorNum+"号柜门已打开，请将物品取出关上柜门")
              this.saveFindAll();
            }
          })
        })
        .catch(() => {
          // on cancel
        });
    },    
    addStorage(values){
       console.log("addStorage", values);
        saveAdd({wxuser_id :41, cabinet_num :766186421 }).then((res)=>{
          console.log("要存储了吗");
            if(res.data==="全柜已满"){  
              Toast.fail("柜子已满！")
            }else{
              Toast.success(res.data+"号柜门已打开，请将物品放好关上柜门")
              this.saveFindAll();
            }
        })
    },
                 
 }
};
</script>

<style scoped>
.cardItem{
  display: inline-block;
}
.index{
  float: center;
  vertical-align: middle;
  line-height: 66px;
  background-color: rgb(255, 255, 255);
  color: rgb(26, 26, 26);
  font-size: 18px;
  
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
    height: 60px;
    font-size: 60px;
    line-height: 60px;
  
}
.van-cell{
  padding-left:0px ;
}
.save{
    margin-top: 50px;
    width: 100%;
    background-color: #fff;
    height: 42px;
    
}
.toSave{
    margin: 0 auto;
    width: 60%;
    
    
}
</style>