<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/2
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/2
 -->

<template>
    <div id="profile">
        <el-container style="height: 717px">
            <el-aside style="border: 1px solid #e0e0e0; height: 100%" width="250px">
                <v-card
                        class="mx-auto"
                        style="height: 100%"
                        width="300">
                    <v-list>
                        <v-list-item
                                style="border-bottom: 1px solid #e0e0e0"
                                to="/home">
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item>

                        <!--一级-->
                        <v-list-item
                                style="border-bottom: 1px solid #e0e0e0"
                                v-for="(item, id) in items"
                                :key="id"
                                :to="basePath + item.path">
                            <v-list-item-icon>
                                <v-icon>{{item.action}}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{item.title}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </el-aside>

            <el-main style="border: 1px solid #e0e0e0">
                <div style="margin-top: 12px">
                        <!--定义一个路由锚点，Layout的子组件内容将在这里展示-->
                    <keep-alive>
                        <router-view/>
                    </keep-alive>

                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        components: {
        },
        data() {
            return {
                dark: false,// 是否暗黑主题
                drawer: true,// 左侧导航是否隐藏
                miniVariant: false,// 左侧导航是否收起
                menuMap: {},
                basePath: "/profile",
                menus: [
                    {
                        action: "mdi-lock-reset",
                        title: "修改密码",
                        path:"/info/pwd",
                    },
                    {
                        action: "mdi-account-cog",
                        title: "我的信息",
                        path:"/info/detail",
                    },
                    {
                        action: "mdi-data-matrix-edit",
                        title: "编辑文章",
                        path:"/article/editor",
                    },
                    {
                        action: "mdi-cart-variant",
                        title: "购物车",
                        path:"/cart/listing",

                    },
                    {
                        action: "mdi-shopping",
                        title: "我的商品",
                        path: "/items/listing"
                    },
                    {
                        action: "mdi-text-box-check-outline",
                        title: "订单",
                        path:"/items/order",
                    },
                    {
                        action: "mdi-text-box-check-outline",
                        title: "售出订单",
                        path:"/sell/order",
                    },
                    {
                        action: "mdi-file",
                        title: "我的文章",
                        path:"/article/listing",
                    },
                    {
                        action: "mdi-star-plus",
                        title: "收藏的文章",
                        path:"/follow/article",
                    },
                    {
                        action: "mdi-map-marker-plus",
                        title: "收货地址",
                        path:"/address",
                    },
                ]
            }
        },
        computed: {
            items() {
                return this.menus;
            },
        },
        watch: {},
    }
</script>

<style scoped>

</style>