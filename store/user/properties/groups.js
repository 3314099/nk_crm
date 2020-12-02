export const state = () => ({
  groups: []
})

export const mutations = {
  chgGroups (state, payload) {
    state.groups = payload
  }
}

export const actions = {
  async fetchGroups ({ commit }, userId) {
    try {
      const arr = await this.$axios.$get(`/api/user/properties/group/fetchGroups/${userId}`)
      commit('chgGroups', orderItems(arr))
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createGroup ({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/group', data)
      const arr = await this.$axios.$get(`/api/user/properties/group/fetchGroups/${data.userId}`)
      commit('chgGroups', orderItems(arr))
      commit('setAlert', response.message, { root: true })
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async editGroup ({ commit }, data) {
    try {
      const response = await this.$axios.$put('/api/user/properties/group', data)
      const arr = await this.$axios.$get(`/api/user/properties/group/fetchGroups/${data.userId}`)
      commit('chgGroups', orderItems(arr))
      commit('setAlert', response.message, { root: true })
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async removeGroup ({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/group/remove', data)
      const arr = await this.$axios.$get(`/api/user/properties/group/fetchGroups/${data.userId}`)
      commit('chgGroups', orderItems(arr))
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async chgOrderGroups ({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/group/chgOrderGroups', data)
      // загрузка нового списка не требуется тк store изменен через get на groups.vue
      commit('setAlert', response.message, { root: true })
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  }
}
export const getters = {
  groups: state => state.groups
}

function orderItems (items) {
  return items.map((item, index) => {
    item.order = index + 1
    return item
  })
}
