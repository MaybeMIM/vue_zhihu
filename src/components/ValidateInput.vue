<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updataValue"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updataValue"
      v-bind="$attrs"
    />
    <!-- attrs 配合 inheritAttrs 可以将父组件的属性 添加到本组件-->
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, onMounted, PropType, reactive, watch } from "vue";
// 导入监听器 在组件挂载完毕之后可以发送信息出去
import { emitter } from "./ValidateForm.vue";

// 邮箱正则表达式
const emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// 验证类型
export interface RuleProp {
  type: "required" | "email" | "custom" | "range";
  message: string;
  // 自定义选择其他类型(custom)的类型 则希望是一个能返回布尔值的函数
  validator?: () => boolean;
}
// 定义一个Rules类型为一个Rule Prop的数组
export type RulesProp = RuleProp[];
// 定义标签类型 支持 text area 类型
export type TagType = "input" | "textarea";

export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    // 自定义组件事件传入的初始值
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input",
    },
  },
  //   不希望根元素继承
  inheritAttrs: false,

  setup(props, context) {
    const inputRef = reactive({
      // 如果父组件有传入值就赋值 没有就为空
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    // watch属性解决 inputRef的val在setup中只渲染一次的问题(因为modelValue传过来只渲染一次)
    watch(
      () => props.modelValue,
      (newValue) => {
        inputRef.val = newValue || "";
      }
    );
    // 拿到输入的值 键盘输入事件 (v-model改造)
    const updataValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      // 拿到键盘输入的值后更新为输入框的内容
      inputRef.val = targetValue;
      // 发送事件支持v-model
      context.emit("update:modelValue", targetValue);
    };

    const validateInput = () => {
      if (props.rules) {
        // 必须保证每一项rule都通过 every中如果有一项为false则立马停止循环 并返回false
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          // 规则可能有多种 if else可能不满足 switch很明晰易于扩展
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
            case "range":
              passed = inputRef.val.length >= 3 && inputRef.val.length <= 6;
              break;
            case "custom":
              // 可选的自定义函数 有就去执行没有就返回true
              passed = rule.validator ? rule.validator() : true;
              break;
            default:
              break;
          }
          return passed;
        });
        // 都通过了则为true error为false
        inputRef.error = !allPassed;
        return allPassed;
      }
      // 如果没有rules 永远返回true
      return true;
    };
    onMounted(() => {
      // 利用监听器传送数据到Form组件中
      emitter.emit("form-item-created", validateInput);
    });
    return {
      inputRef,
      validateInput,
      updataValue,
    };
  },
});
</script>

