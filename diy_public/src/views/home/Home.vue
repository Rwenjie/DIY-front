<template>
    <div id="home">

        <category-nav></category-nav>

        <div ref="waterfall" class="waterfall-width-js">
            <div ref="container" class="container">
                <div class="image-col" v-for="(col, index) in imgList" :key="index">
                    <div class="image-box" v-for="img in col" :key="img">
                        <img :src="img" alt="" />
                        <div>
                            <h3>文章标题</h3>
                            <p>diy数字油画定制手绘油彩画手工填色填充照片定做油画礼物装饰画</p>
                            <el-row>
                                <el-col :span="12">
                                    <span v-if="starStatus">
                                        <v-btn icon color="red" @click="cancelLike">
                                            <v-icon>mdi-star</v-icon>
                                            </v-btn>
                                         <span style="margin-top: 5px">199人收藏</span>
                                    </span>
                                    <span v-else>
                                        <v-btn icon color="red" @click="giveLike">
                                            <v-icon>mdi-star-outline</v-icon>
                                            </v-btn>
                                         <span>199人收藏</span>
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <div style="text-align: right">
                                        <span style="text-align: right;margin-right: 10px">￥199.00</span>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>

    import CategoryNav from "components/content/categoryNav/CategoryNav";

    import { throttle } from '@/utils/utils'
    import {getAllGoods} from "../../network/item";
    export default {
        name: 'Home',
        components: {
            CategoryNav
        },

        data() {
            return {
                resizeRender: null,
                colWidth: 310,
                imgList: [],
                colNumbers: 0,
                goodsList: [],
                starStatus: true,
                star: 199,
            }
        },
        methods: {
            //计算图片列数
            getColNumbers() {
                let clientWidth = this.$refs.waterfall.clientWidth;
                this.colNumbers = Math.floor(clientWidth / this.colWidth);
                this.$refs.container.style.marginLeft =
                    (clientWidth - this.colWidth * this.colNumbers) / 2 + 'px'
            },
            //读取图片
            loadImage() {
                this.getColNumbers()
                for (let i = 0; i < 12; i++) {
                    let colIndex = i % this.colNumbers
                    let url = require(`@/assets/images/${i}.jpg`)
                    if (this.imgList[colIndex]) {
                        this.imgList[colIndex].push(url)
                    } else {
                        this.$set(this.imgList, colIndex, [url])
                    }
                }
            },
            resize() {
                this.imgList = [];
                this.loadImage()
            },
            loadGoods() {
                getAllGoods().then( res => {
                    console.log(res);
                })
            },
            cancelLike() {
                this.starStatus = false;
                this.star--;
            },
            giveLike() {
                this.starStatus = true;
                this.star+=1;
            }
        },
        mounted() {
            this.loadImage();
            this.loadGoods();
            this.resizeRender = throttle(this.resize, 200)
            window.addEventListener('resize', this.resizeRender)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resizeRender)
        }
    }
</script>
<style lang="scss" scoped>
    .waterfall-width-js {
        margin: 0 auto;
        overflow: hidden;
    }
    .image-col {
        float: left;
        width: 310px;
        .image-box {
            margin: 10px 5px;
        }
        img {
            display: block;
            width: 98%;
        }
    }
</style>
