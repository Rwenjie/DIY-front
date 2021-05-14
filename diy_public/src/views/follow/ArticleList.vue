<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/7
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/7
 -->

<!--
<template>
    <div id="follow-article">
        <el-cascader
                v-model="value"
                :options="options"
                @change="handleChange">

        </el-cascader>
        <el-divider></el-divider>
        <div class="container">
            <vue-waterfall-easy :imgsArr="imgsArr" @scrollLoadImg="fetchImgsData"></vue-waterfall-easy>
        </div>
    </div>
</template>

<script>
    import vueWaterfallEasy from 'vue-waterfall-easy'
    export default {
        name: "articleList",
        components: {
            vueWaterfallEasy
        },
        data() {
            return {
                articles: [
                    {
                        image: "http://krokotak.com/wp-content/uploads/2016/05/116-457x1024.jpg",
                        title: "",
                        start: 129,
                        category: "FLOWERS",
                        price: "",
                    },
                    {
                        image: "http://krokotak.com/wp-content/uploads/2016/04/pin-330x700.jpg",
                        title: "",
                        start: 129,
                        category: "FLOWERS",
                        price: "",
                    },
                    {
                        image: "http://krokotak.com/wp-content/uploads/2019/03/2-1.jpg",
                        title: "",
                        start: 129,
                        category: "FLOWERS",
                        price: "",
                    },
                    {
                        image: "http://krokotak.com/wp-content/uploads/2021/02/papertulip3.jpg",
                        title: "",
                        start: 129,
                        category: "FLOWERS",
                        price: "",
                    },
                    {
                        image: "http://krokotak.com/wp-content/uploads/2021/04/balkony4.jpg",
                        title: "",
                        start: 129,
                        category: "FLOWERS",
                        price: "",
                    },
                ],
                imgInfo: [],
                imgsArr: [],         //存放所有已加载图片的数组（即当前页面会加载的所有图片）
                fetchImgsArr: []     //存放每次滚动时下一批要加载的图片的数组
            }
        },
        methods: {
            getImgInfo(){
                this.articles.forEach( (article) => {
                    let img = new Image();
                    img.src = article.image;
                    const vm = this;
                    img.onload = function () {
                        console.log(img.width);
                        console.log(img.height);
                    };
                    this.imgInfo.push(img);
                });
                console.log(this.imgInfo);
            },
            initImgsArr (n, m) {   //初始化图片数组的方法，把要加载的图片装入
                var arr = []
                for (var i = n; i < m; i++) {
                    arr.push({ src: `static/img/${i + 1}.jpg`, link: '', info: '一些图片描述文字' }) //src为加载的图片的地址、link为超链接的链接地址、

                    //info为自定义的图片展示信息，请根据自己的情况自行填写
                }
                return arr
            },

            fetchImgsData () {    //获取新的图片数据的方法，用于页面滚动满足条件时调用
                this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)   //数组拼接，把下一批要加载的图片放入所有图片的数组中
            }
        },
        mounted() {
            this.getImgInfo();
        },
        created () {
            this.imgsArr = this.initImgsArr(0, 10)       //初始化第一次（即页面加载完毕时）要加载的图片数据
            this.fetchImgsArr = this.initImgsArr(10, 20) // 模拟每次请求的下一批新的图片的数据数据
        }
    }
</script>

<style scoped>
    #follow-article {
            text-align: left;
            margin-top: 20px;
        }
</style>-->
<template>
    <div class="v-waterfall-content" id="v-waterfall">

        <div v-for="img in waterfallList"
             class="v-waterfall-item"
             :style="{top:img.top+'px',left:img.left+'px',width:waterfallImgWidth+'px',height:img.height}">
            <el-card style="height: auto">
                <img :src="img.src" alt="" style="width: 100%">
                <div style="width: auto; height: 100px" >
                    发给打发了更加开朗大方工具栏控件过得飞快掠过就立刻给对方立刻给家里
                </div>
            </el-card>



        </div>
    </div>
