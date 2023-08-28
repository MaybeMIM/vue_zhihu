
/* eslint-disable */
// eslint-disable-next-line
import { createStore, Commit } from "vuex";
import { testData, testPosts, ColumnProps, PostProps, UserProps } from "./testData";
import axios from 'axios'


interface ListProps<P> {
    [id: string]: P
}
// columns: ListProps<ColumnProps>,
// posts: ListProps<PostProps>,
// -----------------优化-------------------

export interface GolablDataProps {
    error: GloablErrorProps
    token: string;
    loading: boolean;
    columns: ColumnProps[],
    posts: PostProps[],
    user: UserProps
}
export interface GloablErrorProps {
    status: boolean,
    message?: string
}




// action 中每次 commit 提交都需要async操作，干脆提取出来成为一个函数 commit 为 Commit函数方法类型
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
    const { data } = await axios.get(url)
    commit(mutationName, data)
    // 将data 返回到返回包裹的promise对象中
    return data
}
// 用于发送请求后提交给mutation进行对数据的操作
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
    const { data } = await axios.post(url, payload)
    commit(mutationName, data)
    return data
}
const store = createStore<GolablDataProps>({
    state: {
        // -----------------优化-------------------
        error: { status: false, message: '请重试' },
        // token:localstorage.getItem('token') || '',
        token: '',
        loading: false,
        // 有了后端提供的数据后再修改为空数组
        columns: testData,
        posts: testPosts,
        user: { isLogin: true, nickName: 'yicheng', _id: 1, columnId: 1 }
    },
    // 同步操作
    mutations: {
        // -----------------优化-------------------
        // 注释的代码等接入自己写的后端接口就可以解开
        // 点击登录后 修改user状态
        // login(state) {
        //     // 新对象替换老对象用展开运算符
        //     state.user = { ...state.user, isLogin: true, name: 'yicheng' }
        // },

        // 创建新文章 添加新文章对象 (本地)
        createPost(state, newPost) {
            console.log(newPost);
            state.posts.push(newPost)
        },
        // 编辑文章
        editPost(state, editPost) {
            // 根据_id拿到索引 然后替换数组
            const index = state.posts.findIndex(post => post._id === editPost._id)
            state.posts.splice(index, 1, editPost)
            console.log(state.posts);
        },
        // 改变loading的状态
        setLoading(state, status) {
            state.loading = status
        },
        // 改变error状态
        setError(state, e: GloablErrorProps) {
            state.error = e
        },
        // 点击登录后 修改user状态
        login(state, rawData) {
            // 暂时临时修改状态
            state.user = { ...state.user, isLogin: true }

            // 拿到Data 希望把获取的token存储到store中
            // const { token } = rawData.data
            // state.token = token
            // localStorage.setItem('token',token)
            // 设置token 用于每次请求携带
            // axios.defaults.headers.common.Authorization = `Bearer ${token}`
        },
        // 登出修改状态
        logout(state) {
            state.token = ''
            localStorage.removeItem('token')
            delete axios.defaults.headers.common.Authorization
        },
        // 发送请求修改数据 (还没有后端api不能修改先 可以先调用)
        fetchColumns(state, rawData) {
            // console.log(rawData); {icode:不能为空}
            // state.columns = rawData.data.list
        },
        fetchColumn(state, rawData) {
            // state.columns = [rawData.data]
        },
        fetchPosts(state, rawData) {
            // state.posts = [rawData.data.list]
        },
        deletePost(state, Id) {
            //   state.posts = state.posts.filter(post=>post._id !== data.id)  
            state.posts = state.posts.filter(post => post._id !== Id)
            console.log(state.posts);
        },
        fetchCurrentUser(state, rawData) {
            // state.user = { isLogin : true, ...rawData}
        }

    },
    // 异步操作
    actions: {
        // -----------------优化-------------------
        // 接收与store相同方法和属性的对象 (发送请求)
        // 获取数据列表
        fetchColumns({ commit }) {
            return getAndCommit('/columns?currentPage=1&pageSize=5', 'fetchColumns', commit)
        },
        //  使用asyns 和 await 关键字 方便快捷
        // async fetchColumns({ commit }) {
        //     const { data } = await axios.get('/columns?currentPage=1&pageSize=5')
        //     commit('fetchColumns', data)
        // axios.get('/columns?currentPage=1&pageSize=5').then(res => {
        //     commit('fetchColumns', res.data)
        // })

        // 获取单个Column
        fetchColumn({ commit }, cid) {
            return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
        }
        // async fetchColumn({ commit }, cid) {
        //     const { data } = await axios.get(`/columns/${cid}`)
        //     commit('fetchColumn', data)
        // axios.get(`/columns/${cid}`).then(res => {
        //     commit('fetchColumn', res.data)
        // })
        ,
        // 获取全部文章
        fetchPosts({ commit }, cid) {
            return getAndCommit(`/columns/${cid}`, 'fetchPosts', commit)
        },
        // 获取单个文章
        fetchPost({ commit }, cid) {
            return getAndCommit(`/columns/post${cid}`, 'fetchPosts', commit)
        },
        // async fetchPosts({ commit }, cid) {
        //     const { data } = await axios.get(`/columns/${cid}/posts`)
        //     commit('fetchPosts', data)
        // axios.get(`/columns/${cid}/posts`).then(res => {
        //     commit('fetchPosts', res.data)
        // })
        // 获取当前用户信息
        fetchCurrentUser({ commit }) {
            return getAndCommit('/user/current', 'fetchCurrentUser', commit)
        }
        ,
        login({ commit }, payload) {
            // 希望login之后是个action 把异步的请求返回出去 可以用then拿到返回的数据
            return postAndCommit('/user/login', 'login', commit, payload)
        },
        // 新建文章
        createPost({ commit }, payload) {
            // 希望login之后是个action 把异步的请求返回出去 可以用then拿到返回的数据
            return postAndCommit('/posts', 'createPost', commit, payload)
        },
        deletePost({ commit }, id) {
            // 希望login之后是个action 把异步的请求返回出去 可以用then拿到返回的数据
            // return postAndCommit(`/posts${id}`, 'deletePost', commit, id)
            commit('deletePost', id)
        },
        // 组合两个action 登录拿到token之后再根据token得到当前用户信息
        loginAndFetch({ dispatch }, loginData) {
            return dispatch('login', loginData).then(() => {
                return dispatch('fetchCurrentUser')
            })
        }
    },


    getters: {
        // -----------------优化-------------------
        // 需要传入的值得在页面才能拿到
        // 返回一个函数 实现给getter传参 用于store查询数组
        getColumnById: (state) => (id: number) => {
            return state.columns.find(c => c._id === id)
        },
        getPostsByCid: (state) => (cid: number) => {
            return state.posts.filter(post => post.column === cid)
        },
        getCurrentPost: (state) => (id: number) => {
            return state.posts.find(post => post._id === id)
        },
    }
})


export default store