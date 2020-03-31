import { axios } from '@/utils/request'

// 查询项目
export const reqGetProjectDeviceParameter = data=>axios({
  url:'equipment/news/getData',
  params:data,
  method:'get'
})
export const reqGetEquipmentLiveData = data=>axios({
  url:'equipment/news/getRealTimeData',
  params:data,
  method:'get'
})
