<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/20
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/20
 -->

<template>
    <div id="order-detail">
        <div class="order-box">
            <div class="order-step">
                <el-steps :active=order.orderStatus finish-status="success" simple>
                    <el-step title="确认订单信息" ></el-step>
                    <el-step title="付款" ></el-step>
                    <el-step title="确认收货" ></el-step>
                    <el-step title="评价" ></el-step>
                </el-steps>
            </div>
            <div>

            </div>

            <div class="confirm-info">

                <order-address></order-address>
            </div>
        </div>

    </div>
</template>

<script>
    import OrderAddress from "./childComps/OrderAddress";
    export default {
        name: "OrderDetail",
        components:{
            OrderAddress
        },
        data(){
           return{
               order: {
                   orderNo: "", //订单编号
                   orderStatus: 0,    //0未付款,1已付款,2已发货,3已签收,-1退货申请,-2退货中,-3已退货,-4取消交易'
                   buyerId: "",     //卖方id
                   sellerId: "",    //卖方id
                   afterStatus: "",  //售后状态
                   productCount: "",    //商品数量
                   productAmountTotal: "",  //商品总价
                   orderAmountTotal: "",  //实际付款金额
                   logisticsFee: "",    //运费金额
                   addressId: "",   //收货地址编码
                   payChannel: "",  //支付渠道 0余额 1微信 2支付宝
                   outTradeNo: "",  //订单支付单号
                   escrowTradeNo: "",   //第三方支付流水号
                   payTime: "",     //付款时间
                   deliveryTime: "",    //发货时间
                   orderSettlementStatus: "",   //订单结算状态 0未结算 1已结算
                   orderSettlementTime: "",     //订单结算时间
               }
           }
        }
    }
</script>

<style scoped>

    #order-detail {
        background-color: #F5F7FA;
    }
    .order-box {
        width: 90%;
        margin: 0 auto;
    }
    .order-step {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .confirm-info {
        text-align: left;
    }

</style>