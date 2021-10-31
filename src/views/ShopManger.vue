<template>
<div class="shopManager">
    <van-nav-bar title="商户管理" @click-right="addShopManger">
        <template #right>
            <van-icon name="add-o" size="18" />
            <!-- <van-button icon="plus" type="info" size="18" plain round /> -->
        </template>
    </van-nav-bar>

    <van-cell v-for="item in showData" :key="item.id" :title="item.name?item.name:'----'" :value="'站点：'+item.cabinetNum" :label="item.phone?item.phone:'--------'" :to="{path:'/ShopDetails',query:{shopper_id:item.id}}" />

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
    Toast
} from 'vant'
import {
    findAllShopper,
    addShopper,
    // findByShopperId
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
        findAllShopper({}).then(res => {
                console.log(res);
                if (res.code === '0') {
                    this.showData = res.data
                    console.log(this.showData);
                    // for (const item in this.showData) {
                    //     console.log(item, '.............');
                    //     findByShopperId({
                    //             shopper_id: item
                    //         }).then(res1 => {
                    //             console.log(res1);
                    //             if (res1.code === '0') {
                    //                 console.log('111', res1.data.length);
                    //                 // this.showData[item]['length']=res1.data.length
                    //                 this.$set(this.showData[item], 'length', res1.data.length)
                    //                 console.log(this.showData);
                    //             } else {
                    //                 // this.showData[item]['length']=0
                    //                 this.$set(this.showData[item], 'length', 0)
                    //             }
                    //         })
                    //         .catch((err) => {
                    //             console.log(err);
                    //             return err;
                    //         });
                    // }
                }
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
        // findByShopperId({
        //         shopper_id: 1
        //     }).then(res => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         return err;
        //     });

    },
    methods: {
        addShopManger() {
            this.show = true
        },
        closePopup() {
            console.log('close....');
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
                        // findAllShopper({}).then(res => {
                        //         console.log(res);
                        //         if (res.code === '0') {
                        //             this.showData = res.data
                        //             console.log(this.showData);
                        //         }
                        //     })
                        //     .catch((err) => {
                        //         console.log(err);
                        //         return err;
                        //     });

                        findAllShopper({}).then(res => {
                                console.log(res);
                                if (res.code === '0') {
                                    this.showData = res.data
                                    console.log(this.showData);
                                    // for (const item in this.showData) {
                                    //     console.log(item, '.............');
                                    //     findByShopperId({
                                    //             shopper_id: item
                                    //         }).then(res1 => {
                                    //             console.log(res1);
                                    //             if (res1.code === '0') {
                                    //                 console.log('111', res1.data.length);
                                    //                 // this.showData[item]['length']=res1.data.length
                                    //                 this.$set(this.showData[item], 'length', res1.data.length)
                                    //                 console.log(this.showData);
                                    //             } else {
                                    //                 // this.showData[item]['length']=0
                                    //                 this.$set(this.showData[item], 'length', 0)
                                    //             }
                                    //         })
                                    //         .catch((err) => {
                                    //             console.log(err);
                                    //             return err;
                                    //         });
                                    // }
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                return err;
                            });
                        this.closePopup();
                        Toast.success({
                            message: '插入成功'
                        })
                        this.myData = {
                            name: '',
                            phone: '',
                            phone2: '',
                            phone3: ''
                        }
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

<style>

</style>
