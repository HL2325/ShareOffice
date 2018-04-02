import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import * as types from '../store/types'
import store from '../store/store'

Vue.use(Router)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}



export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: '控客智能办公4.0',
      meta: {
        requireAuth: true
      },
      component: Home
    },
    {
      path: '/manage',
      meta: {
        requireAuth: true
      },
      component: resolve => {
        require(['../pages/Manage'],resolve)
      }
    },
    {
      path: '/check',
      meta: {
        requireAuth: true
      },
      component: resolve => {
        require(['../pages/Check'],resolve)
      }
    },
    {
      path: '/equipment',
      meta: {
        requireAuth: true
      },
      component: resolve => {
        require(['../pages/Equipment'],resolve)
      }
    },
    {
      path: '/scene',
      meta: {
        requireAuth: true
      },
      component: resolve => {
        require(['../pages/Scene'],resolve)
      }
    },
    {
      path: '/visitor',
      meta: {
        requireAuth: true
      },
      component: resolve => {
        require(['../pages/Visitor'],resolve)
      }
    },
    {
      path: '/meeting',
      meta: {
        requireAuth: true
      },
      component: resolve => {
        require(['../pages/Meeting'],resolve)
      }
    },
    {
      path: '/about',
      meta: {
        requireAuth: true
      },
      component: resolve => {
        require(['../pages/About'],resolve)
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

