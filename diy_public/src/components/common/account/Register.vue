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
                            <el-form-item prop="username">
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
                            <el-form-item prop="mobile">
                                <el-input class="form_input" v-model="registerForm.mobile" placeholder="手机号"
                                          autocomplete="off" round>
                                    <template #prefix>
                                        <i class="el-input__icon el-icon-phone"></i>
                                    </template>
                                </el-input>
                            </el-form-item>

                            <el-form-item>
                                <div style="margin-top: 15px">
                                    <el-input class="verify-input" size="large" placeholder="验证码"  v-model="registerForm.captcha">
                                        <template #append><el-button class="verify-btn"
                                                                     type="success"
                                                                     :disabled="codeDisabled"
                                                                     @click="doSendCode()" >{{codeMsg}}</el-button>
                                        </template>
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
    import 'assets/my-element-css/input/my-input.css'
    import {checkUsername, checkPhone, userRegister, getCode, CheckCaptcha} from "../../../network/account";
    import {Message, MessageBox} from 'element-ui'

    export default {
        name: "Register",
        components: {

        },
        data() {
            let validateUsername= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('用户名不能为空'));
                } else if (value.length < 4) {
                    callback(new Error('用户名最少为4位'));
                }else {
                    console.log(value);
                    checkUsername(value).then( res => {
                        if (res.code == 501) {
                            callback(new Error('用户名已经被注册'));
                        }
                    });
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
                    if (reg.test(value)) {
                        if (this.registerForm.checkPass !== '') {
                            this.$refs.registerForm.validateField('checkPass');
                        }
                    }  else {
                        return callback(new Error("至少包含8-16个字符，至少1个大写字母，1个小写字母和1个数字"))
                    }

                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let validateMobile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        checkPhone(value).then( res => {
                            console.log(res);
                            if (res.code == 501) {
                                callback(new Error('手机号已经被绑定'));
                            } else {
                                callback();
                            }
                        });
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return {
                visible: false,
                codeMsg:'获取验证码',
                countdown: 6, //倒计时秒数
                codeDisabled: false,// 是否禁用按钮
                timer: null,
                registerForm: {
                    pass: '',
                    checkPass: '',
                    username: '',
                    mobile: '18834167660',
                    captcha: '',
                },
                rules: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' },
                        { required: true, message: '用户名不能为空'},
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' },
                        { required: true, message: '密码不能为空'},
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    mobile: [
                        { validator: validateMobile, trigger: 'blur' }
                    ]
                },
            };
        },
        methods: {
            closeDialog() {
                this.visible = false;
            },

            //手机验证发送验证码
            doSendCode(){
                console.log("获得验证码");
                if (!this.timer) {
                    console.log("发送请求==================================");
                    getCode(this.registerForm.mobile).then( res => {
                            console.log(res);
                        }
                    );
                    this.timer = setInterval(() => {
                        if (this.countdown > 0 && this.countdown <= 60) {
                            this.countdown--;
                            if (this.countdown !== 0) {
                                this.codeMsg = "重新发送(" + this.countdown + ")";
                                //console.log(this.codeMsg);
                            } else {
                                clearInterval(this.timer);
                                this.codeMsg = "获取验证码";
                                this.countdown = 60;
                                this.timer = null;
                                this.codeDisabled = false;
                            }
                        }
                    }, 1000)
                }
            },
            doRegister() {
                CheckCaptcha(this.registerForm.mobile, this.registerForm.captcha).then( res => {
                    if(res.code!=200){
                        Message( {
                            message: res.message,
                            type: 'success',
                        });
                    }else if (res.code == 200){
                        userRegister(this.registerForm.username,
                            this.registerForm.pass,
                            this.registerForm.mobile).then(res => {
                            if (res.code == 200) {
                                Message({
                                    message: "注册成功",
                                    type: 'success'
                                });
                                this.visible = false;
                                this.registerForm.username = '';
                                this.registerForm.pass = '';
                                this.registerForm.checkPass = '';
                                this.registerForm.captcha = '';
                                this.registerForm.mobile = '';
                            }
                        });
                    }

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