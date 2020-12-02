<template>
  <div>
    <div v-if="resetV === 'fake'" />
    <v-card
      flat
      class=""
    >
      <div class="d-flex justify-center">
        <div>
          <div class="d-flex justify-space-between">
            <div>
              <v-text-field
                v-model="titleField"
                class="pa-1"
                style="min-width: 400px"
                label="Наименование категории"
                type="String"
                hint="Не менее 3-х и не более 30-ти символов"
                :error-messages="titleFieldErrors"
                dense
                outlined
                small
                clearable
                counter="20"
                @blur="$v.titleField.$touch()"
              />
            </div>
            <div>
              <v-text-field
                v-model="stdCategoriesGroup.title"
                class="pa-1"
                style="min-width: 400px"
                label="Группа категорий"
                placeholder="Выберите группу категорий в списке"
                :error-messages="stdCategoriesGroupErrors"
                append-icon="mdi-folder-plus-outline"
                readonly
                outlined
                dense
                @blur="$v.stdCategoriesGroup.$touch()"
              />
            </div>
          </div>
          <div class="d-flex justify-space-between">
            <div>
              <v-text-field
                v-model="commentField"
                hint="не более 100 символов"
                style="min-width: 500px"
                :error-messages="commentFieldErrors"
                class="pa-1 pb-0"
                label="Комментарий"
                dense
                rows="1"
                outlined
                small
                clearable
                counter="100"
                @blur="$v.commentField.$touch()"
              />
            </div>
            <div>
              <v-switch
                v-model="expenses"
                class="pa-0 my-3"
                label="Расходы"
                color="success"
                hide-details
                @change="toChangeSwitch('expenses', expenses)"
              />
            </div>
            <div>
              <v-switch
                v-model="entrances"
                class="pa-0 my-3"
                label="Поступления"
                color="primary"
                hide-details
                @change="toChangeSwitch('entrances', entrances)"
              />
            </div>
          </div>
        </div>
        <div class="d-flex justify-start ml-5 pb-4">
          <div class="d-flex justify-start justify-space-between flex-column align-center ">
            <div v-if="getEditMode === 'edit'">
              <v-btn
                outlined
                color="red"
                @click="button('remove')"
              >
                Удалить
              </v-btn>
            </div>
            <div>
              <v-btn
                outlined
                color="green"
                @click="button('cancel')"
              >
                Отменить
              </v-btn>
            </div>
            <div>
              <v-btn
                outlined
                color="primary"
                @click="button('save')"
              >
                Сохранить
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import getters from '@/mixins/getters'
import categories from '@/mixins/user/properties/categories.mixin'
export default {
  name: 'TabContentCategoriesEdit',
  mixins: [validationMixin, getters, categories],
  validations: {
    titleField: {
      unique () {
        return this.valTitleField.unique
      },
      length () {
        return this.valTitleField.length
      }
    },
    commentField: {
      length () {
        return this.valCommentField.length
      }
    },
    stdCategoriesGroup: {
      selected () {
        return this.valStdCategoriesGroup.selected
      }
    }
  },
  data () {
    return {
      expenses: true,
      entrances: false
    }
  },
  computed: {
    resetV () {
      if (this.gResetV) {
        this.$v.$reset()
      }
      return this.gResetV
    },
    titleField: {
      get () {
        return this.$store.getters['utils/searchField']
      },
      set (v) {
        let searchField = ''
        v ? searchField = v : searchField = ''
        this.$store.commit('utils/chgSearchField', searchField)
      }
    },
    commentField: {
      get () {
        return this.$store.getters['utils/commentField']
      },
      set (v) {
        let commentField = ''
        v ? commentField = v : commentField = ''
        this.$store.commit('utils/chgCommentField', commentField)
      }
    },
    valStdCategoriesGroup () {
      const valStdCategoriesGroup = {}
      valStdCategoriesGroup.selected = !!this.stdCategoriesGroup._id
      return valStdCategoriesGroup
    },
    stdCategoriesGroup () {
      const stdCategoriesGroup = this.$store.getters['user/properties/categories/stdCategoriesGroup']
      if (!stdCategoriesGroup) { stdCategoriesGroup.title = '' }
      return stdCategoriesGroup
    },
    stdCategoriesGroupErrors () {
      const errors = []
      if (!this.$v.stdCategoriesGroup.$dirty) { return errors }
      !this.$v.stdCategoriesGroup.selected && errors.push('Выберите группу категорий из списка')
      return errors
    },
    valTitleField () {
      let unique = true
      const findUnique = this.MXcategories()
        .find(item => item.title.toLowerCase() === this.titleField.toLowerCase())
      if (findUnique) { unique = false }
      if (this.getEditItem.title) {
        if (this.getEditItem && this.titleField.toLowerCase() ===
            this.getEditItem.title.toLowerCase()) {
          unique = true
        }
      }
      let length = true
      this.titleField.length > 2 && this.titleField.length < 30
        ? length = true : length = false
      return {
        length,
        unique
      }
    },
    valCommentField () {
      const valCommentField = {}
      let length = true
      this.commentField.length < 100 ? length = true : length = false
      valCommentField.length = length
      return valCommentField
    },
    titleFieldErrors () {
      const errors = []
      if (!this.$v.titleField.$dirty) { return errors }
      !this.$v.titleField.length && errors.push('Не менее 3-х и не более 30-ти символов')
      !this.$v.titleField.unique && errors.push('Наименование уже существует')
      return errors
    },
    commentFieldErrors () {
      const errors = []
      if (!this.$v.commentField.$dirty) { return errors }
      !this.$v.commentField.length && errors.push('Не более 100 символов')
      return errors
    },
    tabMode () {
      return this.gTabMode.content
    },
    getEditMode () {
      return this.gEditMode
    },
    getEditItem () {
      return this.gEditItem
    }
  },
  watch: {
    tabMode (v) {
      if (v === 'TabContentCategoriesEdit') {
        this.toChgByEditItem()
      }
    }
  },
  created () {
    if (this.tabMode === 'TabContentCategoriesEdit') {
      this.toChgByEditItem()
    }
  },
  methods: {
    getUser () {
      return this.gUser
    },
    toChgByEditItem () {
      const editItem = this.gEditItem
      if (editItem._id) {
        const categoriesGroups = this.$store.getters['user/properties/categories/categoriesGroups']
        const categoriesGroup = categoriesGroups.find(item => item._id === editItem.groupId)
        this.$store.commit('utils/chgSearchField', editItem.title)
        this.$store.commit('utils/chgCommentField', editItem.comment)
        this.$store.commit('user/properties/categories/chgStdCategoriesGroup', categoriesGroup)
        this.expenses = editItem.expenses
        this.entrances = editItem.entrances
      }
    },
    toChangeSwitch (type, val) {
      if (type === 'expenses') {
        this.expenses = val
        if (!this.expenses) { this.entrances = true }
      } else {
        this.entrances = val
        if (!this.entrances) { this.expenses = true }
      }
    },
    button (mode) {
      if (mode === 'save') { mode = this.getEditMode }
      const item = {}
      switch (mode) {
        case 'create':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          item.userId = this.gUser.id
          item.groupId = this.stdCategoriesGroup._id
          item.title = this.titleField
          item.comment = this.commentField
          item.expenses = this.expenses
          item.entrances = this.entrances
          item.visible = true
          this.MXtoCreateCategory(item)
          break
        case 'edit':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          item._id = this.getEditItem._id
          item.userId = this.gUser.id
          item.groupId = this.stdCategoriesGroup ? this.stdCategoriesGroup._id : ''
          item.title = this.titleField
          item.comment = this.commentField
          item.expenses = this.expenses
          item.entrances = this.entrances
          item.visible = true
          this.MXtoEditCategory(item)
          break
        case 'remove':
          item._id = this.getEditItem._id
          item.userId = this.gUser.id
          this.MXtoRemoveCategory(item)
          break
        default: // cancel
          this.$store.commit('mode/chgTabMode', { tab: 'propertyCategories', content: 'default' })
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
