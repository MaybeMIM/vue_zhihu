<template>
  <div class="container">
    <!-- <column-list :list="testData"></column-list> -->
    <validate-form @form-sumbit="onFormSumbit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          ref="inputRef"
          type="text"
          placeholder="请输入邮箱地址"
          :rules="emailRules"
          v-model="emailVal"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        ></validate-input>
      </div>
      <!-- <template v-slot:submit> -->
      <template #submit> </template>
    </validate-form>
  </div>
</template>

<script lang='ts'>
/* eslint-disable */
// eslint-disable-next-line
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
import createMessage from "../components/createMessage";

export default defineComponent({
  name: "Login",
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    // 初始值
    const emailVal = ref("");
    // 定义相关验证规则
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];
    const passwordVal = ref("");

    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
      // { type: "password", message: "请输入正确的密码格式" },
      { type: "range", message: "请输入3-6位密码" },
    ];

    // 监听表单触发的结果 (验证全部通过 result为true)
    const onFormSumbit = (result: boolean) => {
      // console.log(result); // true
      if (result) {
        // router.push({ name: "column", params: { id: 1 } });
        // store.commit("login");
        const payload = {
          email: emailVal.value,
          password: passwordVal.value,
        };
        // 返回的是promise对象
        // -----------------优化-------------------
        store
          .dispatch("login", payload)
          .then((data) => {
            // store.dispatch("loginAndFetch", payload).then((data) => {
            // console.log(data);
            createMessage("登录成功！", "success", 1500);
            router.push(`/`);
          })
          .catch((e) => {
            // 因为错误时会返回promise的reject 抛出错误 这时在这里借助错误不让抛出
            console.log(e);
          });
      }
    };
    return {
      emailRules,
      passwordRules,
      onFormSumbit,
      emailVal,
      passwordVal,
    };
  },
});
</script>