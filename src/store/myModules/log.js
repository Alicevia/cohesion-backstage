import * as TYPES from '../mutation-types'
import {  reqGetLogInfo } from '@/api/log'
import utils from '@/utils/myUtils'
import { message } from 'ant-design-vue'

const log = {
  state: {
    logList:[]
  },
  actions: {
    async getLogInfo({ commit }, payload) {
      let { data } = await reqGetLogInfo(payload)
      utils.detailBackCode(data, {}, (payload) => {
        commit(TYPES.GET_LOG_INFO, payload)
      })
    }

  },
  mutations: {
    [TYPES.GET_LOG_INFO](state, payload) {
     state.logList = payload||[]
    }
  }
}
export default log