import Vue from 'vue'
import VueRouter from 'vue-router'

// vue-router跳转相同路径报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

/*!
 * 路由数组 - v1.0.0 2021-2-20
 * jurisdiction 权限判断 0游客 1用户 2会员
 */

export default new VueRouter({
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('@/views/index.vue'),
            meta: {
                title: "首页",
                jurisdiction: 0
            },
        }, {
            path: '/index',
            name: 'index',
            component: () =>
                import ('@/views/index.vue'),
            meta: {
                title: "首页",
                jurisdiction: 0
            },
        }, {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/views/login.vue'),
            meta: {
                title: "用户登录",
                jurisdiction: 0
            },
        }, {
            path: '/classify',
            name: 'classify',
            component: () =>
                import ('@/views/classify.vue'),
            meta: {
                title: "产品分类",
                jurisdiction: 0
            },
        }, {
            path: '/productList',
            name: 'productList',
            component: () =>
                import ('@/views/productList.vue'),
            meta: {
                title: "产品列表",
                jurisdiction: 0
            },
        }, {
            path: '/user',
            name: 'user',
            component: () =>
                import ('@/views/user.vue'),
            meta: {
                title: "用户中心",
                jurisdiction: 1
            },
        }, {
            path: '/cart',
            name: 'cart',
            component: () =>
                import ('@/views/cart.vue'),
            meta: {
                title: "购物车",
                jurisdiction: 1
            },
        }, {
            path: '/order',
            name: 'order',
            component: () =>
                import ('@/views/order.vue'),
            meta: {
                title: "订单中心",
                jurisdiction: 1
            },
        }, {
            path: '/addrList',
            name: 'addrList',
            component: () =>
                import ('@/views/addrList.vue'),
            meta: {
                title: "收货地址",
                jurisdiction: 1
            },
        }, {
            path: '/addrEdit',
            name: 'addrEdit',
            component: () =>
                import ('@/views/addrEdit.vue'),
            meta: {
                title: "编辑地址",
                jurisdiction: 1
            },
        }, {
            path: '/history',
            name: 'history',
            component: () =>
                import ('@/views/history.vue'),
            meta: {
                title: "浏览历史",
                jurisdiction: 1
            },
        },{
            path: '/msgList',
            name: 'msgList',
            component: () =>
                import ('@/views/msgList.vue'),
            meta: {
                title: "信息中心",
                jurisdiction: 1
            },
        }, {
            path: '/403',
            name: '403',
            component: () =>
                import ('@/views/jurisdiction.vue'),
            meta: {
                title: "403",
            },
        }, {
            path: '/404',
            name: '404',
            component: () =>
                import ('@/views/notfound.vue'),
            meta: {
                title: "404",
            },
        },
        {
            path: '*',
            redirect: "/404",
            meta: {
                title: "404",
            },
        }, //全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
    ]
})