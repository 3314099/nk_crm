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
                label="Наименование раздела"
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
              <colorPicker />
            </div>
          </div>
          <div>
            <v-text-field
              v-model="commentField"
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
            <div v-if="getEditMode() === 'edit'">
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
import sectsAndGroups from '@/mixins/user/properties/sectsAndGroups.mixin'
export default {
  name: 'TabContentSectEdit',
  components: {
    colorPicker: () => import('@/components/user/properties/sectionsAndGroups/color-picker')
  },
  mixins: [validationMixin, getters, sectsAndGroups],
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
    valTitleField () {
      let unique = true
      const findUnique = this.MXsections()
        .find(item => item.title.toLowerCase() === this.titleField.toLowerCase())
      if (findUnique) { unique = false }
      if (this.getEditItem().title) {
        if (this.getEditItem() && this.titleField.toLowerCase() ===
          this.getEditItem().title.toLowerCase()) {
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
    }
  },
  methods: {
    getEditMode () {
      return this.gEditMode
    },
    getEditItem () {
      return this.gEditItem
    },
    getUser () {
      return this.gUser
    },
    toChgByEditItem () {
      if (this.getEditItem()) {
        this.$store.commit('utils/chgSearchField', this.getEditItem().title)
        this.$store.commit('utils/chgCommentField', this.getEditItem().comment)
        this.$store.commit('utils/chgColorPicker', this.getEditItem().color)
      }
    },
    button (mode) {
      if (mode === 'save') { mode = this.getEditMode() }
      const item = {}
      switch (mode) {
        case 'create':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          this.$store.dispatch('utils/chgLoading', 'true')
          item.userId = this.gUser.id
          item.title = this.titleField
          item.comment = this.commentField
          item.color = this.gColorPicker
          item.visible = true
          this.MXtoCreateSection(item)
          break
        case 'edit':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          item.sectionId = this.getEditItem()._id
          item.userId = this.gUser.id
          item.title = this.titleField
          item.comment = this.commentField
          item.color = this.gColorPicker
          item.visible = true
          this.MXtoEditSection(item)
          break
        case 'remove':
          item.sectionId = this.getEditItem()._id
          item.userId = this.gUser.id
          this.$store.commit('utils/chgLoading', 'true')
          this.MXtoRemoveSection(item)
          break
        default: // cancel
          this.$store.commit('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'default' })
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
