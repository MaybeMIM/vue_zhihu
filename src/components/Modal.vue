<template>
  <teleport to="#modal">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" @click="onClose">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="onClose"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="onConfirm">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, PropType } from "vue";
import userDOMCreate from "../hooks/useDOMCreate";
export default defineComponent({
  name: "DropdownItem",
  props: {
    title: String,
    visible: {
      type: Boolean,
      dafault: false,
    },
  },
  emits: ["modal-on-close", "modal-on-confirm"],
  setup(props, context) {
    // 使用了teleport 就要创建一个节点
    userDOMCreate("modal");
    const onClose = () => {
      // 发射函数出去
      context.emit("modal-on-close");
    };
    const onConfirm = () => {
      context.emit("modal-on-confirm");
    };
    return {
      onClose,
      onConfirm,
    };
  },
});
</script>