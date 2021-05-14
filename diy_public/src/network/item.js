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
        url: '/category/listing',
    })
}

//发布商品
export function submitGoods(goods) {
    console.log(Qs.stringify(goods))
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