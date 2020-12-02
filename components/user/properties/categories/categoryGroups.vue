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
      {{ groupId }}
      <drop
        v-for="item in categoriesGroups"
        :key="item.title"
        class="drop even"
        :accepts-data="() => item._id"
        @drop="onEvenDrop"
      >
        <v-card
          transition="scroll-y-transition"
          aria-hidden="true"
          class="my-1"
          outlined
          :class="!item.visible ? 'grey lighten-4' : ''"
        >
          <v-card-actions :class="!item.visible ? 'grey lighten-4 ma-0 py-0' : ''">
            <div class="ma-0 pa-0">
              <v-icon
                :disabled="mode !== 'default'"
                :color="item.icon !== 'mdi-camera-off' ? 'teal' : ''"
              >
                {{ item.icon }}
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
                {{ item.title.toUpperCase() }}
              </span>
            </div>
            <v-spacer />
            <v-btn
              v-if="mode !== 'default'"
              class="mr-2"
              icon
              @click="chgStdCategoriesGroup(item)"
            >
              <v-icon>mdi-folder-plus-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="mode === 'default'"
              class="mr-2"
              icon
              @click="editItem(item)"
            >
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </drop>
    </v-container>
  </div>
</template>

<script>
import { Drop } from 'vue-easy-dnd'
import getters from '@/mixins/getters'
import categories from '@/mixins/user/properties/categories.mixin'
export default {
  name: 'CategoryGroups',
  display: 'Transition',
  order: 6,
  components: { Drop },
  mixins: [getters, categories],
  data () {
    return {
      drag: false,
      dirtySearchField: false,
      groupId: ''
    };
  },
  computed: {
    mode () {
      return this.$store.getters['mode/editMode']
    },
    sortBtn () {
      return this.$store.getters['utils/firstSortBtn']
    },
    visibleBtn () {
      return this.$store.getters['utils/firstVisibleBtn']
    },
    secondSearchField () {
      return this.$store.getters['utils/secondSearchField']
    },
    categoriesGroups: {
      get () {
        const arr = this.$store.getters['user/properties/categories/categoriesGroups']
        let newArr = arr.slice() // создает независимый массив (без ссылок на родителя)
        if (this.visibleBtn === 'visible') {
          newArr = this.UfilterByType(newArr, 'visible', true)
        } else if (this.visibleBtn === 'unvisible') {
          newArr = this.UfilterByType(newArr, 'visible', false)
        }
        newArr = this.UsortRuEnArray(newArr, this.secondSearchField)
        // newArr = this.UsortObjectsArrayByText(newArr, 'title', false)
        return newArr
      },
      set (v) {
        // this.$store.dispatch('user/properties/categories/chgCategoriesGroups', v)
        // this.MXchgOrderCategoriesGroups(v)
      }
    },
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    }
  },
  watch: {
    secondSearchField (v) {
      this.sortBtnBysearchField(v)
    },
  },
  methods: {
    onEvenDrop (event) {
      const item = Object.assign({}, event.data)
      item.groupId = event.success
      this.MXtoEditCategory(item)
    },
    sortBtnBysearchField (v) {
      if (!this.dirtySearchField && v) {
        this.dirtySearchField = Boolean(v)
        this.$store.commit('utils/chgFirstSortBtn', 'search')
      } else if (this.dirtySearchField && !v) {
        this.$store.commit('utils/chgFirstSortBtn', 'drag')
        this.dirtySearchField = false
      }
    },
    sort () {
      this.categoriesGroups = this.categoriesGroups.sort((a, b) => a.order - b.order);
    },
    editItem (item) {
      this.$store.commit('mode/chgTabMode', { tab: 'propertyCategories', content: 'TabContentCategoriesGroupsEdit' })
      this.$store.commit('mode/chgEditMode', { mode: 'edit', item })
    },
    chgItemVisible (item) {
      const newItem = Object.assign({}, item)
      newItem.categoriesGroupId = item._id
      newItem.userId = this.gUser.id
      newItem.visible = !item.visible
      this.MXtoEditCategoriesGroup(newItem)
    },
    chgStdCategoriesGroup (item) {
      this.$store.commit('user/properties/categories/chgStdCategoriesGroup', item)
    }
  }
}
</script>

<style scoped>
  .list-group-item i {
    cursor: pointer;
  }
</style>
