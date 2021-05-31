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

            <div class="confirm-info" v-if="item.order.orderStatus==0">
                <order-address v-on:SelectAddr="selectedAddr"></order-address>
            </div>
            <div>
                <order-box :item="item"></order-box>
            </div>
            <div class="submit-order">
                <div style="width: 50%; float: right">
                    <div style="border: red solid 1px; text-align: right">
                        <p>实付款：￥{{}}

                        </p>
                        <p>寄送至：
                            <span v-for="addr in selAddr.addrList">
                                {{addr.label}}
                            </span>
                            <span>
                                {{selAddr.address}}
                            </span>
                        </p>
                        <p>收货人：
                            <span>
                                {{selAddr.nickName}} {{selAddr.tel}}
                            </span>
                        </p>
                    </div>
                    <div>
                        <el-button @click="aliPay">立即支付</el-button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import OrderAddress from "./childComps/OrderAddress";
    import OrderBox from "./childComps/OrderBox";
    import {getOrderByOid} from "../../../network/order";
    import {mapGetters} from "vuex";
    import {aliPcPay} from "../../../network/common";
    export default {
        name: "OrderDetail",
        components:{
            OrderAddress,
            OrderBox
        },
        computed: {
            ...mapGetters({
                defaultAddr: "defaultAddr",
            })
        },

        data(){
           return{
               oid: this.$route.params.oid,
               order: {
                   orderNo: "", //订单编号
                   orderStatus: 0,    //0未付款,1已付款,2已发货,3已签收,4新的订单,-1退货申请,-2退货中,-3已退货,-4取消交易'
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
               },
               item: {
                   order: {
                       orderStatus: 1,
                   }
               },
               selAddr: {
                   addrList: [],
                   nickName: "",
                   label: ""
               }
           }
        },
        methods: {
            loadOrderDetail(){
                console.log("oid");
                console.log(this.oid);
                getOrderByOid(this.oid).then( res => {
                    if (res.code == 200) {
                        this.item = res.data;
                    }

                })
            },
            selectedAddr(obj) {
                console.log(obj);
                this.selAddr=obj;
            },
            aliPay() {
                let data={

                    out_trade_no: "1234567890123",
                    total_amount: "435.43",
                    subject: "345",
                    product_code: "FAST_INSTANT_TRADE_PAY",
                };
                aliPcPay(JSON.stringify(data)).then(res=>{
                    //res即为后端返回的form表单
                    //js创建一个div将form表单添加上去
                    const div = document.createElement('div')
                    div.innerHTML = res;
                    document.body.appendChild(div);
                    //调用form表单
                    document.forms[0].submit();
                });
            }
        },
        beforeMount() {
            this.$store.dispatch("loadAddress");
        },
        mounted() {

            this.loadOrderDetail();
            console.log(this.defaultAddr);
            this.selAddr = JSON.parse(JSON.stringify(this.defaultAddr));
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