<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/2/25
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/2/25
 -->

<template>
    <div id="login">
        <div class="login-box"><!-- @close="closeDialog"-->
            <el-dialog :visible.sync="visible"
                       :show-close="true"
                       center top="15vh" width="440px"
                       class="login-box">
                <template #title>
                    <div class="el-dialog__title">用户登录</div>
                    <el-divider></el-divider>
                    <el-row class="login-switch">
                        <el-col :span="12">
                            <el-button plain @click="pwdLoginMethodSwitch" class="pwd-btn">账号密码登录</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button plain  @click="captchaLoginMethodSwitch" class="captcha-btn">短信认证登录</el-button>
                        </el-col>
                    </el-row>
                </template>


                <!--账户密码登录-->
                <div id="pwd-login" v-show="pwdSwitch">
                    <el-form :model="pwdLogin" :rules="rules">
                        <div class="form-body">
                            <el-form-item prop="mobile">
                                <el-input class="login-input" v-model="pwdLogin.mobile" placeholder="手机号" autocomplete="off" round>
                                    <template #prefix>
                                        <i class="el-input__icon el-icon-phone"></i>
                                    </template>
                                </el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-input class="login-input inline-input" v-model="pwdLogin.password" placeholder="密码" show-password autocomplete="off" round >
                                    <template #prefix>
                                        <i class="el-input__icon el-icon-key"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-checkbox v-model="pwdLogin.rememberMe" class="remember-me">记住密码</el-checkbox>
                            <div class="forget" @click="doForgetPwd">
                                <el-button plain size="mini" class="forget-btn">忘记密码</el-button>
                            </div>
                        </div>
                    </el-form>
                </div>

                <!--短信验证码登录-->
                <div id="captcha-login" v-show="captchaSwitch">
                    <el-form :model="captchaLogin" :rules="rules">
                        <div class="form-body">
                            <el-form-item prop="mobile">
                                <el-input  prefix-icon="el-icon-phone"
                                           v-model="captchaLogin.mobile"
                                           placeholder="手机号"
                                           autocomplete="off"
                                           class="login-input"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div style="margin-top: 15px">
                                    <el-input class="verify-input" v-model="captchaLogin.smsCode" size="large" placeholder="验证码">
                                        <template #append><el-button class="verify-btn" type="success" @click="getCaptcha">{{captchaLogin.btnTxt}}</el-button></template>
                                    </el-input>
                                </div>
                            </el-form-item>
                        </div>

                        <!--    <el-editor-item prop="验证码" class="code">
                                <el-col :gutter="20">
                                    <el-row :span="16">
                                        <el-input v-model="captcha" placeholder="请输入验证码"></el-input>
                                    </el-row>
                                    <el-row :span="3">
                                        <el-button @click="doSendCode" v-show=isCodeShow>{{btntxt}}</el-button>
                                        <el-button  type="primary" v-show=!isCodeShow>{{btntxt}}</el-button>
                                    </el-row>
                                </el-col>
                            </el-editor-item>-->
                    </el-form>

                </div>

                <template #footer>
                <span class="dialog-footer">
                    <el-button class="login-btn" @click="login">登录</el-button>
                </span>
                </template>
            </el-dialog>
        </div>
    </div>

</template>

