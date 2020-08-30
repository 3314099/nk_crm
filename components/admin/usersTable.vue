<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :search="search"
      hide-default-footer
      no-data-text="Список пуст."
      no-results-text="Значения не найдены"
      sort-by="lastName"
      class="elevation-1"
      @page-count="pageCount = $event"
    >
      <template v-slot:top>
        <v-toolbar flat color="white" class="flex justify-between flex-nowrap">
          <div style="max-width: 700px; min-width: 300px">
            <v-text-field
              v-model="search"
              class="mr-4"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              clearable
              hide-details
            />
          </div>
          <div style="width: 700px" class="ma-3">
            <v-select
              v-model="role"
              :items="roles"
              :item-text="'value'"
              :item-value="'name'"
              full-width
            />
          </div>
          <div style="width: 100%" class="d-flex align-content-start">
            <div>
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatDate(date1, 'DD.MM.YYYY')"
                    prepend-icon="mdi-calendar"
                    full-width
                    readonly
                    v-bind="attrs"
                    :rules="[date1Rule.msg]"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date1"
                  first-day-of-week="1"
                  locale="ru"
                  scrollable
                  show-week
                  :min="date1Start"
                  :max="date2End"
                  @input="menu1 = false"
                />
              </v-menu>
            </div>
            <div>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatDate(date2, 'DD.MM.YYYY')"
                    prepend-icon="mdi-calendar"
                    full-width
                    readonly
                    v-bind="attrs"
                    :rules="[date2Rule.msg]"
                    hide-details="auto"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date2"
                  first-day-of-week="1"
                  locale="ru"
                  scrollable
                  show-week
                  :min="date1Start"
                  :max="date2End"
                  @input="menu2 = false"
                />
              </v-menu>
            </div>
          </div>
          <div style="max-width: 50px">
            <v-chip
              class="ma-2"
            >
              {{ count }}
            </v-chip>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:item.switch="{ item }">
        <v-switch
          class="ml-0 mt-1 mx-4 mb-0 pr-0 mr-0"
          :input-value="Boolean(item.role === 'admin')"
          @change="chgRole(item)"
        />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="mr-2"
          @click="chgUser(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          class="ml-2"
          @click="chgUserNote(item)"
        >
          mdi-chat-outline
        </v-icon>
      </template>
      <template v-slot:item.date="{ item }">
        <span>{{ formatDate(item.date, 'D MMMM YYYY') }}</span>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="resetFilters">
          Сбросить фильтры
        </v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount" />
      <v-btn color="primary" @click="resetFilters">
        Сбросить фильтры
      </v-btn>
    </div>
  </div>
</template>

<script>
import utils from '@/mixins/utils'
import users from '@/mixins/users'
export default {
  name: 'UsersTable',
  mixins: [utils, users],
  props: {
    srchField: {
      type: String,
      default: () => ''
    }
  },
  data: () => ({
    date1: new Date(),
    date1Start: new Date(2020, 1, 1, 0, 0, 0, 0).toISOString().substr(0, 10),
    date2: new Date(),
    date2End: new Date().toISOString().substr(0, 10),
    menu1: false,
    modal: false,
    menu2: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialog: false,
    search: '',
    roles: [
      { name: 'all', value: 'Все пользователи' },
      { name: 'admin', value: 'Администраторы' },
      { name: 'user', value: 'Пользователи' }
    ],
    role: 'all',
    headers: [
      {
        text: 'Фамилия пользователя',
        align: 'start',
        sortable: true,
        value: 'lastName'
      },
      {
        text: 'Имя пользователя',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: 'Email пользователя', value: 'email' },
      { text: 'Администратор', align: 'role', sortable: false, value: 'switch' },
      { text: 'Редактировать', value: 'actions', sortable: false },
      { text: 'Дата регистрации', value: 'date' }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),
  computed: {
    startDate () {
      return this.$moment(new Date()).format()
    },
    users () {
      let users = [...this.$store.getters['admin/users/users']]
      if (this.role !== 'all') {
        users = users.filter(item => item.role === this.role)
      }
      const date1 = this.formatDate(this.setTime(this.date1, 'start'))
      const date2end = this.formatDate(this.setTime(this.date2, 'end'))
      if (this.date1Rule.bool && this.date2Rule.bool) {
        const datedUsers = users.filter(item => (this.formatDate(item.date) >= date1 &&
          this.formatDate(item.date) <= date2end))
        if (datedUsers) { users = datedUsers }
      }
      return users ? this.UsortObjectsArrayByText(users, 'lastName', false) : []
    },
    date1Rule () {
      const dateRule = {}
      if (this.setTime(this.date1, 'start') <= this.setTime() && this.setTime(this.date1, 'start') >= this.date1Start) {
        dateRule.bool = true
        dateRule.msg = true
      } else {
        dateRule.bool = false
        dateRule.msg = 'Дата указана не верно.'
      }
      return dateRule
    },
    date2Rule () {
      const dateRule = {}
      if (this.setTime(this.date2, 'start') <= this.setTime() &&
        this.setTime(this.date2, 'end') >= this.setTime(this.date1, 'start')) {
        dateRule.bool = true
        dateRule.msg = true
      } else {
        dateRule.bool = false
        dateRule.msg = 'Дата указана не верно.'
      }
      return dateRule
    },
    test () {
      const test = {}
      test.date1 = this.setTime(this.date1, 'start')
      test.date2 = this.setTime(this.date2, 'end')
      test.bool = Boolean(this.setTime(this.date2, 'end') >= this.setTime(this.date1, 'start'))
      return test
    },
    count () {
      return this.users.length
    }
  },
  watch: {
    srchField (val) {
      this.search = val
    },
    search (val) {
      if (!val) {
        this.resetSearchField()
      }
    }
  },
  async created () {
    await this.$store.dispatch('admin/users/fetchUsers')
    await this.$store.dispatch('admin/users/fetchUsersNotes')
    this.updateNotes()
    this.setDate()
  },
  methods: {
    setDate () {
      const users = [...this.$store.getters['admin/users/users']]
      if (users.length) {
        const date = users.reduce((a, b) => a.date < b.date ? a : b)
        this.date1Start = this.date1 = this.formatDate(date.date, 'YYYY-MM-DD')
        this.date2 = this.formatDate(new Date(), 'YYYY-MM-DD')
      }
    },
    resetSearchField () {
      this.$emit('resetSearchField')
    },
    chgUserNote (val) {
      this.$emit('chgUserNote', val)
    },
    // async openNotes (id) {
    //   console.log(id)
    //   try {
    //     const response = await this.$store.dispatch('admin/users/fetchUserById', id)
    //     this.$store.dispatch('mode/chgEditMode', { val: 'openNotes', item: response })
    //   } catch {
    //     // this.$store.dispatch('snackBar/changeSnackBar', 'newUser')
    //   }
    // },
    resetFilters () {
      this.search = ''
      this.setDate()
    },
    chgRole (item) {
      const newItem = Object.assign({}, item)
      // newItem.role = newItem.role === 'admin' ? 'user' : 'admin'
      if (newItem.role === 'admin') {
        newItem.role = 'user'
      } else {
        newItem.role = 'admin'
      }
      this.$store.dispatch('admin/users/updateUser', newItem)
    },
    chgUser (item) {
      this.$store.dispatch('mode/chgEditMode', { mode: 'editUser', item })
    },
    initialize () {
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
