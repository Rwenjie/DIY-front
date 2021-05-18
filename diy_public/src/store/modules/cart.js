import {
    ADD_COUNTER,
    ADD_TO_CART
} from "../mutations-type";

import itemList from "../data";

const state = {
    itemList: itemList
};
//mutations 的目的 修改stats中的状态
//mutations 的操作尽可能的单一
//我们可以吧
const mutations = {
    //payload 新添加的商品
    [ADD_COUNTER](state, payload) {
        state.itemList[state.itemList.indexOf(payload.oldProduct)].count += payload.count;
    },
    [ADD_TO_CART](state, payload) {
        state.itemList.push(payload)
    }
};

//this.$store.dispatch("addCart", product);
const  actions = {

    //添加商品 1.已有+1  2.新添加
    addCart(context, payload) {
       return new Promise( ((resolve, reject) => {
           //1.查找购物车列表中是否已经有了该商品
           let oldProduct = context.state.itemList.find( function (item ) {
               return item.product.id === payload.product.id && item.sku.id === payload.sku.id
           });
           console.log("oldProduct=>"+oldProduct);
           //2.判断oldProduct
           if (oldProduct) {
               context.commit(ADD_COUNTER, {
                   oldProduct,
                   count: payload.count
               });
               resolve('当时商品数量加一')
           } else {
               context.commit(ADD_TO_CART, payload);
               resolve('添加了新的商品')
           }
       }))
    }
};


const getters = {

    cartLength(state) {
        return state.itemList.length;
    },
    itemList(state) {
        state.itemList.forEach( (item) => {
            item.amount = item.sku.unitPrice * item.count;
        });
        return state.itemList
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}