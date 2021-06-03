import {request} from "./request"

export function getArticleDetail() {
    return request({
        url: 'getArticleDetail',
    })
}

export function  getArticleById(id) {
    return request({
        url: '/article/ren/id/',
        params: {
            id
        }
    })
}

//获取用户的点赞状态
export function getStarState(aid) {
    return request( {
        url: '/article/ren/state',
        params: {
            aid
        }
    })
}
//用户给文章点赞
export function getStar(aid) {
    return request( {
        url: '/article/star',
        data: aid,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}
//用户取消点赞
export function cancelStar(aid) {
    return request( {
        url: '/article/cancel',
        data: aid,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

export function submitArticle(article) {

    return request( {
        url: '/article/submit',
        data: article,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

export function publicGoodArticle() {
    return request( {
        url: '/article/goods/uid'
    })
}
export function getArticleByUser() {
    return request( {
        url: '/article/uid'
    })
}