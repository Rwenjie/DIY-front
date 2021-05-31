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
                <v-checkbox
                        label="全选"
                        @change="handleCheckAllChange"
                        v-model="checkAll"
                        indeterminate>
                </v-checkbox>
            </div>

            <div style="margin: 15px 0;"></div>
           <div class="item-box" v-for="(item, id) in orderList" :key="id">
               <div class="item-head" style="background-color: #eaf8ff; height: 50px">
                   <div style="width: 50px; height: 50px; padding: 10px; float: left">
                       <v-checkbox
                               style="margin: 0; padding: 0"
                               v-model="selected"
                               value="">
                       </v-checkbox>
                   </div>
                   <div>
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
               </div>
           </div>

        </div>
        orderList
    </div>
</template>

<script>

    import OrderListItem from "./OrderListItem";
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: "OrderList",
        components: {
            OrderListItem
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
                checkAll: false,
                selected: true,
                time: "2021-05-18",
                orderId: "1804557530014091415",
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true
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
            }
        }
    }
</script>

<style scoped>

    .item-body {
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
        border: #daf3ff solid 1px;
        text-align: center;
    }
    .item-info {
        width: 460px;
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
    .info-text span {
        margin-top: 0;
        color: #aeaeae;
    }
    .goodsName p:hover{
        text-decoration:underline;
    }
    .item-price {
        width: 120px;
    }
    .item-count {
        width: 50px;
    }
    .item-option {
        width: 128px;
    }
    .item-pay {
        width: 120px;
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