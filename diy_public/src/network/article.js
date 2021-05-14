import {request} from "./request";

export default function getArticleDetail() {
    return request({
        url: 'getArticleDetail',
    })
}