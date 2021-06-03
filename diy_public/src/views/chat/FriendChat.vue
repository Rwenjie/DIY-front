<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/31
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/31
 -->

<template>
    <v-dialog
            transition="dialog-top-transition"
            width="800px"
            style="height: 550px"
            :scrollable=false
            @click:outside="handleClose"
            v-model="visible">
        <template v-slot:default="dialog">
                <div id="friend-chat">
                    <div class="sidebar">
                        <card></card>
                        <list></list>
                    </div>
                    <div class="main">
                        <message></message>
                        <user-text></user-text>
                    </div>
                </div>
        </template>
    </v-dialog>
   <!-- <el-dialog
            width="60%"
            :visible.sync="visible"
            :before-close="handleClose">
        <div id="friend-chat">
            <div class="sidebar">
                <card></card>
                <list></list>
            </div>
            <div class="main">
                <message></message>
                <user-text></user-text>
            </div>
        </div>
    </el-dialog>-->

</template>

<script>

    import Card from "./childComps/Card";
    import List from "./childComps/List";
    import Message from "./childComps/Message"
    import UserText from "./childComps/UserText";

    export default {
        name: "FriendChat",
        model: {
            prop: 'visible',
            event: 'pitch-on'
        },
        props: {
            visible: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        components: {
            Card,
            List,
            Message,
            UserText
        },
        methods: {
            handleClose() {
                this.$emit("pitch-on", false)
            }

        },
        mounted() {
            this.$store.dispatch('initData');
        }
    }
</script>

<style lang="scss" scoped>
    #friend-chat {
        margin: 20px auto;
        width: 800px;
        height: 600px;
        overflow: hidden;
        border-radius: 10px;
        .sidebar, .main {
            height: 100%;
        }
        .sidebar {
            float: left;
            color: #f4f4f4;
            background-color: #2e3238;
            width: 200px;
        }
        .main {
            position: relative;
            overflow: hidden;
            background-color: #eee;
        }
    }
</style>