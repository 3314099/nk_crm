<template>
  <div>
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
            <div class="d-flex justify-space-around">
              <div>
                <v-radio-group
                  v-model="radio"
                  row
                  class="mt-2"
                  style="width: 450px; margin-left: 100px"
                >
                  <v-radio
                    class="mx-5"
                    label="Активы"
                    value="radio-1"
                  />
                  <v-radio
                    class="mx-5"
                    label="Пассивы"
                    value="radio-2"
                  />
                </v-radio-group>
              </div>
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
            <div v-if="getEditMode() !== 'edit'">
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
import sectsAndGroups from '@/mixins/user/properties/sectsAndGroups.mixin'
export default {
  name: 'TabContentGroupEdit',
  mixins: [validationMixin, sectsAndGroups],
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
      radio: 'radio-1'
    }
  },
  computed: {
    titleField: {
      get () {
        return this.$store.getters['utils/searchField']
      },
      set (v) {
        let searchField = ''
        v ? searchField = v : searchField = ''
        this.$store.dispatch('utils/chgSearchField', searchField)
      }
    },
    commentField: {
      get () {
        return this.$store.getters['utils/commentField']
      },
      set (v) {
        let commentField = ''
        v ? commentField = v : commentField = ''
        this.$store.dispatch('utils/commentField', commentField)
      }
    },
    colorsIgnore () {
      this.toChgByEditItem()
      return this.MXcolorsIgnoreArray()
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
      return this.$store.getters['mode/editMode']
    },
    getEditItem () {
      return this.$store.getters['mode/editItem']
    },
    toChgByEditItem () {
      if (this.getEditItem()) {
        this.$store.dispatch('utils/chgSearchField', this.getEditItem().title)
        this.$store.dispatch('utils/chgCommentField', this.getEditItem().comment)
        this.$store.dispatch('utils/chgColorPicker', this.getEditItem().color)
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
          item.title = this.titleField
          item.comment = this.commentField
          item.color = this.$store.getters['utils/colorPicker']
          item.visible = true
          this.MXtoCreateSection(item)
          break
        case 'edit':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          this.$store.dispatch('utils/chgLoading', 'true')
          item.id = this.getEditItem().id
          item.title = this.titleField
          item.comment = this.commentField
          item.color = this.$store.getters.colorPicker
          item.visible = true
          this.MXtoEditSection(item)
          break
        case 'remove':
          this.$store.dispatch('utils/chgLoading', 'true')
          this.MXtoRemoveSection(this.getEditItem().id)
          break
        default: // cancel
          break
      }
      this.$v.$reset()
      this.$store.dispatch('utils/colorPicker', '')
      this.$store.dispatch('utils/chgSearchField', '')
      this.$store.dispatch('utils/chgCommentField', '')
      this.$store.dispatch('mode/chgEditMode', '')
      this.$store.dispatch('mode/chgItemMode', 'default')
      this.$store.dispatch('mode/chgEditItem', {})
    }
  }
}
</script>

<style scoped>

</style>
