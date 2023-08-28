<template>
  <form class="validate-form-container">
    <!-- 默认具名插槽 插入父组件包括的内容 -->
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="sumbitForm">
      <slot name="submit">
        <!-- 默认内容 -->
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, onUnmounted } from "vue";
// 导入mitt 用于父子组件通信 相当于 $on $emit
import mitt from "mitt";
// mitt高版本有bug需要如下定义类型
// 定义验证函数
type ValidateFunc = () => boolean;
// 处理函数和事件名要一一对应
type Events = { "form-item-created": ValidateFunc };
// 创建监听器 (导出给input使用 作为父)
export const emitter = mitt<Events>();

export default defineComponent({
  // 自定义触发事件
  emits: ["form-sumbit"],
  setup(props, context) {
    // 存放函数 执行后可以显示错误信息 返回input是否通过
    let funcArr: ValidateFunc[] = [];
    const sumbitForm = () => {
      // 循环调用input组件中的Validateinput方法 通过事件发送出去 直接返回运行结果用result接收
      // 用map重构数组成为一个装满Boolean的数组 最后再调用every 原因是要使函数全部运行之后再根据返回的false显示错误
      const result = funcArr.map((func) => func()).every((result) => result);
      context.emit("form-sumbit", result);
    };
    const callback = (func: ValidateFunc) => {
      funcArr.push(func);
    };
    emitter.on("form-item-created", callback);
    onUnmounted(() => {
      emitter.off("form-item-created", callback);
      funcArr = [];
    });
    return {
      sumbitForm,
      funcArr,
    };
  },
});
</script>
