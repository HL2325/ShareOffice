import axios from 'axios'
import store from '../store/store'
import * as types from '../store/types'
import app from '@/main'

let Ax = axios.create({
  baseURL:'http://192.168.19.198:8008',
  timeout: 8000
})

// 请求拦截
Ax.interceptors.request.use(
  config => {
    if (store.state.login.token) {
      config.headers = {'token': store.state.login.token.token, 'uid': store.state.login.token.uid}
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截
Ax.interceptors.response.use(
  response => {
    if (response.data.resultcode === 403) {
      store.commit(types.LOGINOUT)
      app.$dialog.alert({
        title: '提示',
        message: '您的账号在另一个设备上登录，请重新登录'
      }).then(() => {
        app.$router.push('/')
      })
      return Promise.reject(new Error('请重新登录'))
    }
    if (response.data.resultcode === 500) {
      alert('服务器错误')
    }
    return response.data
  },
  err => {
    return Promise.reject(err)
  }
)

// 登录
export function login (data) {
  return Ax.post(`/account/login`, data)
}

// 首页 - 用户信息
export function UserInfo () {
  return Ax.post(`Home/UserInfo`)
}

// 首页 - 获取场景
export function GetScene () {
  return Ax.post(`home/GetScene`)
}

// 侧边栏 - 修改密码
export function UpdarePwd (data) {
  return Ax.post(`User/UpdatePwd`, data)
}
export default Ax
