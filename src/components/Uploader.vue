<template>
  <div class="file-upload">
    <div
      class="file-upload-container"
      @click.prevent="triggerUpload"
      v-bind="$attrs"
    >
      <slot name="loading" v-if="fileStatus === 'loading'">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot
        name="uploaded"
        v-else-if="fileStatus === 'success'"
        :uploadedData="uploadedData"
      >
        <button class="btn btn-primary" disabled>上传成功！</button>
      </slot>
      <slot name="default" v-else>
        <button class="btn btn-primary" disabled>点击上传</button>
      </slot>
    </div>
    <!-- 将输入框隐藏 点击button直接选择文件上传 -->
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang='ts'>
/* eslint-disable */
// eslint-disable-next-line
import axios from "axios";
import { defineComponent, PropType, ref } from "vue";

// 创建状态 显示上传的动态
type UploaderStatus = "ready" | "loading" | "success" | "error";
// 定义要传入的func
type CheckFunction = (file: File) => boolean;
export default defineComponent({
  name: "Uploader",
  props: {
    actions: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
  },
  inheritAttrs: false,
  // 创建两个在不同生命周期弹出的函数 成功 和 失败
  emits: ["file-uploaded", "file-uploaded-error"],
  setup(props, context) {
    // 拿到一个dom节点
    const fileInput = ref<null | HTMLInputElement>(null);
    // 创建状态
    const fileStatus = ref<UploaderStatus>("ready");
    // 创建一个响应式数据 接收上传接口返回的数据 用于slot提交给父组件
    const uploadedData = ref();
    const triggerUpload = () => {
      // dom节点已经存在   就点击它
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    //
    const handleFileChange = (e: Event) => {
      // 先断言成input元素类型 方便拿到target上的file属性
      const currentTarget = e.target as HTMLInputElement;
      // 有选择的文件了 开始上传
      if (currentTarget.files) {
        // 将files转换成一个数组

        const files = Array.from(currentTarget.files);
        // 判断传入函数是否存在
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]);
          if (!result) {
            return;
          }
        }
        fileStatus.value = "loading";
        // 创建 Form 类型的数据方便文件转换二进制上传
        const formData = new FormData();
        formData.append("file", files[0]);
        // 发送请求
        axios
          .post(props.actions, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            // console.log(res);
            // 成功后 触发第一个事件
            context.emit("file-uploaded", res.data);
            // uploadedData.value = res.data;
            fileStatus.value = "success";
          })
          .catch((error) => {
            context.emit("file-uploaded-error", { error });
            fileStatus.value = "error";
            // 最后都要触发的事件 给input恢复空值
          })
          .finally(() => {
            if (fileInput.value) {
              // 将input的value置为空
              fileInput.value.value = "";
            }
          });
      }
    };
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
      uploadedData,
    };
  },
});
</script>
