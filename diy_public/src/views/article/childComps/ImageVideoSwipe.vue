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
            <el-carousel height="350px"
                         ref="imagSwipe"
                         style="width: 100%; height: auto"
                         :loop=false
                         :autoplay="autoplay"
                         v-on:change="ImageChange"
                         indicator-position="none">
                <div style=" margin: auto 0">
                    <video-player v-show="videoShow"  class="video-player-box"
                                  ref="videoPlayer"
                                  :options="playerOptions"
                                  :playsinline="playsinline"
                                  customEventName="customstatechangedeventname"
                                  @play="onPlayerPlay($event)"
                                  @pause="onPlayerPause($event)"
                    >
                    </video-player>
                </div>
                <div v-show="!videoShow" style="position:absolute; left:5px; top:300px; z-index: 999">
                    <v-btn icon large @click="videoPlay">
                        <v-icon>mdi-motion-play-outline</v-icon>
                    </v-btn>
                </div>
                <el-carousel-item v-show="!videoShow"  v-for="(item, id) in images" :key="id">
                    <div style="width:100%; height:auto; margin: auto 0;">
                        <el-image :src="item" style="width: 100%;height: auto"></el-image>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div>
            <div style="border: #C0C4CC solid 1px">
                <ul class="sub-image-ul" style="list-style: none">
                    <li  v-for="(image, id) in images"
                         @mouseenter="imageShow(id)"
                         @mouseleave="imageLeave"
                         style="display: inline; height: 70px;">
                        <el-image
                                  class="sub-image"
                                  style="width: 70px;
                                    height: 70px;
                                    margin: auto 5px;"
                                  :src="image"
                                  :key="id"
                                  v-bind:style='imgActive==id ? {"border":"red solid 2px",} : {}'
                                  fit="contain">
                        </el-image>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
//进来后自动播放
//播放
//鼠标移动到图片自动显示
//图片浮层显示播放按钮
    export default {
        name: "ImageVideoSwipe",
        props: {
            video: {
                type: String,
                default() {
                    return  "";
                }
            },
            images: {
                type: Array,
                default() {
                    return [];
                }
            }

        },
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
                imgActive: 0,
                autoplay: true,
                videoShow: false,
                videoPlayState: false,
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                    autoplay: false,// 加载完成后是否自动播放
                    muted: true, // 是否静音
                    loop: false, // 是否循环播放
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 宽高比例
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "video/mp4",// 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: this.video
                    }],
                    poster: "http://localhost/547be638615da10.png",  // 你的封面地址
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',  // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: { // 为false时不显示默认的控制按钮
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                },
            }
        },
        methods: {
            clickStartButton: function(){
                this.$refs.videoPlayer.player.play();
            },
            onPlayerPlay(player) {

            },
            onPlayerPause() {

            },
            ImageChange(id) {
                this.imgActive = id
            },
            imageShow(id) {
                this.videoShow = false;
                this.autoplay = false;
                this.$refs.videoPlayer.player.pause();
                setTimeout(this.$refs.imagSwipe.setActiveItem(id), 10000)

            },
            videoPlay() {
                this.videoShow = true;
                this.$refs.videoPlayer.player.play();
                this.videoPlayState = true;
            },
            imageLeave() {
               this.autoplay = true;
            }
        },


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