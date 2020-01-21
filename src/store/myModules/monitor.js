
import * as TYPES from '../mutation-types'
import { reqGetMonitorEquipments } from '@/api/monitor'
import utils from '@/utils/myUtils'
import { message } from 'ant-design-vue'

const monitor = {
  state:{
    monitorEquipmentList:{
      equipmentList:[],
      totalPages:0
    }
  },
  actions:{
    async  getMonitorEquipmentList({commit},payload) {
      let {data} = await reqGetMonitorEquipments(payload)
      utils.detailBackCode(data,{},(payload)=>{
        commit(TYPES.GET_MONITOR_EQUIPMENT_LIST,payload)
      })
    }
  },
  mutations:{
    [TYPES.GET_MONITOR_EQUIPMENT_LIST](state,payload){
      let {monitorEquipmentList} = state
      let {equipmentList=[],totalElements} = payload
      monitorEquipmentList.equipmentList =equipmentList
      monitorEquipmentList.totalElements = totalElements
    }
  }
}
export default monitor