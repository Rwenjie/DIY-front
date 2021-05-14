import {request} from "./request";
/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/3/7
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/3/7
 **/


//查看物流信息
export function expressDetail() {
    return request({
        url: '/express/detail',
    })
}