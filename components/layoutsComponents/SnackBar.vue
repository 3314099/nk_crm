<template>
  <v-snackbar
    v-model="snackbar"
    :bottom="y === 'bottom'"
    :color="color"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
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
export default {
  name: 'SnackBar',
  data () {
    return {
      color: '',
      mode: '',
      snackbar: false,
      text: 'Hello, I\'m a snackbar',
      timeout: 6000,
      x: null,
      y: 'top'
    }
  },
  computed: {
    snackBar () {
      return this.$store.getters['snackBar/snackBar']
    },
    error () {
      return this.$store.getters.error
    },
    response () {
      return this.$store.getters.response
    }
  },
  watch: {
    snackBar (value) {
      if (value) {
        this.buildSnackBar(value)
      }
    },
    error (value) {
      if (value) {
        this.buildError(value)
      }
    },
    response (value) {
      if (value) {
        this.buildAccess(value)
      }
    }
  },
  mounted () {
    const { message } = this.$route.query // сообщение через адресную строку
    if (message) {
      this.buildMessage(message)
    }
  },
  methods: {
    buildSnackBar (snackBar) {
      switch (snackBar) {
        case 'testButton':
          this.color = 'success'
          this.mode = '' // 'vertical' => mobile
          this.text = 'testButton' // текст сообщения
          this.timeout = 2000 // 1000 = 1 сек.
          this.x = null // left/right/null
          this.y = 'top' // bottom/top
          this.snackbar = true // true/false
          break
        case 'newUser':
          this.color = 'success'
          this.mode = '' // 'vertical' => mobile
          this.text = 'Новый пользователь добавлен' // текст сообщения
          this.timeout = 2000 // 1000 = 1 сек.
          this.x = null // left/right/null
          this.y = 'top' // bottom/top
          this.snackbar = true // true/false
          break
        case 'isAuthed':
          this.color = 'primary'
          this.mode = '' // 'vertical' => mobile
          this.text = 'Вы успешно вошли в систему' // текст сообщения
          this.timeout = 2000 // 1000 = 1 сек.
          this.x = null // left/right/null
          this.y = 'top' // bottom/top
          this.snackbar = true // true/false
          break
        case 'failLogin':
          this.color = 'success'
          this.mode = '' // 'vertical' => mobile
          this.text = 'Не удалось войти в систему' // текст сообщения
          this.timeout = 2000 // 1000 = 1 сек.
          this.x = null // left/right/null
          this.y = 'top' // bottom/top
          this.snackbar = true // true/false
          break
        case 'logout':
          this.color = 'success'
          this.mode = '' // 'vertical' => mobile
          this.text = 'Вы вышли из системы' // текст сообщения
          this.timeout = 2000 // 1000 = 1 сек.
          this.x = null // left/right/null
          this.y = 'top' // bottom/top
          this.snackbar = true // true/false
          break
        default: return // '' или нет в списке
      }
      if (snackBar) { this.$store.dispatch('snackBar/changeSnackBar') }
    },
    buildAccess (value) {
      switch (value.message) {
        case 'newUserIsRegistered' :
          if (value.message) { this.$store.dispatch('chgMessage', value.message) }
          // загрузить обновленную таблицу пользователей из базы
          //  добавить запись в журнал
          this.color = 'success'
          this.text = 'Новый пользователь зарегистрирован'
          break
        case 'userUdated' :
          if (value.message) { this.$store.dispatch('chgMessage', value.message) }
          // загрузить обновленную таблицу пользователей из базы
          //  добавить запись в журнал
          this.color = 'success'
          this.text = 'Пользователь успешно изменен'
          break
        case 'userDeleted' :
          if (value.message) { this.$store.dispatch('chgMessage', value.message) }
          // загрузить обновленную таблицу пользователей из базы
          //  добавить запись в журнал
          this.color = 'success'
          this.text = 'Пользователь удалён'
          break
        default:
          break
      }
      this.clearResponse()
    },
    buildError (value) {
      switch (value.response.data.message) {
        case 'emailIsBusy' :
          if (value.response.data.email) { this.$store.dispatch('chgBuzyEmail', value.response.data.email) }
          if (value.response.data.message) {
            this.$store.dispatch('chgMessage',
              'Ошибка: Такой Email уже зарегистрирован в системе')
          }
          //  добавить запись в журнал
          this.color = 'error'
          this.text = 'Такой Email уже зарегистрирован в системе'
          break
        default:
          break
      }
      this.clearResponse()
    },
    buildMessage (message) {
      switch (message) {
        case 'logout':
          this.color = 'success'
          this.mode = '' // 'vertical' => mobile
          this.text = 'Вы успешно вышли из системы' // текст сообщения
          this.timeout = 2000 // 1000 = 1 сек.
          this.x = null // left/right/null
          this.y = 'top' // bottom/top
          this.snackbar = true // true/false
          break
        case 'authed':
          this.color = 'primary'
          this.mode = '' // 'vertical' => mobile
          this.text = 'Вы успешно вошли в систему' // текст сообщения
          this.timeout = 2000 // 1000 = 1 сек.
          this.x = null // left/right/null
          this.y = 'top' // bottom/top
          this.snackbar = true // true/false
          break
        case 'failLogin':
          this.color = 'success'
          this.mode = '' // 'vertical' => mobile
          this.text = 'Не удалось войти в систему' // текст сообщения
          this.timeout = 2000 // 1000 = 1 сек.
          this.x = null // left/right/null
          this.y = 'top' // bottom/top
          this.snackbar = true // true/false
          break
        default: // '' или нет в списке
          break
      }
      this.$store.dispatch('snackBar/changeSnackBar', '')
    },
    clearResponse () {
      // color ['success', 'info', 'error', 'cyan darken-2']
      this.mode = '' // 'vertical' => mobile
      this.timeout = 6000 // 1000 = 1 сек.
      this.x = null // left/right/null
      this.y = 'top' // bottom/top
      this.snackbar = true // true/false
      this.$store.dispatch('clearResponse')
    }
  }
}
</script>

<style scoped>

</style>
