<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/13
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/13
 -->

<template>
    <div class="video">
        <video-player  class="video-player-box"
                       ref="videoPlayer"
                       :options="playerOptions"
                       :playsinline="playsinline"
                       customEventName="customstatechangedeventname"
                       @play="onPlayerPlay($event)"
                       @pause="onPlayerPause($event)"
        >
        </video-player>
    </div>
</template>


<script>
    import 'video.js/dist/video-js.css'
    import { videoPlayer } from 'vue-video-player'

    export default {
        name: 'Video',
        props: {
            videoUrl: Object
        },
        data() {
            return{
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
                videoButton: require(""),
            }
        },
        components: {
            videoPlayer
        },
        mounted() {

            this.playerOptions.sources[0].src = this.videoUrl.a;
            this.playerOptions.poster = this.videoUrl.b
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            },

      playsinline(){
        var ua = navigator.userAgent.toLocaleLowerCase();
        if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
            return false
        }else{
            return true
        }
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