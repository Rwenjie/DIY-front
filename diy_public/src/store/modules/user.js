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
    CHANGE_DEFAULT_ADDR,
    LOAD_USER_INFO, INIT_CURRENT_USER
} from "../mutations-type"
import {insertAddr} from "../../network/express";
import {loadUserInfo, updateUserInfo} from "../../network/common";

const state = {
    addressList: [],
    user: {}

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
    },
    [LOAD_USER_INFO](state, payload) {
        state.user = payload;
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
    loadUserDetail(context) {
        return new Promise(((resolve, reject) => {
            loadUserInfo().then( res => {
                context.commit(LOAD_USER_INFO, res.data);
                context.commit(INIT_CURRENT_USER, res.data);
                return resolve(res.data)
            })
        }))
    },
    updateUserInfo(context, payload) {
        return new Promise( (resolve, reject) => {
            updateUserInfo(payload).then( res => {
                if (res.code == 200) {
                    context.commit(LOAD_USER_INFO, res.data)
                    resolve("修改成功");
                } else {
                    resolve("更新失败");
                }
            })
        })
    },
    test(context, payload) {

    }


};

const getters = {

    addresses(state) {
        return state.addressList;
    },
    addrLength(state) {
        return state.addressList.length
    },
    defaultAddr: (state) => {
        return state.addressList.find(addr => addr.defaultAddr == 1);
    },
    userInfo: (state) =>{
        return state.user;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}