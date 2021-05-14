/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/7
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/7
 **/

import {request} from "./request";

// 发送验证码
export function getCode(mobile){
    return request({
        url: '/captcha/sent',
        params: {
            mobile
        },
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