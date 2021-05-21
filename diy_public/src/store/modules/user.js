/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/21
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/21
 **/

import {getAddressByUser} from "network/express";
import {
    LOAD_ADDRESS,
    ADD_ADDRESS,
    CHANGE_DEFAULT_ADDR
} from "../mutations-type"
import {insertAddr} from "../../network/express";

const state = {
    addressList: [

    ]
};
//mutations 的目的 修改stats中的状态
//mutations 的操作尽可能的单一
//我们可以吧
const mutations = {
    //payload 新添加的商品
    [LOAD_ADDRESS](state, payload) {
        state.addressList = payload;
    },
    [ADD_ADDRESS](state, payload) {
        state.addressList.push(payload);
    },
    [CHANGE_DEFAULT_ADDR](state, payload) {
        state.addressList[payload].defaultAddr = 0;
    }

};

//this.$store.dispatch("addCart", product);
const  actions = {

    loadAddress(context) {
        return new Promise( ((resolve, reject) => {
            getAddressByUser().then( res => {
                const addr = res.data;
                context.commit(LOAD_ADDRESS, res.data);
                resolve("success")
            })
        }))
    },

    addAddress(context, payload) {
        insertAddr(payload).then( res => {
            context.commit(LOAD_ADDRESS, res.data);
        })


    },

    changeAddress(context) {

    },


};

const getters = {

    addresses(state) {
        return state.addressList;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}