<template>
  <div class="px-1">
    <v-list-item-subtitle class="pa-2">
      storeDebug
    </v-list-item-subtitle>
    <h3 class="purple darken-2 text-center white--text">
      auth:
    </h3>
    <h4>
      isAuthenficated:
      <span class="subtitle-1">
        {{ auth.isAuthenticated }}
      </span>
    </h4>
    <h4>
      user:
      <span class="subtitle-1">
        {{ auth.user }}
      </span>
    </h4>
    <h3 class="purple darken-2 text-center white--text">
      mode:
    </h3>
    <h4>
      editMode:
      <span class="subtitle-1">
        {{ mode.editMode }}
      </span>
    </h4>
    <h4>
      contentMode:
      <span class="subtitle-1">
        {{ mode.contentMode }}
      </span>
    </h4>
    <h4>
      editItem:
      <span class="subtitle-1">
        {{ mode.editItem }}
      </span>
    </h4>
    <h3 class="purple darken-2 text-center white--text">
      index:
    </h3>
    <h4>
      error:
      <span class="subtitle-1">
        {{ index.error }}
      </span>
    </h4>
    <h4>
      response:
      <span class="subtitle-1">{{ index.response }}
      </span>
    </h4>
    <h4>
      buzyEmail:
      <span class="subtitle-1">
        {{ index.buzyEmail }}
      </span>
    </h4>
    <h4>
      message:
      <span class="subtitle-1">
        {{ index.message }}
      </span>
    </h4>
    <h4>
      messageList:
      <span class="subtitle-1">
        {{ index.messageList }}
      </span>
    </h4>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'StoreDebug',
  computed: {
    auth () {
      const auth = {}
      auth.isAuthenticated = this.$store.getters['auth/isAuthenticated']
      auth.user = this.$store.getters['auth/user']
      return auth
    },
    index () {
      const index = {}
      index.error = this.$store.getters['index/error']
      index.response = this.$store.getters['index/response']
      index.buzyEmail = this.$store.getters['index/buzyEmail']
      index.message = this.$store.getters['index/message']
      index.messageList = this.$store.getters['index/messageList']
      return index
    },
    mode () {
      const mode = {}
      mode.editMode = this.$store.getters['mode/editMode']
      mode.editItem = this.$store.getters['mode/editItem']
      mode.contentMode = this.$store.getters['mode/contentMode']
      return mode
    }
  }

}
</script>

<style scoped>

</style>
