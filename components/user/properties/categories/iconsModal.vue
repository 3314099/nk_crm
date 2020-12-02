<template>
  <v-row justify="center">
    <v-dialog
      v-model="modal"
      scrollable
      width="505px"
    >
      <v-card>
        <v-card-title>
          Выберите иконку для группы категорий
        </v-card-title>
        <v-divider />
        <div class="d-flex flex-wrap">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="ma-2"
            :color="icon !== 'mdi-camera-off' ? 'teal' : ''"
            depressed
            elevation="2"
            fab
            outlined
            raised
            rounded
            @click="chgIcon(icon)"
          >
            <v-icon
              x-large
            >
              {{ icon }}
            </v-icon>
          </v-btn>
        </div>
        <v-divider />
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            Закрыть окно
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'IconsModal',
  data () {
    return {
      dialogm1: '',
      dialog: false,
      icons: [
        'mdi-camera-off', 'mdi-car-outline', 'mdi-credit-card', 'mdi-car-lifted-pickup',
        'mdi-cellphone-android', 'mdi-fish', 'mdi-flashlight', 'mdi-flower',
        'mdi-microsoft-xbox-controller', 'mdi-minus-circle', 'mdi-sim', 'mdi-flower',
        'mdi-checkbox-multiple-marked-circle', 'mdi-chevron-down-box-outline', 'mdi-folder-sync'
      ],
    }
  },
  computed: {
    modal: {
      get () {
        return this.$store.getters.modal === 'categiriesGroupsIcons'
      },
      set () {
        this.$store.commit('setModal', '')
      }
    },
  },
  methods: {
    close () {
      this.$store.commit('setModal', '')
    },
    chgIcon (val) {
      this.$store.commit('user/properties/categories/chgCategoriesGroupIcon', val)
      this.$store.commit('setModal', '')
    }
  }
}
</script>

<style scoped>

</style>
