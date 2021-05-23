/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/23
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/23
 **/

import {request} from "./request";

export function selCommentReviewer(params) {
    return request({
        url: '/comment/selCommentReviewer',
        params
    })

}