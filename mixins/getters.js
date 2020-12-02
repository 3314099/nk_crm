export default {
  computed: {
    gUser () {
      return this.$store.getters['auth/user']
    },
    gResetV () {
      return this.$store.getters['utils/resetV']
    },
    route () {
      return this.$route.path
    },
    gTabMode () {
      return this.$store.getters['mode/tabMode']
    },
    gEditMode () {
      return this.$store.getters['mode/editMode']
    },
    gEditItem () {
      const editItem = this.$store.getters['mode/editItem']
      return editItem || {}
    },
    gColorPicker () {
      const colorPicker = this.$store.getters['utils/colorPicker']
      if (colorPicker) {
        return colorPicker
      } else {
        return {}
      }
    }
  }
}
