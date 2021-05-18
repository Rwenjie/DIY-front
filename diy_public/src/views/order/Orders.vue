<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/3
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/3
 -->

<template>
    <div id="order">
        <v-card>
            <v-toolbar class="elevation-0">
                <el-breadcrumb separator="|">
                    <el-breadcrumb-item v-for="(item, id) in statusMenus"
                                        class="order-head"
                                        v-bind:class='item.active ? orderMenuA : orderMenuB' >
                        <span v-bind:class="id==activeIndex ? orderMenuA : orderMenuB"
                              @click="orderStatus(id)">{{item.text}}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </v-toolbar>
            <v-divider/>
            <div>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">
                                商品
                            </th>
                            <th class="text-left">
                                Calories
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                                v-for="item in desserts"
                                :key="item.name"
                        >
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <order-list :orderList="orderList" type="">

                </order-list>
                {{statusMenus}}
            </div>
        </v-card>
        <div class="order-box">
    </div>


    </div>
</template>

<script>
    import OrderList from "./childComps/OrderList";
    export default {
        name: "Orders",
        components: {
            OrderList
        },
        data() {
            return {
                orderList: [],
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

            }

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