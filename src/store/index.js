import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'
import * as TYPES from './mutation-types'


import monitor from './myModules/monitor'
import project from './myModules/project'
import manage from './myModules/manage'
import log from './myModules/log'
import datum from './myModules/datum'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    // permission,

    monitor, project, manage,log,datum
  },
  state: {
    projectId: ''
  },
  mutations: {
    [TYPES.UPDATE_PROJECT_ID](state, payload) {
      state.projectId = payload
    }
  },
  actions: {
    updateProjectId({ commit }, id) {
      if (id) {
        Vue.ls.set('projectId', id)
      } else {
        console.log('3')
        Vue.ls.remove('projectId')
      }
     
      commit(TYPES.UPDATE_PROJECT_ID, id)
    },

  },
  getters
})
