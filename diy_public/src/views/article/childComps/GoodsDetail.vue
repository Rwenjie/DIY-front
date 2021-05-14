<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/13
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/13
 -->

<template>
    <div id="goods-detail" style="margin: 0 10px">
        <div style="text-align: left; margin:10px 20px 5px 20px">
            <span v-if="starStatus">
                <v-btn icon color="red" @click="cancelLike">
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
                <span style="margin-top: 5px">199人收藏</span>
            </span>
            <span v-else>
                <v-btn icon color="red" @click="giveLike">
                    <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <span>199人收藏</span>
            </span>
            <span style="float: right">
                <v-btn icon>
                    <v-icon>mdi-basket-fill</v-icon>
                </v-btn>
                3444人已购买
            </span>
        </div>
        <h3><p>{{goodsItem.title}}</p></h3>
        <div style="text-align: left; margin: 10px">
            <ul class="promo-meta">
                <li class="detail-price">
                    <span class="property-type" style="">价格</span>
                    <span class="property-cont" style=""><em class="r-rmb">￥</em>{{sku.price}}</span>
                </li>

            </ul>
            <div v-for="(spce, id) in goodsItem.spec"
                 :key="id"
                 style="text-align: left;
                 padding-left: 24px;
                 display: inline-flex">
                <div class="spce-type" style="display: inline-block;
                                            width: 60px;
                                            line-height: 40px;
                                            color: #6c6c6c;">
                    {{spce.label}}
                </div>
                <div class="" style="width: 300px; float: right">
                    <div style="float: right;">
                        <div v-if="spce.isImage" style="margin-top: 15px">
                            <vue-select-image
                                    :dataImages="spce.option"
                                    :w="35"
                                    :h="35"
                                    @onselectimage="onSelectImage">
                            </vue-select-image>
                            <!--<el-radio-group v-model="radio3" size="small">
                                <el-radio v-for="(radio, id) in spce.option"
                                          :label=radio.id
                                          :disabled=radio.disabled
                                          :key="id"
                                          border
                                            style="height: 30px">
                                    <el-avatar shape="square" :size="25" :fit="fit" :src="radio.src"></el-avatar>
                                </el-radio>
                            </el-radio-group>-->
                        </div>
                        <div v-else>
                            <el-radio-group v-model="radio4" size="small">
                                <el-radio v-for="(radio, id) in spce.option"
                                          :label=radio.id
                                          :disabled=radio.disabled
                                          :key="id"
                                          style="margin-top: 15px">{{radio.alt}}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
            </div>
            <v-divider></v-divider>
            <div style="text-align: left; padding-left: 24px">
                <span class="property-type" style="float: left; line-height: 75px;">配送</span>
                <div class="J_LogisticInfo" style=" float: left">
                    <span id="J-from" style=" display: inline-block; line-height: 75px;">湖北襄阳&#12288至&#12288</span>
                    <span id="J-to"  style="float: right; width: auto;">
                        <span>
                            <v-text-field style="width: 200px; max-width: 220px; font-size: 14px"
                                          v-model="addressText">
                                     <v-btn slot="append" icon  @click="loadAddress">
                                        <v-icon>mdi-map-marker-plus</v-icon>
                                     </v-btn>
                            </v-text-field>
                        </span>
                    </span>
                    <div style="float: right"></div>
                </div>
            </div>
            <div style="text-align: left; padding: 10px 0 0 24px">
                <span class="property-type">数量</span>
                <span class="" style="width: 300px; display:inline-block; padding-left:10px">
                    <el-input-number v-model="number" controls-position="right" @change="handleChange" :min="1"></el-input-number>
                </span>
            </div>
            <div style="margin-top: 20px">
                <el-row>
                    <el-col :span="4">f</el-col>
                    <el-col :span="10"  style="text-align: center">
                        <el-button >加入购物车</el-button>
                    </el-col>
                    <el-col :span="10" style="text-align: center">
                        <el-button>立即购买</el-button>
                    </el-col>
                </el-row>
            </div>
            <div style="text-align: left; padding: 10px 0 0 24px">
                <span class="property-type">售后服务</span>
                <span class="" style="width: 300px; display:inline-block; padding-left:10px">
                    <span v-for="(item, id) in afterService" :key="item"
                          style="padding: 5px"
                    >{{item}}</span>
                </span>
            </div>
            <div style="padding-left: 24px">
                <span class="property-type">支付方式</span>
                <span class="" style="width: 300px; display:inline-block; padding-left:10px">
                    <span v-for="(item, id) in payMethod" :key="item"
                          style="padding: 5px"
                    >{{item}}</span>
                </span>
            </div>
        </div>

        <el-dialog
                title="选择配送地址"
                :visible.sync="diaAddressVisible"
                width="40%"
                :before-close="handleClose">
            <div>
                <area-select v-model="address" type="all" :data="$pcaa" :level="2"></area-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="diaAddressVisible = false">取 消</el-button>
                <el-button type="primary" @click="diaAddressVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>


    import VueSelectImage from 'vue-select-image'
    require('vue-select-image/dist/vue-select-image.css')

    export default {
        name: "GoodsDetail",
        components:{
            VueSelectImage
        },
        props: {
            starStatus: true,
            goodsItem: {
                type: Object,
                default(){
                    return {}
                }
            }
        },
        data() {
            return{
                radio3: 1,
                radio4: 1,
                address:[
                    { "140000": "山西省" },
                    { "140100": "太原市"},
                    { "140105": "小店区"}],
                addressText: "山西省/太原市/小店区",
                addressCode: ["140000", "140100", "140105"],
                diaAddressVisible: false,
                sku: {
                    title: "红色",
                    image: "http://image5.suning.cn/uimg/b2c/newcatentries/0070130691-000000000826244625_5_800x800.jpg",
                    price: 2557.89,
                    stock: 345,
                },
                selectedAddress: '',
                afterService: [
                    "正品保证",
                    "极速退款",
                    "退货运费险",
                ],
                payMethod: [
                    "支付宝",
                    "微信支付",
                    "银联支付"
                ],
                number: 1,
            }
        },
        methods: {
            selectAddress(address) {
                this.selectedAddress = `${address.province}${address.city}${address.detail}`
            },
            loadAddress() {
                this.diaAddressVisible = true;

            },
            increaseNum() {
                this.number++;
            },
            decreaseNum() {
                if (this.number>=2) {
                    this.number--;
                }

            }
        }


    }
</script>

<style scoped>

    .promo-meta {
        list-style-type: none;
    }
    .property-type {
        display: inline-block;
        width: 60px;
        line-height: 40px;
        color: #6c6c6c;
    }
    .property-cont {
        font-size: 26px;
        color: #FF4400;
        line-height: 12px;
    }
    .r-rmb {
        font-style: normal;
        font-weight: bolder;
        margin-right: 4px;

    }
    .J_LogisticInfo {

    }
    /deep/ vue-select-image__wrapper li {
        margin-left: 0;
    }
</style>