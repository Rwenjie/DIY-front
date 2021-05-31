<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/20
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/20
 -->

<template>
    <div id="order-address">
        <div class="confirm-box">
            <div style="padding-top: 20px; width: 100%">
                <!--这是一个路由跳转-->
                <h4 style="width: 90%; float: left">确认收货地址</h4>
                <div style="float: right; width: 10%">
                    <span>管理收货地址</span>
                </div>
            </div><br>

            <v-divider/>
            <ul style="list-style-type: none;">
                <li class="addr-li" style="height: 40px" v-for="(addr, index) in addresses" :key="addr.id">
                    <div style="display: flex; height: 40px;"
                         class="addr-item"
                         v-bind:class="selected[index]? 'addr-selected' : addr.defaultAddr==1? 'addr-default' : '' ">

                        <span class="addr-span" style="display:block; width: 80px; padding-left: 20px">
                            <span v-if="selected[index]">寄送至</span>
                        </span>
                        <span style="display:block; width: 40px; height: 40px; margin-bottom: 5px">
                            <div style="padding-top: 8px">
                                <v-checkbox
                                        style="width: 100%; height: 20px; margin: auto 0; padding: 0"
                                        v-model="selected[index]"
                                        @click="selectAddr(addr.id, index)"
                                ></v-checkbox>
                            </div>
                        </span>
                        <span v-for="add in addr.addrList" class="addr-span" style="">
                            {{add.label}}
                        </span>
                        <span class="addr-span">{{addr.address}}</span>
                        <span class="addr-span">({{addr.nickName}} 收)</span>
                        <span class="addr-span">{{addr.tel}}</span>
                        <span class="addr-span">
                            <span v-if="addr.defaultAddr==1">
                                默认地址
                            </span>
                        </span>
                        <span class="addr-span" style="font-size: 12px;margin-left: 20px">

                        </span>
                    </div>
                </li>
                <li>
                    <div style="padding-left: 80px">
                        <el-button size="small" @click="aadDialogVisible=true">使用新地址</el-button>
                    </div>
                </li>
            </ul>
            <v-divider/>
        </div>
        <el-dialog
                title="创建地址"
                :visible.sync="aadDialogVisible"
                width="50%">
            <new-address></new-address>
        </el-dialog>
    </div>
</template>

<script>

    import {mapState, mapGetters } from 'vuex';
    import NewAddress from "components/common/address/NewAddress";

    export default {
        name: "OrderAddress",
        components: {
            NewAddress
        },
        data() {
            return {
                selected: [],
                aadDialogVisible: false,
            }
        },
        computed: {
          ...mapGetters({
              addresses: "addresses",
              defaultAddr: "defaultAddr",
          })
        },

        methods:{
            selectAddr(aid, index) {
                for (let i=0; i<this.selected.length; i++) {
                    if (i === index) {
                        continue;
                    }
                    else {
                        this.selected[i] = false;
                    }
                }
                this.$emit("SelectAddr", this.addresses[index])
            }

        },
        beforeMount() {
            this.$store.dispatch("loadAddress").then( res => {
                let i = 0;
                for (let i=0; i<this.addresses.length; i++) {
                    if (this.addresses[i].defaultAddr == "1") {
                        this.selected[i] = true;
                    }else {
                        this.selected[i] = false;
                    }
                }
            });
        },
        mounted() {
            for (let i=0; i<this.addresses.length; i++) {
                if (this.addresses[i].defaultAddr == "1") {
                    this.selected[i] = true;
                }else {
                    this.selected[i] = false;
                }
            }
        },

    }
</script>

<style scoped>

    .confirm-box{
        width: 85%;
        margin: 0 auto;
       /* background-color: #00a0e9;*/
    }

    .addr-span {
        padding-right: 5px;
        margin: auto 0
    }
    .addr-li div:hover {
        background-color: #fff0e8;
    }
    .addr-selected {

        font-weight: bolder;
        border: #f40 solid 1px;
        background-color: #fff0e8;
        box-shadow: 5px 5px 0 #f3f3f3;
    }

</style>