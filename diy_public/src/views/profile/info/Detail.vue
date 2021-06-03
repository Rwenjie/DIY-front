<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/5
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/5
 -->

<template>
    <div id="detail" style="text-align: left">
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="用户名：">
                <div style="width: 150px">
                    <v-text-field
                            :value="user.username"
                            dense
                            disabled />
                </div>
            </el-form-item>
            <el-form-item label="头像：">
                <el-popover
                        width="160"
                        placement="right"
                        trigger="hover">
                    <div style=" margin: 0">
                        <el-upload
                                ref="imgUpload"
                                class="upload-demo"
                                :action="uploadAction"
                                :headers="myHeaders"
                                :file-list="imgFile"
                                :limit="1"
                                :on-success="uploadSuccess"
                                :before-upload="beforeUpload">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </div>
                    <el-image slot="reference"
                              style="width: 100px; height: 100px"
                              :src="user.avatar"
                              fit="cover">
                    </el-image>
                </el-popover>

            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <template>
                    <el-radio v-model="user.sex" label="1">男</el-radio>
                    <el-radio v-model="user.sex" label="2">女</el-radio>
                    <el-radio v-model="user.sex" label="3">保密</el-radio>
                </template>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <div style="width: 250px">
                    <el-input v-model="user.email"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
                <div class="block">
                    <el-date-picker
                            style="width: 250px"
                            v-model="user.birthday"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click=submitForm>提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import {Message} from "element-ui";

    export default {
        name: "Detail",
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        data() {
            return {
                imgFile: [],
                user: {
                    username: "",
                    avatar: "",
                    birthday: "",
                    email: "",
                    sex: 1
                },
                dialogVisible: false,
                //文件上传请求头
                myHeaders: { Authorization: window.sessionStorage.getItem('tokenStr') },
                uploadAction: "/api/file/import", // 图片上传的接口地址,引用方式各有不同
                richImg: [], // 图片列表
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    age: ''
                },
            };
        },
        mounted() {

            if (this.userInfo==null) {
                this.$store.dispatch("loadUserDetail");
            }
            this.$store.dispatch("loadUserDetail").then( res => {
                this.user = JSON.parse(JSON.stringify(this.userInfo))
            })
        },
        methods: {
            submitForm() {
                this.$store.dispatch("updateUserInfo", this.user).then( res => {
                    Message.success({
                        message: res,
                        type: "success"
                    })
                })
            },
            uploadSuccess(res, file, fileList) {
                this.user.avatar = res.data;
                this.$refs.imgUpload.clearFiles();
            },
            uploadError() {

            },
            beforeUpload(file) {
            }
        }
    }
</script>

<style scoped>

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>