<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/14
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/14
 -->

<template>
    <div id="category-nav" style="text-align: center">
        <div class="line"/>
        <div class="category-menu">
            <el-menu :default-active="activeIndex"
                     class="el-menu-demo"
                     style="width: auto; text-align: center"
                     mode="horizontal"
                     @select="handleSelect">
                <sub-menu v-for="(menu, id) in categories" :menu="menu" :key="id"/>
            </el-menu>
        </div>

        <div class="line"/>

    </div>
</template>

<script>

    import SubMenu from "./Submenu";
    import {mapGetters} from 'vuex'

    export default {
        name: "CategoryNav",
        components: {
            SubMenu
        },
        computed:{
           ...mapGetters({
               categories: 'categories'
           })
        },
        data() {
            return {
                menuHtml: '',
                activeIndex: '1',
                activeIndex2: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        },
        mounted() {
        }

    }
</script>

<style scoped>

    #category-nav {
        width: 100%;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .category-menu {
        width: 90%;
        background-color:  #F5F8FA;
        margin: 0px auto;
    }
</style>