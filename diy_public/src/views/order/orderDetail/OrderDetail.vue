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
            <order-address v-on:SelectAddr="selectedAddr"></order-address>
            <div style="margin-top: 20px">
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
        data() {
            return {
                oid: this.$route.params.oid,
                item: {},
                selAddr: JSON.parse(JSON.stringify(this.defaultAddr)),
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
                      //处理sku的ownSpec
                      this.item.orderDetailList.forEach((item) => {

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
                      })

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
        mounted() {
            this.$store.dispatch("loadAddress");
            this.loadOrderDetail();
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