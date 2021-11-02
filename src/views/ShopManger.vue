<template>
<div class="shopManager">
    <van-nav-bar title="商户管理" @click-right="addShopManger">
        <template #right>
            <van-icon name="add-o" size="18" />
            <!-- <van-button icon="plus" type="info" size="18" plain round /> -->
        </template>
    </van-nav-bar>

    <!-- <van-cell v-for="item in showData" :key="item.id" :title="item.name?item.name:'----'" :value="'站点：'+item.cabinetNum" :label="item.phone?item.phone:'--------'" :to="{path:'/ShopDetails',query:{shopper_id:item.id}}" /> -->
    <van-swipe-cell v-for="item in showData" :key="item.id">
        <van-cell :title="item.name?item.name:'----'" :value="'站点：'+item.cabinetNum" :label="item.phone?item.phone:'--------'" :to="{path:'/ShopDetails',query:{shopper_id:item.id}}" />
        <template #right>
            <van-button @click="deleteShopper(item.id)" square text="删除" type="danger" class="delete-button" />
        </template>
    </van-swipe-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }" @close="closePopup" :close-on-click-overlay="false" closeable>
        <van-nav-bar title="增加商户"></van-nav-bar>
        <van-form @submit="onSubmit">
            <van-field v-model.trim="myData.name" name="名称" label="用户名" placeholder="请填写商户名称" :rules="[{ required: true}]" clearable required />
            <van-field v-model.trim="myData.phone" type="tel" :rules="phoneRule" label="联系方式" placeholder="请输入手机号" clearable required />
            <van-field v-model.trim="myData.phone2" type="tel" label="备用1" placeholder="请输入备用1" :rules="phoneRule2" clearable />
            <van-field v-model.trim="myData.phone3" type="tel" label="备用2" placeholder="请输入备用2" :rules="phoneRule2" clearable />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">完成</van-button>
            </div>
        </van-form>
    </van-popup>
</div>
</template>

<script>
import {
    Toast,
    Dialog
} from 'vant'
import {
    findAllShopper,
    addShopper,
    deleteById
} from '../ajax/admin_shopperApi'
export default {
    name: 'ShopManger',
    data() {
        return {
            show: false,
            myData: {
                name: '',
                phone: '',
                phone2: '',
                phone3: ''
            },
            showData: {},
            phoneRule: [{
                    required: true,
                },
                {
                    pattern: /^1[3456789]\d{9}$/,
                    message: '手机号码格式错误！'
                }
            ],
            phoneRule2: [{
                validator: this.checkPhone,
                message: '手机号码格式错误！',
                trigger: "onBlur"
            }]
        }
    },
    created() {
        console.log(sessionStorage.getItem('admin'));
        if (sessionStorage.getItem('admin')) {
            findAllShopper({}).then(res => {
                    console.log(res);
                    if (res.code === '0') {
                        this.showData = res.data
                        console.log(this.showData);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return err;
                });
        } else {
            Dialog.alert({
                message: '请先登录后再操作！',
            }).then(() => {
                this.$router.push('/AdminLogin')
            });
        }
    },
    methods: {
        addShopManger() {
            this.show = true
        },
        closePopup() {
            this.myData = {
                name: '',
                phone: '',
                phone2: '',
                phone3: ''
            }
            this.show = false
        },
        onSubmit() {
            console.log(this.myData);
            console.log(this.myData.name, this.myData.phone, this.myData.phone2, this.myData.phone3);
            addShopper(this.myData).then(res => {
                    console.log(res);
                    if (res.code === '0') {
                        this.closePopup();
                        this.findAll(0);
                    } else {
                        this.closePopup();
                        Toast.fail({
                            message: res.errMsg,
                            position: 'bottom'
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return err;
                });
        },
        deleteShopper(id) {
            Dialog.confirm({
                message: '确定删除吗？',
            }).then(() => {
                console.log(id);
                deleteById({
                    id: id
                }).then(res => {
                    console.log(res);
                    if (res.code === '0') {
                        this.findAll(1)
                    }
                })
            });
        },
        findAll(flag) {
            findAllShopper({}).then(res => {
                    console.log(res);
                    if (res.code === '0') {
                        this.showData = res.data
                        console.log(this.showData);
                        if (flag === 0) {
                            Toast.success({
                                message: '插入成功'
                            })
                        } else if (flag === 1) {
                            Toast.success({
                                message: '删除成功'
                            })
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return err;
                });
        },
        checkPhone(value, rule) {
            const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
            console.log(rule, value);
            if (!value) {
                return true;
            } else if (!reg.test(value)) {
                return false;
            } else {
                return true;
            }
        }
    },
}
</script>

<style scoped>
.delete-button {
    height: 100%;
}
</style>
