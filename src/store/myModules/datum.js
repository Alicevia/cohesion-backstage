import * as TYPES from '../mutation-types'
import {reqGetProjectDeviceParameter,reqGetEquipmentLiveData} from '@/api/datum'
import utils from '@/utils/myUtils'
import { message } from 'ant-design-vue'

const datum = {
  state:{
 
    allEquipmentParameter:{},
    equipmentLiveData:{}
  },
  getters:{

  },
  actions:{
    // 获取一个项目下所有设备的参数
    async getProjectDeviceParameter({commit},payload){
      let {data} =await reqGetProjectDeviceParameter(payload)
      utils.detailBackCode(data,{},(payload)=>{
        commit(TYPES.GET_PROJECT_DEVICE_PARAMETER,payload)
      })
    },
    // 获取一个设备下所有参数的实时数据
    async getEquipmentLiveData({commit},payload){
      let {data:{succeed,data,message:status}} =await reqGetEquipmentLiveData(payload)
      if (succeed) {
        commit(TYPES.GET_EQUIPMENT_LIVE_DATA,data)
      }else{
        message.error(status)
        return Promise.reject(status)
      }
    }

  },
  mutations:{
    [TYPES.GET_PROJECT_DEVICE_PARAMETER](state,payload){
      state.allEquipmentParameter = payload||{}
    },
    [TYPES.GET_EQUIPMENT_LIVE_DATA](state,payload){
      console.log(payload)
      state.equipmentLiveData = payload||{}
    },
    
  }
}
export default datum

