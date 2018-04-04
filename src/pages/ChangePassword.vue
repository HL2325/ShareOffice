<template>
  <div class="changePassword">
    <BackHead></BackHead>
   <div class="passWord">
     <div class="oldPwd">
       <span>新密码</span>
       <input type="password" v-model="UpdateForm.pwd">
     </div>
     <div class="reppwd">
       <span>重复新密码</span>
       <input type="password" v-model="UpdateForm.reppwd">
     </div>
   </div>
    <button class="changeBtn" @click="submitChange('UpdateForm')">保&#X3000;存</button>
  </div>
</template>

<script>
  import BackHead from '../components/BackHead.vue'
  import { UpdarePwd } from '@/api'
  export default {
    data () {
      return {
        UpdateForm: {
          pwd: '',
          reppwd: ''
        }
      }
    },
    methods: {
      submitChange (UpdateForm) {
        if (this.UpdateForm.pwd != '' && this.UpdateForm.reppwd != '') {
          if (this.UpdateForm.pwd === this.UpdateForm.reppwd) {
            UpdarePwd (this.UpdateForm).then(data => {
              this.$dialog.alert({
                title: '提示信息',
                message: '密码修改成功'
              }).then(() => {
                this.$router.push('/')
              })
            })
            .catch(() => {})
          } else {
            const toast = this.$toast({
              forbidClick: true,
              message: '两次输入密码不一致',
              duration: 2000
            })
          }
        } else {
          const toast = this.$toast.fail({
            forbidClick: true,
            message: '请输入密码',
            duration: 2000
          })
        }
      }
    },
    components: { BackHead }
  }
</script>

<style lang="less">
  .changePassword{
    width: 100%;
    .passWord{
      font-size: 0.26rem;
      color: #fff;
      margin-top: 0.5rem;
      padding: 0 0.4rem 0 0.4rem;
      .oldPwd{
        line-height: 0.96rem;
        input{
          width: 5rem;
          height: 0.96rem;
          float: right;
          border-radius: 0.16rem;
          background: #152947;
          border:2px solid #3d4e68;
          color: #fff;
          padding-left: 0.3rem;
        }
      }
      .reppwd{
        line-height: 0.96rem;
        margin-top: 0.4rem;
        input{
          width: 5rem;
          height: 0.96rem;
          float: right;
          border-radius: 0.16rem;
          background: #152947;
          border:2px solid #3d4e68;
          color: #fff;
          padding-left: 0.3rem;
        }
      }
    }
    .changeBtn{
      width: 90%;
      margin-left:5%;
      font-size: 0.36rem;
      color: #f2f9ff;
      background: #55b9f2;
      height:0.96rem;
      border-radius: 0.16rem;
      margin-top: 1rem;
    }
  }
  /*.van-dialog{*/
    /*background: #041a30;*/
    /*border-radius: 0.16rem;*/
    /*border:1px solid #55b9f2;*/
    /*text-align: center;*/
    /*color: #f2f9ff;*/
    /*.van-dialog__message--withtitle{*/
      /*color: #f2f9ff;*/
    /*}*/
    /*.van-button--default{*/
      /*background-color: #041a30;*/
      /*color: #f2f9ff;*/
      /*border-radius: 0.16rem;*/
    /*}*/
  /*}*/
</style>
