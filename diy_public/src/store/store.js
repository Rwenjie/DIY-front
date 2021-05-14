import Vue from 'vue'
import Vuex from 'vuex'

import cart from "./modules/cart"
import createGood from "./modules/createGood"

import { userInfo,} from "network/login";

import {
  GET_USER_DETAIL,
  STATE_LOGIN
} from './mutations-type.js'

Vue.use(Vuex);

const state = {
  /*  cookie: false, // 保存cookie*/
  // 用户基本信息
  token: "",
  profile: {
    userId: null,
    username: null,
    profileUrl: 'https://rwenjie-blog.oss-cn-hangzhou.aliyuncs.com/diy-shop/default%20avatar.png',
    miToke: null,
    mobile: null,
    openId: null,
    wxToken: null,
  },
  //登录状态
  loginState: !!sessionStorage.getItem("tokenStr"),
};

const store = new Vuex.Store({
  state,
  mutations:{
    [GET_USER_DETAIL](state, res) {
      state.profile.userId = res.date.id;
      state.profile.profileUrl = res.date.profileUrl;
      state.profile.mobile = res.date.mobile;
      state.profile.username = res.date.username;
    },
    [STATE_LOGIN](state) {
      state.loginState = true;
      console.log(state.loginState);
    },

  },
  actions: {

    //用户登录成功后保存信息和改变登录后的状态
    loginSuccess(context) {
      userInfo().then( res=> {
        context.commit(GET_USER_DETAIL, res);
        context.commit(STATE_LOGIN);
      });
    }
  },
  getters: {

  },
  modules: {
    cart,
    createGood
  }
})

//导出store
export default store