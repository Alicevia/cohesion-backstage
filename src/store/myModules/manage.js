import * as TYPES from '../mutation-types'
import {reqGetEquipmentGroup,reqGetAllEquipment} from '@/api/manage'
import utils from '@/utils/myUtils'
import { message } from 'ant-design-vue'

const project = {
  state:{
    equipmentGroup:{
      list:[],
      total:0
    },
    equipment:{
      list:[],
      total:0
    }
  },
  actions:{
    async getEquipmentGroup({commit},payload){
      let {data} =await reqGetEquipmentGroup(payload)
      utils.detailBackCode(data,{},(payload)=>{
        commit(TYPES.GET_EQUIPMENT_GROUP_LIST,payload)
      })
    },
    async getAllEquipment({commit},payload){
      let {data} =await reqGetAllEquipment(payload)
      utils.detailBackCode(data,{},(payload)=>{
        if (payload.total===0) {
          message.warning('查询结果为空')
        }
        commit(TYPES.GET_ALL_EQUIPMENT,payload)
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
  }
}
export default project