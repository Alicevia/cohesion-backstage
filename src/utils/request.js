import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  baseURL:'http://192.168.50.163:8081/',//本地
  // baseURL:'http://192.168.50.144:8081/',//线上测试

  // baseURL:'http://192.168.50.144:8888/monitor-pc-api/',
  // baseURL:'https://www.cluster-dt.com/pcwechat/',
  timeout: 10000 // 请求超时时间
})

const err = (error) => {
  console.log(error)
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['user-token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  console.log(response)

  let {data:{code}} = response
  if (code===401) {
    Vue.ls.remove(ACCESS_TOKEN)
    store.commit('SET_TOKEN','')
    notification.error({
      message: '用户信息过期,暂无权限',
      description: '请重新登录'
    })
    let {origin,pathname} = location
    location.href = origin+pathname+'#/user/login'
  }
  return response
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
