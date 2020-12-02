<template>
  <div>
    <div v-if="resetV === 'fake'" />
    <v-card
      flat
    >
      <div class="d-flex justify-center">
        <div>
          <div class="d-flex justify-space-between">
            <div>
              <v-text-field
                v-model="titleField"
                class="pa-1"
                style="min-width: 400px"
                label="Наименование ГРУППЫ категорий"
                type="String"
                hint="Не менее 3-х и не более 15-ти символов"
                :error-messages="titleFieldErrors"
                dense
                outlined
                small
                clearable
                counter="15"
                @blur="$v.titleField.$touch()"
              />
            </div>
            <div>
              <v-btn
                v-if="icon !== 'mdi-camera-off'"
                class="mr-15"
                elevation="2"
                icon
                outlined
                x-large
                color="teal"
                @click="openModal('categiriesGroupsIcons')"
              >
                <v-icon
                  class="my-3"
                  x-large
                >
                  {{ icon }}
                </v-icon>
              </v-btn>
              <v-btn
                v-else
                class="ml-10 mt-1"
                outlined
                color="teal"
                @click="openModal('categiriesGroupsIcons')"
              >
                Выбрать картинку
              </v-btn>
            </div>
          </div>
          <div>
            <v-text-field
              v-model="commentField"
              style="min-width: 600px"
              hint="не более 100 символов"
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
  name: 'TabContentCategoriesGroupsEdit',
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
    }
  },
  data: () => {
    return {
      typeOfGroup: 'assets'
    }
  },
  computed: {
    icon () {
      const icon = this.$store.getters['user/properties/categories/categoryGroupIcon']
      return icon || 'mdi-camera-off'
    },
    resetV () {
      if (this.gResetV) {
        this.$v.$reset()
      }
      return this.gResetV
    },
    titleField: {
      get () {
        return this.$store.getters['utils/secondSearchField']
      },
      set (v) {
        let searchField = ''
        v ? searchField = v : searchField = ''
        this.$store.commit('utils/chgSecondSearchField', searchField)
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
    valTitleField () {
      let unique = true
      const findUnique = this.MXcategoriesGroups()
        .find(item => item.title.toLowerCase() === this.titleField.toLowerCase())
      if (findUnique) { unique = false }
      if (this.getEditItem.title) {
        if (this.getEditItem && this.titleField.toLowerCase() ===
            this.getEditItem.title.toLowerCase()) {
          unique = true
        }
      }
      let length = true
      this.titleField.length > 2 && this.titleField.length < 31
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
      !this.$v.titleField.length && errors.push('Не менее 3-х и не более 15-ти символов')
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
      if (v === 'TabContentCategoriesGroupsEdit') {
        this.toChgByEditItem()
      }
    }
  },
  created () {
    if (this.tabMode === 'TabContentCategoriesGroupsEdit') {
      this.toChgByEditItem()
    }
  },
  methods: {
    openModal (val) {
      this.$store.commit('setModal', val)
    },
    getUser () {
      return this.gUser
    },
    toChgByEditItem () {
      const editItem = this.gEditItem
      if (editItem._id) {
        this.$store.commit('utils/chgSearchField', editItem.title)
        this.$store.commit('utils/chgCommentField', editItem.comment)
        this.$store.commit('user/properties/categories/chgCategoriesGroupIcon', this.gEditItem.icon)
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
          item.categories = []
          item.title = (this.titleField).toUpperCase()
          item.comment = this.commentField
          item.icon = this.icon
          item.visible = true
          this.MXtoCreateCategoriesGroup(item)
          break
        case 'edit':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          item.categoriesGroupId = this.getEditItem._id
          item.userId = this.gUser.id
          item.categories = this.getEditItem.categories
          item.title = (this.titleField).toUpperCase()
          item.comment = this.commentField
          item.icon = this.icon
          item.visible = true
          this.MXtoEditCategoriesGroup(item)
          break
        case 'remove':
          item.categoriesGroupId = this.getEditItem._id
          item.categories = this.getEditItem.categories
          item.userId = this.gUser.id
          this.MXtoRemoveCategoriesGroup(item)
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
