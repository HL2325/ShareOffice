<template>
  <div class="BackHead">
    <span class="iconfont icon-fanhui" @click="BackHead"></span>
    <span class="RouteName">{{$route.name}}</span>
  </div>
</template>

<script>
  export default {
    methods: {
      BackHead () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less">
  .BackHead{
    width: 100%;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #304451;
    text-align: center;
    .icon-fanhui{
      display: inline-block;
      font-size: 0.3rem;
      font-weight: bold;
      color: #fff;
      float: left;
      padding:0 0.3rem;
    }
    .RouteName{
      text-align: center;
      font-size: 0.3rem;
      color: #fff;
      float: left;
      margin-left: 2.2rem;
    }
  }
</style>
