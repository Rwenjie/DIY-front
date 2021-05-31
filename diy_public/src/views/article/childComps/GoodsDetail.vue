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
                <span>{{goodsItem.star}}人收藏</span>
            </span>
            <span style="float: right">
                <v-btn icon>
                    <v-icon>mdi-basket-fill</v-icon>
                </v-btn>
                {{goodsItem.sold_count}}人已购买
            </span>
        </div>
        <h3><p>{{goodsItem.title}}</p></h3>
        <div style="text-align: left; margin: 10px">
            <ul class="promo-meta">
                <li class="detail-price">
                    <span class="property-type" style="">价格</span>
                    <span class="property-cont" style=""><em class="r-rmb">￥</em>{{selItem.sku.unitPrice}}</span>
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
                <div class="" style="width: 360px; float: right">
                    <div style="float: left;" @click="changeIsAble(id)">
                        <div v-if="spce.isImage" style="margin-top: 15px">
                            <image-select v-model="selected[id]"
                                          :width="50"
                                          :is-img=true
                                          :height="50"
                                          :data-list="spce.option"
                                          :defaultIndex=selected[id]
                            ></image-select>
                        </div>
                        <div v-else>
                            <image-select v-model="selected[id]"
                                          :height="34"
                                          :is-img=false
                                          :defaultIndex=selected[id]
                                          :data-list="spce.option"></image-select>
                        </div>
                    </div>
                </div>
            </div>
            <v-divider></v-divider>
            <div style="text-align: left; padding-left: 24px">
                <span class="property-type" style="float: left; line-height: 75px;">配送</span>
                <div class="J_LogisticInfo" style=" float: left">
                    <span id="J-from" style=" display: inline-block; line-height: 75px;">{{fromAddr.province.label}}{{fromAddr.city.label}}&#12288至&#12288</span>
                    <span id="J-to"  style="float: right; width: auto;">
                        <span>
                            <v-text-field style="width: 200px; max-width: 220px; font-size: 14px"
                                          v-model="toAddrText">
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
                    <el-input-number v-model="selItem.count" controls-position="right" @change="" :min="1" :max="stock"></el-input-number>
                    <span>(库存{{stock}}件)</span>
                </span>

            </div>
            <div style="margin-top: 20px">
                <el-row>
                    <el-col :span="4">f</el-col>
                    <el-col :span="10"  style="text-align: center">
                        <el-button @click="addCart">加入购物车</el-button>
                    </el-col>
                    <el-col :span="10" style="text-align: center">
                        <el-button @click="purchaseNow">立即购买</el-button>
                    </el-col>
                </el-row>
            </div>
        <!--    <div style="text-align: left; padding: 10px 0 0 24px">
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
            </div>-->
        </div>

        <el-dialog
                title="选择配送地址"
                :visible.sync="diaAddressVisible"
                width="40%">
            <div>
                <area-select v-model="toAddr" value="toAddr" type="all" :data="$pcaa" :level="2"></area-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="diaAddressVisible = false">取 消</el-button>
                <el-button type="primary" @click="addrDialogClose">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>


    import VueSelectImage from 'vue-select-image'
    require('vue-select-image/dist/vue-select-image.css');
    import ImageSelect from "../../../components/common/imageSelect/ImageSelect";
    import {cancelItemStar, getItemStar, getItemStarState} from "../../../network/item";
    import {createOrderNow} from "../../../network/order";

    export default {
        name: "GoodsDetail",
        components:{
            VueSelectImage,
            ImageSelect
        },
        props: {
            goods: {
                type: Object,
                default() {
                    return{}
                }
            },
            articleId: {
                type: String,
                default(){
                    return ""
                }
            }
        },
        data() {
            return{
                selected: [],
                starStatus: false,
                selItem: {
                    id: "",  //编号
                    count: 1,       //数量
                    amount: 0.00,   //金额
                    articleId: this.articleId,
                    product: {},
                    sku: {},
                },
                //sku选择中是否有图片
                isImage: false,
                fromAddr: {
                    province: {
                        label: "",
                        code: ""
                    },
                    city: {
                        label: "",
                        code: ""
                    }
                },
                articleId: this.$route.params.articleId,
                toAddrText: "",
                toAddr: [],
                selectedList: [],
                diaAddressVisible: false,
                skus: [],
                selectedAddress: '',
                afterService: [],
                payMethod: [],
                goodsItem: {},
                stock: 0
            }
        },
        methods: {
            //点赞
            giveLike() {
                getItemStar(this.goodsItem.id).then( res => {
                    this.likeState();
                    if (res.status == 200) {
                        this.goodsItem.star +=1;
                    }

                })
            },
            //取消点赞
            cancelLike() {
                cancelItemStar(this.goodsItem.id).then( res => {

                    this.likeState();
                    if (res.status == 200) {
                        this.goodsItem.star -=1;
                    }
                })
            },
            //更新点赞状态
            likeState() {
              /*  getItemStarState(this.goodsItem.id).then( res => {
                    this.starStatus = res.data;
                })*/
            },
            loadAddress() {
                this.diaAddressVisible = true;
            },
            addCart() {
                this.$store.dispatch("loadCart");
                let n = this.skus.findIndex( sku => sku.indexes = this.selected);
                this.selItem.sku = this.skus[n];
                this.selItem.product = this.goodsItem;
                this.selItem.articleId = this.articleId;
                this.$store.dispatch("addCart", this.selItem).then( res => {
                    alert(res)
                });

            },
            purchaseNow() {
               let n = this.skus.findIndex( sku => sku.indexes = this.selected);
               this.selItem.skuId = this.skus[n].id;
               this.selItem.goodsId = this.goodsItem.id;
               this.selItem.articleId = this.articleId;
               const order = JSON.parse(JSON.stringify(this.selItem));
               delete order.product;
               delete order.sku;
                createOrderNow(order).then( res => {
                    console.log("========");
                    console.log(res.data);
                    let newpage = this.$router.resolve({
                        name: 'messageInfo',
                        path: "/order/detail/"+res.data,
                    });
                    window.open(newpage.href, '_blank');
                })

            },
            addrDialogClose() {
                this.diaAddressVisible = false;
                this.modifyDataToAddr();
            },
            modifyDataToAddr() {
                let i = 1;
                this.toAddrText = '';
                this.toAddr.forEach( (toItem) => {
                    const addr = Object.values(toItem);
                    this.toAddrText += addr[0];
                    if (i++ <3) {
                        this.toAddrText += '/'
                    }
                });
            },

            //sid 是选择了第 i 个规格
            //遍历其他属性对其他属性进行修改
            changeIsAble() {
                this.goodsItem.spec.forEach( (spec) => {
                    spec.option.forEach( (op) => {
                        op.disabled = true;
                    })
                });
                for (let i=0; i<this.selected.length; i++) {
                    this.goodsItem.spec[i].option[this.selected[i]].disabled = false;
                    this.change(i)
                }
                this.changeInfo();
            },
            change(sid) {
                if (this.goodsItem.spec.length==1) {
                    this.goodsItem.spec[0].option.forEach( (op) => {
                        op.disabled = false;
                    });
                    return;
                }
                this.goodsItem.spec[sid].option[this.selected[sid]].disabled = false;
                // console.log("现在选定的是第"+this.selected[sid]+"个选项");
                for (i=0; i<this.skus.length; i++) {
                   // console.log("与skus["+i+"]个开始匹配");
                    if (this.selected[sid] == this.skus[i].indexes[sid]) {
                      // console.log("这个skus中有我们需要的值");
                        for (let index = 0; index < this.skus[i].indexes.length; index++) {
                            // console.log("开始遍历indexes数组");
                            if (index === sid) {
                                // console.log("是自己"+this.selected[sid]);
                            } else {
                                //console.log("indexes==>"+this.skus[i].indexes[index]);
                                this.goodsItem.spec[index].option[this.skus[i].indexes[index]].disabled = false;
                            }
                        }
                    }
                }
            },
            intEqual(a, b) {
                if (a.length !== b.length) {
                    return false
                } else {
                    // 循环遍历数组的值进行比较
                    for (let i = 0; i < a.length; i++) {
                        if (a[i] !== b[i]) {
                            return false
                        }
                    }
                    return true;
                }
                return true;
            },
            changeInfo() {
                for (let i=0; i<this.skus.length; i++) {
                    const sku = this.skus[i];
                    if (this.intEqual(sku.indexes, this.selected)) {
                        console.log("equal");
                        this.selItem.sku.id = sku.id;
                        this.selItem.sku.unitPrice = sku.price;
                        this.selItem.count = 1;
                        this.stock = sku.stock;
                        this.selItem.product.id = this.goodsItem.id;
                        this.selItem.product.title = this.goodsItem.title;
                        if (sku.images==="") {
                            this.selItem.product.img = this.goodsItem.images[0]
                        }else {
                            this.selItem.product.img = sku.image;
                        }
                        let ii = 0;
                        this.selItem.sku.metatit = [];
                        this.selected.forEach((it) => {
                            const me = {
                                label: this.goodsItem.spec[ii].label,
                                value: this.goodsItem.spec[ii++].option[it].alt
                            };
                            this.selItem.sku.metatit.push(me);
                        })
                    }
                }
            },
            loadGoodsInfo(){

                const item = JSON.parse(JSON.stringify(this.goods));
                this.goodsItem = item;
                this.skus = this.goodsItem.skus;
                console.log(this.skus[0]);
                this.skus[0].indexes.forEach( (index) => {
                    console.log("index===>");
                    console.log(index);
                    this.selected.push(index);
                });

                //判断是否选择是否有图片
                this.goodsItem.spec.forEach( (item) => {
                    if (item.isImage) {
                        this.isImage = true;
                    }
                });
                //处理地址
                //form
                this.fromAddr.city.code = Object.keys(this.goodsItem.fromAddr[0])[0];
                this.fromAddr.city.label = Object.values(this.goodsItem.fromAddr[0])[0];
                this.fromAddr.province.code = Object.keys(this.goodsItem.fromAddr[1])[0];
                this.fromAddr.province.label = Object.values(this.goodsItem.fromAddr[1])[0];
                //to
                /*this.toAddr = this.goodsItem.express.to;
                this.modifyDataToAddr();*/

                for (let i=0; i<this.selected.length; i++) {
                    this.goodsItem.spec[i].option[this.selected[i]].disabled = false;
                    this.change(i)
                }
                this.changeInfo();

                //加载商品喜欢
                this.likeState()
            },

        },
        mounted() {
            this.loadGoodsInfo();
        },
        watch:{
            selected: {
                deep: true,
                handler(){

                }
            },
            goods:{
                deep: true,
                handler(){
                    this.loadGoodsInfo();
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