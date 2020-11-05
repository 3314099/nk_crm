<template>
  <div>
    <LBPanelButtons />
    <v-card
      max-width="600"
      class="mx-auto ma-1"
    >
      <component :is="component" />
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LeftBar',
  components: {
    LBPanelButtons: () => import('@/components/LeftBar/LBPanelButtons'),
    LBcrm: () => import('@/components/testLeftBars/LBcrm'),
    LBfp: () => import('@/components/testLeftBars/LBfp'),
    LBtd: () => import('@/components/testLeftBars/LBtd'),
  },
  computed: {
    route () {
      return this.$route.path
    },
    component () {
      let component = ''
      switch (this.$route.path) {
        case '/crm':
          component = 'LBcrm'
          break
        case '/td':
          component = 'LBtd'
          break
        case '/fp':
          component = 'LBfp'
          break
        default:
          component = 'LBcrm'
          break
      }
      return component
    }
  }
}
</script>
<style lang="scss">

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: scale(0);
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
