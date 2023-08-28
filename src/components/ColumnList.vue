<template>
  <!-- 循环出每一个小专栏 -->
  <div class="row">
    <div class="col-4 mb-4" v-for="column in columnList" :key="column._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <!-- :src="../assets/logo.png" -->
          <img
            :src="column.avatar && column.avatar.url"
            :alt="column.title"
            class="rounded-circle border border-light my-3 w-25"
          />

          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text test-left">{{ column.description }}</p>
          <router-link
            :to="`/column/${column._id}`"
            class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
/* eslint-disable */
// eslint-disable-next-line
import { computed, defineComponent, PropType } from "vue";
import { ColumnProps } from "../testData";

export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      // 将数组断言成另一个类型数组 需要proptype
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props) {
    // 重新用计算属性重组 当头像不存在时返回本地文件
    const columnList = computed(() => {
      return props.list.map((column) => {
        if (!column.avatar) {
          column.avatar = {
            url: require("@/assets/column.jpg"),
          };
        }
        return column;
      });
    });
    return {
      columnList,
    };
  },
});
</script>

