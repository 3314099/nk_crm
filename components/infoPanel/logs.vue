<template>
  <v-row justify="center">
    <v-dialog
      v-model="historyModal"
      scrollable
      width="80vw"
    >
      <v-card>
        <v-card-title>
          Журнал ошибок и успешных событий на сервере
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          height="60vh"
          fixed-header
          :headers="headers"
          :items="logs"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          :search="search"
          :hide-default-footer="footer"
          no-data-text="Список пуст."
          no-results-text="Значения не найдены"
          sort-by="lastName"
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:item.date="{ item }">
            <span>{{ formatDate(item.date, 'HH:mm:ss DD.MM.YY ') }}</span>
          </template>
        </v-data-table>
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
import utils from '@/mixins/utils.mixin'
export default {
  name: 'Logs',
  mixins: [utils],
  data () {
    return {
      dialogm1: '',
      dialog: false,
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      footer: false,
      search: '',
      headers: [
        {
          text: 'Наименование события',
          align: 'start',
          filterable: true,
          value: 'message',
        },
        { text: 'Текст', value: 'text' },
        { text: 'Время события', value: 'date' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
  computed: {
    historyModal: {
      get () {
        return this.$store.getters.modal === 'logs'
      },
      set () {
        this.$store.dispatch('setModal', '')
      }
    },
    logs () {
      return this.$store.getters['logs/logs/logs']
    }
  },
  methods: {
    close () {
      this.$store.dispatch('setModal', '')
    }
  }
}
</script>

<style scoped>

</style>
