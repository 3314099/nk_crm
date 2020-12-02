<template>
  <div class="ml-2 mr-1 mt-1 mb-2">
    <div v-if="!categoriesGroups.length" class="text-center">
      <h1 class="font-weight-bold display-1 teal--text">
        Список пуст
      </h1>
    </div>
    <v-container
      id="scroll-target"
      style="max-height: 60vh"
      class="pa-0 pr-2 overflow-y-auto"
    >
      <div
        v-for="catGroupe in categoriesGroups"
        :key="catGroupe.title"
      >
        <v-card
          class="pa-1 ma-1"
          color="teal white--text"
        >
          <v-icon
            class="mx-2"
            color="white"
          >
            {{ catGroupe.icon }}
          </v-icon>
          {{ catGroupe.title.toUpperCase() }}
          <transition-group>
            <drag
              v-for="item in categories"
              :key="item.title"
              draggable="false"
              class="drag"
              :data="item"
            >
              <v-card
                v-if="item.groupId === catGroupe._id"
                transition="scroll-y-transition"
                aria-hidden="true"
                class="my-1"
                outlined
                :class="!item.visible ? 'grey lighten-4' : ''"
              >
                <v-card-actions :class="!item.visible ? 'grey lighten-4 ma-0 ml-5 py-0' : 'py-0'">
                  <div class="ma-0 pa-0">
                    <v-icon
                      :disabled="mode === 'default'"
                      class="handle"
                      large
                    >
                      mdi-arrow-left-bold
                    </v-icon>
                    <v-icon
                      :color="item.visible ? 'teal' : ''"
                    >
                      {{ catGroupe.icon }}
                    </v-icon>
                    <v-btn
                      v-if="item.visible"
                      :disabled="mode !== 'default'"
                      class="mr-2"
                      icon
                      @click="chgItemVisible(item)"
                    >
                      <v-icon>mdi-eye-outline</v-icon>
                    </v-btn>
                    <v-btn
                      v-else
                      :disabled="mode !== 'default'"
                      class="mr-2"
                      icon
                      @click="chgItemVisible(item)"
                    >
                      <v-icon>mdi-eye-off-outline</v-icon>
                    </v-btn>
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          class="pl-2"
                          v-bind="attrs"
                          :small="!item.visible"
                          :class="!item.visible ? 'pl-5' : 'pl-2'"
                          v-on="on"
                        >
                          mdi-information-outline
                        </v-icon>
                      </template>
                      <span v-if="item.comment">
                        {{ item.comment }}
                      </span>
                      <span v-else>
                        Нет комментариев
                      </span>
                    </v-tooltip>
                    <span
                      :class="!item.visible ? 'font-weight-thin pl-2' : 'font-weight-black pl-2'"
                    >
                      {{ item.title }}
                    </span>
                  </div>
                  <v-spacer />
                  <div>
                    <v-switch
                      :dense="!item.visible"
                      :input-value="item.expenses"
                      class="pa-0 my-0 mr-2"
                      label="Расходы"
                      color="success"
                      hide-details
                      @change="toChangeSwitch(item, 'expenses')"
                    />
                  </div>
                  <div>
                    <v-switch
                      :dense="!item.visible"
                      :input-value="item.entrances"
                      class="pa-0 my-0 mr-2"
                      label="Поступления"
                      color="primary"
                      hide-details
                      @change="toChangeSwitch(item, 'entrances')"
                    />
                  </div>
                  <v-btn
                    class="mr-2"
                    icon
                    @click="editItem(item)"
                  >
                    <v-icon>mdi-lead-pencil</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
              <template v-slot:drag-image>
                <v-chip
                  class="ma-2"
                  color="teal"
                >
                  {{ item.title.toUpperCase() }}
                </v-chip>
              </template>
            </drag>
          </transition-group>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import { Drag } from 'vue-easy-dnd'
import getters from '@/mixins/getters'
import categories from '@/mixins/user/properties/categories.mixin'
export default {
  name: 'Categories',
  display: 'Transition',
  order: 6,
  components: { Drag },
  mixins: [getters, categories],
  data () {
    return {
      drag: false,
      dirtySearchField: false
    };
  },
  computed: {
    mode () {
      return this.$store.getters['mode/editMode']
    },
    sortBtn () {
      return this.$store.getters['utils/secondSortBtn']
    },
    visibleBtn () {
      return this.$store.getters['utils/secondVisibleBtn']
    },
    searchField () {
      return this.$store.getters['utils/searchField']
    },
    categoriesGroups () {
      return this.$store.getters['user/properties/categories/categoriesGroups']
    },
    categories () {
      const arr = this.$store.getters['user/properties/categories/categories']
      let newArr = arr.slice() // создает независимый массив (без ссылок на родителя)
      if (this.visibleBtn === 'visible') {
        newArr = this.UfilterByType(newArr, 'visible', true)
      } else if (this.visibleBtn === 'unvisible') {
        newArr = this.UfilterByType(newArr, 'visible', false)
      }
      return this.UsortRuEnArray(newArr, this.searchField)
    },
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
  },
  watch: {
    searchField (v) {
      this.sortBtnBysearchField(v)
    },
  },
  methods: {
    sortBtnBysearchField (v) {
      if (!this.dirtySearchField && v) {
        this.dirtySearchField = Boolean(v)
        this.$store.commit('utils/chgSecondSortBtn', 'search')
      } else if (this.dirtySearchField && !v) {
        this.$store.commit('utils/chgSecondSortBtn', 'drag')
        this.dirtySearchField = false
      }
    },
    sort () {
      this.categories = this.categories.sort((a, b) => a.order - b.order);
    },
    editItem (item) {
      this.$store.commit('mode/chgTabMode', { tab: 'propertyCategories', content: 'TabContentCategoriesEdit' })
      this.$store.commit('mode/chgEditMode', { mode: 'edit', item })
      this.$store.commit('utils/chgSearchField', item.title)
      this.$store.commit('utils/chgCommentField', item.comment)
    },
    chgItemVisible (item) {
      const newItem = Object.assign({}, item)
      newItem.visible = !item.visible
      this.MXtoEditCategory(newItem)
    },
    toChangeSwitch (item, type) {
      const newItem = Object.assign({}, item)
      if (type === 'expenses') {
        newItem.expenses = !item.expenses
        if (!newItem.expenses) { newItem.entrances = true }
      } else {
        newItem.entrances = !item.entrances
        if (!newItem.entrances) { newItem.expenses = true }
      }
      this.MXtoEditCategory(newItem)
    }
  }
}
</script>

<style scoped>
  .list-group-item i {
    cursor: pointer;
  }
  .handle {
    cursor: grab;
  }
</style>
