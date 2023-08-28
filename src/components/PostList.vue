<template>
  <!-- 专栏内文章列表 -->
  <!-- 用来预格式化的文本  -->
  <!-- <pre>{{ route }}</pre> -->
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <router-link :to="`/post${post._id}`" class="btn btn-outline-primary">{{
          post.title
        }}</router-link>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-3">
            <img
              :src="post.image"
              :alt="post.title"
              class="rounded-lg border"
            />
          </div>
          <p :class="{ 'col-9': post.image }">{{ post.content }}</p>
        </div>
        <span class="text-muted"></span>
      </div>
    </article>
  </div>
</template>

<script lang='ts'>
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, PropType, computed } from "vue";
import { PostProps } from "../testData";

export default defineComponent({
  name: "PostList",
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true,
    },
  },
});
</script>
