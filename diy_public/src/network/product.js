import {request} from "./request";

//商品分类列表
export function categoryList(){
    return request({
        url: '/category/listing',
    })
}

