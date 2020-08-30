<template>
  <div>
    Выход из системы..., подождите.
  </div>
</template>

<script>
import isAuthed from '@/middleware/isAuthed'
export default {
  name: 'Logout',
  middleware: [isAuthed],
  beforeCreate () {
    this.$store.dispatch('auth/logout')
    this.$router.push('/?message=logout') // событие или сообщение - вы вышли из системы
  }
}
</script>

<style scoped>

</style>
