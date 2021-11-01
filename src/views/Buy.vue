<template>
  <div class="order">
    <van-nav-bar title="付款成功"></van-nav-bar>
    <div class="icon">
        <van-icon name="checked" />
        <van-cell title="购买成功"  style="color:#6fc773;font-size:30px;"/>
    </div>
    <div class="message">
        <span>请填写信息</span>
        <van-form >
        <van-field disabled v-model.trim="order.trace_num" name="trace_num" label="产品服务跟踪号" placeholder="1234356323423545657"/>
        <van-field v-model.trim="order.phone" type="tel" :rules="phoneRule" label="手机号" placeholder="请输入手机号" clearable required />
        <van-field v-model.trim="order.code" center clearable label="短信验证码" placeholder="请输入短信验证码" :rules="[{required:true}]" required>
            <template #button>
                <van-button @click="getCode" size="small" type="primary">{{info}}</van-button>
            </template>
        </van-field>
       </van-form>
    </div>
     <van-goods-action>
        <van-goods-action-button text="立即开柜" @click="openDoor" class="orderBg"/>
        </van-goods-action>
  </div>
</template>

<script>
import {
    Toast
} from 'vant';
import {
    order_Get,
    order_Code
} from '../ajax/ordersAPI'
export default {
    name: 'AdminLogin',
    data() {
        return {
            order: {
                phone:"17612536396",
                code:"2363",
                trace_num: "15236",
            },
            phoneRule: [{
                    required: true
                },
                {
                    pattern: /^1[3456789]\d{9}$/,
                    message: '手机号码格式错误！'
                }
            ],
            info: '发送验证码',
            isClick: true,
        };
    },
    created() {
        console.log(this.$route.query);
    },
    methods: {
        getCode() {
            console.log(this.order.phone);
            if (this.isClick) {
                order_Code({
                        phone: this.order.phone
                    }).then(res => {
                        console.log(res);
                        if (res.code === '0') {
                            this.isClick = false
                            let s = 60
                            this.info = s + 's'
                            let interval = setInterval(() => {
                                s--
                                this.info = s + 's'
                                if (s < 0) {
                                    this.info = '重新获取'
                                    this.isClick = true
                                    clearInterval(interval)
                                }
                            }, 1000)
                        } else {
                            Toast.fail(res.errMsg)
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        Toast.fail("发送失败，请重试！")
                        return err;
                    });
            }

        },
        openDoor(values){
             console.log('openDoor', values);
            order_Get({
                phone:"13849867433",
                code:"2363",
                trace_num: "15236",
            }).then(res => {
                if(res.code==='0'){
                    console.log(res.data+"**********************************");
                }
            })
        }
    },
}
</script>
<style scoped>
.order {
  border: 2rem;
}
.icon {
    margin: 0,auto;
    text-align: center;
}
.van-icon-checked:before {
    font-size: 60px;
}
.van-icon:before {
    display: block;
    margin: 0,auto;
    color: #6fc773;
}
.message {
    text-align: center;
    font-size: 18px;
    background-color: #fcfae3;
    margin-top: 10px;
}
.message > span {
    display: inline-block;
    padding: 5px;
}
.orderBg {
  color: white;
  background: red;
}
::v-deep .van-field__label {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    box-sizing: border-box;
    width: 8em;
    margin-right: 10px;
    color: #646566;
    text-align: left;
    line-height: 20px;
    height: 20px;
    word-wrap: break-word;
    font-size: 16px;
}
/* .van-cell {
    display: block;
    width: 100%;
    font-size: 20px;
    padding-top: 20px;
} */
::v-deep .van-field__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    padding: 0;
    color: #323233;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
    font-size: 16px;
}
</style>
