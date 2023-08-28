<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/create" class="btn btn-primary my-2"
              >开始写文章</router-link
            >
          </p>
        </div>
      </div>
    </section>

    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang='ts'>
/* eslint-disable */
// eslint-disable-next-line
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { GolablDataProps } from "../store";
import { ResponseType, ImageProps } from "../testData";
import ColumnList from "../components/ColumnList.vue";
import createMessage from "../components/createMessage";
// 测试的数据

export default defineComponent({
  name: "Home",
  components: {
    ColumnList,
  },
  setup() {
    onMounted(() => {
      // 发送请求获取数据列表
      store.dispatch("fetchColumns");
    });
    const store = useStore<GolablDataProps>();
    // vuex状态存储是响应式的 最简单的获取状态方法用计算属性
    // 专栏列表数据
    const list = computed(() => store.state.columns);
    // 自定义检查
    const beforeUpload = (file: File) => {
      // 判断文件是否为jpg文件
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        createMessage("上传图片只能是 JPG 格式!", "error", 1500);
      }
      // beforeUpload 要返回 布尔类型
      return isJPG;
    };
    // 自定义的行为 : 希望上传成功后打印图片id
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片ID ${rawData}`, "success", 1500);
    };
    return {
      list,
      beforeUpload,
      onFileUploaded,
    };
  },
});
</script>