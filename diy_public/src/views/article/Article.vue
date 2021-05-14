<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/5
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/5
 -->

<template>
    <div id="article" style="background: #F5F8FA;">
        <category-nav></category-nav>
        <el-container>
            <el-aside width="80%" style="height: auto; ">
                <div style="padding: 30px 40px 15px" >
                    <v-divider></v-divider>
                    <div style="max-width: 950px;
                                margin: 0 auto">
                        <div style="margin-bottom: 5px"><i class="el-icon-caret-top"></i></div>
                        <div style="margin-bottom: 5px">上一篇</div>
                        <div style="margin-bottom: 5px">编码字母-让我们成为侦探</div>

                        <div style="padding-top: 30px">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <div style="max-width: 950px;
                                        margin: 20px auto 20px auto;">
                            <v-sheet
                                    color="white"
                                    elevation="4"
                                    height="auto"
                                    :rounded=true
                                    width="100%">
                                <div class="post-body" style="padding: 50px;
                                                        position: relative">

                                    <h1 class="post-title" style="margin-bottom: 30px;
                                                                   text-align: left;
                                                                    margin-top: 30px;">
                                        <a href="http://krokotak.com/2015/07/coded-letter-lets-be-detectives/">CODED LETTER – Let’s Be Detectives</a>
                                    </h1>
                                    <div class="post-meta-top" style="border-bottom: 1px solid #e0e0e0;
                                                                            border-top: 1px solid #e0e0e0;
                                                                            padding: 15px 0px;
                                                                             margin-bottom: 30px;">
                                        <el-row>
                                            <el-col :span="12">
                                                <div style="text-align: left">
                                                    <span v-if="starStatus">
                                                        <v-btn icon color="red" @click="cancelLike">
                                                            <v-icon>mdi-star</v-icon>
                                                        </v-btn>
                                                        <span style="margin-top: 5px">199人收藏</span>
                                                    </span>
                                                    <span v-else>
                                                        <v-btn icon color="red" @click="giveLike">
                                                            <v-icon>mdi-star-outline</v-icon>
                                                        </v-btn>
                                                        <span>199人收藏</span>
                                                    </span>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <row>
                                                    <ul style="list-style-type: none;">
                                                        <li v-for="tag in tags"
                                                            style="display:inline;
                                                                    float: right;
                                                                    margin: 0 0 5px 5px">
                                                            <el-tag size="small"
                                                                    :key="tag"
                                                                    style="">{{tag}}</el-tag>
                                                        </li>
                                                    </ul>
                                                </row>
                                                <div>
                                                    <ul style="list-style-type: none">
                                                        <li v-for="category in categories"
                                                            style="display: block;
                                                                    float: right;
                                                                    margin: 0 0 5px 5px">
                                                            <el-tag size="small"
                                                                    type="warning"
                                                                    :key="category"style="">{{category}}</el-tag>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="post-content">
                                        <p style="text-align: center;"><strong>Watch video:</strong></p>
                                        <p style="text-align: center;">
                                            <iframe width="560" height="315" src="https://www.youtube.com/embed/C9U419Htbmc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>



                                               <strong>How to make:</strong></p>
                                        <p style="text-align: center;"><img class="aligncenter size-full wp-image-68531" src="http://krokotak.com/wp-content/uploads/2017/09/2-13.jpg" alt="" width="595" height="1276" srcset="http://krokotak.com/wp-content/uploads/2017/09/2-13.jpg 595w, http://krokotak.com/wp-content/uploads/2017/09/2-13-140x300.jpg 140w, http://krokotak.com/wp-content/uploads/2017/09/2-13-477x1024.jpg 477w, http://krokotak.com/wp-content/uploads/2017/09/2-13-173x372.jpg 173w, http://krokotak.com/wp-content/uploads/2017/09/2-13-269x576.jpg 269w, http://krokotak.com/wp-content/uploads/2017/09/2-13-326x700.jpg 326w" sizes="(max-width: 595px) 100vw, 595px"></p>
                                        <p style="text-align: center;">&nbsp;printable templates:</p>
                                        <p><a href="http://print.krokotak.com/p?x=05bfe34161c64292924bc6ca437a267f"><img class="wp-image-68536 size-medium alignleft" src="http://krokotak.com/wp-content/uploads/2017/09/pum-212x300.jpg" alt="" width="212" height="300" srcset="http://krokotak.com/wp-content/uploads/2017/09/pum-212x300.jpg 212w, http://krokotak.com/wp-content/uploads/2017/09/pum-263x372.jpg 263w, http://krokotak.com/wp-content/uploads/2017/09/pum.jpg 271w" sizes="(max-width: 212px) 100vw, 212px"></a></p>
                                        <p style="text-align: center;"><a href="http://print.krokotak.com/p?x=b1348c74aa274e1ba125be565a257e15"><img class="wp-image-68537 size-medium alignleft" src="http://krokotak.com/wp-content/uploads/2017/09/sk-212x300.jpg" alt="" width="212" height="300" srcset="http://krokotak.com/wp-content/uploads/2017/09/sk-212x300.jpg 212w, http://krokotak.com/wp-content/uploads/2017/09/sk-263x372.jpg 263w, http://krokotak.com/wp-content/uploads/2017/09/sk.jpg 271w" sizes="(max-width: 212px) 100vw, 212px"></a></p>
                                    </div>
                                </div>
                            </v-sheet>
                        </div>

                        <div style="max-width: 950px;
                                        margin: 20px auto 20px auto;">
                            <div style="text-align: left">
                                <h3>推荐购买</h3>
                            </div>
                            <v-sheet
                                    color="white"
                                    elevation="4"
                                    height="auto"
                                    :rounded=true
                                    width="100%"
                                    style="padding: 5px 0 10px 5px">
                                <el-row style="margin-top: 5px">
                                    <el-col :span="12">
                                        <test></test>
                                    </el-col>
                                    <el-col :span="12">
                                        <goods-detail :goods-item="goods"></goods-detail>
                                    </el-col>
                                </el-row>
                            </v-sheet>
                        </div>
                        <div style="max-width: 950px;
                                        margin: 20px auto 20px auto;">
                            <div style="text-align: left">
                                <h3>留言</h3>
                            </div>
                            <v-sheet
                                    color="white"
                                    elevation="4"
                                    height="auto"
                                    :rounded=true
                                    width="100%"
                                    style="padding: 5px 0 10px 5px">
                                <el-row style="padding: 50px">
                                    <review :dataList="dataList"></review>
                                </el-row>
                            </v-sheet>
                        </div>
                    </div>
                </div>

            </el-aside>
            <el-main style="margin: 0; padding: 0">
                <el-card class="box-card" style=" background: #F5F8FA; height: auto;
                                            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                                            border-radius: 0 0 0 60px">
                    <popular-posts :popular-posts="PopularPosts"> </popular-posts>
                </el-card>


            </el-main>
        </el-container>
    </div>
