import * as TYPES from '../mutation-types'
import {reqProjectEquip,reqSearchProjectEquip} from '@/api/project'
import utils from '@/utils/myUtils'
import { message } from 'ant-design-vue'

const project = {
  state:{
    projectList:{
      list:[],
      total:0
    }
  },
  actions:{
    async getProjectList({commit},payload){
      let {data} =await reqProjectEquip(payload)
      utils.detailBackCode(data,{},(payload)=>{
        commit(TYPES.GET_PROJECT_LIST,payload)
      })
    },
    async getSearchProjectList({commit},payload){
      let {data} =await reqSearchProjectEquip(payload)
      utils.detailBackCode(data,{},(payload)=>{
        if (payload.total===0) {
          message.warning('查询结果为空')
        }
        commit(TYPES.GET_PROJECT_LIST,payload)
      })
    }

  },
  mutations:{
    [TYPES.GET_PROJECT_LIST](state,payload){
      let {projectList} = state
      console.log(payload)
      projectList.list = payload.list
      projectList.total = payload.total
    }
  }
}
export default project