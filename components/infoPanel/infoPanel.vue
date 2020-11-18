<template>
  <div>
    <v-window
      v-model="onboarding"
      vertical
    >
      <v-window-item>
        <breadCrumbs />
      </v-window-item>
      <v-window-item
        @click="errorPanel('close')"
      >
        <errorPanel />
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import alertList from '@/mixins/user/alertsLists/alertList'
export default {
  name: 'ErrorPanel',
  components: {
    breadCrumbs: () => import('@/components/infoPanel/breadСrumbs'),
    errorPanel: () => import('@/components/infoPanel/errorPanel')
  },
  mixins: [alertList],
  data: () => ({
    onboarding: 0,
  }),
  computed: {
    alert () {
      return this.$store.getters.alertMessage
    }
  },
  watch: {
    alert (message) {
      if (message) {
        this.errorPanel(message)
      }
    }
  },
  methods: {
    errorPanel (message) {
      if (message === 'close') {
        this.onboarding = 0
        this.$store.commit('setAlert', '', { root: true })
      } else {
        const alertMessage = this.alertList.find(item => item.message === message)
        if (alertMessage.alertType === 'errorPanel') {
          this.onboarding = 1
          setTimeout(() => {
            this.onboarding = 0
            this.$store.commit('setAlert', '', { root: true })
          }, 10000)
        }
      }
    }
  },
}
</script>

<style scoped>

</style>
