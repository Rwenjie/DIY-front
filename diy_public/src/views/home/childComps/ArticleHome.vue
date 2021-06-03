<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/6/3
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/6/3
 -->

<template>
    <div id="article-home">
        <div ref="waterfall" class="waterfall-width-js">
            <div ref="container" class="container">
                <div class="image-col" v-for="(col, index) in articleList" :key="index">
                    <div class="image-box" v-for="(article, id) in col" :key="id">
                        <img :src="article.image" alt="" @click="toArticle(article.id)" />
                        <div>
                            <h3>{{article.title}}</h3>
                            <p>{{article.brief}}</p>
                            <el-row>
                                <el-col :span="12">
                                    <span v-if="starStatus">
                                        <v-btn icon color="red" @click="cancelLike">
                                            <v-icon>mdi-star</v-icon>
                                            </v-btn>
                                         <span style="margin-top: 5px">{{article.star}}</span>
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <div style="text-align: right">
                                        <span style="text-align: right;margin-right: 10px">{{article.category.label}}</span>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getArticle} from "../../../network/item";

    export default {
        name: "ArticleHome",
        data() {
            return {
                articleList: [],
                resizeRender: null,
                colWidth: 300,
                imgList: [],
                colNumbers: 4,
                goodsList: [],
                starStatus: true,
                star: 199,
            }
        },
        methods: {
            //计算图片列数
            getColNumbers() {
                let clientWidth = this.$refs.waterfall.clientWidth;
                //this.colNumbers = Math.floor(clientWidth / this.colWidth);
                /* this.$refs.container.style.marginLeft =
                     (clientWidth - this.colWidth * this.colNumbers) / 2 + 'px'*/
            },
            //读取图片
            /*loadImage() {
                this.getColNumbers();
                for (let i = 0; i < 12; i++) {
                    let colIndex = i % this.colNumbers;
                    //let url = require(`@/assets/images/${i}.jpg`)
                    if (this.imgList[colIndex]) {
                        this.imgList[colIndex].push(url)
                    } else {
                        this.$set(this.imgList, colIndex, [url])
                    }
                }
            },*/
            resize() {
                this.imgList = [];
                //this.loadImage()
            },

            /**
             * 网络请求相关方法
             */
            cancelLike() {
                this.starStatus = false;
                this.star--;
            },
            giveLike() {
                this.starStatus = true;
                this.star+=1;
            },
            toArticle(id) {
                this.$router.push("article/" + id)
            },
            loadArticle() {
                let dataLen = 0;
                getArticle().then( res => {
                    const art = res.data;
                    for (let i=0; i<12; i++) {
                        const data = {
                            image: require(`@/assets/images/${i}.jpg`),
                            title: "文章标题",
                            look: 43,
                            star: 54,
                            brief: "超简单母亲节相片卡片手工制作教程",
                            category: {
                                label: "绘画"
                            }
                        };
                        art.push(data)
                    }
                    /*this.article.push(...res.data);*/
                    for (let i = 0; i<art.length; i++) {
                        let colIndex = i % this.colNumbers;
                        if (this.articleList[colIndex]) {
                            this.articleList[colIndex].push(art[i])
                        } else {
                            this.$set(this.articleList, colIndex, [art[i]])
                        }
                    }
                });
                /*  for (let i = 0; i < 12; i++) {
                      let colIndex = i % this.colNumbers;

                      if (this.articleList[colIndex]) {
                          this.articleList[colIndex].push(data)
                      } else {
                          this.$set(this.articleList[colIndex], colIndex, [data])
                      }
                  }*/
            }
        },
        created() {
            //加载文章信息
            this.loadArticle();
        },
        mounted() {
            this.resizeRender = throttle(this.resize, 200);
            window.addEventListener('resize', this.resizeRender)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resizeRender)
        },
    }
</script>

<style lang="scss" scoped>

    .container {
        max-width: 1330px;
        margin: 0 auto;
    }
    #home {
        background-color: #F5F8FA;
    }
    .waterfall-width-js {
        margin: 0 auto;
        overflow: hidden;
    }
    .image-col {
        float: left;
        width: 320px;
        .image-box {
            margin: 10px 5px;
        }
        img {
            display: block;
            width: 98%;
        }
    }
</style>
