/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/13
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/13
 **/
/*
import Vue from 'vue';
import { pca, pcaa } from 'area-data';
import 'vue-area-linkage/dist/index.css'
import VueAreaLinkage from 'vue-area-linkage'
Vue.use(VueAreaLinkage)*/

import Vue from 'vue';
import { pcaa } from 'area-data-vue';
import 'area-linkage-vue/dist/index.css';
import AreaLinkageVue from 'area-linkage-vue';
Vue.prototype.$pcaa = pcaa;

Vue.use(AreaLinkageVue)