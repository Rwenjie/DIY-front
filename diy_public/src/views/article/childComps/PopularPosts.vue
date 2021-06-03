<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/14
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/14
 -->

<template>
    <div id="popular-posts">
        <div style="text-align: left; border-bottom: #dcdee2 solid 2px; margin-top: 50px" >
            <el-avatar
                    shape="square"
                    size="large"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
            </el-avatar>
            <span style="font-size: x-large;
                        display: inline-block;
                        font-weight: bolder;
                        line-height: 15px;
                        margin-left: 15px">RenZY</span>
        </div>
        <div style="margin-bottom: 50px">
            <div style="margin: 15px 0">
                <el-button round style="width: 100px; height: 35px">关注用户</el-button>
                <el-button round style="width: 100px; height: 35px">私信</el-button>
            </div>

        </div>

        <div class="tptn_posts_daily" style="margin-bottom: 50px">
            <div style="text-align: left; margin-bottom: 20px">
                <b >Popular Posts</b>
            </div>
            <ul style="padding-left: 0">
                <li v-for="item in PopularPosts">
                    <el-image
                            style="display: block;float: left; width: 20%; margin-right: 20px"
                            :src="item.image"
                            fit="cover">
                    </el-image>
                    <span style="display: block;  width: 80%;  margin-left:15px; padding-left: 10px">
                        <a href="#" style="display: block;
                                        font-size: 11px;
                                        color: #428bca;
                                        background: transparent;
                                        text-decoration: none;">{{item.title}}</a>
                        <span style="font-size: 9px;
                                    color: #899caf;">{{item.date}}</span>
                    </span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: "PopularPosts",
        components: {

        },
        props: {
            PopularPosts: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>

    .tptn_posts_daily ul li {
        margin-bottom: 10px;
        padding-bottom: 30px;
        border-bottom: 1px solid #ccd4db;
        text-align: left;
    }
</style>