<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/25
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/25
 -->

<template>

    <div id="image-swipe">

        <div class="block">
            <el-carousel height="500px"
                         style="width: 100%; height: auto"
                         loop="false"
                         indicator-position="none">
                <div style="z-index: 999">
                    <el-button >
                        按钮
                    </el-button>
                </div>
                <div style="z-index: 500">
                    <video class="lib-video" loop="" preload="undefined" webkit-playsinline="webkit-playsinline" playsinline="playsinline" poster="https://img.alicdn.com/imgextra/i1/133668489/O1CN011geBmL2Ca0pHePksg_!!133668489-0-tbvideo.jpg_600x600.jpg" data-spm-anchor-id="a220o.1000855.1997427645.i7.440e3fcaq7hjYR">
                        <source src="https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm">
                    </video>
                </div>



                <!--<video-player  class="video-player-box"
                               ref="videoPlayer"
                               :options="playerOptions"
                               :playsinline="playsinline"
                               customEventName="customstatechangedeventname"
                               @play="onPlayerPlay($event)"
                               @pause="onPlayerPause($event)"
                >
                </video-player>-->

            </el-carousel>
        </div>
       <!-- <div class="block">
            <el-carousel height="350px">
                <el-carousel-item v-for="(item, id) in images" :key="id">
                    <div class="block">
                        <el-image :src="item"></el-image>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>-->
    </div>
</template>

<script>
//进来后自动播放
//播放
//鼠标移动到图片自动显示
//图片浮层显示播放按钮
    export default {
        name: "ImageVideoSwipe",
        components: {
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            },
            playsinline() {
                var ua = navigator.userAgent.toLocaleLowerCase();
                if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
                    return false
                } else {
                    return true
                }
            }
        },
        data() {
            return {
                images: [
                    "https://rwenjie-blog.oss-cn-hangzhou.aliyuncs.com/diy-shop/Rwenjie/image/202105211621590189752394.png",
                    "https://rwenjie-blog.oss-cn-hangzhou.aliyuncs.com/diy-shop/Rwenjie/image/202105211621600502593428.jpg",
                    "https://rwenjie-blog.oss-cn-hangzhou.aliyuncs.com/diy-shop/Rwenjie/image/202105251621947684251727.jpg",
                    "https://rwenjie-blog.oss-cn-hangzhou.aliyuncs.com/diy-shop/Rwenjie/image/202105251621947687925762.png",
                ],
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    autoplay: false,
                    muted: false,
                    loop: false,
                    preload: 'auto',
                    language: 'zh-CN',
                    aspectRatio: '16:9',
                    fluid: true,
                    sources: [{
                        type: "video/mp4",
                        src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                    }],
                    poster: "http://localhost/547be638615da10.png",
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                },
                //videoButton: require(""),
            }
        },
        methods: {
            clickStartButton: function(){
                this.$refs.videoPlayer.player.play();
            },
            onPlayerPlay(player) {
                this.videoPlayState = true;
            }
        }

    }
</script>

<style scoped>

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #ffffff;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>