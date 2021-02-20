import Vue from 'vue'
import VueRouter from 'vue-router'

// vue-router跳转相同路径报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// parameter 是否带有参数
// jurisdiction 是否需要权限跳转
export default new VueRouter({
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('@/pages/index.vue'),
            meta: {
                title: "首页",
            },
        }, {
            path: '/index',
            name: 'index',
            component: () =>
                import ('@/pages/index.vue'),
            meta: {
                title: "首页",
            },
        }, {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/pages/login.vue'),
            meta: {
                title: "用户登录",
            },
        }, {
            path: '/403',
            name: '403',
            component: () =>
                import ('@/pages/jurisdiction.vue'),
            meta: {
                title: "403",
            },
        }, {
            path: '/404',
            name: '404',
            component: () =>
                import ('@/pages/notfound.vue'),
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