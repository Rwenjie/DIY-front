import Vue from 'vue'
import Vuex from 'vuex'

import cart from "./modules/cart"
import createGood from "./modules/createGood"
import category from "./modules/category";
import user from "./modules/user"
import chat from "./modules/chat";

Vue.use(Vuex);

const state = {
  //登录状态
  loginState: !!sessionStorage.getItem("tokenStr"),
};

const store = new Vuex.Store({
  state,
  mutations:{
    changeLogin(state, payload) {
      state.loginState = payload;
    }
  },
  actions: {
    changeLogin(context) {
      console.log(sessionStorage.getItem("tokenStr"))
      if (sessionStorage.getItem("tokenStr")) {
        context.commit("changeLogin", true)
      } else {
        context.commit("changeLogin", false)
      }
    }
  },
  getters: {
    loginState(state){
      return state.loginState;
    }

  },
  modules: {
    cart,
    createGood,
    category,
    user,
    chat
  }
});

//导出store
export default store;