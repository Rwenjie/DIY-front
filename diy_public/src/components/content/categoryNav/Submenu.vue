<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/17
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/17
 -->

<template>
    <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.id+''">
        <template slot="title">{{menu.name}}</template>
        <sub-menu v-for="(submenu, id) in menu.children" :menu="submenu"/>
    </el-submenu>
    <el-menu-item v-else :index="menu.id + ''">
        {{menu.name}}
    </el-menu-item>
</template>

<script>
    import SubMenu from "./Submenu"
    export default {
        name: "SubMenu",
        components:{
            SubMenu
        },
        props: {
            menu: {
                type: Object,
                default() {
                    return null;
                }
            },
            menusName: {
                type: String,
                default() {
                    return ""
                }
            }
        }
    }
</script>

<style scoped>

</style>