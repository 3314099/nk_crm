
export default {
  methods: {
    MXlogsList () {
      return this.$store.getters['logsList/logsList/logsList'] || []
    },
    async MXtoCreateLog (item) {
      try {
        const newItem = await this.$store.dispatch('logsList/logsList/createLog', item)
        const newItems = this.MXlogsList().concat(newItem.log)
        this.$store.commit('logsList/logsList/chgLogsList', newItems)
      } catch (err) {
        this.$store.commit('setAlert', 'failedMXtoCreateLog', { root: true })
      }
    },
  }
}
