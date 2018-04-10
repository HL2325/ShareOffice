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
        <p class="homeSmallTit clearfix" @click="stationDetails">
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
    <div>
      <p class="environmentalIndex">
        今日室内环境指数：<span>良</span>
      </p>
      <p class="dataSources" @click="chooseDepartment">
        <span>数据来源：</span><span>{{defaultNumber.area_name}}</span>
        <i class="iconfont icon-right"></i>
      </p>
    </div>
    <van-popup class="popupBot" v-model="showBottom" position="bottom" :overlay="true">
      <p class="popupTit">环境监测可选数据来源</p>
      <ul class="popupChoose">
        <li v-for="(item,index) in data_source_list" :key="index" @click="item.isSelected?void 0:chooseEnvironment(item)">
          <span>{{item.area_name}}</span>
          <span class="clickChoose" :class="{textBlack:item.isSelected,textBlue:!item.isSelected}" >{{item.isSelected?'当前选择':'设为默认'}}</span>
        </li>
      </ul>
    </van-popup>
    <van-popup v-model="showMiddle" class="popupMiddle">
      <p class="popupMiddleTit">工位名称 (<span>{{get_InfoResult.length}}</span>)</p>
      <ul class="popupMiddleMain">
        <li v-for="(station,index) in get_InfoResult">{{station}}</li>
      </ul>
    </van-popup>
    <div class="sensorClassify">
      <ul class="clearfix">
        <li v-if="defaultNumber.temperature != undefined">
          <p class="numericalValue">{{defaultNumber.temperature.value}}<i>℃</i></p>
          <p style="margin-top: 0.05rem" class="clearfix">
            <span class="numericalValueImg">
              <img src="../assets/image/home/temperature.gif"/>
            </span>
            <span style="margin-top: 0.05rem;float: left;">气温温度</span>
          </p>
        </li>
        <li v-if="defaultNumber.humidity != undefined">
          <p class="numericalValue">{{defaultNumber.humidity.value}}<i>%</i></p>
          <p style="margin-top: 0.05rem" class="clearfix">
            <span class="numericalValueImg">
              <img src="../assets/image/home/humidity.gif"/>
            </span>
            <span style="margin-top: 0.05rem;float: left;">空气湿度</span>
          </p>
        </li>
        <li v-if="defaultNumber.illumination != undefined">
          <p class="numericalValue">{{defaultNumber.illumination.value}}</p>
          <p style="margin-top: 0.05rem" class="clearfix">
            <span class="numericalValueImg">
              <img src="../assets/image/home/weather.gif"/>
            </span>
            <span style="margin-top: 0.05rem;float: left;">光照强度</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="CommonScenario">
      <p class="CommonScenarioTit clearfix">
        <span>常用场景</span>
        <i class="iconfont icon-right"></i>
      </p>
      <ul class="CommonScenList clearfix">
        <li v-for="(Scene, index) in get_Scene" :key="index">
          <img :src='Scene.scene_ico' alt="">
          <p>{{Scene.scene_name}}</p>
        </li>
      </ul>
    </div>
    <div class="CommonEquipment">
      <p class="CommonEquipmentTit clearfix">
        <span>常用设备</span>
        <i class="iconfont icon-right"></i>
      </p>
      <ul class="CommonEquipmentList clearfix">
        <li v-for="(item,index) in userDevices" :key="index">
          <p>{{item.device_name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { UserInfo, GetScene } from '@/api'
import SlideBar from '../components/SlideBar.vue'
import store from '../store/store'
import * as types from '../store/types'
export default {
  data () {
    return {
      get_Info: {},
      get_Scene: {},
      get_Equipment: {},
      get_InfoResult: {},
      usedEquipment:{},   // 常用设备
      get_lstdevices: [],
      get_Environment: [],
      envarealist: [],
      lstdevic:[],
      data_source_list:[],
      macLocal:{},
      show: false,
      showBottom: false,
      showMiddle: false,
      client:{}
    }
  },
  computed:{
    defaultNumber:function () {
      let selected =  this.data_source_list.find(x=>x.isSelected)
      if(!selected) {
        selected = {}
      }
      return selected
    },
    userDevices:function () {
//      let list = this.$store.getters.userDevices
//      console.log(list)
      return []
    }
  },
  methods: {
//    获取个人信息
    getInfo () {
      UserInfo().then(data => {
        this.get_Info = data.result
        this.get_InfoResult = this.get_Info.station_name.split(',')
      })
      .catch(() => {})
    },
//    获取场景信息
    getScene () {
      GetScene().then(data => {
        var get_Scenes = data.result.scenelst
        if (get_Scenes.length >= 4) {
          this.get_Scene = get_Scenes.slice(0,4)
        } else {
          this.get_Scene = get_Scenes
        }
        console.log(this.get_Scene)
      })
        .catch(() => {})
    },
    showSlide () {
      this.show = true
    },
    hideSide () {
      this.show = false
    },
    chooseDepartment () {
      this.showBottom = true
    },
    stationDetails () {
      this.showMiddle = true
    },
    chooseEnvironment (source) {
      this.data_source_list.forEach(x=>{
        if(x.isSelected) x.isSelected = false
      })
      source.isSelected=true
      this.showBottom = false
    },
//    clickzD () {
//        navigator.vibrate = navigator.vibrate
//          || navigator.webkitVibrate
//          || navigator.mozVibrate
//          || navigator.msVibrate;
//
//        if (navigator.vibrate) {
//          // 支持
//          alert("支持设备震动！")
//          navigator.vibrate(100)
//        } else {
//          alert('不支持1')
//        }
//    }
  },
  mounted () {
    let list = this.$store.getters.userDevices
    console.log(11111111,list)
    this.$toast.loading({
      mask: true,
      message: '加载中...',
      duration:0
    })
//    调用获取个人信息方法
    this.getInfo()
//    调用获取场景方法
    this.getScene()
    var UserTk = store.state.login.token.token
    var UserId = store.state.login.token.uid
    var times = new Date()
    var requestTime = times.getFullYear() + '-' + (times.getMonth() + 1) + '-'
      + times.getDate() + '__' + times.getHours() + ':' + times.getMinutes() + ':' + times.getSeconds()

//    ----------------------连接服务端----------------------
    var ws = new WebSocket('ws://192.168.19.21:15674/ws')
    new window.Stomp.Over(ws)
    this.client = new window.Stomp.Over(ws)
    var on_connect = x => {
//      公有订阅
      this.client.subscribe("/exchange/topic.sts.ccu_00293.general.dev/sts.ccu_00293.DEV.#",function(d){
//        console.log('222222222',JSON.parse(d.body))
        this.$store.commit(types.UPDATE_DEVICE,JSON.parse(d.body).device_info)

      })
//      订阅用户设备
      this.client.subscribe('Home_st' + UserTk + '_userDevice_home', data => {
        var get_ListAll = data.body
        var get_lstdevice = JSON.parse(get_ListAll)
        console.log(get_lstdevice)
        this.get_lstdevices = get_lstdevice.lstdevice
        if (get_lstdevice.resultcode === 200) {
          const env_list = this.get_lstdevices.filter(items =>items.tag_code === 'Environment')
//        常用设备过滤掉 环境、安防
          console.log(this.get_lstdevices)
          this.$store.commit(types.SET_USER_DEVICES,this.get_lstdevices)
          console.log(11111111,list)
//          this.usedEquipment = this.get_lstdevices.filter(EquipmentList => EquipmentList.tag_code != 'Security' && 'Environment' )
//          console.log(this.usedEquipment)
//          this.$store.commit(types.OFTENEQUIPMENT, this.usedEquipment)
          //
          // {area_name:'',area_id:0,device_mac:'',temperature:{value:0},humidity:{value:0},illumination:{value:0}}
          this.data_source_list = env_list.reduce((final,curr)=>{
            let s = final.find(x=>x.device_mac===curr.device_mac && x.area_id===curr.area_id)
            if(!s){
              s = {
                area_id:curr.area_id,
                area_name:`${curr.area_name} - ${curr.device_mac.substring(curr.device_mac.length-5)} 环境传感器`,
                device_mac:curr.device_mac,
                isSelected:false
              }
              final.push(s)
            }

            switch(curr.device_type_sts_code){
              case 'Sts_ZIGBEE_IllumSensor':
                s.illumination = {}
                s.illumination.value = curr.device_status.num_value
                break;
              case 'Sts_ZIGBEE_HumiSensor':
                s.humidity = {}
                s.humidity.value = curr.device_status.num_value
                break;
              case 'Sts_ZIGBEE_TempSensor':
                s.temperature = {}
                s.temperature.value = curr.device_status.num_value
                break;
              default:
                break
            }
            return final
          },[])

          if(this.data_source_list.length > 0) this.data_source_list[0].isSelected = true
          this.$toast.clear()
        }
      },{'auto-delete':true,'durable':true})
      var obj1 = {'user_id':UserId, 'user_token':UserTk, 'request_cmd':'GetUserDevices', 'enterprise_id':'', 'request_time':requestTime, 'reply_queue_name': 'Home_st' + UserTk + '_userDevice_home'}
      this.client.send('StS.ClientRequest',{},JSON.stringify(obj1))
    }
    var on_error = function () {}
    this.client.connect('sts_w','sts_w123456',on_connect, on_error,'Smart_V4')
  },
  components: { UserInfo, SlideBar },
  beforeDestroy(){
    this.client.disconnect()
    this.$toast.clear()
  }
}
</script>
<style lang="less">
  .home{
    width: 100%;
    min-height: 100%;
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
      margin: 0.3rem 0.3rem 0.2rem 0.35rem;
      background: url("../assets/image/home/headBorder.gif") no-repeat;
      background-size: 100% 100%;
      img{
        display: block;
        width: 1.2rem;
        height:1.2rem;
        margin: 0.4rem auto;
        border-radius: 50%;
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
      padding: 0.3rem 0.4rem;
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
    .environmentalIndex{
      font-size: 0.3rem;
      text-align: center;
      margin-top: 0.2rem;
      span{
        font-size: 0.35rem;
        color: #6cfffa;
      }
    }
    .dataSources{
      font-size: 0.25rem;
      color: #b2b2b2;
      text-align: center;
      margin-top: 0.05rem;
      i{
        font-size: 0.2rem;
        font-weight: bold;
        color: #fff;
        margin-left: 0.1rem;
      }
    }
    .popupBot{
      width: 7rem;
      min-height: 5.4rem;
      bottom: 10px;
      border-radius: 10px;
      padding: 0.5rem 0.2rem 0;
      box-shadow: 1px 20px 120px #040f1a;
      .popupTit{
        color: #333;
        font-size: 0.3rem;
        padding-bottom: 0.3rem;
      }
      .popupChoose{
        color: #8d96a3;
        font-size: 0.24rem;
        li{
          padding:0.3rem 0.1rem;
          border-top: 1px solid #d5dfeb;
          .clickChoose{
            float: right;
            color: #333;
          }
          .textBlack{
            color: #333;
          }
          .textBlue{
            color: #328bff;
          }
        }
      }
    }
    .popupMiddle{
      width: 6.5rem;
      min-height: 3.5rem;
      border-radius: 10px;
      padding: 0 0.2rem;
      top:45%;
      .popupMiddleTit{
        color: #333;
        font-size: 0.34rem;
        text-align: center;
        margin-top: 0.3rem;
        margin-bottom: 0.1rem;
      }
      .popupMiddleMain{
        li{
          font-family: "微软雅黑";
          font-size: 0.24rem;
          border: 1px solid #328bff;
          border-radius: 4px;
          color: #a1a8b3;
          float: left;
          margin-right: 0.2rem;
          padding: 0.05rem 0.2rem;
          margin-top: 0.2rem;
        }
      }
    }
    .sensorClassify{
      width: 100%;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid #394351;
      margin-top: 0.4rem;
      ul{
        width: 100%;
        li{
          width: 33.33%;
          float: left;
          text-align: center;
          border-right:1px solid #394351;
          p{
            width: 100%;
            font-size: 0.25rem;
            color: #fff;
            .numericalValueImg{
              display: inline-block;
              width: 0.44rem;
              height:0.44rem;
              float: left;
              margin-left: 0.3rem;
              margin-right: 0.2rem;
              img{
                width: 100%;
              }
            }
          }
          .numericalValue{
            font-size: 0.44rem;
            font-family: "微软雅黑";
            color: #fff;
          }
        }
        li:nth-last-of-type(1){
          border-right: none;
        }
      }
    }
    .CommonScenario{
      width: 100%;
      padding:0 0.2rem;
      margin-top: 0.3rem;
      .CommonScenarioTit{
        padding-left: 0.1rem;
        border-left: 3px solid #6cd6ff;
        height:0.35rem;
        line-height: 0.35rem;
        span{
          display: inline-block;
          height:0.35rem;
          float: left;
          font-size: 0.3rem;
          margin-left: 0.12rem;
          line-height: 0.35rem;
        }
        i{
          float: left;
          font-size: 0.2rem;
          font-weight: bold;
          margin-left: 0.12rem;
        }
      }
      .CommonScenList{
        li{
          width: 25%;
          float: left;
          font-size: 0.24rem;
          text-align: center;
          margin-top: 0.2rem;
          img{
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
    .CommonEquipment{
      width: 100%;
      padding:0 0.2rem;
      margin-top: 0.3rem;
      .CommonEquipmentTit{
        padding-left: 0.1rem;
        border-left: 3px solid #6cd6ff;
        height:0.35rem;
        line-height: 0.35rem;
        span{
          display: inline-block;
          height:0.35rem;
          float: left;
          font-size: 0.3rem;
          margin-left: 0.12rem;
          line-height: 0.35rem;
        }
        i{
          float: left;
          font-size: 0.2rem;
          font-weight: bold;
          margin-left: 0.12rem;
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
