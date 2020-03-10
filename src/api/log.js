import { axios } from '@/utils/request'

export const reqGetLogInfo = (data)=>axios({
  url:'equipment/news/getLogs',
  method:'get',
  params:data
})