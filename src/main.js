// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import router from './router'
import store from './store/store'
import '@/assets/font/iconfont.css'
import '@/assets/style.css'
import 'vant/lib/vant-css/index.css'

Vue.config.productionTip = false
Vue.use(Vant)

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if(store.state.login.token.uid > 0) {
      next()
    }else{
      next({
        path: '/',
        query: {redirect:to.fullPath}
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default app
