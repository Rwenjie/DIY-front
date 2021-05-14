import {request} from "./request";

//账号密码登录
export function mobileLogin(mobile, password){
    return request({
        url: '/login/mobile',
        params: {
            mobile,
            password,
        },
        method: 'post'

    })
}
// 登录成功后查询个人信息
export function userInfo() {
    return request({
        url: '/user/info',
    })
}

// 查询登陆状态
export function loginState(){
    return request({
        url: '/login/status'
    })
}

// 刷新登录状态
export function refreshLogin(){
    return request({
        url: '/login/refresh'
    })
}


