<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/5
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/5
 -->

<template>
    <div id="article-list" style="width: 95%; margin: 0 auto">
        <v-toolbar class="elevation-0">
            <v-btn small color="primary" to="editor">发布新的文章</v-btn>
            <v-spacer/>
            <v-flex xs4>
                状态：
                <v-btn-toggle mandatory v-model.lazy="filter.status">
                    <v-btn text :value="0">
                        全部
                    </v-btn>
                    <v-btn text :value=1>
                        待审核
                    </v-btn>
                </v-btn-toggle>
            </v-flex>
            <v-flex xs3>
            </v-flex>
        </v-toolbar>
        <article-item v-for="(article, id) in activeArticle" :article="article" :key="id"></article-item>
    </div>
</template>

<script>
    import {getArticleByUser} from "../../../network/article";
    import ArticleItem from "./ArticleItem";
    export default {
        name: "ArticleList",
        components: {
            ArticleItem,
        },
        data() {
            return{
                filter: {
                    saleable: true, // 上架还是下架
                    search: '', // 搜索过滤字段
                    status: 0,
                },
                toAudit: [],
                headers: [
                    {text: 'id', align: 'center', sortable: false, value: 'id'},
                    {text: '标题', align: 'center', sortable: false, value: 'title'},
                    {text: '关联文章', align: 'center', sortable: false, value: 'article.label'},
                    {text: '状态', align: 'center', value: 'status', sortable: true,},
                    {text: '操作', align: 'center', value: 'options', sortable: false}
                ],
                articleList: [],
                activeArticle: [],
            }
        },
        methods: {
            //跳转编辑文章
            editorArticle() {
                this.$route.push("/article/editor")
            }
        },
        mounted() {
            getArticleByUser().then(res => {
                this.articleList.push(...res.data);
                this.activeArticle = this.articleList
                console.log(res);
                this.toAudit=res.data.filter( (article) => {
                    return article.state == 1;
                })
            })
        },
        watch: {
            filter: {
                deep:  true,
                handler() {
                    if (this.filter.status == 0) {
                        this.activeArticle = this.articleList;
                    }else if (this.filter.status == 1) {
                        this.activeArticle = this.toAudit;
                    }

                }
            }
        }
    }
</script>

<style scoped>

</style>