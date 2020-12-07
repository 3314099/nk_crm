<template>
  <v-snackbar
    v-model="snackbar"
    :bottom="y === 'bottom'"
    :color="color"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import alertList from '@/mixins/user/alertsLists/alertList'
import getters from '@/mixins/getters'
import logsList from '@/mixins/logList/logList.mixin'

export default {
  name: 'SnackBar',
  mixins: [alertList, getters, logsList],
  data () {
    return {
      color: '',
      mode: '',
      snackbar: false,
      text: 'Сообщение отсутствует!!!',
      timeout: 0,
      x: null,
      y: 'top'
    }
  },
  computed: {
    alert () {
      return this.$store.getters.alertMessage
    },
  },
  watch: {
    alert (value) {
      if (value) {
        this.buildAlertMessage(value)
      }
    },
  },
  mounted () {
    const { message } = this.$route.query // сообщение через адресную строку
    if (message) {
      this.buildAlertMessage(message)
    }
  },
  methods: {
    buildAlertMessage (message) {
      const alertMessage = this.alertList.find(item => item.message === message)
      if (alertMessage.log) {
        alertMessage.userId = this.gUser.id
        this.MXtoCreateLog(alertMessage)
        // this.$store.dispatch('logsList/logsList/createLog', alertMessage)
      }
      if (alertMessage.alertType === 'snackbar') {
        this.text = alertMessage.text // текст сообщения
        this.color = alertMessage.color
        this.snackbar = true // true/false
        this.$store.commit('setAlert', '', { root: true })
      }
    },
  }
}
</script>

<style scoped>

</style>
