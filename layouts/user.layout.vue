<template>
  <v-app class="allScreen" style="user-select: none;">
    <div>
      <historyModal />
      <logsModal />
      <SnackBar />
      <Navbar />
      <Drawer />
    </div>
    <div class="mt-2">
      <nuxt />
    </div>
    <v-footer padless>
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import isAuthed from '@/middleware/isAuthed'
import resetStore from '@/mixins/reset-store'
import getters from '@/mixins/getters'

export default {
  name: 'User',
  middleware: [isAuthed],
  components: {
    SnackBar: () => import('@/components/infoPanel/SnackBar'),
    historyModal: () => import('@/components/infoPanel/historyModal'),
    logsModal: () => import('@/components/infoPanel/logs'),
    Navbar: () => import('@/components/layoutsComponents/user/Navbar'),
    Drawer: () => import('@/components/layoutsComponents/user/Drawer'),
  },
  mixins: [getters, resetStore],
  computed: {
    barsVisibility () {
      return Boolean(this.route !== '/main')
    },
    tabModeContent () {
      return this.gTabMode.content
    }
  },
  watch: {
    tabModeContent () {
      this.resetUtils()
      if (this.tabModeContent === 'default') {
        this.resetFields()
        this.resetEditMode()
      }
    },
  },
  created () {
    this.$store.dispatch('auth/fetchUserData', this.gUser.id)
  }
}
</script>

<style scoped>
</style>