<script>

   import { mobileLogin } from "network/login";

   export default {
        name: "Login",
        components: {

        },
        data() {
            var checkMobile = (rule, value, callback) => {
                this.mobileStatus = true;
                if (!value) {
                    this.mobileStatus = false;
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        this.mobileStatus = false;
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
                this.mobileStatus = true;
            };
            return {
                visible: false,     //登录框是否可见
                pwdSwitch: true,  //选择登录方式
                captchaSwitch: false,  //选择登录方式
                mobileStatus: false, //手机号码是否可用

                pwdLogin: {
                    mobile: "",
                    password: "",
                    rememberMe: false,

                },
                captchaLogin: {
                    mobile: "",
                    smsCode: "",
                    btnTxt: "获取验证码",
                    time: 0,
                },
                rules: {
                    mobile: [
                        {validator: checkMobile, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            //用户登录
            login() {
                if (this.pwdSwitch){
                    if (this.mobileStatus) {
                        this.doPwdLogin();
                    }

                } else {
                    if (this.mobileStatus) {
                        this.doCaptchaLogin();
                    }
                }
            },
            doPwdLogin() {
                console.log("账号密码登录");
                mobileLogin(this.pwdLogin.mobile, this.pwdLogin.password).then(res => {
                    this.loginSuccess(res);
                });
            },

            doCaptchaLogin(){
                //this.captchaLogin.mobile, this.captchaLogin.smsCode
                console.log("短信验证码登录");
            },

            loginSuccess(res) {
                console.log(res);
                this.visible = false;


                //保存登录成功后的token
                const tokenStr = res.data.tokenHead+res.data.token;
                console.log("token=>"+tokenStr);
                window.sessionStorage.setItem('tokenStr', tokenStr);

                //保存登录状态
                this.$store.dispatch("loginSuccess");
       /*         //获取用户信息
                this.$store.dispatch("getUserDetail");
                //切换导航条
                this.$emit("LoginSuccess")*/
            },

            //请求验证码
            getCaptcha() {
                alert("获取短信验证码")
                if (this.captchaLogin.mobile == '') {
                    this.$message({
                        message: '手机号不能为空',
                        center: true
                    });
                    return
                }
                if (!this.mobileStatus) {
                    /*this.$message({
                        message: '请输入正确的手机号',
                        center: true
                    });*/
                    return
                }
                else {
                    /*getCode(this.captchaLogin.mobile).then(res => {
                        console.log(res);
                    });*/
                    this.$message({
                        message: '发送成功',
                        type: 'success',
                        center: true
                    });
                    this.captchaLogin.time = 6;
                    this.timer();
                }
            },
            //60S倒计时
            timer() {
                console.log("倒计时");
                while (this.captchaLogin.time > 0) {
                    this.captchaLogin.time--;
                    console.log(this.captchaLogin.time);
                    this.captchaLogin.btntxt = this.time + "s后重新获取";
                    setTimeout(this.captchaLogin.timer, 1000);
                }
                    this.time = 0;
                    this.captchaLogin.btntxt = "重新发送";
            },

            //切换登录方式
            pwdLoginMethodSwitch() {
                this.pwdSwitch = true;
                this.captchaSwitch = false;
            },
            captchaLoginMethodSwitch() {
                this.pwdSwitch = false;
                this.captchaSwitch = true;
            },
            //忘记密码
            doForgetPwd() {
                this.$emit("ForgetPwd");
            }

        }
   /*     data() {
            return {
                visible: false,
                loginForm: {

                },
                rememberMe: false,
                phone:'',
                password:'',
                captcha:'',
                isCodeShow:true,
                time: 0,
                btntxt:'发送验证码',
                formLabelWidth: '120px',
                codeWidth: '60px',
                profileUrl: ''
            }
        },
        methods: {

            //手机号密码登录
            doLogin() {
                console.log("用户登录");
                phoneLogin(this.phone, this.password, this.rememberMe).then(res => {
                    this.$message({
                        message: '登录成功',
                        type: 'success',
                        center: true
                    });
                    this.loginVisible = false;
                    this.profileUrl = res.data.data.profileUrl;

                    console.log(res.data.data.profileUrl);
                    console.log(res);
                });
            },
            //手机验证发送验证码
            doSendCode() {
                //const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                if (this.phone == '') {
                    this.$message({
                        message: '手机号不能为空',
                        center: true
                    })
                    return
                }
                /!*       if (true) {
                    this.$message({
                        message:'请输入正确的手机号',
                        center:true
                    })
                    return
                } *!/
                else {
                    getCode(this.phone).then(res => {
                        console.log(res);
                    });
                    this.$message({
                        message: '发送成功',
                        type: 'success',
                        center: true
                    });
                    this.time = 6;
                    this.isCodeShow = false;
                    this.timer();
                }
            },
            //60S倒计时
            timer() {
                if (this.time > 0) {
                    this.time--;
                    this.btntxt = this.time + "s后重新获取";
                    setTimeout(this.timer, 1000);
                } else {
                    this.time = 0;
                    this.isCodeShow = true;
                    this.btntxt = "重新发送";
                }
            },
            //验证码登录
            doVerifyLogin() {
                getCaptcha(this.phone, this.captcha).then(res => {
                    this.$message({
                        message: '登录成功',
                        type: 'success',
                        center: true
                    });
                    this.loginVisible = false;
                    this.profileUrl = this.data.data.profileUrl;
                    console.log(res);
                })
            },
            //用户登录完成后
            //修改导航栏标签，保存用户登录信息
        }
*/
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
    .form-body .dialog-footer{
        padding: 0 30px;
    }


    /* 登录选项*/
    .login-switch button{
        border: 0px;
    }
    .pwd-btn {
        margin-left: 40px;
    }
    .captcha-btn {
        margin-right: 40px;
    }

    .login-btn {
        width: 330px;
        height: 35px;
        border-radius: 33px;
        margin-bottom: 30px;
    }

    /*手机号输入框*/
    /deep/ .login-input input{
        width: 330px;
        height: 35px;
        border-radius: 33px;
        align-content: center;
    }
    .form-body {
        padding: 0 30px;
    }

    /*短信验证输入框*/
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

    [class*="el-icon-"], [class^=el-icon-] {
        font-weight: 500;
        padding-right: 15px;
    }
    /****************************************************/

    .forget {
        float: right;
        margin-right: 20px;
    }
    .remember-me {
        margin-left: 20px;
    }
    .remember-me .forget {
        margin-top: -10px;
    }
    .forget-btn {
        border: 0px;
        font-size: 14px;
    }

</style>