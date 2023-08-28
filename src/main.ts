/* eslint-disable */
// eslint-disable-next-line
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"

// -----------------优化-------------------
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// 设置请求拦截器
axios.interceptors.request.use(config => {
    // 设置参数 旧的保留 用新的替换
    // config.params = { ...config.params, Icode }
    // 设置拦截器 在每次请求发送前 设置loading
    store.commit('setLoading', true)
    store.commit('setError', { status: false, message: '' })

    return config
})
// 设置相应拦截器
axios.interceptors.response.use(config => {
    setTimeout(() => {
        store.commit('setLoading', false)
    }, 1000);
    return config
    // 设置错误拦截
}, e => {
    // 发送错误时 解析出error 传给store改变error状态
    const { error } = e.response.data
    store.commit('setError', { status: true, message: error })
    store.commit('setLoading', false)
    return Promise.reject(error)
})


const app = createApp(App)
app.use(router)
app.use(store)
app.mount("#app")