</template>

<script>
    export default {
        name: "v-waterfall",
        data(){
            return {
                waterfallList:[],
                imgArr:[
                    "https://img.alicdn.com/i4/1071113126/O1CN01hr0omD1YxkeBdi8PD_!!1071113126.jpg_300x300.jpg",
                    "https://img.alicdn.com/imgextra/i3/2637425822/O1CN01tGb8uL1ssWVRf0d1d_!!2637425822.jpg",
                    "http://krokotak.com/wp-content/uploads/2019/03/2-1.jpg",
                    "http://krokotak.com/wp-content/uploads/2021/02/papertulip3.jpg",
                    "http://krokotak.com/wp-content/uploads/2021/04/balkony4.jpg",
                    "http://krokotak.com/wp-content/uploads/2016/04/pin-330x700.jpg",
                    "http://krokotak.com/wp-content/uploads/2019/03/2-1.jpg",
                    "http://krokotak.com/wp-content/uploads/2021/02/papertulip3.jpg",
                    "http://krokotak.com/wp-content/uploads/2021/04/balkony4.jpg",
                ],
                waterfallImgWidth:240,
                waterfallImgCol:4,
                waterfallImgRight:15,
                waterfallImgBottom:10,
                waterfallDeviationHeight:[],
                imgList:[]
            }
        },
        created() {
            for (let i = 0;i < 100;i++){
                this.imgList.push(this.imgArr[Math.round(Math.random() * 8)]);
            }
        },
        mounted(){
            this.calculationWidth();
        },
        methods:{
            //计算每个图片的宽度或者是列数
            calculationWidth(){
                let domWidth = document.getElementById("v-waterfall").offsetWidth;
                if (!this.waterfallImgWidth && this.waterfallImgCol){
                    this.waterfallImgWidth = (domWidth-this.waterfallImgRight*this.waterfallImgCol)/this.waterfallImgCol;
                }else if(this.waterfallImgWidth && !this.waterfallImgCol){
                    this.waterfallImgCol = Math.floor(domWidth/(this.waterfallImgWidth+this.waterfallImgRight))
                }
                //初始化偏移高度数组
                this.waterfallDeviationHeight = new Array(this.waterfallImgCol);
                for (let i = 0;i < this.waterfallDeviationHeight.length;i++){
                    this.waterfallDeviationHeight[i] = 0;
                }
                this.imgPreloading()
            },
            //图片预加载
            imgPreloading(){
                for (let i = 0;i < this.imgList.length;i++){
                    let aImg = new Image();
                    aImg.src = this.imgList[i];
                    aImg.onload = aImg.onerror = (e)=>{
                        let imgData = {};
                        imgData.height = this.waterfallImgWidth/aImg.width*aImg.height;
                        imgData.src = this.imgList[i];
                        this.waterfallList.push(imgData);
                        this.rankImg(imgData);
                    }
                }
            },
            //瀑布流布局
            rankImg(imgData){
                let {waterfallImgWidth,waterfallImgRight,waterfallImgBottom,waterfallDeviationHeight,waterfallImgCol} = this;
                //for (let i = 0;i < this.waterfallList.length;i++){
                let minIndex = this.filterMin();
                imgData.top = waterfallDeviationHeight[minIndex];
                imgData.left = minIndex*(waterfallImgRight+waterfallImgWidth);
                waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom;
                //}
                console.log(imgData);
            },
            /**
             * 找到最短的列并返回下标
             * @returns {number} 下标
             */
            filterMin(){
                const min = Math.min.apply(null, this.waterfallDeviationHeight);
                return this.waterfallDeviationHeight.indexOf(min);
            }
        }
    }
</script>

<style scoped>
    .v-waterfall-content{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .v-waterfall-item{
        float: left;
        position: absolute;
    }
    .v-waterfall-item img{
        width: auto;
        height: auto;
    }
</style>

