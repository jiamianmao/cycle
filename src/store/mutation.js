import * as types from './mutation-type'

const mutations = {
  [types.SET_CLICK] (state, flag) {
    state.click = flag
  }
}

export default mutations
