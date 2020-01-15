import { axios } from '@/utils/request'

// 获取首页项目列表
export const reqProjectEquip = (data)=>axios({
  url: 'equipment/project/projectPageList',
  method: 'get',
  params:data
})

// 新增项目
export const reqAddProjectEquip = data=>axios({
  url:'equipment/project/addProject',
  method:'post',
  data
})
// 修改项目
export const reqModiProjectEquip=data=>axios({
  url:'equipment/project/updateProject',
  method:'post',
  data
})

//删除项目
export const reqDeleteProjectEquip = data=>axios({
  url:`equipment/project/deleteProject`,
  method:'delete',
  params:data
})

// 查询项目
export const reqSearchProjectEquip = data=>axios({
  url:'equipment/project/findProjectList',
  params:data,
  method:'get'
})