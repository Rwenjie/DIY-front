<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/20
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/20
 -->

<template>
    <div id="order-confirm">
        <div class="order-box">
            <order-address v-on:SelectAddr="selectedAddr"></order-address>
            <div style="margin-top: 20px">
                <order-box :item="item"></order-box>
            </div>

            <div class="submit-order">
                <div style="width: 50%; float: right">
                    <div class="submit-main">
                        <p>实付款：￥{{totalAmount}}
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
                    <div class="submit-btn">
                        <el-button class="sub-btn" @click="aliPay">立即支付</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderAddress from "./childComps/OrderAddress";
    import OrderBox from "./childComps/OrderBox";
    import {getOrderByOid, updateDeliveryAddr} from "../../network/order";
    import {mapGetters} from "vuex";
    import {aliPcPay} from "../../network/common";
    import {NumFormat} from "../../utils/utils";
    export default {
        name: "OrderConfirm",
        components:{
            OrderAddress,
            OrderBox
        },
        computed: {
            ...mapGetters({
                defaultAddr: "defaultAddr",
                address: "addresses"
            })
        },
        data() {
            return {
                oid: this.$route.params.oid,
                item: {},
                selAddr: {},
                totalAmount: 0.00,
            }
        },
        methods: {
            loadOrderDetail(){
                console.log("oid");
                const oid = this.$route.params.oid;
                console.log(oid);
                getOrderByOid(oid).then( res => {
                    console.log(res);
                    this.item = res.data;
                    let amount = 0.00;
                    this.item.orderDetailList.forEach((item) => {
                        //结算总金额
                        amount += item.sku.price * item.count;

                        // this.totalAmount = NumFormat(this.totalAmount, 2, '.', ',');
                        //处理sku的ownSpec
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
                    this.totalAmount = NumFormat(amount, 2, '.', ',');
                    //默认地址
                    /*let addr = this.address.find( addr => addr.id = this.item.order.address);
                    if (addr != null) {
                        this.selAddr = addr;
                    } else {
                        this.selAddr = JSON.parse(JSON.stringify(this.defaultAddr));
                    }*/
                    this.selAddr = JSON.parse(JSON.stringify(this.defaultAddr));

                })
            },
            selectedAddr(obj) {
                console.log(obj);
                this.selAddr=obj;
            },
            aliPay() {
                let data={
                    out_trade_no: this.item.order.id,
                    total_amount: this.totalAmount,
                    subject: this.item.orderDetailList[0].goods.title,
                    product_code: "FAST_INSTANT_TRADE_PAY",
                };
                updateDeliveryAddr({
                    aid: this.selAddr.id,
                    oid: this.oid
                }).then(res => {
                    if (res.code === 200) {
                        console.log("开始支付");
                        /*let newpage = this.$router.resolve({
                            name: 'aliPay',
                            query:{
                                out_trade_no: this.item.order.id,
                                total_amount: this.totalAmount,
                                subject: this.item.orderDetailList[0].goods.title,
                                product_code: "FAST_INSTANT_TRADE_PAY",
                            },
                            path: "/order/alipay/",
                        });
                        window.open(newpage.href, '_blank');
                        this.$router.push("/home");*/
                        aliPcPay(JSON.stringify(data)).then(res=>{
                            //res即为后端返回的form表单
                            //js创建一个div将form表单添加上去
                            const div = document.createElement('div');
                            div.innerHTML = res;
                            document.body.appendChild(div);
                            //调用form表单
                            document.forms[0].submit();
                        });
                    }
                });


            }
        },
        beforeMount() {
            this.selAddr = JSON.parse(JSON.stringify(this.defaultAddr));
            /*    setTimeout({}, 2000)
                this.loadOrderDetail();*/
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.loadOrderDetail();
            })
        },
        watch: {
            defaultAddr: {
                deep: true,
                handler() {
                    //this.selAddr = JSON.parse(JSON.stringify(this.defaultAddr));
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
    .submit-order {
        padding: 10px 100px;
    }
    .submit-main {
        padding: 10px 20px;
        margin-left: 70px;
        border: red solid 2px; text-align: right;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .submit-btn {
        text-align: right;
        margin-top: 10px;
    }
    .sub-btn {
        width: 180px;
        height: 50px;
        background-color: red;
        font-weight: bolder;
        font-size: large;
        color: #F5F7FA;
    }
    .order-step {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .confirm-info {
        text-align: left;
    }

</style>