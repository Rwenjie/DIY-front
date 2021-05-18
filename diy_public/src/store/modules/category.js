/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/17
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/17
 **/

import {
    LOAD_CATEGORIES,
} from "../mutations-type";

import {getTreeData} from "../../utils/utils";
import {categoryList} from "network/item";

const state = {
    categoryPath: {},
    activeCategory: [],
    categories: []
};
//mutations 的目的 修改stats中的状态
//mutations 的操作尽可能的单一
//我们可以吧
const mutations = {
    //payload 新添加的商品
    [LOAD_CATEGORIES](state, payload) {
        state.categories = payload;
    }

};

//this.$store.dispatch("addCart", product);
const  actions = {

    loadCategories(context) {
        categoryList().then( res => {
            console.log(res);
            const categories = getTreeData(res.data);
            console.log(categories);
            context.commit(LOAD_CATEGORIES, categories)
        })
    }

};

const getters = {

    categories(state) {
        return state.categories;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}