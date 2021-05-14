<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/2
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/2
 -->

<template>
    <div id="profile">
        <el-container >
            <el-aside style="border: 1px solid red;" width="250px">
                <v-card
                        class="mx-auto"
                        width="300">
                    <v-list>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item>

                        <!--一级-->
                        <v-list-group
                                :value="true"
                                v-for="(item, id) in items"
                                v-key="id"
                                prepend-icon="mdi-account-circle">
                            <template v-slot:activator>
                                <v-list-item-title>{{item.title}}</v-list-item-title>
                            </template>
                            <!--二级-->
                            <v-list-item
                                    v-for="(subItem, i) in item.items"
                                    :key="i"
                                    :to="basePath + item.path + subItem.path"
                                    link>
                                <v-list-item-title v-text="subItem.title"></v-list-item-title>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-card>
<!--                <v-toolbar flat class="transparent">
                    <v-list class="pa-0">
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <img src="/assets/2.jpeg">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>文攀</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>
                <v-divider/>-->
                <!-- 左侧菜单 -->

            </el-aside>

            <el-main style="border: 1px solid red;">
                <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item >{{item1}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{item2}}</el-breadcrumb-item>
                </el-breadcrumb>
                <div style="margin-top: 12px">
                        <!--定义一个路由锚点，Layout的子组件内容将在这里展示-->
                    <router-view/>

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
                        action: "ab-testing",
                        title: "个人信息",
                        path:"/info",
                        items: [{ title: "修改个人信息", path: "/detail" },
                            { title: "修改密码", path: "/pwd" },]
                    },
                    {
                        action: "ab-testing",
                        title: "我的关注",
                        path:"/follow",
                        items: [
                            { title: "关注的文章", path: "/article" },
                            { title: "关注的用户", path: "/user" },
                        ]
                    },
                    {
                        action: "ab-testing",
                        title: "商品",
                        path:"/items",
                        items: [
                            { title: "我发布的的", path: "/listing" },
                            { title: "我买到的", path: "/order" },
                        ]
                    },
                    {
                        action: "ab-testing",
                        title: "文章",
                        path:"/article",
                        items: [
                            { title: "我发布的的", path: "/listing" },
                            { title: "发布新文章", path: "/editor" },
                        ]
                    }
                ]
            }
        },
        computed: {
            items() {
                return this.menus;
            },
            item1() {
                const arr = this.$route.path.split("/");
                console.log(arr);
                console.log(this.menuMap[arr[2]]);
                return this.menuMap[arr[2]].name;
            },
            item2() {
                const arr = this.$route.path.split("/");
                return this.menuMap[arr[2]][arr[3]];
            }
        },
        watch: {},
        created() {
            this.menus.forEach(m => {
                const p1 = m.path.slice(1);
                this.menuMap[p1] = {name: m.title};
                m.items.forEach(i => {
                    this.menuMap[p1][i.path.slice(1)] = i.title;
                })
                console.log(this.menuMap);
            })
        }
    }
</script>

<style scoped>

</style>