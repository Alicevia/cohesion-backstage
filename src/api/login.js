import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
// 登录
export function login (data) {
  return axios({
    url: 'register/login',
    method: 'post',
    data
  })
}
// 获取二维码 传递回跳链接
export const reqWeChatQRCode=(data)=>{
  return axios({
  url:`register/wechaturl?trueUrl=${encodeURIComponent(data.trueUrl)}`,
  method:'put'
})}
// 微信登录
export const reqWeChatLogin = (data)=>axios({
  url:'register/wxlogin',
  method:'post',
  data
})
//申请验证码
export const reqResetAuthCode=(data)=>axios({
  url:'register/phoneVerificationPwd',
  params:data,
  method:'get'
})
// 验证输入的短信code是否正确
export const reqCheckSMS = (data)=>axios({
  url:'register/password/forget/sms',
  params:data,
  method:'put'
})
//完成重置密码
export const reqResetPW=(data)=>axios({
  url:'register/password/forget',
  data,
  method:'put',
})






















export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}



export function getCurrentUserNav (token) {
  return axios({
    url: '/user/nav',
    method: 'get'
  })
}

export function logout () {
  return axios({
    url: 'register/logout',
    method: 'get',
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
