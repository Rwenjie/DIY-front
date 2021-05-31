/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/3
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/3
 **/

import {request} from "./request";

import Qs from 'qs';
//商品分类列表
export function categoryList(){
    return request({
        url: '/category/ren/listing',
    })
}

//发布商品
export function submitGoods(goods) {
    return request({
        url: '/goods/submit',
        data: goods,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

// 根据用户查询商品
export function selectGoodsByUser() {
    return request({
        url:"/goods/getByUser",
    })
}

// 根据用户查询商品
export function selectAllGoods() {
    return request({
        url:"/goods/all",
    })
}

//逻辑删除商品
export function goodsChangeStatus(gid, status) {
    return request({
        url:"/goods/delete",
        params: {
            gid,
            status
        }
    })
}

//查询所有商品
export function getAllGoods() {
    return request({
        url:"/goods/listing",
    })
}

/**
 * 根据文章查询商品
 * @param aid
 * @returns {AxiosPromise}
 */
export function getItemByArticle(aid) {
    return request( {
        url: "/goods/ren/aid",
        params: {
            aid
        }
    })
}

export function getArticle() {
    return request({
        url: '/article/ren/all/',
    })
}

/**
 * 获取用户的点赞状态
 * @param gid
 * @returns {AxiosPromise}
 */
export function getItemStarState(gid) {
    return request( {
        url: '/item/ren/state',
        params: gid,

    })
}

/**
 * //用户给商品点赞
 * @param gid
 * @returns {AxiosPromise}
 */
export function getItemStar(gid) {
    return request( {
        url: '/item/star',
        data: gid,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

/**
 * 用户取消点赞
 * @param gid
 * @returns {AxiosPromise}
 */
export function cancelItemStar(gid) {
    return request( {
        url: '/item/cancel',
        data: gid,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}
