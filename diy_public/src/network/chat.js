/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/6/1
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/6/1
 **/
import {request} from "./request"
export function getChatFriends(keywords) {
    return request({
        url: '/chat/friends',
        params: {
            keywords
        }
    })

}