<template>
    <div id="article-list" style="width: 95%; margin: 0 auto; text-align: left">
        <article-list-item v-for="(article, id) in activeArticle" :article="article" :key="id"></article-list-item>
    </div>
</template>

<script>
    import {getStarArticle} from "../../network/article";
    import ArticleListItem from "./ArticleListItem";
    export default {
        name: "ArticleList",
        components: {
            ArticleListItem,
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
        },
        mounted() {
            getStarArticle().then(res => {
                this.articleList.push(...res.data);
                this.activeArticle = this.articleList
                console.log(res);
                this.toAudit=res.data.filter( (article) => {
                    return article.state == 1;
                })
            })
        },
    }
</script>

<style scoped>

</style>
