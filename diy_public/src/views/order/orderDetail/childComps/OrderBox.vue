<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/30
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/30
 -->

<template>
    <div id="order-box">
        <div class="item-box">
            <div style="padding-top: 20px;
                        width: 100%;
                        text-align: left;
                        margin-bottom: 15px">
                <!--这是一个路由跳转-->
                <h4 style="width: 90%; float: left">确认订单信息</h4>
            </div>
            <br>
            <!--<div class="item-head" style="background-color: #eaf8ff; height: 50px">
                <div style="text-align: left">
                    <span style="width: auto">{{item.order.createdTime}}</span>
                </div>
            </div>
            <div class="item-body" v-for="(detail, id) in item.orderDetailList" :key="id">
                <div class="item-info item" style="border-left: white">
                    <div style="width: 80px; height: 80px; float: left">
                        <el-image
                                style="width: 100%; height:100%"
                                :src="detail.goods.images[0]"
                                fit="cover"></el-image>
                    </div>
                    <div class="info-text" style="">
                        <p @click="">{{detail.goods.title}}</p>
                        <span>{{detail.sku.ownSpec}}</span>
                    </div>
                </div>
                <div class="item-price item">
                    <span>{{detail.sku.price}}</span>
                </div>
                <div class="item-count item">
                    <span>2</span>
                </div>
                <div class="item-option item">
                    <div>退货/退款</div>
                    <div>投诉卖家</div>
                </div>
                <div class="item-pay item">
                    <span>￥21.04</span>
                </div>
                <div class="item-state item">

                </div>
                <div class="item-deal item">交易操作</div>
            </div>-->
            <div>
                <thead>
                <tr>
                    <th class="text-center" width="300px">商品</th>
                    <th class="text-center" width="300px">商品属性</th>
                    <th class="text-center" width="180px">单价</th>
                    <th class="text-center" width="170px">数量</th>
                    <th class="text-center" width="200px">小计</th>
                </tr>
                <v-divider/>
                </thead>

                <div class="item-box">
                    <div class="item-head" style="background-color: #eaf8ff; height: 50px">
                        <div style="text-align: left;">
                            <span style="width: 200px; float: left; margin-top: 15px; margin-left: 10px">订单号：{{item.order.id}}</span>
                            <span style="width: 400px; float: left; margin-top: 15px">{{item.order.createdTime}}</span>
                        </div>
                    </div>
                    <div class="item-body" style="background-color: #fbfcff" v-for="(detail, id) in item.orderDetailList" :key="id">
                        <div class="item-info item" style="border-left: white">
                            <div style="width: 80px; height: 80px; float: left">
                                <el-image
                                        style="width: 100%; height:100%"
                                        :src="detail.goods.images[0]"
                                        fit="cover"></el-image>
                            </div>
                            <div class="info-text" style="">
                                <p @click="">{{detail.goods.title}}</p>
                                <span></span>
                            </div>
                        </div>
                        <div class="item-spec item">
                            <span v-for="(spec, id) in detail.ownSpec" :key="id">
                                {{spec.label}}:{{spec.value}}
                            </span>
                        </div>
                        <div class="item-price item">
                            <span>{{detail.sku.price}}</span>
                        </div>
                        <div class="item-count item">
                            <span>{{detail.count}}</span>
                        </div>
                        <div class="item-pay item">
                            <span>￥{{detail.count* detail.sku.price}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderBox",
        props: {
            item: {
                type: Object,
                default() {
                    return null
                }
            }
        },
        data() {
            return {

            }
        },
        methods: {

        },
        watch: {
            item: {
                deep: true,
                handler() {
                    console.log(this.item);
                }
            }
        }

    }
</script>

<style scoped>

    #order-box {
        width: 85%;
        margin: 0 auto;
    }
    .text-center{
        border-bottom:2px solid #b2d1ff;;
    }
    .item-body {
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
        border: #daf3ff solid 1px;
        text-align: center;
    }
    .item-info {
        width: 300px;
        text-align: center;
        margin-left: 15px;
    }
    .info-text {
        margin-left: 90px;
        text-align: left;
        width: auto;
    }
    .item-spec {
        text-align: left;
        width: 300px;
        padding-left: 50px;
    }
    .info-text p {
        font-size: 12px;
        cursor: pointer;
        margin: 8px 5px 8px 0;
        line-height: 20px;
    }
    .info-text span {
        margin-top: 0;
        color: #aeaeae;
    }
    .goodsName p:hover{
        text-decoration:underline;
    }
    .item-price {
        width: 180px;
    }
    .item-count {
        width: 170px;
    }
    .item-option {
        width: 128px;
    }
    .item-pay {
        width: 200px;
    }
    .item-state {
        width: 120px;

    }
    .item-deal {
        width: 120px;
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