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
                            value="Rwenjie"
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
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-success="uploadSuccess"
                                :headers="myHeaders"
                                :action="uploadAction"
                                :file-list="false">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </div>
                    <el-image slot="reference"
                              style="width: 100px; height: 100px"
                              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                              fit="cover">
                    </el-image>
                </el-popover>

            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <template>
                    <el-radio v-model="radio" label="1">男</el-radio>
                    <el-radio v-model="radio" label="2">女</el-radio>
                    <el-radio v-model="radio" label="2">保密</el-radio>
                </template>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <div style="width: 250px">
                    <el-input v-model="email"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
                <div class="block">
                    <el-date-picker
                            style="width: 250px"
                            v-model="value1"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Detail",
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };

            return {
                dialogImageUrl: '',
                dialogVisible: false,
                // 请求头
                radio: "1",
                email: "",
                value1: "",
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
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            uploadSuccess() {

            },
            uploadError() {

            },
            uploadAvatar() {
                document.querySelector('.avatar-uploader input').click()
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