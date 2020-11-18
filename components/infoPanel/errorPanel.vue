<template>
  <div class="mb-2">
    <v-alert
      dismissible
      type="error"
      color="red lighten-2"
      border="top"
      elevation="2"
      colored-border
      class="mb-2"
    >
      <strong>{{ alert.message }}</strong> {{ alert.text }}
    </v-alert>
  </div>
</template>

<script>
import alertList from '@/mixins/user/alertsLists/alertList'
export default {
  name: 'MessagePanel',
  mixins: [alertList],
  computed: {
    alert () {
      const alertMessage = this.$store.getters.alertMessage
      return alertMessage
        ? this.alertList.find(item => item.message === alertMessage)
        : { message: 'noErrors', text: 'Нет ошибок', path: '' }
    }
  }
}
</script>

<style scoped>

</style>
