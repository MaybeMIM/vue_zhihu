<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <loader v-if="isLoading" text="拼命加载中"></loader>
    <!-- <message
      type="error"
      :message="error.message"
      v-if="error.status"
    ></message> -->
    <!-- 路由位置 -->
    <router-view></router-view>
    <footer class="text-center py-4 text=secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang='ts'>
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, computed, onMounted, watch } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "vuex";
import GlobalHeader from "./components/GlobalHeader.vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Loader from "./components/Loader.vue";
// import Message from "./components/Message.vue";
import createMessage from "./components/createMessage";
import axios from "axios";
// 测试的数据

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    Home,
    Login,
    Loader,
  },
  setup() {
    const store = useStore();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);

    // 已在router文件中做操作 不需要在此重复
    // onMounted(() => {
    //   // 没有登录 且 token存在
    //   if (!currentUser.value.isLogin && token.value) {
    //     axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
    //     store.dispatch("fetchCurrentUser");
    //   }
    // });

    // 用watch方法 当error获取到某值 也就是有错误发生 再生成message
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          createMessage(message, "error");
        }
      }
    );
    return {
      currentUser,
      isLoading,
      error,
    };
  },
});
</script>
