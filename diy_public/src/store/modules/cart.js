import {
    ADD_COUNTER,
    ADD_TO_CART,
    LOAD_CART,
    DELETE_CART_ITEM
} from "../mutations-type";

import {addCart, getAllCart, updateCartCount} from "../../network/cart";

const state = {
    itemList: []
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
    },
    [LOAD_CART](state, payload) {
        state.itemList = payload;
    },
    [DELETE_CART_ITEM](state, payload) {

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
               const cart = JSON.parse(JSON.stringify(oldProduct));
               cart.goodsId = cart.product.id;
               cart.skuId = cart.sku.id;
               cart.count += payload.count;
               updateCartCount(cart).then(res => {
                   console.log(res);
               });
               resolve('当时商品数量加一')
           } else {

               const cart = JSON.parse(JSON.stringify(payload));
               cart.goodsId = cart.product.id;
               cart.skuId = cart.sku.id;
               console.log(cart);
               delete cart.product;
               delete cart.sku;
               addCart(cart).then(res => {
                   console.log(res);
                   if (res.code === 200) {
                       context.commit(ADD_TO_CART, payload);
                       resolve('添加了新的商品');
                   }
               })
           }
       }))
    },
    loadCart(context) {
        return new Promise(((resolve, reject) => {
            console.log("loadCart");
            getAllCart().then( res => {
                context.commit(LOAD_CART, res.data);
            })
        }))
    },
    deleteCartItem() {
        return new Promise(((resolve, reject) => {

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