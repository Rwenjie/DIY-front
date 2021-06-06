import {
    ADD_COUNTER,
    CHANGE_COUNT,
    ADD_TO_CART,
    LOAD_CART,
    DELETE_CART_ITEM
} from "../mutations-type";

import {addCart, deleteCart, getAllCart, updateCartCount} from "../../network/cart";

const state = {
    itemList: []
};
//mutations 的目的 修改stats中的状态
//mutations 的操作尽可能的单一
//我们可以吧
const mutations = {
    //payload 新添加的商品
    [ADD_COUNTER](state, payload) {
        let index = state.itemList.findIndex( function (item ) {
            return item.sku.id === payload.oldProduct.sku.id
        });
        state.itemList[index].count += payload.count;
    },
    [ADD_TO_CART](state, payload) {
        state.itemList.push(payload)
    },
    [LOAD_CART](state, payload) {
        state.itemList = payload;
    },
    [DELETE_CART_ITEM](state, payload) {
        const index = state.itemList.findIndex(payload);
        if (index!=-1) {
            state.itemList.split(index, 1);
        }
    },
    [CHANGE_COUNT](state, payload) {
        let index = state.itemList.findIndex( function (item) {
            return payload.id == item.id
        })
        state.itemList[index].count = payload.count;
    }
};

//this.$store.dispatch("addCart", product);
const  actions = {

    //添加商品 1.已有+1  2.新添加
    addCart(context, payload) {
       return new Promise( ((resolve, reject) => {
           //1.查找购物车列表中是否已经有了该商品
           console.log(payload.sku);
           let oldProduct = context.state.itemList.find( function (item ) {
               return item.sku.id === payload.sku.id
           });
           console.log("oldProduct=>");
           console.log(oldProduct);
           //2.判断oldProduct
           if (oldProduct) {
               const cart = JSON.parse(JSON.stringify(oldProduct));
               cart.goodsId = cart.product.id;
               cart.skuId = cart.sku.id;
               cart.count += payload.count;
               updateCartCount(cart).then(res => {
                   console.log(res);
                   if (res.code == 200) {
                       context.commit(ADD_COUNTER, {
                           oldProduct,
                           count: payload.count
                       });
                       resolve('当时商品数量增加')
                   } else {
                       resolve("添加购物车失败")
                   }
               });
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
            getAllCart().then( res => {
                context.commit(LOAD_CART, res.data);
            })
        }))
    },
    deleteCartItem(context, payload) {
        return new Promise(((resolve, reject) => {
            deleteCart(payload).then( res => {
                if (res.code == 500) {
                    resolve("删除失败！！");
                } else if (res.code == 200) {
                    context.commit(DELETE_CART_ITEM);
                    resolve("删除成功！");
                }
            })
        }))
    },
    changeCartCount(context, payload) {
        console.log(payload);
        const cart = JSON.parse(JSON.stringify(payload));
        cart.goodsId = cart.product.id;
        cart.skuId = cart.sku.id;
        cart.count = payload.count;
        updateCartCount(cart).then(res => {
            console.log(res);
            if (res.code == 200) {
                context.commit(CHANGE_COUNT, {
                    id: payload.id,
                    count: payload.count
                });
                resolve('当时商品数量增加')
            } else {
                resolve("添加购物车失败")
            }
        });
    }
};


const getters = {

    cartLength(state) {
        return state.itemList.length;
    },
    itemList(state) {
        state.itemList.forEach( (item) => {
            item.amount = item.sku.price * item.count;
            let ownSpec = item.sku.ownSpec;
            let oSpec = []
            if (ownSpec!=null) {
                ownSpec = ownSpec.replace("{", "");
                ownSpec = ownSpec.replace("}", "");
                let str = ownSpec.split(',')
                str.forEach( (st) => {
                    const a = st.split(':');
                    if (a[0]!=null && a[1]!=null) {
                        const spec = {
                            label: a[0].replace("\"","").replace("\"",""),
                            value: a[1].replace("\"","").replace("\"",""),
                        }
                        oSpec.push(spec)
                    }
                });
                item.ownSpec = oSpec;
            }
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