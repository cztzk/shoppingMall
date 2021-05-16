import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

// mock开关 开发环境下使用mock
process.env.NODE_ENV == "development" && require('@/mock/mock.js');

Vue.prototype.axios = axios;
    // 接口错误拦截
axios.interceptors.response.use(function(response) {
    // code 返回类型 0正常 10未登录 
    let res = response.data;
    // let path = location.hash;
    if (res.code == 0) {
        return res.data;
    } else if (res.code == 10) {
        // if (path != '#/index') {
        window.location.href = '/#/login';
        // }
        // return Promise.reject(res);
    } else {
        // console.log(res);
        return Promise.reject(res);
    }
}, (error) => {
    let err = error.response;
    // console.log(err);
    return Promise.reject(err);
});

//rem适配
// import 'amfe-flexible/index.js'
import 'amfe-flexible';
// api接口管理
import utils from '@/mixin/utils.js';
Vue.prototype.Utils = utils;

//storage封装
import storage from '@/mixin/storage.js'
Vue.prototype.Storage = storage;

// 全局过滤器
import filter from '@/mixin/filter.js';
Vue.filter('formatMoney', function (value) {
    return filter.formatMoney(value);
})
/*!
 * 路由守卫  - v1.0.0 2021-2-20
 */
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 商城`;
    if (to.meta.jurisdiction == 0) {
        next();
    } else if (to.meta.jurisdiction == 1) {
        let userInfo = JSON.parse(window.localStorage.getItem('user_obj'));
        // console.log(userInfo);
        userInfo ? next() : next('/login');
    } else {
        let userInfo = JSON.parse(window.localStorage.getItem('user_obj'));
        userInfo.user.grade == 2 ? next() : next('/403');
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')