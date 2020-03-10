import Vue from 'vue'
import { login, logout } from '@/api/login'
import { ACCESS_TOKEN,GET_USER_INFO } from '@/store/mutation-types'
import {reqUserInfo} from '@/api/user'
import utils from '@/utils/myUtils'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},

    userInfo:{}
  },

 

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          let {data} = response
          if (data.succeed) {
            let userToken = response.headers['user-token']
            Vue.ls.set(ACCESS_TOKEN, userToken, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN',userToken)
            resolve()
          }else{
            reject(data.message)
          }
        }).catch(error => {
          reject(error)
        })
        
      })
    },
    // 登出
    Logout ({ commit}) {
      return new Promise((resolve,reject) => {
        logout().then((response) => {
          let {data} = response
          if (data.succeed) {
            Vue.ls.remove(ACCESS_TOKEN)
            commit('SET_TOKEN', '')
            resolve()
          }else{
            Vue.ls.remove(ACCESS_TOKEN)
            commit('SET_TOKEN', '')
            reject()
          }
          // router.replace({path:'/user/login'})
        })
      })
    },
    // 获取个人信息
    async getUserInfo({commit}){
      let {data} = await reqUserInfo()
       utils.detailBackCode(data,{},(payload)=>{
        commit(GET_USER_INFO,payload)
      })
    },

  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    [GET_USER_INFO](state,payload){
      state.userInfo = payload
    }
  },

}

export default user
