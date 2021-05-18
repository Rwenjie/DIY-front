<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/14
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/14
 -->

<template>
    <div id="popular-posts">
       <b>Popular Posts</b>
        <div class="tptn_posts_daily">
            <ul>
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
                        <span style="    font-size: 9px;
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
        padding-bottom: 10px;
        border-bottom: 1px solid #ccd4db;
        text-align: left;
    }
</style>