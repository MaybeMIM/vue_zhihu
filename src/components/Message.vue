<template>
  <teleport to="#message">
    <div
      class="alert message-info fixed-top w-25 mx-auto d-flex justify-content-between mt-2"
      :class="classObject"
      v-if="isVisible"
    >
      <span>{{ message }}</span>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click.prevent="hide"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>

<script lang='ts'>
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, PropType, ref } from "vue";
import useDOMCreate from "../hooks/useDOMCreate";
export type MessageType = "success" | "error" | "default";
export default defineComponent({
  name: "Message",
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: "default",
    },
  },
  //   添加自定义事件 可以拿到实例的生命周期
  emits: ["close-message"],
  setup(props, context) {
    // 创建节点
    useDOMCreate("message");
    // const node = document.createElement("div");
    // node.id = "message";
    // document.body.appendChild(node);
    // 定义是否显示 class样式
    const isVisible = ref(true);
    const classObject = {
      "alert-success": props.type === "success",
      "alert-danger": props.type === "error",
      "alert-primary": props.type === "default",
    };
    const hide = () => {
      isVisible.value = false;
      context.emit("close-message", true);
    };

    return {
      classObject,
      isVisible,
      hide,
    };
  },
});
</script>
