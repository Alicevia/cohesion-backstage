import * as TYPES from '../mutation-types'
import {reqGetEquipmentGroup,reqGetAllEquipment,reqGetGroupEquipment} from '@/api/manage'
import utils from '@/utils/myUtils'
import { message } from 'ant-design-vue'

const project = {
  state:{
    equipmentGroup:{
      list:[],
      total:0
    },
    groupAllEquipment:{
      list:[],
      total:0
    },
    equipment:{
      list:[],
      total:0
    }
  },
  actions:{
    // 获取分组
    async getEquipmentGroup({commit},payload){
      let {data} =await reqGetEquipmentGroup(payload)
      utils.detailBackCode(data,{},(payload)=>{
        commit(TYPES.GET_EQUIPMENT_GROUP_LIST,payload)
      })
    },
    // 获取所有设备
    async getAllEquipment({commit},payload){
      let {data} =await reqGetAllEquipment(payload)
      utils.detailBackCode(data,{},(payload)=>{
        if (payload.total===0) {
          message.warning('查询结果为空')
        }
        commit(TYPES.GET_ALL_EQUIPMENT,payload)
      })
    },
    // 获取分组一页的设备
    async getGroupEquipment({commit},payload){
      let {data} =await reqGetGroupEquipment(payload)
      utils.detailBackCode(data,{},(payload)=>{
        if (payload.total===0) {
          message.warning('查询结果为空')
        }
        commit(TYPES.GET_ALL_EQUIPMENT,payload)
      })
    },
    // 获取某个分组内的所有设备
    async getGroupAllEquipment({commit},payload){
      let {data} =await reqGetGroupEquipment(payload)
      utils.detailBackCode(data,{},(payload)=>{
        if (payload.total===0) {
          message.warning('该分组下无设备')
        }
        commit(TYPES.GET_GROUP_ALL_EQUIPMENT,payload)
        return Promise.resolve()
      })
    },


  },
  mutations:{
    [TYPES.GET_EQUIPMENT_GROUP_LIST](state,payload){
      let {equipmentGroup} = state
      let {list=[],total=0} = payload
      equipmentGroup.list = list
      equipmentGroup.total = total
    },
    [TYPES.GET_ALL_EQUIPMENT](state,payload){
      let {equipment} = state
      let {list=[],total=0} = payload
      equipment.list = list
      equipment.total = total
    },
    [TYPES.GET_GROUP_ALL_EQUIPMENT](state,payload){
      let {groupAllEquipment} = state
      let {list=[],total=0} = payload
      groupAllEquipment.list = list
      groupAllEquipment.total = total
    },
  }
}
export default project