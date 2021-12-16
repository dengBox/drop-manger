const child = {
  state: {
    childC: 1
  },
  getters: {},
  actions: {},
  mutations: {
    SET_CHILD_C (state, payload) {
      state.childC = payload
    }
  }
}

export default {
  namespaced: true,
  state: {
    // panelList: []
    childA: false,
    childB: {
      s: 1
    }
  },
  getters: {
    // user (state) {
    //   return state.userInfor.token
    // }
  },
  actions: {
    // 调用接口，存储store(根据业务决定是否存储store)
    // reportDelete ({ commit }, payload) {
    //   return loginApi.reportDelete(payload)
    // }
  },
  mutations: {
    // 此处拿到接口返回值，进行处理保存store
    SET_CHILD_A (state, payload) {
      state.childA = payload
    },
    SET_CHILD_B (state, payload) {
      // $set
      state.childB.s = payload
    }
  },
  modules: {
    child
  }
}
