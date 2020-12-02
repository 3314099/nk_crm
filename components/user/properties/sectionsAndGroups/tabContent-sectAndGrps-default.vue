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
        <div class="d-flex justify-center font-weight-bold teal--text ma-3">
          <h1>РАЗДЕЛЫ</h1>
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
                  @click="chgTabContentMode('TabContentSectsEdit')"
                >
                  Создать раздел
                </v-btn>
              </div>
              <div>
                <v-btn
                  outlined
                  color="green"
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
        <div class="d-flex justify-center font-weight-bold green--text ma-3">
          <h1>ГРУППЫ</h1>
        </div>
        <div
          class="d-flex justify-center"
        >
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
        this.$store.commit('utils/chgSearchField', searchField)
      }
    },
  },
  methods: {
    chgTabContentMode (mode) {
      this.$store.commit('mode/chgTabMode', { tab: 'propertySectAndGrps', content: mode })
      this.$store.commit('mode/chgEditMode', { mode: 'create', item: {} })
    }
  }
}
</script>

<style scoped>

</style>
