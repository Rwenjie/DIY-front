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

export function loadExpressCom() {
    return request({
        url: "/express/company",
    })
}

export function followUser(fuid) {
    return request({
        url: "/user/follow",
        params: {
            fuid
        }
    })
}
export function cancelFollow(fuid) {
    return request({
        url: "/user/follow/cancel",
        params: {
            fuid
        }
    })
}
export function getFollowState(fuid) {
    return request({
        url: "/user/follow/state",
        params: {
            fuid
        }
    })
}
export function addChatFriend(params) {
    return request({
        url: "/chat/friend/add",
        params,
    })
}

export function getUser(params) {
    return request({
        url: "/user/ren/article",
        params,
    })
}