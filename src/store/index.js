import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import * as getters from './getter'
import state from './state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  mutations,
  state,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
