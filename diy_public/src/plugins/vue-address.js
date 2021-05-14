/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/13
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/13
 **/

import vueAddress from 'vue-address';
import Vue from 'vue';

// 注册全局组件
Vue.component('vue-address', vueAddress)

// .vue 中使用
export default {
    components: {
        vueAddress
    }
}