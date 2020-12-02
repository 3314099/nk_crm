<template>
  <div>
    <v-row
      class="mx-4"
    >
      <v-col
        cols="12"
        sm="4"
        class="ma-0 pa-0"
      >
        <div class="d-flex justify-center font-weight-bold teal--text">
          <h1>ГРУППЫ категорий</h1>
        </div>
        <div class="d-flex justify-center ma-2">
          <contentVisibleBtn num-of-btn="first" />
          <v-text-field
            v-model="secondSearchField"
            style="max-width: 300px"
            class="py-1 px-0 ma-0"
            label="Строка поиска"
            type="String"
            dense
            outlined
            small
            clearable
            hide-details
          />
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="4"
        class="ma-0 pa-0"
      >
        <v-card
          flat
        >
          <div>
            <div class="d-flex justify-center">
              <v-text-field
                v-model="searchField"
                class="py-1 px-0 ma-0"
                label="Строка поиска"
                type="String"
                dense
                outlined
                small
                clearable
                hide-details
              />
            </div>
            <div class="d-flex justify-space-between my-1">
              <div>
                <v-btn
                  outlined
                  color="teal"
                  @click="chgTabContentMode('TabContentCategoriesGroupsEdit')"
                >
                  Создать ГРУППУ категорий
                </v-btn>
              </div>
              <div>
                <v-btn
                  outlined
                  color="green"
                  @click="chgTabContentMode('TabContentCategoriesEdit')"
                >
                  Создать категорию
                </v-btn>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="4"
        class="ma-0 pa-0"
      >
        <div class="d-flex justify-center font-weight-bold green--text">
          <h1>Категории</h1>
        </div>
        <div
          class="d-flex justify-center ma-2"
        >
          <contentVisibleBtn num-of-btn="second" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'TabContentCategoriesDefault',
  components: {
    contentVisibleBtn: () => import('@/components/utils/contentVisibleBtn'),
  },
  computed: {
    searchField: {
      get () {
        return this.$store.getters['utils/searchField']
      },
      set (v) {
        let searchField = ''
        v ? searchField = v : searchField = ''
        this.$store.commit('utils/chgSearchField', searchField)
      }
    },
    secondSearchField: {
      get () {
        return this.$store.getters['utils/secondSearchField']
      },
      set (v) {
        let searchField = ''
        v ? searchField = v : searchField = ''
        this.$store.commit('utils/chgSecondSearchField', searchField)
      }
    },
  },
  methods: {
    chgTabContentMode (mode) {
      this.$store.commit('mode/chgTabMode', { tab: 'propertyCategories', content: mode })
      this.$store.commit('mode/chgEditMode', { mode: 'create', item: {} })
    }
  }
}
</script>

<style scoped>

</style>
