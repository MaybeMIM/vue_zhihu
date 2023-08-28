<template>
  <div class="dropdown" ref="dropdownRef">
    <!-- a链接 在点击事件后加上prevent 防止默认事件 -->
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, watch, ref } from "vue";
import useClickOutside from "../hooks/userClickOutside";
export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    // 是否打开下拉菜单
    const isOpen = ref(false);
    // 点击展开或关闭事件
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    // 命名要与ref的命名相同才可以
    const dropdownRef = ref<null | HTMLElement>(null);

    // 点击其他地方关闭下拉菜单 (鼠标事件类型) 抽离出来hook中
    /*const handle = (e: MouseEvent) => {
      if (dropdownRef.value) {
        // console.log(dropdownRef.value); <div.class="dropdown">
        // 点击的地方如果是下拉菜单的选项不做什么 如果是其他地方 且菜单是打开情况则直接关闭菜单
        // 如果contains中的节点是dropdown的后代节点或者是本身 返回true
        if (
          !dropdownRef.value.contains(e.target as HTMLElement) &&
          isOpen.value
        ) {
          isOpen.value = false;
        }
      }
    };
    // 在挂载时绑定事件
    onMounted(() => {
      document.addEventListener("click", handle);
    });
    // 销毁时解除
    onUnmounted(() => {
      document.removeEventListener("click", handle);
    });*/
    const isClickOutside = useClickOutside(dropdownRef);
    // 用watch检测变化  setup只会执行一次 不然单单if语句判断就没有响应式了
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false;
      }
    });

    return {
      isOpen,
      toggleOpen,
      // 目前返回出去之前是null 类型 但是挂载之后在页面上就是dom节点类型
      dropdownRef,
    };
  },
});
</script>
