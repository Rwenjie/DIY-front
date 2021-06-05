import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import store from './store/store'
import './plugins/iview.js'
import './plugins/element.js'
import './plugins/quill'
import vuetify from './plugins/vuetify'
import MyComponent from "./components/common/MyComponent";
import waterfall from 'vue-waterfall2'
import './plugins/awesome-swiper'
import './plugins/video-playe'
import './plugins/vuetify'
import './plugins/area-linkage'

Vue.use(waterfall);
import './plugins/vant.js'
import {initLogin} from "./utils/initLogin";
Vue.config.productionTip = false;

router.beforeEach( (to, from, next) => {
  if (window.sessionStorage.getItem("tokenStr") && store.state.user.user!=null) {
    initLogin();
    next()
  } else {
      if (to.fullPath.indexOf("profile")!==-1) {
          router.push("/home")
      }
      console.log(to);
      console.log(from);
      next();
  }
});

Vue.use(MyComponent)
new Vue({
 router,
 store,
 vuetify,
 render: h => h(App)
}).$mount('#app');
