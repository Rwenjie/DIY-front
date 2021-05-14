/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/1
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/1
 **/
import {ADD_IMAGES, ADD_SKUS} from "../mutations-type";

const state = {
    images: [],
    skus: [],
};

export default {
    state,
    mutations: {
        [ADD_IMAGES](state, imageUrl) {
            state.images = imageUrl;
        },
        [ADD_SKUS](state, skuList) {
            state.skus = skuList;
        }
    },
    actions: {
        addImages(context, imageUrl) {
            context.commit(ADD_IMAGES, imageUrl);
        },
        addSkus(context, skuList) {
            context.commit(ADD_SKUS, skuList);
        }
    },
    getters: {

    }
}
