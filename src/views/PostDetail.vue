<template>
  <div class="post-detail-page">
    <modal
      title="删除文章"
      :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>确定删除这篇文章吗？</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img
        :src="currentPost.image"
        alt="currentPost.title"
        class="rounded-lg img-fluid my-4"
        v-if="currentPost.image"
      />
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <img src="../assets/avatar.jpg" alt="" class="border-circle" />
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：{{ currentPost.createAt }}</span
        >
      </div>
      <div>
        <h3>{{ currentPost.title }}</h3>
        <p>{{ currentPost.content }}</p>
      </div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          :to="{ name: 'create', query: { id: currentPost._id } }"
          class="btn btn-success"
          type="button"
          >编辑</router-link
        >
        <button
          class="btn btn-danger"
          type="button"
          @click.prevent="modalIsVisible = true"
        >
          删除
        </button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { PostProps, ImageProps, UserProps, ResponseType } from "../testData";
import createMessage from "../components/createMessage";
import Modal from "../components/Modal.vue";

export default defineComponent({
  name: "post-detail",
  components: {
    Modal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    // 创建响应式对象 用来确定modal是否出现
    const modalIsVisible = ref(false);
    // 获取当前文章id
    const currentId = +route.params.id;
    onMounted(() => {
      store.dispatch("fetchPost", currentId);
    });
    // 获取当前文章相关数据
    const currentPost = computed<PostProps>(() =>
      store.getters.getCurrentPost(currentId)
    );
    const columnid = currentPost.value.column;

    // 根据登录状态 和 用户中authorid是否与文章id相同来显示编辑
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user;
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuther = currentPost.value.author as UserProps;
        //  如果当前文章作者等于登录的id 返回true
        return postAuther._id === _id;
      } else {
        return false;
      }
    });
    const hideAndDelete = () => {
      modalIsVisible.value = false;
      // -----------------优化-------------------

      store.dispatch("deletePost", currentId).then(() => {
        createMessage("删除成功，2秒跳转专栏首页", "success", 2000);
        setTimeout(() => {
          router.push({
            name: "column",
            params: { id: columnid },
          });
        }, 2000);
      });

      // store
      //   .dispatch("deletePost", currentId)
      //   .then((rawData: ResponseType<PostProps>) => {
      //     createMessage("删除成功，2秒跳转专栏首页", "success", 2000);
      //     setTimeout(() => {
      //       router.push({
      //         name: "column",
      //         params: { id: currentPost.value.column },
      //       });
      //     }, 2000);
      //   });
    };

    return {
      currentPost,
      modalIsVisible,
      showEditArea,
      hideAndDelete,
    };
  },
});
</script>
