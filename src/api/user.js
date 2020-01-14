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
  type:'PUT',
  flag:false
})

// 更换密码
export const reqChangePassword = (data)=>axios({
  url:'user/password/change',
  data,
  type:'PUT',
  flag:false
})
// 更换手机号
export const reqChangePhone = (data)=>axios({
  url:'user/updatephone',
  data,
  type:'POST',
  flag:false
})
