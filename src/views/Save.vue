<template>
  <div>
    <van-nav-bar title="储物柜" right-plus fixed placeholder></van-nav-bar>
    <van-empty v-if="!this.theItems" image="search" description="当前还未存储物品" />
    <div v-for="item in theItems" :key="item.cabinetdoorNum">
      <div>
         <div class="vantCard">
            <van-tag tabindex="" class="index">{{item.cabinetdoorNum}}.</van-tag>
            <van-cell center title="我的宝贝" icon="send-gift-o" icon-class="image" >
              <van-tag color="#85da47" size="large"  @click="drawOutThing(item.cabinetdoorNum)">取出</van-tag>
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
      save_findByUid({ wxuser_id: this.$route.query.uId,cabinet_num: this.$route.query.cId,}).then((res) => {
        console.log(res+"***********有数据吗");
        if(res.code==0){
          this.theItems = JSON.parse(JSON.stringify(res.data));
          console.log(this.theItems)
        }
      });
    },
    drawOutThing:function(data) {
      console.log(data);
      Dialog.confirm({
        title: "确定要取出吗？",
        message: "点击确认后"+data+"号柜门将自动打开",
      })
       .then(() => {
          saveGet({ wxuser_id: this.$route.query.uId,cabinet_num: this.$route.query.cId,cabinetdoor_num:data }).then(res=>{
            if(res.code==="0"){
              console.log(res.data)
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
              Toast.fail("柜子已满")
            }else{
               Dialog.alert({
                  title: "开柜成功",
                  theme: "round-button",
                  confirmButtonText: "确认",
                }).then(() => {});
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