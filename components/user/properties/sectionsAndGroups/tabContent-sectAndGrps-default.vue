<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="4"
        class="ma-0 pa-0"
      >
        <div class="d-flex justify-center">
          <h1>Разделы</h1>
        </div>
        <div class="d-flex justify-center">
          <contentVisibleBtn num-of-btn="first" />
          <contentSortBtn num-of-btn="first" />
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
                class="pa-1 ma-0"
                style="max-width: 373px"
                label="Строка поиска"
                type="String"
                dense
                outlined
                small
                clearable
                hide-details
              />
            </div>
            <div class="d-flex justify-center">
              <div
                class="pa-1"
              >
                <v-btn
                  class="mx-1"
                  outlined
                  color="primary"
                  @click="chgTabContentMode('TabContentSectsEdit')"
                >
                  Создать раздел
                </v-btn>
              </div>
              <div
                class="pa-1"
              >
                <v-btn
                  class="mx-1"
                  outlined
                  color="primary"
                  @click="chgTabContentMode('TabContentGroupsEdit')"
                >
                  Создать группу
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
        <div class="d-flex justify-center">
          <h1>Группы</h1>
        </div>
        <div class="d-flex justify-center">
          <contentVisibleBtn num-of-btn="second" />
          <contentSortBtn num-of-btn="second" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'TabContentSectAndGrpsDefault',
  components: {
    contentVisibleBtn: () => import('@/components/utils/contentVisibleBtn'),
    contentSortBtn: () => import('@/components/utils/contentSortBtn')
  },
  computed: {
    searchField: {
      get () {
        return this.$store.getters['utils/searchField']
      },
      set (v) {
        let searchField = ''
        v ? searchField = v : searchField = ''
        this.$store.dispatch('utils/chgSearchField', searchField)
      }
    },
  },
  methods: {
    chgTabContentMode (mode) {
      this.$store.dispatch('mode/chgTabMode', { tab: 'propertySectAndGrps', content: mode })
      this.$store.dispatch('mode/chgEditMode', { mode: 'create', item: {} })
    }
  }
}
</script>

<style scoped>

</style>
