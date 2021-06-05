/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/28
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/28
 **/
import {request} from "./request";

export function createOrderNow(data) {
    return request({
        url: '/order/create/now',
        data,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

export function createOrderByCart(cartId) {
    return request( {
        url: '/order/create/cart',
        data: cartId,
        method: "post",
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}

export function loadOrder() {
    return request( {
        url: '/order/user/all',
    })
}

export function getOrderByOid(oid) {
    return request( {
        url: '/order/user/oid',
        params: {
            oid
        },
    })
}

/**
 * 更新送货地址
 */
export function updateDeliveryAddr(aid, oid) {
    return request( {
        url: '/order/addr/aid',
        params: {
            aid,
            oid
        },
    })
}