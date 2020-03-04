import { axios } from '@/utils/request'

// 查询项目
export const reqGetMonitorEquipments = data=>axios({
  url:'equipment/getMonitorEquipmentsGroupOnName',
  params:data,
  method:'get'
})