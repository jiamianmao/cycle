import * as types from './mutation-type'

const mutations = {
  [types.SET_CLICK] (state, flag) {
    state.click = flag
  },
  [types.SET_INIT_RULE] (state, flag) {
    state.initRule++
  },
  [types.SET_INIT_ALERT] (state, flag) {
    state.initAlert++
  }
}

export default mutations
