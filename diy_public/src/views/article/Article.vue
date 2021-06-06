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
            <el-aside  width="80%" style="height: auto; ">
                <div style="padding: 30px 40px 15px" >
                    <v-divider></v-divider>
                    <div style="max-width: 950px;
                                margin: 0 auto">
                        <!--<div style="margin-bottom: 5px"><i class="el-icon-caret-top"></i></div>
                        <div style="margin-bottom: 5px">上一篇</div>
                        <div style="margin-bottom: 5px">编码字母-让我们成为侦探</div>-->


                        <div style="padding-top: 30px">
                            <div style="text-align: left; width: 40px; float: left">
                                <a href="javascript:void(0)" @click="goAnchor('production')">

                                    <el-tooltip v-if="article.sell==1" class="item" effect="dark" content="直接去购买" placement="top">
                                        <v-btn icon>
                                            <v-icon>mdi-basket-fill</v-icon>
                                        </v-btn>
                                    </el-tooltip>
                                    <el-tooltip v-else class="item" effect="dark" content="该DIY暂时没有商品出售" placement="top">
                                        <v-btn icon>
                                            <v-icon>mdi-basket-fill</v-icon>
                                        </v-btn>
                                    </el-tooltip>

                                </a>
                            </div>
                            <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
                                <el-breadcrumb-item v-for="(ca, id) in categoryPath" :key="id">{{ca.label}}</el-breadcrumb-item>
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
                                        <a href="http://krokotak.com/2015/07/coded-letter-lets-be-detectives/">{{article.title}}</a>
                                    </h1>
                                    <div class="post-meta-top" style="border-bottom: 1px solid #e0e0e0;
                                                                            border-top: 1px solid #e0e0e0;
                                                                            padding: 15px 0px;
                                                                             margin-bottom: 30px;">
                                        <el-row>
                                            <el-col :span="12">
                                                <div style="text-align: left">
                                                    <span v-if="starStatus">
                                                        <v-btn icon color="red" @click="cancelStar">
                                                            <v-icon>mdi-star</v-icon>
                                                        </v-btn>
                                                        <span style="margin-top: 5px">{{article.star}}人点赞</span>
                                                    </span>
                                                    <span v-else>
                                                        <v-btn icon color="red" @click="giveStar">
                                                            <v-icon>mdi-star-outline</v-icon>
                                                        </v-btn>
                                                        <span>{{article.star}}人点赞</span>
                                                    </span>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div>
                                                    <ul style="list-style-type: none; float: right">
                                                        <li v-for="tag in tags"
                                                            style="display:inline;
                                                                    margin: 0 0 5px 5px">
                                                            <el-tag size="small"
                                                                    :key="tag.id"
                                                                    style="">{{tag.label}}</el-tag>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <ul style="list-style-type: none">
                                                        <li v-for="category in categories"
                                                            style="display: inline;
                                                                    float: right;
                                                                    margin: 0 0 5px 5px">
                                                            <el-tag size="small"
                                                                    type="warning"
                                                                    :key="category.id"style="">{{category.name}}</el-tag>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="post-content">
                                    <div style="text-align: left" v-html=article.text>
                                    </div>
                                    </div>
                                </div>
                            </v-sheet>
                        </div>

                        <div v-if="article.sell==1" class="production-box" id="production">
                            <span class="item-name"></span>
                        </div>
                        <div v-if="article.sell==1" style="max-width: 950px;
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
                                    <goods-info :articleId="articleId"></goods-info>
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
                                    <r-comment :articleId="articleId"></r-comment>
                                    <!--<review :dataList="dataList"></review>-->
                                    <!--<r-comment :articleId="cb6e6cad-bb02-46f6-8640-055473d451d9"></r-comment>-->
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
                    <popular-posts :popular-posts="PopularPosts" :ArticleUserId="article.userId"> </popular-posts>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>

    import Test from "./childComps/Test";
    import PopularPosts from "./childComps/PopularPosts";
    import Review from "components/content/review/Review";
    import GoodsInfo from "./childComps/GoodsInfo";
    import CategoryNav from "components/content/categoryNav/CategoryNav";
    import {cancelStar, getArticleById, getStar, getStarState} from "../../network/article";
    import {getAllCategory, getTagById, getCategoryById} from "../../network/common";

    export default {
        name: "Article",
        components: {
            GoodsInfo,
            Test,
            Review,
            PopularPosts,
            CategoryNav,
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
                starStatus: false,
                star: 199,
                tags: [],
                categories:[],
                goods: [],
                categoryPath: [],
                articleId: this.$route.params.articleId,
                article: {},
            }
        },
        methods: {
            cancelStar() {
                if (window.sessionStorage.getItem("tokenStr")!=null) {
                    cancelStar(this.articleId).then( res => {
                        this.article.star -= 1;
                        this.getStarState();
                    });
                }

            },
            giveStar() {
                if (window.sessionStorage.getItem("tokenStr")!=null) {
                    getStar(this.articleId).then( res => {
                        this.article.star += 1;
                        this.getStarState();
                    });
                }

            },
            getStarState() {
                if (window.sessionStorage.getItem("tokenStr")!=null) {
                    getStarState(this.articleId).then( res => {
                        console.log("点赞状态"+res);
                        console.log(res);
                        this.starStatus = res.data;
                    })
                }

            },
            loadTagList(){
                if (this.article.tags!="") {
                    let tagList= this.article.tags.split(',');
                    tagList.forEach( (tag) => {
                        if (tag!=""){
                            getTagById(tag).then( res => {
                                this.tags.push(res.data)
                            })
                        }
                    });
                }
            },
            subCategory(){
                if (this.article.subCategory!=""){
                    let cateList = this.article.subCategory.split(',');
                    console.log(cateList);
                    cateList.forEach( (cate) => {
                        if (cate!="") {
                            getCategoryById(cate).then( res => {
                                this.categories.push(res.data);
                            })
                        }
                    })
                }
            },
            loadArticleInfo() {
                getArticleById(this.articleId).then( res => {
                    this.article = res.data;
                    //获得文章的分类信息
                    this.loadCategory(res.data.categoryId);
                    //获得用户是否star该文章
                    this.getStarState();
                    this.loadTagList();
                    this.subCategory();
                });
            },
            loadCategory(cid) {
                getAllCategory(cid).then( res=> {
                    this.categoryPath = res.data;
                })
            },
            goAnchor(id) {
                var anchor = document.getElementById(id);
                // chrome
                document.body.scrollTop = anchor.offsetTop;
                // firefox
                document.documentElement.scrollTop = anchor.offsetTop;
                // safari
                window.pageYOffset = anchor.offsetTop;
            }
        },
        mounted() {
            this.loadArticleInfo();
        },
    }
</script>

<style scoped>
    .content {
        height: 100%;
    }
    .backtop {
        overflow: scroll;
        height: 100%;
    }
</style>