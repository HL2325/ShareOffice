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
        margin: 1rem auto 0.6rem;
        border: 1px solid #19d6fd;
        img{
          width: 100%;
          height: 100%;
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
        margin-top: 0.6rem;
        li{
          height: 1rem;
          line-height: 1rem;
          border-right: 0.1rem solid rgba(0,0,0,0);
          i{
            display: inline-block;
            width: 0.44rem;
            height:0.44rem;
            float: left;
            font-size: 0.5rem;
            color: #2c75ab;
            margin-right: 1rem;
            margin-left: 0.52rem;
          }
        }
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
