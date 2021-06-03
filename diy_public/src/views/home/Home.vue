<template>
    <div id="home">
        <category-nav ></category-nav>
        <el-button @click="show = !show">
            换
        </el-button>

        <transition name="fade">

            <article-home v-if="show" ></article-home>
            <goods-home v-else></goods-home>
        </transition>
    </div>

</template>
<script>

    import CategoryNav from "components/content/categoryNav/CategoryNav";

    import ArticleHome from "./childComps/ArticleHome";
    import GoodsHome from "./childComps/GoodsHome";

    export default {
        name: 'Home',
        components: {
            CategoryNav,
            ArticleHome,
            GoodsHome
        },

        data() {
            return {
                show: true,
            }
        },
        methods: {}

    }
</script>
<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

</style>
