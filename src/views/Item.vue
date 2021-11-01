<template>
    <div class="good">
        <van-swipe :autoplay="3000" class="swiper">
            <van-swipe-item v-for="(image, index) in good.images" :key="index" >
                <img :src="image" class="detailIamge" @click="Preview_img(images,index)"/>
            </van-swipe-item>
        </van-swipe>
        <van-card
            :price="good.price"
            :title='good.name'
            />
        <van-divider dashed contentPosition="center" borderColor="#1989fa" customStyle="color: #1989fa; border-color: #1989fa; font-size: 18px;">
            ----------------------------------商品介绍----------------------------------
        </van-divider>
        <van-cell-group>
            <van-cell title="" v-model="good.detail" />
            <van-divider dashed contentPosition="center" borderColor="#1989fa" customStyle="color: #1989fa; border-color: #1989fa; font-size: 18px;">
            --------------------------------------结束--------------------------------------
        </van-divider>
            

            
        </van-cell-group>
        <van-goods-action>
        <van-goods-action-button text="立即购买" @click="createOrder" class="buyBg"/>
        </van-goods-action>
    </div>
</template>
<script>
import Vue from 'vue';
import {Button,ImagePreview,Divider} from 'vant';
import { 
    cabinetdoor_look
} from '../ajax/cabinetdoorAPI';
import { 
    orders_Create
} from '../ajax/ordersAPI';
import 'vant/lib/index.css';
Vue.use(Button);
Vue.use(ImagePreview);
Vue.use(Divider);
export default {
    name: "goodDetail",
    props: ['goodId'],
    data() {
        return {
            cabinet_num:'593506563',
            cabinetdoor_num:'3',
            good:[{
                id:0,
                shopper_id:0,
                name:'',
                price:'',
                detail:'',
                images: [
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg'
                ],
            }],
            show: false,
            showQrCode: false,
            items: [...Array(20).keys()],
        }
    },
    //生命周期钩子函数，就是一个vue实例被生成后调用这个函数
    created() {
        // const that = this;
        // console.log(that.$route.query+'_____________________'+that.$route.query.cabinet_num+'@@@@@@@@@'+this.$route.query.cabinetdoor_num);
        // const cabinet_num= '1012';
        // const cabinetdoor_num= '1';
        cabinetdoor_look({
            cabinet_num:"593506564",
            cabinetdoor_num:"12"
        }).then(json => {
            console.log(json.data+"************************");
            if(json.code === '0'){
                this.good = json.data;
                console.log(this.good.name+'%%%%%%%%%%%');

            }
        }).catch((err)=>{
            console.log(err+'==================');
            return err;
        })
    },
    methods: {
        // 轮播图预览
        Preview_img(images, index) {
            ImagePreview({
                    images: images,//图片数组
                    showIndex: true,
                    loop: false,
                    startPosition: index
                })    
        },
        createOrder(){
            orders_Create ({
                cabinet_num:"593506564",
                cabinetdoor_num:"12"
            }).then( res=> {
                if(res.code === '0'){
                    console.log(res.data+"生成订单成功");
                } else {
                    console.log(res+"生成订单失败");
                }
            })
        }
    }
}
</script>
<style scoped>

.swiper {
    height:20rem;
    width: 100%;
}
.detailIamge {
    width: 100%;
    height: 100%;
}
.buyBg {
    background-color: red;
    color: rgb(255, 255, 255);
}
.van-card__price {
    position:absolute;
    display: inline-block;
    color: #f35f0a;
    right: 2rem;
    top: 1rem;
    font-size: 35px;    
}
.van-card__title {
    max-height: 43px;
    font-weight: 1000;
    line-height: 43px;
    font-size: 35px;
}
.van-card__price-integer {
    font-size: 35px;
    font-family: Avenir-Heavy,PingFang SC,Helvetica Neue,Arial,sans-serif;
}
.van-card__content{
    min-height: 43px;
}
.van-divider {
    line-height: 2px;
}
</style>