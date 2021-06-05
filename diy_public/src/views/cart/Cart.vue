<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/2
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/2
 -->

<template>
    <div id="cart" style="width: 90%;margin: auto">
        <div class="Cart">
            <div v-if="cartLength>0">
                <div class="cartTableHeader">
                    <span style="width: 30%" >商品信息</span>
                    <span style="width: 5%">单价</span>
                    <span style="width: 30%">数量</span>
                    <span style="width: 5%">小计</span>
                    <span style="width: 20%">交易操作</span>
                </div>
                <ul class="orderList" style="list-style-type: none; padding-left: 0">
                    <li v-for="(item,index) in itemList" :key="index">

                        <div class="orderDetail"  style="display: flex;flex-direction: row">
                            <div style="width: 30%; display: flex;flex-direction: row">
                                <div style="width: 15% ;display: flex;flex-direction: row">
                                <span style="padding: 0 5px;">
                                    <v-checkbox
                                            v-model="selected"
                                            label=""
                                            :value=item.id
                                    ></v-checkbox>
                                </span>
                                </div>
                                <img :src="item.product.images[0]" alt="商品图片" />
                                <div class="goodsName" style="margin-top: 10px">
                                    <p @click="navTo('/article/'+item.articleId)">{{item.product.title}}</p>
                                    <span v-for="(spce, id) in item.ownSpec" :key="id">
                                    {{spce.label}}:{{spce.value}}
                                </span>
                                </div>
                            </div>
                            <div class="unitPrice" style="width: 15% ;">{{'￥'+item.sku.price}}</div>
                            <div class="num" style="width: 22% ;
                                                    height:100%;
                                                    display: flex;
                                                    align-items:center;
                                                    justify-content:center;">
                                <NumberInput
                                    @changeHandle="numberChange(item.id)"
                                    :initNum="item.count"
                                    v-model="item.count"
                                    :min="1"
                                    :max="999"/>
                            </div>
                            <!-- <input @change="numberChange(item.id)" type="text" v-model="item.temGoodsNum" min="1" class="numInput" /> -->
                            <span class="amount">{{'￥'+item.amount}}</span>
                            <button @click="deleteCartItem(item.id)">删除</button>
                        </div>
                    </li>
                </ul>
                <div class="cartFooter">
                    <span>应付金额：</span>
                    <span class="total">{{'￥'+totalAmount}}</span>
                    <button @click="placeOrder">下单</button>
                </div>
            </div>
            <p class="emptyTips" v-else>购物车还是空滴~</p>
        </div>
    </div>

</template>

<script>
    import {mapState, mapGetters } from 'vuex';
    import NumberInput from 'components/NumberInput';
    import {Message, MessageBox} from 'element-ui'
    import {createOrderByCart, createOrderNow} from "../../network/order";

    export default {
        name: 'Cart',
        components:{
            NumberInput
        },
        computed:{
            ...mapState([
                'clientToken'
            ]),

            // 两种语法
            //第一种=>   ...mapGetters(["cartLength"]),
            // 第二种=>
            ...mapGetters({
                itemLength: 'cartLength',
                itemList: 'itemList'
            }),
            totalAmount(){
                let amount = 0;
                this.selected.forEach( (sel) => {
                    const val = this.itemList.find( item => item.id === sel);
                    if (val!=null) {
                        amount += val.amount
                    }
                });
                return amount;
            },
            cartLength() {
                return this.$store.getters.cartLength
            }

        },
        data () {
            return {
                selected: ["",],
                orderList:[],
            }
        },
        methods:{
            numberChange(cid){
                console.log(cid);
                const oldProduct = this.itemList.find(item => item.id == cid);
                this.$store.dispatch("changeCartCount", oldProduct)
            },
            deleteCartItem(cid){
               this.$store.dispatch("deleteCartItem", cid).then( res => {
                   Message( {
                       message: res,
                       type: 'success',
                   });
               })
            },
            navTo(route){
                this.$router.push(route);
            },
            placeOrder(){

                console.log(this.selected);
                let selData = [];
                this.selected.forEach( (sel) => {
                    if (sel!=""){
                        selData.push(sel)
                    }
                });
                createOrderByCart(selData).then( res => {
                    console.log("========");
                    console.log(res.data);
                    let newpage = this.$router.resolve({
                        name: 'messageInfo',
                        path: "/order/detail/"+res.data,
                    });
                    window.open(newpage.href, '_blank');
                })

            }

        },
        mounted(){
            console.log(this.itemList);
        },

    }
</script>

<style scoped lang="less">
    @import "~assets/css/var.less";
    .Cart{
        width: 100%;
        .emptyTips{
            width: 200px;
            text-align: center;
            display: block;
            margin: 30px auto;
            color:@thirdColor;
            font-size: 20px;
        }
        .cartTableHeader{
            width: 100%;
            height: 40px;
            background-color: #f5f5f5;
            border: 1px solid @borderColor;
            color: @fontDefaultColor;
            font-size: 14px;
            line-height: 40px;
            span{
                display: inline-block;
                width: 14%;
                &:first-child{
                    width:30%;
                    text-align: center;
                }
            }
        }
        .orderList{
            width: 100%;
            li{
                border: 1px solid @borderColor;
                border-top: none;
                font-size: 13px;
                .orderHeader{
                    background-color: #f1f1f1;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 5px;
                    .orderTime{
                        font-weight: 600;
                    }
                    .orderId,.state{
                        margin-left: 10px;
                    }
                }
                .orderDetail{
                    width: 100%;
                    padding: 10px 10px 10px 0;
                    position: relative;
                    overflow: hidden;
                    img{
                        width: 84px;
                        height: 84px;
                        display: inline-block;
                    }
                    .goodsName{
                        display: inline-block;
                        margin-left: 5px;
                        width: 230px;
                        vertical-align: top;
                        p{
                            cursor: pointer;
                            line-height: 20px;
                            &:hover{
                                text-decoration:underline;
                            }
                        }
                        span{
                            color:@fontDefaultColor;
                            display: block;
                            margin-top: 10px;
                        }
                    }
                    .unitPrice,.num,.amount{
                        display: inline-block;
                        vertical-align: top;
                        width: 15%;
                        height: 85px;
                        line-height: 85px;
                        text-align: center;
                    }
                    .NumberInput{
                        position: relative;
                        top: 25px;
                    }
                    button{
                        position: absolute;
                        right: 90px;
                        bottom: 40px;
                        width: 70px;
                        height: 30px;
                        border-radius: 3px;
                        background-color: @falseColor;
                        color:white;
                        border: none;

                    }
                }
            }
        }
        .cartFooter{
            width: 100%;
            height: 60px;
            line-height: 60px;
            padding: 0 10px;
            border: 1px solid @borderColor;
            border-top: none;
            background-color: #f5f5f5;
            position: relative;
            span{
                color: @fontDefaultColor;
                display: inline-block;
                vertical-align: top;
            }
            .total{
                color:@falseColor;
                font-size: 25px;
                font-weight: 600;
            }
            button{
                position: absolute;
                right: 0;
                top: 0;
                width: 100px;
                height: 100%;
                background-color: @thirdColor;
                border: none;
                color:white;
                font-size: 20px;
            }
        }
    }
</style>