</template>

<script>

    import Test from "./childComps/Test";
    import GoodsDetail from "./childComps/GoodsDetail";
    import PopularPosts from "./childComps/PopularPosts";
    import Review from "components/content/review/Review";
    import CategoryNav from "components/content/categoryNav/CategoryNav";
    import dataList from './data.json'

    export default {
        name: "Article",
        components: {
           /* ArticleSwiper,

            VideoPlayTest*/
            Test,
            GoodsDetail,
            Review,
            PopularPosts,
            CategoryNav
        },
        data(){
            return{
                PopularPosts: [
                    {
                        id: "1",
                        image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
                        title: "SPRING WREATH",
                        date: "2020/02/04"
                    },
                    {
                        id: "2",
                        image: "http://krokotak.com/wp-content/uploads/2021/04/airplanecraft2-150x150.jpg",
                        title: "PAPER AIRPLANE",
                        date: "2020/02/04"
                    },
                    {
                        id: "3",
                        image: "http://krokotak.com/wp-content/uploads/2021/03/paperSun2-1-150x150.jpg",
                        title: "SPRING WREATH",
                        date: "2020/02/04"
                    },
                    {
                        id: "4",
                        image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
                        title: "SPRING WREATH",
                        date: "2020/02/04"
                    },
                    {
                        id: "5",
                        image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
                        title: "SPRING WREATH",
                        date: "2020/02/04"
                    },
                    {
                        id: "6",
                        image: "http://krokotak.com/wp-content/uploads/2021/04/airplanecraft2-150x150.jpg",
                        title: "PAPER AIRPLANE",
                        date: "2020/02/04"
                    },
                    {
                        id: "7",
                        image: "http://krokotak.com/wp-content/uploads/2021/03/paperSun2-1-150x150.jpg",
                        title: "SPRING WREATH",
                        date: "2020/02/04"
                    },
                    {
                        id: "8",
                        image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
                        title: "SPRING WREATH",
                        date: "2020/02/04"
                    },

                    {
                        id: "9",
                        image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
                        title: "SPRING WREATH",
                        date: "2020/02/04"
                    },
                    {
                        id: "10",
                        image: "http://krokotak.com/wp-content/uploads/2021/04/airplanecraft2-150x150.jpg",
                        title: "PAPER AIRPLANE",
                        date: "2020/02/04"
                    },
                    {
                        id: "11",
                        image: "http://krokotak.com/wp-content/uploads/2021/03/paperSun2-1-150x150.jpg",
                        title: "SPRING WREATH",
                        date: "2020/02/04"
                    },
                    {
                        id: "12",
                        image: "http://krokotak.com/wp-content/uploads/2021/03/springwrearh-150x150.jpg",
                        title: "SPRING WREATH",
                        date: "2020/02/04"
                    },


                ],
                dataList,
                starStatus: true,
                star: 199,
                tags: ["halloween","hand","pumpkin","skeleton","hand","pumpkin","skeleton"],
                categories:["With hands and feet", "paper toys", "halloween", "educational activities", "back to school"],
                goods: {
                    title: "diy小屋手工微景观小房子咖啡屋花房拼装店铺摆件礼物女微缩模型",
                    payMethod: [
                        {
                            id: 1,
                            label:  "支付宝",
                        },
                        {
                            id: 2,
                            label:  "微信支付",
                        },
                    ],
                    spec: [
                        {
                            label: "尺码",
                            isImage: false,
                            option: [
                                {
                                    id: 1,
                                    alt: "36",
                                    arc: "",
                                    disabled: false
                                },
                                {
                                    id: 2,
                                    alt: "38",
                                    arc: "",
                                    disabled: true
                                },
                                {
                                    id: 3,
                                    alt: "40",
                                    arc: "",
                                    disabled: false
                                },
                                {
                                    id: 4,
                                    alt: "42",
                                    arc: "",
                                    disabled: false
                                },
                                {
                                    id: 5,
                                    alt: "44",
                                    arc: "",
                                    disabled: true
                                },
                                {
                                    id: 6,
                                    alt: "42",
                                    arc: "",
                                    disabled: false
                                },
                                {
                                    id: 7,
                                    alt: "44",
                                    arc: "",
                                    disabled: true
                                },
                            ]
                        },
                        {
                            label: "颜色分类",
                            isImage: true,
                            option: [
                                {
                                    id: '1',
                                    src: 'https://unsplash.it/200?random',
                                    alt: 'Alt Image 1',
                                    disabled: true
                                },
                                {
                                    id: '2',
                                    src: 'https://unsplash.it/200?random',
                                    alt: 'Alt Image 2',
                                    disabled: false
                                },
                                {
                                    id: '3',
                                    src: 'https://unsplash.it/200?random',
                                    alt: 'Alt Image 2',
                                    disabled: true
                                },
                                {
                                    id: '4',
                                    src: 'https://unsplash.it/200?random',
                                    alt: 'Alt Image 2',
                                    disabled: false
                                },
                               /* {
                                    id: "5",
                                    alt: "黑色",
                                    arc:  'https://unsplash.it/200?random',
                                    disabled: true
                                },
                                {
                                    id: "6",
                                    alt: "黑色升级版",
                                    arc: 'https://unsplash.it/200?random',
                                    disabled: true
                                },
                                {
                                    id: "7",
                                    alt: "湖蓝",
                                    disabled: false,
                                    arc: 'https://unsplash.it/200?random',
                                },
                                {
                                    id: "8",
                                    alt: "湖蓝升级版",
                                    disabled: true,
                                    arc: 'https://unsplash.it/200?random',
                                },
                                {
                                    id: "9",
                                    alt: "黄色",
                                    disabled: false,
                                    arc: 'https://unsplash.it/200?random',
                                },
                                {
                                    id: "10",
                                    alt: "黄色升级版",
                                    disabled: false,
                                    arc: 'http://image5.suning.cn/uimg/b2c/newcatentries/0070130691-000000000826244625_5_800x800.jpg',
                                },*/
                            ]
                        },
                    ],
                    skus: [
                        {
                            title: "红色",
                            image: "http://image5.suning.cn/uimg/b2c/newcatentries/0070130691-000000000826244625_5_800x800.jpg",
                            price: 2557.89,
                            stock: 345,
                            ownSpec: {

                            }
                        },
                        {
                            title: "红色",
                            image: "http://image5.suning.cn/uimg/b2c/newcatentries/0070130691-000000000826244625_5_800x800.jpg",
                            price: 3000.89,
                            stock: 123,
                        }

                    ]
                }
            }
        },
        methods: {
            cancelLike() {
                this.starStatus = false;
                this.star--;
            },
            giveLike() {
                this.starStatus = true;
                this.star+=1;
            }
        },
        mounted() {
            console.log(this.dataList);
        }
    }
</script>

<style scoped>

</style>