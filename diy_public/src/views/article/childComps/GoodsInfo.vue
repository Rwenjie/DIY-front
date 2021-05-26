<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/26
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/26
 -->

<template>
    <div id="goods-info">
        <el-row style="margin-top: 5px">
            <el-col :span="12">
                <image-video-swipe :video="goodsInfo.video" :images="goodsInfo.images"></image-video-swipe>
            </el-col>
            <el-col :span="12">
                <goods-detail :goods="goodsInfo" :articleId="articleId"></goods-detail>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import GoodsDetail from "./GoodsDetail";

    import ImageVideoSwipe from "./ImageVideoSwipe";
    import {getItemByArticle} from "../../../network/item";
    export default {
        name: "GoodsInfo",
        components: {
            ImageVideoSwipe,
            GoodsDetail
        },
        props:{
            articleId: {
                type: String,
                default(){
                    return ""
                }
            }
        },
        data() {
            return {
                goodsInfo: {},
            }
        },
        methods: {
            loadGoodsInfo() {
                getItemByArticle(this.articleId).then( res => {
                    this.goodsInfo = res.data;
                    this.goodsInfo.spec = JSON.parse(this.goodsInfo.spec);
                })
            }
        },
        mounted() {
            this.loadGoodsInfo()
        },


    }
</script>

<style scoped>

</style>