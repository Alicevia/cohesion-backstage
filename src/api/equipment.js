import { axios } from '@/utils/request'

export const reqProjectEquip = ()=>axios({
  url: 'equipment/project/projectPageList',
  method: 'get',
})