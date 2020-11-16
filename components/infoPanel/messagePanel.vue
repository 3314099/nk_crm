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
      {{ error.ruMessage }}<strong>{{ error.error }}</strong> {{ error.path }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'MessagePanel',
  data () {
    return {
      messages: [
        {
          error: 'failedChgOrderSections',
          ruMessage: 'Ошибка сервера: ',
          path: 'api/controllers/user/properties/sections.controller.js - chgOrderSections'
        },
        {
          error: 'failedRemoveSection',
          ruMessage: 'Ошибка сервера: ',
          path: 'api/controllers/user/properties/sections.controller.js - remove'
        },
      ]
    }
  },
  computed: {
    error () {
      const error = this.$store.getters.error
      return error
        ? this.messages.find(item => item.error === error.response.data.message)
        : { error: 'noErrors', ruMessage: 'Нет ошибок', path: '' }
    }
  }
}
</script>

<style scoped>

</style>
