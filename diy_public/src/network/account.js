/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/7
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/7
 **/

import {request} from "./request";

export function logout(){
    return request({
        url: '/logout/',
    })
}

// 发送验证码
export function getCode(mobile){
    return request({
        url: '/captcha/sent',
        params: {
            mobile
        },
    })
}


// 查询手机号是否注册
export function checkPhone(phone){
    return request({
        url: '/register/phone/check',
        params:{
            phone
        }
    })
}

// 查询用户名是否注册
export function checkUsername(username){
    return request({
        url: '/register/user/check',
        params:{
            username
        }
    })
}

//用户注册
export function userRegister(username, pwd, mobile){
    return request({
        url: '/register/submit',
        params:{
            username: username,
            password: pwd,
            mobile: mobile
        },
        method: 'post'
    })
}

// 验证验证码
export function CheckCaptcha(mobile, smsCode){
    return request({
        url: '/captcha/verify',
        params:{
            mobile,
            smsCode
        }
    })
}

//验证原密码是否正确
export function checkOldPwd(password) {
    return request({
        url: '/account/oldpass',
        params:{
            password
        }
    })
}

export function changePwd(password) {
    return request({
        url: '/account/change/pass',
        params: {
            password
        }
    })
}

