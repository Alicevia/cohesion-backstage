import { axios } from '@/utils/request'

// 查询项目
export const reqGetProjectDeviceLiveData = data=>axios({
  url:'equipment/news/getData',
  params:data,
  method:'get'
})