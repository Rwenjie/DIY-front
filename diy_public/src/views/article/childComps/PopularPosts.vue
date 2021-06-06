<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/14
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/14
 -->

<template>
    <div id="popular-posts">
        <div style="text-align: left; border-bottom: #dcdee2 solid 2px; margin-top: 50px" >
            <el-avatar
                    shape="square"
                    size="large"
                    :src="Author.avatar">
            </el-avatar>
            <span style="font-size: x-large;
                        display: inline-block;
                        font-weight: bolder;
                        line-height: 15px;
                        margin-left: 15px">{{Author.username}}</span>
        </div>
        <div style="margin-bottom: 50px">
            <div style="margin: 15px 0">
                <el-button v-if="!followState" round style="width: 100px; height: 35px" @click="followUser">关注用户</el-button>
                <el-button v-else="followState" round style="width: 100px; height: 35px" @click="cancelFollow">取消关注</el-button>
                <el-button round style="width: 100px; height: 35px" @click="toChat">私信</el-button>
            </div>

        </div>

        <div class="tptn_posts_daily" style="margin-bottom: 50px">
            <div style="text-align: left; margin-bottom: 20px">
                <b >Popular Posts</b>
            </div>
            <ul style="padding-left: 0">
                <li v-for="item in PopularPosts">
                    <el-image
                            style="display: block;float: left; width: 20%; margin-right: 20px"
                            :src="item.image"
                            fit="cover">
                    </el-image>
                    <span style="display: block;  width: 80%;  margin-left:15px; padding-left: 10px">
                        <a href="#" style="display: block;
                                        font-size: 11px;
                                        color: #428bca;
                                        background: transparent;
                                        text-decoration: none;">{{item.title}}</a>
                        <span style="font-size: 9px;
                                    color: #899caf;">{{item.date}}</span>
                    </span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>

    import {addChatFriend, cancelFollow, followUser, getFollowState, getUser} from "../../../network/common";
    import {mapState, mapGetters} from 'vuex';
    import {Message, MessageBox} from 'element-ui'

    export default {
        name: "PopularPosts",
        components: {

        },
        computed: {
            ...mapGetters({
                chatFriends: "chatFriends",
            })
        },
        props: {
            PopularPosts: {
                type: Array,
                default() {
                    return []
                }
            },
            ArticleUserId: {
                type: String,
                default() {
                    return ""
                }
            }
        },
        data() {
            return{
                followState: false,
                Author: {},
            }
        },
        methods: {
            //添加关注
            followUser() {
                followUser(this.ArticleUserId).then( res => {
                    if (res.code == 200) {
                        this.followState = true;
                        Element.success(res.message)
                    } else {
                        Message.error(res.message)
                    }
                });
            },
            //取消关注
            cancelFollow() {
                if (window.sessionStorage.getItem("tokenStr")!=null) {
                    cancelFollow(this.ArticleUserId).then( res => {
                       if (res.code == 200) {
                           this.followState = false;
                           Element.success(res.message)
                       }else {
                           Message.error(res.message)
                       }
                    });
                }
            },
            //关注状态
            getFollowState() {
                if (window.sessionStorage.getItem("tokenStr")!=null) {
                    getFollowState(this.ArticleUserId).then( res => {
                        this.followState = res.data;
                    });
                }
            },
            //私信
            toChat() {
                console.log(this.chatFriends.find(friend => friend.userId == this.ArticleUserId));
                if (this.chatFriends.find(friend => friend.userId == this.ArticleUserId)==null) {
                    console.log("chat");
                    addChatFriend({
                        fid: this.ArticleUserId,
                    }).then(res => {
                        console.log("addChatFriend=====>");
                        console.log(res);
                        if (res.code == 200) {
                            this.dispatch("initChatData");
                            alert("yes")
                            this.$bus.$emit('chatVisible')
                            this.$store.commit('changeCurrentSession', this.Author)
                        }

                    });
                } else {
                    this.$bus.$emit('chatVisible')
                    this.$store.commit('changeCurrentSession', this.Author)
                }

            },
            loadArticleAuthor() {
                getUser( {
                    article: this.ArticleUserId,
                }).then(res => {
                    this.Author = res.data;
                    this.getFollowState()
                })
            }
        },
        mounted() {
        },
        watch: {
            ArticleUserId: {
                deep: true,
                handler() {
                    this.loadArticleAuthor();
                }
            }
        }
    }
</script>

<style scoped>

    .tptn_posts_daily ul li {
        margin-bottom: 10px;
        padding-bottom: 30px;
        border-bottom: 1px solid #ccd4db;
        text-align: left;
    }
</style>