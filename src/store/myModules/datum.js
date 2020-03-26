import * as TYPES from '../mutation-types'
import {reqGetProjectDeviceLiveData} from '@/api/datum'
import utils from '@/utils/myUtils'
import { message } from 'ant-design-vue'

const datum = {
  state:{
    liveData:[],
  
  },
  getters:{
    allLiveData(state,getters){
      console.log(state,getters)
      let allLiveData = state.liveData.filter(item=>item)
      return allLiveData
    }
  },
  actions:{
    // 获取一个项目下所有的实时数据
    async getProjectDeviceLiveData({commit},payload){
      let {data} =await reqGetProjectDeviceLiveData(payload)
      utils.detailBackCode(data,{},(payload)=>{
        commit(TYPES.GET_PROJECT_DEVICE_LIVE_DATA,payload)
      })
    },



  },
  mutations:{
    [TYPES.GET_PROJECT_DEVICE_LIVE_DATA](state,payload){

      state.liveData = payload||[]
    }
    
  }
}
export default datum

