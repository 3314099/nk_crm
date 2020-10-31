<template>
  <v-app>
    <div>
      <SnackBar />
      <Navbar />
      <Drawer />
    </div>
    <v-main class="ma-3 main-wrap">
      <div class="d-flex flex-grow-1 justify-space-between">
        <div v-if="barsVisibility" class="justify-start">
          <LeftBar />
        </div>
        <div style="width: 100%" class="mx-3">
          <div v-if="barsVisibility">
            <Navigation />
          </div>
          <div class="mt-2">
            <nuxt />
          </div>
        </div>
        <div v-if="barsVisibility" class="d-flex justify-end">
          <RightBar />
        </div>
      </div>
    </v-main>
    {{ barsVisibility }}
    <v-footer app />
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
    LeftBar: () => import('@/components/layoutsComponents/user/LeftBar'),
    RightBar: () => import('@/components/layoutsComponents/user/RightBar'),
    Navigation: () => import('@/components/layoutsComponents/user/Navigation')
  },
  computed: {
    barsVisibility () {
      return Boolean(this.$route.path !== '/main')
    }
  }
}
</script>

<style>
</style>
