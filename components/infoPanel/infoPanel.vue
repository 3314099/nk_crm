<template>
  <div>
    <v-window
      v-model="onboarding"
      vertical
    >
      <v-window-item>
        <breadСrumbs />
      </v-window-item>
      <v-window-item
        @click="showError"
      >
        <messagePanel />
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
export default {
  name: 'InfoPanel',
  components: {
    breadСrumbs: () => import('@/components/infoPanel/breadСrumbs'),
    messagePanel: () => import('@/components/infoPanel/messagePanel')
  },
  data: () => ({
    onboarding: 0,
  }),
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.showError()
      }
    }
  },
  methods: {
    showError () {
      if (this.onboarding === 0) {
        this.onboarding = 1
        setTimeout(() => {
          this.onboarding = 0
          this.$store.commit('setError', '', { root: true })
        }, 10000)
      } else {
        this.onboarding = 0
        this.$store.commit('setError', '', { root: true })
      }
    }
  },
}
</script>

<style scoped>

</style>
