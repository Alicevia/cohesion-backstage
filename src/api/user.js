// import axios from '../axios'
import { axios } from '@/utils/request'
// account--------------------------------------------------------------
// 获取通过userToken获得用户信息
export const reqUserInfo=()=>axios({
  url:`user/userinfo`,
  method:'get'
})
// 修改个人信息
export const reqModiUserInfo = (data)=>axios({
  url:'user/info',
  data,
  method:'put'
})

// 更换密码
export const reqChangePassword = (data)=>axios({
  url:'user/password/change',
  data,
  method:'put'
})
// 更换手机号
export const reqChangePhone = (data)=>axios({
  url:'user/updatephone',
  data,
  method:'post'
})

// 获取手机注册的验证码用于微信绑定 //也用于手机号的更换验证
export const reqWxBindPhoneCode=(data)=>axios({
  url:'register/phoneVerification',
  params:data,
  method:'get',
})