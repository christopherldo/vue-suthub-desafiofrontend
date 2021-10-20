const state = {
  form: {}
};

const getters = {
  formState: state => state.form
};

const actions = {
  setForm({ commit }, payload) {
    commit('setForm', payload)
  }
};

const mutations = {
  setForm(state, payload) {
    state.form = payload
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
