<template>
<div class="adminLogin">
    <van-nav-bar title="管理员登录"></van-nav-bar>
    <van-form @submit="onSubmit">
        <van-field v-model.trim="loginForm.tel" type="tel" :rules="phoneRule" label="手机号" placeholder="请输入手机号" clearable required />
        <van-field v-model.trim="loginForm.sms" center clearable label="短信验证码" placeholder="请输入短信验证码" :rules="[{required:true}]" required>
            <template #button>
                <van-button @click="getCode" size="small" type="primary">{{info}}</van-button>
            </template>
        </van-field>
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
    </van-form>
</div>
</template>

<script>
import {
    Toast
} from 'vant';
import {
    code,
    login
} from '../ajax/adminApi'
export default {
    name: 'AdminLogin',
    data() {
        return {
            loginForm: {
                tel: '',
                sms: ''
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
    // created() {
    //     console.log(this.$route.query);
    // },
    methods: {
        getCode() {
            console.log(this.loginForm.tel);
            if (this.isClick) {
                code({
                        phone: this.loginForm.tel
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
        onSubmit(values) {
            console.log('submit', values);
            login({
                phone: this.loginForm.tel,
                code: this.loginForm.sms
            }).then(res => {
                console.log(res);
                if (res.code === '0') {
                    sessionStorage.setItem('admin', this.loginForm.tel);
                    this.$router.push('/ShopManger')
                } else {
                    Toast.fail(res.errMsg)
                }
            })
        },
    },
}
</script>

<style scoped>
</style>
