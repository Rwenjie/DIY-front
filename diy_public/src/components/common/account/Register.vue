<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/3/9
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/3/9
 -->

<template>
    <div id="register">

        <div class="register_dialog">
            <el-dialog top="15vh"
                       width="440px"
                       center
                       :visible.sync="visible"
                       @close="closeDialog">
                <template #title>
                    <div class="el-dialog__title">注册账号</div>
                    <el-divider></el-divider>
                </template>

                <div class="form-body">
                        <el-form :model="registerForm"
                                 :rules="rules" ref="registerForm">
                            <el-form-item >
                                <el-input class="form_input" v-model="registerForm.username" placeholder="用户名"
                                          autocomplete="off" maxlength="10" show-word-limit>
                                    <template #prefix>
                                        <i class="el-input__icon el-icon-user-solid"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="pass">
                                <el-input class="form_input" type="password" v-model="registerForm.pass" autocomplete="off"
                                          placeholder="密码" show-password>
                                    <template #prefix>
                                        <i class="el-input__icon el-icon-key"></i>
                                    </template>
                                </el-input>
                            </el-form-item>

                            <el-form-item prop="checkPass">
                                <el-input class="form_input" type="password" v-model="registerForm.checkPass" autocomplete="off"
                                          placeholder="确认密码" show-password>
                                    <template #prefix>
                                        <i class="el-input__icon el-icon-key"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input class="form_input" v-model="registerForm.tell" placeholder="手机号"
                                          autocomplete="off" round>
                                    <template #prefix>
                                        <i class="el-input__icon el-icon-phone"></i>
                                    </template>
                                </el-input>
                            </el-form-item>

                            <el-form-item>
                                <div style="margin-top: 15px">
                                    <el-input class="verify-input" size="large" placeholder="验证码"  v-model="registerForm.captcha">
                                        <template #append><el-button class="verify-btn" type="success" @click="doSendCode" >{{btntxt}}</el-button></template>
                                    </el-input>

                                </div>
                            </el-form-item>
                        </el-form>
                    </div>

                <template #footer>
                    <span class="dialog-footer">
                    <el-button class="register-btn"  @click="doRegister">注册</el-button>

                </span>

                </template>
            </el-dialog>

        </div>

    </div>
</template>

<script>
    import {getCode, getCaptcha} from 'network/captcha';
    import {checkPhone, checkUsername, userRegister} from "network/register"

    import 'assets/my-element-css/input/my-input.css'

    export default {
        name: "Register",
        components: {

        },
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.register.checkPass !== '') {
                        this.$refs.register.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.register.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                visible: false,
                registerForm: {
                    pass: '',
                    checkPass: '',
                    username: '',
                    tell: '',
                    captcha: '',
                },
                btntxt:'获取验证码',
                isSend: false,
                time: 0,
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
            };
        },
        methods: {


            closeDialog() {
                this.visible = false;
            },
            //手机验证发送验证码
            doSendCode() {
                //检查手机号码是否被注册过
                checkPhone(this.registerForm.tell).then( res => {
                    console.log(res);
                    if (res.data.status==500) {
                        alert(res.data.msg)
                    } else {

                        checkUsername(this.registerForm.username).then( res => {
                            if (res.data.status==500) {
                                alert(res.data.msg)
                            } else {
                                /*-============================================================*/
                                if (this.isSend) {
                                    this.$message({
                                        message: '请'+this.time+'s后重新发送',
                                        type: 'fail',
                                        center:true
                                    });
                                } else {
                                    getCode(this.registerForm.tell).then(res => {
                                        console.log(res);
                                    });
                                    this.$message({
                                        message: '发送成功',
                                        type: 'success',
                                        center:true
                                    });
                                    this.time = 6;
                                    this.isSend=true;
                                    this.timer();
                                }

                                /*=================================================================*/
                            }
                        });

                    }
                });
            },
            //60S倒计时
            timer() {
                if (this.time > 0) {
                    this.time--;
                    this.btntxt = this.time + "s后重新获取";
                    setTimeout(this.timer, 1000);
                } else {
                    this.time = 0;
                    this.isSend=false;
                    this.btntxt = "重新发送";
                }
            },
            doRegister() {

                getCaptcha(this.registerForm.tell, this.registerForm.captcha).then( res => {
                    console.log("验证验证码");
                    console.log(res);
                    if(res.data.status!=200){
                        this.$message({
                            message: res.data.msg,
                            type: 'success',
                            center:true
                        });
                    }
                })
                userRegister(this.registerForm.username, this.registerForm.pass, this.registerForm.tell).then( res => {
                    console.log("注册");
                    if(res.data.status==200){
                        this.$message({
                            message: '注册成功',
                            type: 'success',
                            center:true
                        });
                        this.registerVisible = false;
                        this.registerForm.username = '';
                        this.registerForm.pass = '';
                        this.registerForm.checkPass = '';
                        this.registerForm.captcha = '';
                        this.registerForm.tell = '';
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'fail',
                            center:true
                        });
                    }
                    console.log(res);
                });
            }
        }

    }
</script>

<style scoped>

    /deep/ .el-dialog {
        border-radius: 10px
    }
    .el-dialog__title{
        font-size: 25px;
        line-height: 10px;
    }

    /deep/ .form_input input{
        width: 330px;
        height: 35px;
        border-radius: 33px;
        margin-left: 0px;
        padding-left: 30px;
    }
    .form-body {
        padding: 0 30px;
    }
    [class*="el-icon-"], [class^=el-icon-] {
        font-weight: 500;
    }

    /deep/ .verify-input input{
        width: 200px;
        height: 35px;
        border-radius: 30px 0 0px 30px;
        margin-left: 0px;
        padding-left: 30px;
        float: left;
    }

    .verify-btn{
        width: 130px;
        height: 35px;
    }

    .dialog-footer{
        padding: 0 30px;
    }
    .register-btn {
        width: 330px;
        height: 35px;
        border-radius: 33px;
        margin-bottom: 30px;
    }


</style>

<style>
    /*修改input的样式，为了不覆盖本组件其他处的样式，需要自定义一个类名*/
    .myClass input.el-input__inner {
        border-radius:15px;
    }
</style>