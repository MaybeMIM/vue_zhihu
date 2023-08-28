<template>
  <!-- 点击进入专栏之后 专栏内容 -->

  <div class="column-deatil-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 test-center">
        <img
          :src="column.avatar && column.avatar.url"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <!-- 一个column可以有多个post -->
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang='ts'>
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import PostList from "@/components/PostList.vue";

export default defineComponent({
  name: "ColumnDetail",
  components: { PostList },
  setup() {
    onMounted(() => {
      store.dispatch("fetchColumn", currentId);
      store.dispatch("fetchPosts", currentId);
    });
    const store = useStore();
    const route = useRoute();
    // + 为类型转换 从string转换为number 文章id
    const currentId = +route.params.id;
    // 用计算属性简单获取专栏列表数据
    const column = computed(() => store.getters.getColumnById(currentId));
    // const column = computed(() =>
    //   store.state.columns.find((c: { id: number }) => c.id === currentId)
    // );
    // 获取文章列表
    const list = computed(() => store.getters.getPostsByCid(currentId));
    // const list = computed(() =>
    //   store.state.posts.filter(
    //     (post: { columnId: number }) => post.columnId === currentId
    //   )
    // );
    return {
      route,
      column,
      list,
    };
  },
});
</script>
