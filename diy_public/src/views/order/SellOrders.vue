<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/6/6
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/6/6
 -->

<template>
    <div id="sell-order">
        <v-card>
            <v-toolbar class="elevation-0">
                <el-breadcrumb separator="|">
                    <el-breadcrumb-item v-for="(item, id) in statusMenus"
                                        class="order-head"
                                        :key="id"
                                        v-bind:class='item.active ? orderMenuA : orderMenuB' >
                        <span v-bind:class="id==activeIndex ? orderMenuA : orderMenuB"
                              @click="orderStatus(id)">{{item.text}}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </v-toolbar>
            <v-divider/>
            <div style="margin: 0 20px">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-center" width="21%">商品</th>
                            <th class="text-center" width="20%">商品属性</th>
                            <th class="text-center" width="10%">单价</th>
                            <th class="text-center" width="10%">数量</th>
                            <th class="text-center" width="13%">小计</th>
                            <th class="text-center" width="13%">交易状态</th>
                            <th class="text-center" width="13%">交易操作</th>
                        </tr>
                        </thead>
                    </template>
                </v-simple-table>
                <sell-order-list :orderList="orderList" type="">

                </sell-order-list>
            </div>
        </v-card>
    </div>
</template>

<script>
    import SellOrderList from "./childComps/SellOrderList";
    import {loadSellOrder} from "../../network/order";
    export default {
        name: "SellOrders",
        components: {
            SellOrderList
        },
        data() {
            return {
                orderList: [],
                allOrderList: [],
                activeIndex: 0,
                orderMenuA: "order-menu-active",
                orderMenuB: "",
                statusMenus: [
                    {
                        type: "All",
                        text: "所有订单",
                        active: true,
                    },
                    {
                        type: "WitPay",
                        text: "待支付",
                        active: false,
                    },
                    {
                        type: "WaitSend",
                        text: "待发货",
                        active: false,
                    },
                    {
                        type: "WaitConfirm",
                        text: "待收货",
                        active: false,
                    },
                    {
                        type: "WaitRate",
                        text: "待评价",
                        active: false,
                    },
                ],
            }
        },
        methods:{
            //改变订单状态
            orderStatus(id) {
                this.activeIndex = id;
                console.log(id);
                if (id == 0) {
                    this.orderList = this.allOrderList;
                } else {
                    this.orderList = this.allOrderList.filter( (item) => {
                        return item.order.orderStatus == id;
                    })
                }
            },
            loadOrder() {
                loadSellOrder().then( res => {
                    this.allOrderList = res.data;
                    this.orderList = this.allOrderList;
                    this.orderList.forEach( (list) => {
                        list.orderDetailList.forEach((item) => {
                            let ownSpec = item.sku.ownSpec;
                            let oSpec = [];
                            if (ownSpec!=null) {
                                ownSpec = ownSpec.replace("{", "");
                                ownSpec = ownSpec.replace("}", "");
                                let str = ownSpec.split(',')
                                str.forEach( (st) => {
                                    const a = st.split(':');
                                    if (a[0]!=null && a[1]!=null) {
                                        const spec = {
                                            label: a[0].replace("\"","").replace("\"",""),
                                            value: a[1].replace("\"","").replace("\"",""),
                                        };
                                        oSpec.push(spec)
                                    }
                                });
                                item.ownSpec = oSpec;
                            }
                        });
                    } )
                });
            }
        },
        mounted() {
            this.loadOrder();
        }
    }
</script>

<style scoped>

    .order-box {
        width: 90%;
        margin: 0 auto;
    }
    .order-head {
        font-size: 16px;
        font-weight: 700;
    }
    .order-menu-active {
        color: red;

    }
    .order-head span {
        padding: 0 10px;
    }
    .order-head span:hover {
        color: red;
    }

</style>