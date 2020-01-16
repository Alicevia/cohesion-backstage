import { axios } from '@/utils/request'

// 获取所有设备分组
export const reqGetEquipmentGroup = data=>axios({
  url:'equipment/getEquipmentGroup',
  method:'get',
  params:data
})

//新增设备分组
export const reqAddEquipmentGroup = data=>axios({
  url:'equipment/addEquipmentGroup',
  method:'post',
  data
})

//删除设备分组
export const reqDeleteEquipmentGroup = data=>axios({
  url:'equipment/deleteEquipmentGroup',
  method:'delete',
  params:data
})

//修改设备分组
export const reqModiEquipmentGroup = data=>axios({
  url:'equipment/updateEquipmentGroup',
  method:'put',
  data
})

//获取所有设备
export const reqGetAllEquipment = data=>axios({
  url:'equipment/getAllEquipment',
  method:'get',
  params:data
})

//获取分组下的设备
export const reqGetGroupEquipment = data=>axios({
  url:'equipment/getGroupEquipment',
  method:'get',
  params:data
})





















const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}
