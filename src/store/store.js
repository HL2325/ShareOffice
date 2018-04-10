import Vuex from 'vuex'
import Vue from 'vue'
import login from './modules/login'
import home from './modules/home'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    home
  }
})
