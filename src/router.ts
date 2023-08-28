/* eslint-disable */
// eslint-disable-next-line
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import Signup from './views/Signup.vue'
import PostDetail from './views/PostDetail.vue'
import store from './store'
import axios from 'axios'



const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { redirectAlreadyLogin: true }
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
            meta: { redirectAlreadyLogin: true }
        },
        {
            path: '/column/:id',
            name: 'column',
            component: ColumnDetail,

        }, {
            path: '/post:id',
            name: 'post',
            component: PostDetail
        },
        {
            path: '/create',
            name: 'create',
            component: CreatePost,
            // 添加元信息 方便识别哪些路由需要守卫
            meta: { requiredLogin: true }
        },
    ]
})
// 全局前置后卫
router.beforeEach((to, from, next) => {
    // console.log(to.meta); {requiredLogin : true}
    // 如果不是去登录页面 而且还是未登录状态
    // if (to.name !== 'login' && !store.state.user.isLogin) {
    // 访问需要login权限的路由 且没有登录状态 直接跳转登录页面
    // 第一阶段 单纯用本地的store数据 判断是否登录
    if (to.meta.requiredLogin && !store.state.user.isLogin) {
        next({ name: 'login' })
        // 如果是登录状态访问登录页面则跳转首页
    } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
        next('/')
    } else {
        next()
    }
    // 第二阶段 根据后端登录等信息 判断是否登录
    // const { user, token } = store.state
    // const { requiredLogin, redirectAlreadyLogin } = to.meta
    // if (!user.isLogin) {
    //     // 未登录
    //     if (token) {
    //         axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    //         // 发请求获取token
    //         store.dispatch('fetchCurrentUser').then(() => {
    //             if (redirectAlreadyLogin) {
    //                 next('/')
    //             } else {
    //                 next()
    //             }
    //         }).catch(e => {
    //             console.log(e);
    //             store.commit('logout')
    //             next('login')
    //         })
    //     } else {
    //         // 没有token 且想要访问想要登录权限的
    //         if (requiredLogin) {
    //             next('/')
    //         }
    //     }
    // } else {
    //     // 已登录 且要访问 登录和注册
    //     if (redirectAlreadyLogin) {
    //         next('/')
    //     } else {
    //         next()
    //     }
    // }
})


export default router