<template>
  <div class="login-wrap">
    <div class="bg" />
    <div class="login">
      <a-form ref="formRef" :model="formState" :rules="formRules">
        <a-form-item name="username">
          <a-input v-model:value="formState.username" allowClear placeholder="手机号/邮箱/账号">
            <template #prefix>
              <user-outlined type="user" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input v-model:value="formState.password" allowClear placeholder="请输入登录密码">
            <template #prefix>
              <LockOutlined type="user" />
            </template>
          </a-input>
        </a-form-item>
        <div class='line'>
          <a-checkbox-group v-model:value="formState.remember">
            <a-checkbox value="1" name="type">自动登录</a-checkbox>
          </a-checkbox-group>
          <a-button type="link">忘记密码？</a-button>
        </div>
        <a-form-item>
          <a-button type="primary" block :loading="submitLoading" @click="onSubmit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { defineComponent, reactive, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const { push } = useRouter()
    const formRef = ref()
    const submitLoading = ref(false)
    const formState = reactive({
      username: 'lukelili',
      password: '123456',
      remember: []
    })
    const formRules = {
      username: { required: true, message: '请输入正确的账号' },
      password: { required: true, message: '请输入正确的密码' }
    }
    const onSubmit = () => {
      // 表单校验
      formRef.value.validate().then(async () => {
        submitLoading.value = true
        const { code, desc } = await fetch(`api/login`, { method: 'POST' }).then(res => res.json())
        submitLoading.value = false
        if (code !== 0) return message.error(desc)
        message.success(desc)
        setTimeout(() => {
          push({ path: '/'})
        }, 500)
      }, (error: any) => {
        message.warning(error.errorFields[0].errors)
        return false
      })
    }
    return {
      formRef,
      formState,
      formRules,
      onSubmit,
      submitLoading
    }
  }
})
</script>

<style lang="less" scoped>
.login-wrap{
  width: 100vw;
  height: 100vh;
  position: relative;
  .bg{
    width: 100%;
    height: inherit;
    position: absolute;
    background: url(../../assets/login_bg.jpg) center;
    background-repeat: no-repeat;
    background-size: cover;
    filter:blur(10px);
  }
  .login{
    min-width: 320px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 10;
    padding: 20px 20px 0;
    border-radius: 10px;
    text-align: left;
    transform: translate(-50%, -60%);
    border: 1px solid rgba(0,0,0,.6);
    background-color: rgba(0,0,0,.6);
    /deep/.ant-input-prefix{
      margin-right: 10px;
    }
    .line{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .ant-btn{
        padding: 0;
      }
    }
  }
}
</style>