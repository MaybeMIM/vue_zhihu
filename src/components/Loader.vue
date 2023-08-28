<template>
  <teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{ backgroundColor: backgound || '' }"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status"></div>
        <span class="sr-only"></span>
        <p v-if="text" class="text-primary small">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang='ts'>
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, onUnmounted } from "vue";
import useDOMCreate from "../hooks/useDOMCreate";
export default defineComponent({
  name: "Loader",
  props: {
    text: {
      type: String,
    },
    backgound: {
      type: String,
    },
  },
  setup() {
    // 创建节点
    useDOMCreate("back");
    // const node = document.createElement("div");
    // node.id = "back";
    // document.body.appendChild(node);
    // onUnmounted(() => {
    //   document.body.removeChild(node);
    // });
  },
});
</script>

<style >
.loading-container {
  background: rgba(255, 255, 255, 0.5);
  z-index: 100;
  position: fixed;
  text-align: center;

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>