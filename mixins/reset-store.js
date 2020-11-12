export default {
  computed: {
    routing () {
      return this.$route.path
    }
  },
  watch: {
    routing (v) {
      this.resetMode(v)
    }
  },
  created () {
    this.resetMode(this.$route.path)
  },
  methods: {
    resetMode (v) {
      this.resetUtils()
      this.$store.dispatch('mode/chgTabMode', { tab: '', content: 'default' })
      this.$store.dispatch('mode/chgEditMode', { mode: 'default', item: {} })
      this.$store.dispatch('mode/resetMode')
      this.$store.dispatch('mode/chgPageMode', v)
    },
    resetUtils () {
      this.$store.dispatch('utils/resetUtils')
      this.$store.dispatch('utils/resetV', true)
    },
    resetFields () {
      this.$store.dispatch('utils/resetFields')
    },
    resetEditMode () {
      this.$store.dispatch('mode/chgEditMode', { mode: 'default', item: {} })
    }
  },
}
