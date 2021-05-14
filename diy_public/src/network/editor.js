/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/5
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/5
 **/

import {request} from "./request";

export default function uploadImages(formData) {
    return request({
        url: '/file/import',
        params: {
            file: formData
        },
        method: "post",
    })
}