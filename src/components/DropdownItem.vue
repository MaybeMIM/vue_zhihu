<template>
  <!-- 动态添加class属性 判断是否存在disabled 存在则值为true 且添加class名-->
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </li>
</template>

<script lang="ts">
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "DropdownItem",

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
