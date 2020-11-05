<template>
  <div class="mb-2">
    <v-alert
      v-model="alert"
      dismissible
      type="error"
      color="red lighten-2"
      border="top"
      elevation="2"
      colored-border
      class="mb-2"
    >
      You've got <strong>5</strong> new updates on your timeline!.
    </v-alert>

    <div class="text-center">
      <v-btn
        v-if="!alert"
        dark
        @click="alert = true"
      >
        Reset Alert
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessagePanel',
  data () {
    return {
      alert: true,
    }
  },
}
</script>

<style scoped>

</style>
