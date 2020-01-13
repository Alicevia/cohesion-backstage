import * as TYPES from '../mutation-types'
import {reqProjectEquip} from '@/api/equipment'
import utils from '@/utils/myUtils'
const project = {
  state:{
    projectList:{

    }
  },
  actions:{
    async getProjectList({}){
      let result =await reqProjectEquip()
      console.log(result)
    }
  },
  mutations:{
    // [TYPES.GET_PROJECT_LIST](state,payload){
      
    // }
  }
}
export default project