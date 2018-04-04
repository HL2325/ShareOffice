<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/image/login/loginlogo.png" alt="">
    </div>
    <div class="loginInput">
      <input type="tel" placeholder="请输入手机号" maxlength="11" v-model="form.account">
      <input type="password" placeholder="请输入密码" v-model="form.pwd">
    </div>
    <button class="loginBtn" @click="submitForm('form')">登录</button>
  </div>
</template>

<script>
  import { login } from '@/api'
  import * as types from '@/store/types'
  export default {
    data () {
      return {
        form: {
          type: 1,
          account: '13123957072',
          pwd: '123456',
          code: ''
        }
      }
    },
    methods: {
      submitForm (form) {
        const toastLogin = this.$toast.loading({
          mask: true,
          message: '登录中...',
          duration:0
        })
        login(this.form).then(data => {
          if (data.resultcode === 200) {
            let key = JSON.stringify(data.result)
            this.$store.commit(types.LOGIN, key)
            this.$router.push('/home')
          }
          this.$toast.loading({mask:false})
          toastLogin.clear()
        })
          .catch (() => {})
      }
    }
  }
</script>
<style lang='less'>
  .login{
    width: 100%;
    height: 100%;
    background: #041a31;
    border:1px solid rgba(0,0,0,0);
    .logo{
      width: 1.68rem;
      height:1.69rem;
      margin:1.56rem auto 1.42rem;
      img{
        width: 100%;
      }
    }
    .loginInput{
      width: 6rem;
      margin: 0 auto;
      input{
        width: 6rem;
        height: 0.96rem;
        padding-left: 0.4rem;
        border-radius: 0.16rem;
        background: rgba(242,249,255,0.2);
        color: #fff;
        font-size: 0.28rem;
        font-family: "微软雅黑";
      }
    }
    .loginBtn{
      display: block;
      color: #fff;
      background: #55b9f2;
      width: 6rem;
      height: 0.96rem;
      line-height: 0.96rem;
      margin: 0.7rem auto 0;
      border-radius: 0.16rem;
      font-size: 0.3rem;
    }
  }
</style>
