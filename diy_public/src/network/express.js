import {request} from "./request";
/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/3/7
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/3/7
 **/


//查看物流信息
export function expressDetail(params) {
    return request({
        url: '/express/detail',
        params,
    })
}

//获得用户地址

export function getAddressByUser() {
    return request( {
        url: "/address/user",
    })
}

export function insertAddr(address) {
    return request({
        url: '/address/insert',
        data: address,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}