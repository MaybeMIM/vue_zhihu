<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <!-- @file-uploaded="handleFileUploaded" -->
    <uploader
      actions=""
      :beforeUpload="uploadCheck"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded>
        <img src="../assets/logo.png" alt="" />
      </template>
    </uploader>
    <validate-form @form-sumbit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题:</label>
        <validate-input
          :rules="titlerules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章标题:</label>
        <validate-input
          :rules="contentrules"
          v-model="contentVal"
          placeholder="请输入文章标题"
          type="text"
          tag="textarea"
          rows="10"
        />
      </div>
      <template #sumbit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang='ts'>
/* eslint-disable */
// eslint-disable-next-line
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import Uploader from "@/components/Uploader.vue";
import createMessage from "../components/createMessage";
import { beforeUploadCheck } from "../helper";
import { defineComponent, onMounted, ref, computed } from "vue";
import { GolablDataProps } from "../store";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { PostProps, ResponseType, ImageProps } from "../testData";
export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
    Uploader,
  },
  props: {},
  setup() {
    const titleVal = ref("");
    const contentVal = ref("");
    const router = useRouter();
    const route = useRoute();
    // 根据路径上是否有参数id 来显示是创建文章还是编辑文章
    const isEditMode = !!route.query.id;
    const store = useStore<GolablDataProps>();
    let imageId = "";
    const titlerules: RulesProp = [
      {
        type: "required",
        message: "文章标题不能为空",
      },
    ];
    const contentrules: RulesProp = [
      {
        type: "required",
        message: "文章详情不能为空",
      },
    ];
    // 发起请求 获取文章数据填充到编辑mode中
    onMounted(() => {
      if (isEditMode) {
        // -----------------优化-------------------
        store
          .dispatch("fetchPost", route.query.id)
          .then((rawData: ResponseType<PostProps>) => {
            // console.log(rawData);
          });

        if (route.query.id) {
          const currentId = +route.query.id as number | null;
          const currentPost = computed<PostProps>(() =>
            store.getters.getCurrentPost(currentId)
          );
          // console.log(currentPost);
          titleVal.value = currentPost.value.title;
          contentVal.value = currentPost.value.content;
        }
        // 获取当前文章相关数据
      }
    });
    //1 传出拿到的imageId 方便提交时存储数据
    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      // -----------------优化-------------------
      // if (rawData.data._id) {
      //   imageId = rawData.data._id;
      // }
    };
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user;
        // 使用type gurid 判断是否为unddfined就不会报错
        if (columnId) {
          const newPost: PostProps = {
            // _id: new Date().getTime(),
            _id: +route.query.id!, //id为NaN !!!
            title: titleVal.value,
            content: contentVal.value,
            createAt: new Date().toLocaleString(),
            column: columnId,
            author: store.state.user,
          };
          // 如果是编辑框 则把拿到的新数据提交给mutation
          if (isEditMode) {
            store.commit("editPost", newPost);
            createMessage("修改成功 2秒跳转至文章", "success", 2000);
            setTimeout(() => {
              router.push({ name: "column", params: { id: columnId } });
            }, 2000);
          } else {
            store.commit("createPost", newPost);
            createMessage("发表成功 2秒跳转至文章", "success", 2000);
            setTimeout(() => {
              router.push({ name: "column", params: { id: columnId } });
            }, 2000);
          }
          // -----------------优化-------------------
          // //2 发起请求修改store
          // store.dispatch("createPost", newPost).then(() => {
          //   createMessage("发表成功 2秒跳转至文章", "success", 2000);
          //   setTimeout(() => {
          //     router.push({ name: "column", params: { id: columnId } });
          //   }, 2000);
          // });
          // store.commit("createPost", newPost);
          // router.push({ name: "column", params: { id: columnId } });
        }
      }
    };
    // 自定义的检查
    const uploadCheck = (file: File) => {
      // 希望格式是两种 大小1M
      const result = beforeUploadCheck(file, {
        format: ["image/jpeg", "image/png"],
        size: 1,
      });
      const { passed, error } = result;
      if (error === "format") {
        createMessage("上传图片格式只能是 JPG/PNG 格式！", "error", 1500);
      }
      if (error === "size") {
        createMessage("上传图片大小不能超过1M！", "error", 1500);
      }
      return passed;
    };
    return {
      titleVal,
      contentVal,
      titlerules,
      contentrules,
      onFormSubmit,
      uploadCheck,
      handleFileUploaded,
    };
  },
});
</script>
<style >
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
</style>