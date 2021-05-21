<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/21
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/21
 -->

<template>
    <div id="new-address">
        <div style="text-align: center">
            <el-form ref="addrForm" :model="addrForm" label-width="100px">
                <el-form-item label="地址信息">
                        <div style="margin-top: 15px; height: 50px">
                            <area-select v-model="toAddr"
                                         :data="$pcaa"
                                         :value="toAddr"
                                         :level="2"></area-select>
                        </div>

                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="addrForm.address"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码">
                    <el-input v-model="addrForm.number"></el-input>
                </el-form-item>
                <el-form-item label="收货人姓名">
                    <el-input v-model="addrForm.nickName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="addrForm.tel"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="text-align: left">
                        <el-checkbox v-model="defaultChecked">设置为默认收货地址</el-checkbox>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewAddress",
        data() {
            return {
                defaultChecked: false,
                toAddr: "",
                addrForm: {
                    nickName: "",
                    tel: "",
                    prov: "",
                    city: "",
                    area: "",
                    address: "",
                    number: "",
                    defaultAddr: 0,
                }
            }
        },
        methods: {
            onSubmit() {
                this.addrForm.prov = this.toAddr[0];
                this.addrForm.city = this.toAddr[1];
                this.addrForm.area = this.toAddr[2];
                if (this.defaultChecked) {
                    this.addrForm.defaultAddr = 1;
                } else {
                    this.addrForm.defaultAddr = 0;
                }
                this.$store.dispatch("addAddress", this.addrForm);
            }
        }
    }
</script>

<style scoped>

</style>