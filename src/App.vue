<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app{
    max-width: 750px;
    height: 100%;
    margin: 0 auto;
    background: #041a30;
  }
  .van-dialog__header{
    font-size: 0.35rem;
  }
  .van-dialog__message--withtitle{
    color: #333;
    text-align: center;
  }
  .van-dialog__content::after{
    border:none;
  }
  .van-dialog{
    padding-bottom: 0.2rem;
  }
  .van-dialog .van-button{
    width: 80%;
    margin: 0 auto;
    background: #e56856;
    color: #fff;
    margin-left: 10%;
  }
  .van-button--large{
    height:0.8rem;
    line-height: 0.9rem;
  }
</style>
