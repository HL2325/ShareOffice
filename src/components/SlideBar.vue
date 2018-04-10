<template>
  <div class="SlideBar" @click="sideHide">
    <div class="SlideBarLeft">
      <div class="SlideBarHear">
        <img :src=users.avatar alt="">
      </div>
      <p class="SlideBarUser">
        <span>{{users.cha_name}}</span>
        <span>{{users.eng_name}}</span>
      </p>
      <ul class="routerList">
        <router-link tag="li" v-for="(l, index) in list" :to="l.uri" :key="index" exact>
          <i class="iconfont" :class="l.icons"></i>
          {{l.name}}
        </router-link>
      </ul>
      <div class="SlideBarBottom">
        <router-link tag="span" to="/changePassword">
          <i class="iconfont icon-yuechi"></i>
          修改密码
        </router-link>
        <span @click="outLogin">
          <i class="iconfont icon-guanbi"></i>
          退出登录
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['users'],
    data () {
      return {
        list: [
          {name:"首页", uri:"/home", icons:"icon-ai-home"},
          {name:"管理", uri:"/manage", icons:"icon-icon_category"},
          {name:"考勤", uri:"/check", icons:"icon-dingwei"},
          {name:"设备", uri:"/equipment", icons:"icon-diannao-tianchong"},
          {name:"场景", uri:"/scene", icons:"icon-weibiaoti2"},
          {name:"访客", uri:"/visitor", icons:"icon-101"},
          {name:"会议", uri:"/meeting", icons:"icon-huiyi"},
          {name:"关于", uri:"/about", icons:"icon-guanyuwomen"}
        ]
      }
    },
    methods: {
      sideHide () {
        this.$emit('hide')
      },
      outLogin () {
        alert('退出登录')
      }
    }
  }
</script>

<style lang="less">
  .SlideBar{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    position: fixed;
    top:0;
    z-index: 11;
    .SlideBarLeft{
      z-index: 111;
      width: 65%;
      height: 100%;
      position: absolute;
      top:0px;
      background: rgb(4,26,48);
      box-shadow: 1px 20px 120px #000;
      .SlideBarHear{
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        margin: 0.5rem auto 0.3rem;
        border: 1px solid #19d6fd;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .SlideBarUser{
        font-size: 0.3rem;
        text-align: center;
      }
      .routerList{
        width: 100%;
        font-size: 0.3rem;
        color: #f2f9ff;
        margin-top: 0.2rem;
        li{
          height: 1rem;
          line-height: 1rem;
          border-right: 0.1rem solid rgba(0,0,0,0);
          i{
            float: left;
            font-size: 0.5rem;
            color: #2c75ab;
            margin-right: 1rem;
            margin-left: 0.52rem;
          }
        }
      }
    }
    .SlideBarBottom{
      font-size: 0.3rem;
      position: absolute;
      bottom: 0.2rem;
      padding:0 0.4rem;
      width: 100%;
      span{
        float: left;
        i{
          font-size: 0.35rem;
          float: left;
          color: #2c75ab;
          margin-right: 0.1rem;
          margin-top: 2px;
        }
      }
      span:nth-last-child(1) {
        float: right;
      }
    }
  }
  .router-link-active{
    border-right: 0.1rem solid #19d6fd !important;
    background: rgba(45,115,172,.3);
    i{
      color: #19d6fd !important;
    }
  }
</style>
