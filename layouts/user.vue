<template>
  <v-app>
    <div class="">
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
import SnackBar from '@/components/layoutsComponents/SnackBar'
import Navbar from '@/components/layoutsComponents/user/Navbar'
import Drawer from '@/components/layoutsComponents/user/Drawer'
import LeftBar from '@/components/layoutsComponents/user/LeftBar'
import RightBar from '@/components/layoutsComponents/user/RightBar'
import Navigation from '@/components/layoutsComponents/user/Navigation'

export default {
  name: 'User',
  components: {
    SnackBar,
    Navbar,
    Drawer,
    LeftBar,
    RightBar,
    Navigation
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
