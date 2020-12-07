export const state = () => ({
  logsList: []
})

export const mutations = {
  chgLogsList (state, payload) {
    state.logsList = sortObjectsArrayByText(payload, 'date', true)
  }
}

export const actions = {
  chgLogsState ({ commit, state }, items) {
    commit('chgLogsState', items)
  },
  async fetchLogs ({ dispatch, commit }, userId) {
    try {
      return await this.$axios.$get(`/api/logsList/fetchLogs/${userId}`)
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createLog ({ commit, state }, data) {
    try {
      return await this.$axios.$post('/api/logsList', data)
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
    }
  },
  async removeLog ({ commit, state }, data) {
    try {
      const response = await this.$axios.$post('/api/logsList/remove', data)
      const logs = await this.$axios.$get(`/api/logsList/fetchLogs/${data.userId}`)
      commit('chgLogsList', logs)
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
}
export const getters = {
  logsList: state => state.logsList
}

function sortObjectsArrayByText (array, field, reverse = false) {
  const newArray = array.sort(function (a, b) {
    const nameA = a[field].toString().toLowerCase()
    const nameB = b[field].toString().toLowerCase()
    if (nameA < nameB) { return -1 }
    if (nameA > nameB) { return 1 }
    return 0
  })
  return reverse ? newArray.reverse() : newArray
}
