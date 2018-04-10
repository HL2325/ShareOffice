import * as types from  '../types'

const state = {
  all_devices:[],
  user_devices:[],
  station_devices:[]

}

const getters= {
  userDevices:state=>{
    return state.all_devices.filter(x=>state.user_devices.findIndex(d=>d===x.device_id)>=0)
  }
}

function  fillDevices(list) {
  const devices = list.reduce((final,curr)=>{
    const d =state.all_devices.findIndex(x=>x.device_id==curr.device_id)
    if(d===-1){
      final.push(curr)
    }
    return final
  },[])

  return devices
}

const mutations = {
  [types.SET_USER_DEVICES]:(state,devices) => {
    state.user_devices = devices.map(device=>device.device_id)
    state.all_devices = fillDevices(devices)
  },
  [types.SET_STATION_DEVICES]:(state,devices) => {
    state.user_devices = devices.map(device=>device.device_id)
    state.all_devices = fillDevices(devices)
  },
  [types.UPDATE_DEVICE]:(state,device) => {
    let d = state.all_devices.find(x=>x.device_id===device.device_id)
    if(d){
      d = device
    }
  }
}

export default {
  state,
  getters,
  mutations
}
