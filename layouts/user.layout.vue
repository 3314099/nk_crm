<template>
  <v-app class="allScreen">
    <div>
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
export default {
  middleware: [isAuthed],
  name: 'User',
  components: {
    SnackBar: () => import('@/components/layoutsComponents/SnackBar'),
    Navbar: () => import('@/components/layoutsComponents/user/Navbar'),
    Drawer: () => import('@/components/layoutsComponents/user/Drawer'),
  },
  computed: {
    barsVisibility () {
      return Boolean(this.$route.path !== '/main')
    },
    // topPanel () {
    //   const topPanel = 'breadСrumbs'
    //   return topPanel
    // }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
