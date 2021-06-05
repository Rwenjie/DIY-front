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
           <div class="item-box" v-for="(item, id) in orderList" :key="id" style="width: 100%;">
               <div class="item-head" style="background-color: #eaf8ff; height: 50px">
                   <div style="text-align: left;">
                       <span style="width: 200px; float: left; margin-top: 15px; margin-left: 10px">订单号：{{item.order.id}}</span>
                       <span style="width: 400px; float: left; margin-top: 15px">{{item.order.createdTime}}</span>
                   </div>
               </div>
               <div class="item-body-left" style="width: 74%; float: left; height: 400px" :key="id" >
                   <div v-for="(detail, id) in item.orderDetailList" style="width: 100%; display: flex; flex-direction: row">
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
               <div class="item-body-right" style="width: 26%; float: left">
                   <div class="item-state item">
                       <div v-if="item.order.orderStatus==1">未付款</div>
                       <div v-if="item.order.orderStatus==2">已付款</div>
                       <div v-if="item.order.orderStatus==3">已发货</div>
                       <div v-if="item.order.orderStatus==4">已签收</div>
                   </div>
                   <div class="item-deal item">交易操作</div>
               </div>
               <div class="item-body-bottom" style="width: 100%; height: 50px; background-color: #0b2e52">

               </div>

           </div>

        </div>
    </div>
</template>

<script>

    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: "OrderList",
        components: {
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

    .item-body-left {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        padding-bottom: 10px;
        border-left: #daf3ff solid 1px;
        border-bottom: #daf3ff solid 1px;
        border-top: #daf3ff solid 1px;
        text-align: center;
    }
    .item-body-right {
        display: flex;
        flex-direction: row;
        height: ;
    }
    .item-info {
        width: 28%;
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
        width: 27%;
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
        width: 13%;
    }
    .item-count {
        width: 14%;
    }
    .item-amount {
        border-right: #daf3ff solid 1px;
        width: 14%;
        float: left;
    }
    .item-state {
        width: 50%;
        float: left;

    }
    .item-deal {
        width: 50%;
        float: left;
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