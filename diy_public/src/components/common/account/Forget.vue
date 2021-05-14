<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/3/16
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/3/16
 -->

<template>
    <div id="forget">
        <div class="regist_dialog">
            <el-dialog top="15vh" width="440px" center
                       v-model="visible"
                       @close="closeDialog">
                <template #title>
                    <div class="el-dialog__title">找回密码</div>
                    <el-divider></el-divider>
                </template>

                <div class="form-body">


                </div>

                <template #footer>
                    <span class="dialog-footer">
                    <el-button class="register-btn" >重置密码</el-button>

                </span>

                </template>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Forget",
        data() {
            return{
                visible: false,
            }
        },
        methods: {
            closeDialog() {
                this.visible = false;
            },
        }
    }
</script>

<style scoped>

    .el-dialog__title{
        font-size: 25px;
        line-height: 10px;
    }
</style>