/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/17
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/17
 **/

import {request} from "./request";

//商品分类列表
export function getCategories(){
    return request({
        url: '/category/ren/listing',
    })
}
//获得分类目录
export function getAllCategory(cid) {
    return request({
        url: '/category/ren/path/cid',
        params: {
            cid
        }
    })
}
export function getCategoryById(cid) {
    return request({
        url: '/category/ren/cid',
        params: {
            cid
        }
    })
}
export function getAllCate() {
    return request( {
        url: '/category/ren/all'
    })
}

export function getAllTags() {
    return request( {
        url: '/tags/ren/all'
    })
}

export function getTagById(tid) {
    return request( {
        url: '/tags/ren/tid',
        params: {
            tid
        }
    })
}

export function aliPcPay(data) {
    return request( {
        url: '/ali/pay',
        params: {
            data
        }
    })
}

export function loadUserInfo() {
    return request({
        url: "/user/info",
    })
}

export function updateUserInfo(user) {
    return request( {
        url: "/user/update",
        data: user,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}
