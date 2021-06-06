<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/18
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/18
 -->

<template>
    <div id="order-list">
        <div class="" style="text-align: left; font-size: 12px">
            <div class="sel-all" style="padding-left: 20px">

            </div>

            <div style="margin: 15px 0;">

            </div>
            <v-simple-table v-for="(item, id) in orderList" :key="id"
                    style="margin-bottom: 20px"
                            :light="false"
                    >
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left" colspan="2" style="padding: 0">
                            <div class="item-head" style="background-color: #eaf8ff; height: 50px">
                                <div style="text-align: left;">
                                    <span style="width: 150px; float: left; margin-top: 15px; margin-left: 15px; font-weight: bolder" >{{item.order.createdTime}}</span>
                                    <span style="width: 200px; float: left; margin-top: 15px; ">订单号：{{item.order.id}}</span>

                                </div>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody >
                    <tr >
                        <td style="border: none; padding: 0; width: 900px">
                            <div class="item-body-left" :key="id" >
                                <div v-for="(detail, id) in item.orderDetailList" style="display: flex;
                                                                                        flex-direction: row;
                                                                                        float: left;
                                                                                        border-bottom: #daf3ff solid 1px;">
                                    <div class="item-info item" style="border-left: white">
                                        <div style="width: 80px; height: 80px; float: left">
                                            <el-image
                                                    style="width: 100%; height:100%"
                                                    :src="detail.goods.images[0]"
                                                    fit="cover"></el-image>
                                        </div>
                                        <div class="info-text" style="">
                                            <p @click="">{{detail.goods.title}}</p>
                                        </div>
                                    </div>
                                    <div class="item-spec item">
                                        <span v-for="(spec, id) in detail.ownSpec" :key="id">
                                            {{spec.label}}:{{spec.value}}
                                        </span>
                                    </div>
                                    <div class="item-price item">
                                        <span>￥{{detail.sku.price}}</span>
                                    </div>
                                    <div class="item-count item">
                                        <span>{{detail.count}}</span>
                                    </div>
                                    <div class="item-amount item">
                                        <span> ￥{{detail.count * detail.sku.price}}</span>
                                    </div>
                                </div>

                            </div>
                        </td>
                        <td style="border: none;  padding: 0;">
                            <div class="item-body-right" style="">
                                <div class="item-state">
                                    <div v-if="item.order.orderStatus==1">未付款</div>
                                    <div v-if="item.order.orderStatus==2">已付款</div>
                                    <div v-if="item.order.orderStatus==3">已发货</div>
                                    <div v-if="item.order.orderStatus==4">已签收</div>
                                </div>
                                <div class="item-deal">
                                    <div v-if="item.order.orderStatus==1">


                                    </div>
                                    <div v-if="item.order.orderStatus==2" >
                                        <el-button type="text" @click="updateLogistics(item.order.id)">
                                            填写物流信息
                                        </el-button>
                                    </div>
                                    <div v-if="item.order.orderStatus==3">
                                        <el-popover
                                                placement="left-start"
                                                title="物流信息"
                                                width="500"
                                                trigger="hover"
                                                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                                            <div>
                                                <express :order="item.order"></express>
                                            </div>
                                            <el-button type="text" slot="reference">查看物流</el-button>
                                        </el-popover>
                                    </div>
                                    <div v-if="item.order.orderStatus==4">发表评论</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr >
                        <td></td>
                        <td>
                            <div style="text-align: right">
                                <span style="font-weight: bold">
                                    合计:￥{{item.order.productAmountTotal}}
                                </span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
        <el-dialog
                title="确认发货"
                :visible.sync="ogisticsVisible"
                style="text-align: left;"
                :before-close="beforeClose"
                width="40%">
            <div>
                <div style="margin-top: 15px; text-align: left">
                    <span style="margin-bottom: 10px; margin-left: 10px">发货地址: </span>
                    <area-select v-model="confirm.fromAddr"
                                 :data="$pcaa"
                                 :value="confirm.fromAddr"
                                 style="height: 45px"
                                 :level="2"></area-select>
                </div>
                <div>
                    <el-select v-model="confirm.eid" filterable placeholder="请快递公司" style="margin-left: 10px">
                        <el-option
                                v-for="item in expressComList"
                                :key="item.id"
                                :label="item.expressName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>


                <div style="margin-top: 20px; margin-left: 10px">
                    <el-input v-model="confirm.num" placeholder="请输入快递单号"></el-input>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="ogisticsVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmDelivery()">确认发货</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>

    import {loadExpressCom} from "../../../network/common";
    import {updateDeliveryGoods} from "../../../network/order";
    import { Message } from 'element-ui';
    import Express from "../../../components/common/express/Express";

    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: "OrderList",
        components: {
            Express
        },
        props: {
            orderList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                confirm: {
                    eid: "",
                    num: "",
                    fromAddr: "",
                },
                checkAll: false,
                selected: true,
                time: "2021-05-18",
                orderId: "1804557530014091415",
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                visibleOid: '',
                isIndeterminate: true,
                ogisticsVisible: false,
                expressComList: [],
            };
        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            updateLogistics(oid) {
                this.ogisticsVisible = true;
                this.visableOid = oid;
            },
            beforeClose() {
                this.visableOid = '';
            },
            confirmDelivery() {
                console.log(this.confirm);
                const express = this.expressComList.find( (item) => item.id == this.confirm.eid);
                console.log(express);
                updateDeliveryGoods({
                    oid: this.visableOid,
                    eid: this.confirm.eid,
                    num: this.confirm.num,
                    addressFrom: this.confirm.fromAddr[1]
                }).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        Message.success("发货成功！");
                        this.timer = setTimeout(()=>{   //设置延迟执行
                           location.reload();
                        },1000);
                    }
                });
            }
        },
        mounted() {
            loadExpressCom().then( res => {
                this.expressComList = res.data;
            })
        }
    }
</script>

<style scoped>

    .item-body-left {
        display: flex;
        flex-direction: column;
        border-left: #daf3ff solid 1px;
        border-right: #daf3ff solid 1px;
        border-top: #daf3ff solid 1px;
        text-align: center;
        float: left;
    }
    .item-body-right {
        display: flex;
        flex-direction: row;
        border-bottom: #daf3ff solid 1px;
        text-align: center;
        height: 100%;
    }
    .item-info {
        width: 240px;
        text-align: center;
        margin-left: 15px;
    }
    .info-text {
        margin-left: 90px;
        text-align: left;
        width: auto;
    }

    .info-text p {
        font-size: 12px;
        cursor: pointer;
        margin: 8px 5px 8px 0;
        line-height: 20px;
    }
    .item-spec {
        text-align: left;
        width: 240px;
        padding-left: 50px;
    }

    .info-text span {
        margin-top: 0;
        color: #aeaeae;
    }
    .goodsName p:hover{
        text-decoration:underline;
    }
    .item-price {
        width: 124px;
    }
    .item-count {
        width: 124px;
    }
    .item-amount {
        width: 124px;
        float: right;
    }
    .item-state {
        border-right: #daf3ff solid 1px;
        width: 45%;
        padding-top: 15%;

    }
    .item-deal {
        border-right: #daf3ff solid 1px;
        width: 55%;
        padding-top: 10%;
    }
    .item {
        border-left: #daf3ff solid 1px;
        padding-top: 10px;
        padding-bottom: 10px

    }

    span{
        color:@fontDefaultColor;
        display: block;
        margin-top: 10px;
    }

</style>