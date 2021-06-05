/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/6/4
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/6/4
 **/
import store from "../store/store";
export const initLogin = () => {

    //加载用户信息
    store.dispatch("loadUserDetail").then(r => {

    });
    //连接webSocket
    store.dispatch( "connect").then(r => {

    });
    //加载购物车信息
    store.dispatch("loadCart").then(r => {

    });

    //加载聊天用户信息
    store.dispatch('initChatData').then(r => {

    });

};