import * as types from  '../types'

const state = {
  token: {}
}

const mutations = { 

  [types.LOGIN]:(state,token) => {
    localStorage.token = token
    state.token = JSON.parse(token)
  },
  [types.LOGINOUT]: (state) => {
    localStorage.removeItem('token')
    state.token = null
  }
}

export default { 
  state,
  mutations
 }
