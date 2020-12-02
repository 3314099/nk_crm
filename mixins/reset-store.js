export default {
  computed: {
    routing () {
      return this.$route.path
    },
    tabModeContent () {
      const tabMode = this.$store.getters['mode/tabMode']
      return tabMode.content
    }
  },
  watch: {
    routing (v) {
      this.resetMode(v)
    },
    tabModeContent (v) {
      this.resetV(v)
    }
  },
  created () {
    this.resetMode(this.$route.path)
  },
  methods: {
    resetV (v) {
      if (v === 'default') {
        this.$store.commit('utils/resetV', true)
      } else {
        this.$store.commit('utils/resetV', false)
      }
    },
    resetMode (v) {
      this.resetV('default')
      this.resetUtils()
      this.$store.commit('mode/chgTabMode', { tab: '', content: 'default' })
      this.$store.commit('mode/chgEditMode', { mode: 'default', item: {} })
      this.$store.commit('mode/resetMode')
      this.$store.commit('mode/chgPageMode', v)
    },
    resetUtils () {
      this.$store.commit('utils/resetUtils')
    },
    resetFields () {
      this.$store.commit('utils/resetFields')
    },
    resetEditMode () {
      this.$store.commit('mode/chgEditMode', { mode: 'default', item: {} })
    },
    resetButtons () {
      this.$store.commit('utils/resetButtons')
    },
  },
}
