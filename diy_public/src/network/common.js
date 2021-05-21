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
        url: '/category/listing',
    })
}
//获得分类目录
export function getAllCategory(cid) {
    return request({
        url: '/category/cid',
        params: {
            cid
        }
    })
}


