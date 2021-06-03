<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/6/3
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/6/3
 -->

<template>
    <div id="address">
        <div style="">
            <v-divider/>
            <div style="width: 60%; margin-left: 20px">
                <new-address></new-address>
            </div>
            <div v-if="addrLength>0">
                <v-simple-table style="width: 60%; text-align: left;  margin-left: 20px">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">
                                我的收货地址
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(addr, id) in addresses"
                                :key="id">
                            <td>
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
                            </td>
                            <td>
                                <v-checkbox
                                        v-model="addr.defaultAddr"
                                        label=""
                                ></v-checkbox>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
              <!--  <ul style="list-style-type: none;">
                    <li class="addr-li" style="height: 40px" v-for="(addr, index) in addresses" :key="addr.id">
                        <div style="display: flex; height: 40px;"
                             class="addr-item"
                             v-bind:class="selected[index]? 'addr-selected' : addr.defaultAddr==1? 'addr-default' : '' ">

                        <span class="addr-span" style="display:block; width: 80px; padding-left: 20px">
                            <span v-if="selected[index]">寄送至</span>
                        </span>
                            <span style="display:block; width: 40px; height: 40px; margin-bottom: 5px">
                            <div style="padding-top: 8px">

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
                </ul>-->
            </div>
            <p class="emptyTips" v-else>还没没有添加收货地址，现在去添加吧(*^▽^*)~ </p>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import NewAddress from "components/common/address/NewAddress";

    export default {
        name: "Address",
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
                addrLength: "addrLength",
            })
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
    }
</script>

<style scoped>

    .confirm-box{
        width: 85%;
        margin: 0 auto;
        /* background-color: #00a0e9;*/
    }
    .emptyTips{
        width: 500px;
        text-align: center;
        display: block;
        margin: 30px auto;
        color:@thirdColor;
        font-size: 20px;
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