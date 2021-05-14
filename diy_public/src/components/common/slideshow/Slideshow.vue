<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/13
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/13
 -->

<template>
    <div>
        <div style="display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap ">
            <div style="text-align: left; width: 40px; padding: 20px">
                <v-btn icon disabled>
                    <v-icon>mdi-call-split</v-icon>
                </v-btn>
            </div>

            <div style="width: 100%; height: 300px; background: red">

                <!--<swiper>
                    <swiper-item v-for="itme in swiperList">
                        <a :href="itme.link">
                            <img :src="itme" alt="" @load="imageLoad">
                        </a>
                    </swiper-item>
                </swiper>-->

            </div>
            <div style="text-align: right; width: 40px">
                <v-btn icon
                       disabled>
                    <v-icon>mdi-call-split</v-icon>
                </v-btn>
            </div>



        </div>


    </div>
</template>


<script>
   import Swiper from "./Swiper";
   import SwiperItem from "./SwiperItem";
    export default {
        name:'work',
        components: {
            Swiper,
            SwiperItem
        },
        props: {
            banners: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data(){
            return {
                swiperList :[
                    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
                ],
            }
        }
    }
</script>