<template>
  <div class="ml-2 mr-1 mt-1 mb-2">
    <div v-if="!sections.length" class="text-center">
      <h1 class="font-weight-bold display-1 teal--text">
        Список пуст
      </h1>
    </div>
    <v-container
      id="scroll-target"
      style="max-height: 60vh"
      class="pa-0 pr-2 overflow-y-auto"
    >
      <draggable
        v-model="sections"
        :group="sections"
        class="list-group"
        v-bind="dragOptions"
        handle=".handle"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group>
          <v-card
            v-for="section in sections"
            :key="section.title"
            transition="scroll-y-transition"
            aria-hidden="true"
            class="my-1"
            outlined
            :class="!section.visible ? 'grey lighten-4' : ''"
          >
            <v-card-actions :class="!section.visible ? 'grey lighten-4 ma-0 py-0' : ''">
              <div class="ma-0 pa-0">
                <v-icon
                  v-if="sortBtn === 'drag' && visibleBtn === 'all' && mode === 'default'"
                  class="handle"
                >
                  mdi-drag-vertical
                </v-icon>
                <v-icon
                  v-else
                  disabled
                >
                  mdi-drag-vertical-variant
                </v-icon>
                <v-btn
                  v-if="section.visible"
                  :disabled="mode !== 'default'"
                  class="mr-2"
                  icon
                  @click="chgSectionVisible(section)"
                >
                  <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  :disabled="mode !== 'default'"
                  class="mr-2"
                  icon
                  @click="chgSectionVisible(section)"
                >
                  <v-icon>mdi-eye-off-outline</v-icon>
                </v-btn>
                <v-chip class="mx-2" small :color="section.color.color">
                  {{ }}
                </v-chip>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="pl-2"
                      v-bind="attrs"
                      :small="!section.visible"
                      :class="!section.visible ? 'pl-5' : 'pl-2'"
                      v-on="on"
                    >
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span v-if="section.comment">
                    {{ section.comment }}
                  </span>
                  <span v-else>
                    Нет комментариев
                  </span>
                </v-tooltip>
                <span
                  :class="!section.visible ? 'font-weight-thin pl-2' : 'font-weight-black pl-2'"
                >
                  {{ section.title.toUpperCase() }}
                </span>
              </div>
              <v-spacer />
              <v-btn
                class="mr-2"
                icon
                @click="editSection(section)"
              >
                <v-icon>mdi-lead-pencil</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </transition-group>
      </draggable>
    </v-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import getters from '@/mixins/getters'
import sectsAndGroups from '@/mixins/user/properties/sectsAndGroups.mixin'
export default {
  name: 'Sections',
  display: 'Transition',
  order: 6,
  components: {
    draggable
  },
  mixins: [getters, sectsAndGroups],
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
      return this.$store.getters['utils/firstSortBtn']
    },
    visibleBtn () {
      return this.$store.getters['utils/firstVisibleBtn']
    },
    searchField () {
      return this.$store.getters['utils/searchField']
    },
    sections: {
      get () {
        const arr = this.$store.getters['user/properties/sections/sections']
        let newArr = arr.slice() // создает независимый массив (без ссылок на родителя)
        if (this.visibleBtn === 'visible') {
          newArr = this.UfilterByType(newArr, 'visible', true)
        } else if (this.visibleBtn === 'unvisible') {
          newArr = this.UfilterByType(newArr, 'visible', false)
        }
        if (this.sortBtn === 'search') {
          newArr = this.UsortRuEnArray(newArr, this.searchField)
        } else if (this.sortBtn === 'alphabet') {
          newArr = this.UsortObjectsArrayByText(newArr, 'title', false)
        }
        return newArr
      },
      set (v) {
        this.$store.dispatch('user/properties/sections/chgSections', v)
        this.MXchgOrderSections(v)
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
    searchField (v) {
      this.sortBtnBysearchField(v)
    },
  },
  methods: {
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
      this.sections = this.sections.sort((a, b) => a.order - b.order);
    },
    editSection (section) {
      this.$store.dispatch('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'TabContentSectsEdit' })
      this.$store.dispatch('mode/chgEditMode', { mode: 'edit', item: section })
      this.$store.dispatch('utils/chgSearchField', section.title)
      this.$store.dispatch('utils/chgCommentField', section.comment)
      this.$store.dispatch('utils/chgColorPicker', section.color)
    },
    chgSectionVisible (item) {
      const newItem = Object.assign({}, item)
      newItem.sectionId = item._id
      newItem.userId = this.gUser.id
      newItem.visible = !item.visible
      this.MXtoEditSection(newItem)
    }
  }
}
</script>

<style scoped>
  .list-group {
    min-height: 50px;
  }
  .list-group-item i {
    cursor: pointer;
  }
  .handle {
    cursor: grab;
  }
</style>
