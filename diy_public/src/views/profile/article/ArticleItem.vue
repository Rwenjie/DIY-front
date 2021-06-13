<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/6/3
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/6/3
 -->

<template>
    <div id="article-item" style="text-align: left; margin: 25px 0">
        <v-card style="width: 100%; padding: 10px 20px" >
            <div class="card" >
                <div class="card-header">
                    <h4 class="card-title"><a href="#">{{article.title}}</a></h4>
                    <div></div>
                </div>

                <div class="card-body">

                    <div style="display: flex;flex-direction: row">
                        <div style="width: 75%;">
                            <el-divider content-position="left" style="width: 90%">{{article.createTime}}</el-divider>
                            <h6 class="card-subtitle mb-2 text-muted">
                       <!--         <span v-if=isMySelf class="artic-tie">原创</span>
                                <span v-else class="arctic-tie">转载</span>-->
                        <!--        <span class="arctic-tie">{{time}}</span>
                                <span class="arctic-tie">{{author}}</span>
                                <span class="arctic-tie">{{category}}</span>-->
                            </h6>
                            <p class="card-text">{{article.brief}}</p>
                        </div>
                        <div style="width: 25%; ">
                            <el-image
                                    style="width: 100%; height: 100%"
                                    :src="article.image"
                                    fit="cover"></el-image>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div style="display: flex;flex-direction: row">
                        <div style="width: 70%">
                            <el-button @click="toArticle(article.id)" type="text">
                                阅读全文 ==>
                            </el-button>
                        </div>
                        <div style="width: 30%">
                            <el-button @click="toEditor(article.id)" type="text">
                                编辑 ==>
                            </el-button>
                        </div>
                    </div>

                </div>
            </div>
        </v-card>

    </div>
</template>

<script>
    export default {
        name: "ArticleItem",
        props:{
            article: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return{
                title: "愿你编码半生，归来仍是少年",
                isMySelf: true,
                time: "2020-07-07",
                category: "设计模式",
                author: "Rwenjie",
                tags: ['设计模式', 'java']
            }
        },
        methods: {
            articleClick(){
                this.$router.replace('/article',() => {}, () => {})
            },
            toArticle(aid) {
                this.$router.push("/article/"+aid)
            },
            toEditor(aid) {
                this.$router.push("editor/"+aid)
            }

        }
    }
</script>

<style scoped>

    a{
        color: #666666;
        text-decoration: none;
    }
    a:link {text-decoration:none;}
    a:active {text-decoration:none }
    a:visited {text-decoration:none;}
    a:hover {text-decoration:none;}

    .card-title{
        padding-top: 15px;
        padding-left: 15px;
    }
    .articles{
        padding-bottom: 30px;
    }
    .card-header, .card-footer{
        height: 40px;
    }
    .arctic-tie{
        padding-left: 10px;
    }
</style>