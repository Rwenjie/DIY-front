/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/26
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/26
 **/

import {request} from "./request"

export function addCart(item) {
    return request({
        url: '/cart/addCart',
        data: item,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

export function getAllCart() {
    return request({
        url: '/cart/all'
    })
}