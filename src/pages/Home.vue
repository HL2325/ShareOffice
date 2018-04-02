<template>
  <div class="home">
    <transition name="side">
      <SlideBar :users="get_Info" v-show="show" @hide="hideSide"></SlideBar>
    </transition>
    <div class="homeHead">
      <span class="headIcon headLeft" @click="showSlide">
        <img src="../assets/image/home/headLeft.png" alt="">
      </span>
      <span>控客智能办公4.0</span>
      <span class="headIcon headVoice">
        <img src="../assets/image/home/voice.png" alt="">
      </span>
      <span class="headIcon headRaing">
        <img src="../assets/image/home/raing.png" alt="">
      </span>
    </div>
    <div class="clearfix">
      <div class="homeInfo">
        <img :src=get_Info.avatar alt="">
      </div>
      <div class="homeName">
        <p class="homeBigTit">
          <span>{{get_Info.cha_name}}</span>
          <span style="font-size: 0.26rem">{{get_Info.eng_name}}</span>
        </p>
        <p class="homeSmallTit clearfix">
          <span>{{get_Info.departname}}&nbsp;-&nbsp;</span>
          <span>{{get_Info.duty}}&nbsp;-&nbsp;</span>
          <span class="homeSetDetails">工位 {{get_Info.station_name}}</span>
        </p>
      </div>
    </div>
    <div class="homeCommon">
      <ul class="clearfix">
        <li>
          <span>
            <img src="../assets/image/home/orderMeeting.png" alt="">
          </span>
          <p>预约会议室</p>
        </li>
        <li>
          <span>
            <img src="../assets/image/home/inviteVistor.png" alt="">
          </span>
          <p>邀约访客</p>
        </li>
        <li class="homeLastTwo">
          <span class="onDuty">
            <img src="../assets/image/home/counta.png" alt="">
            <span class="onDutyNum">
              <p>498</p>
              <p class="fgLine"></p>
              <p>500</p>
            </span>
          </span>
          <p>出勤统计</p>
        </li>
        <li class="homeLastTwo">
          <span class="statistics">
            <img src="../assets/image/home/counta.png" alt="">
            <span class="statisticsNum">0</span>
          </span>
          <p>待我审批</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { UserInfo } from '@/api'
import SlideBar from '../components/SlideBar.vue'
export default {
  data () {
    return {
      get_Info: {},
      show: false
    }
  },
  methods: {
    getInfo () {
      UserInfo().then(data => {
        this.get_Info = data.result
        console.log(this.get_Info)
      })
      .catch(() => {})
    },
    showSlide () {
      this.show = true
    },
    hideSide () {
      this.show = false
    }
  },
  mounted () {
    this.getInfo()
  },
  components: { UserInfo, SlideBar }
}
</script>
<style lang="less">
  .home{
    width: 100%;
    height: 100%;
    background: #041a30;
    color: #fff;
    .homeHead{
      padding-top:15px;
      font-size: 0.36rem;
      text-align: center;
      line-height: 0.44rem;
      .headIcon{
        display: inline-block;
        position: absolute;
        width: 0.44rem;
        height: 0.44rem;
        img{
          width: 100%;
        }
      }
      .headLeft{
        left:0.3rem;
      }
      .headVoice{
        right: 1.04rem;
      }
      .headRaing{
        right: 0.3rem;
      }
    }
    .homeInfo{
      display: inline-block;
      float: left;
      width: 2rem;
      height:2rem;
      margin: 0.4rem 0.5rem 0.35rem 0.35rem;
      background: url("../assets/image/home/headBorder.gif") no-repeat;
      background-size: 100% 100%;
      img{
        display: block;
        width: 1.2rem;
        height:1.2rem;
        margin: 0.4rem auto;
      }
    }
    .homeName{
      display: inline-block;
      float: left;
      .homeBigTit{
        font-size: 0.3rem;
        margin-top: 1rem;
        span{
          margin-right: 0.25rem;
        }
      }
      .homeSmallTit{
        margin-top: 0.2rem;
        font-size: 0.24rem;
        color: #c7c7c7;
        span{
          display: inline-block;
          float: left;
        }
        .homeSetDetails{
          width: 2.3rem;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-family: "微软雅黑";
        }
      }
    }
    .homeCommon{
      padding: 0.42rem 0.52rem;
      background: #152947;
      font-size: 0.24rem;
      li{
        width: 25%;
        text-align: center;
        float: left;
        span{
          display: inline-block;
          width: 1rem;
          height: 1rem;
          margin: 0 auto;
          img{
            width: 100%;
          }
        }
        p{
          margin-top: 0.1rem;
        }
      }
      .homeLastTwo{
        span{
          font-size: 0.3rem;
        }
        .statistics{
          position: relative;
          .statisticsNum{
            display: inline-block;
            width: 1rem;
            height: 1rem;
            position: absolute;
            left:0px;
            top:0px;
            line-height: 1rem;
          }
        }
        .onDuty{
          position: relative;
          .onDutyNum{
            position: absolute;
            display: inline-block;
            width: 1rem;
            height:1rem;
            top:0px;
            left:0px;
            margin-top: 0.1rem;
            font-size: 0.3rem;
            p{
              margin-top: 0px;
            }
            p:nth-of-type(2){
              border-bottom: 2px solid #fff;
              width: 0.2rem;
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
  .side-enter-active,.side-leave-active,
   .side-enter-active .SlideBarLeft,.side-leave-active .SlideBarLeft{
     transition:all .3s linear;
   }
  .side-enter,.side-leave-active{
    opacity: 0;
  }
  .side-leave-active .SlideBarLeft{
    transform:translateX(-50%);
    opacity:0;
  }
  .side-enter-active .SlideBarLeft{
    transform: translateX(0%);
  }
</style>
