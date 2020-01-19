import * as TYPES from '../mutation-types'
import { reqProjectEquip, reqSearchProjectEquip } from '@/api/project'
import utils from '@/utils/myUtils'
import { message } from 'ant-design-vue'

const project = {
  state: {
    projectList: {
      list: [],
      total: 0
    }
  },
  actions: {
    async getProjectList({ commit }, payload) {
      let { data = {} } = await reqSearchProjectEquip(payload)
      utils.detailBackCode(data, {}, (payload) => {
        if (payload.total === 0) {
          message.warning('查询结果为空')
        }
        commit(TYPES.GET_PROJECT_LIST, payload)
      })
    }

  },
  mutations: {
    [TYPES.GET_PROJECT_LIST](state, payload) {
      let { projectList } = state
      let { list = [], total = 0 } = payload
      projectList.list = list
      projectList.total = total
    }
  }
}
export default project