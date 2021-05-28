/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/26
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/26
 **/

import {request} from "./request"

export function addCart(data) {
    return request({
        url: '/cart/add',
        data,
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
export function updateCartCount(item) {
    return request( {
        url: '/cart/count/add',
        data: item,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

export function deleteCart(idList) {
    return request( {
        url: '/cart/count/add',
        params: {
            idList
        }
    })
}