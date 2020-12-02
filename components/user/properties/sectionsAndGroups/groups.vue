<template>
  <div class="ml-2 mr-1 mt-1 mb-2">
    <div v-if="!groups.length" class="text-center">
      <h1 class="font-weight-bold display-1 green--text ">
        Список пуст
      </h1>
    </div>
    <v-container
      id="scroll-target"
      style="max-height: 60vh"
      class="pa-0 pr-2 overflow-y-auto"
    >
      <draggable
        v-model="groups"
        :group="groups"
        class="list-group"
        v-bind="dragOptions"
        handle=".handle"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group>
          <v-card
            v-for="group in groups"
            :key="group.title"
            transition="scroll-y-transition"
            aria-hidden="true"
            class="my-1"
            outlined
            :class="!group.visible ? 'grey lighten-4' : ''"
          >
            <v-card-actions :class="!group.visible ? 'grey lighten-4 ma-0 py-0' : ''">
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
                  v-if="group.visible"
                  :disabled="mode !== 'default'"
                  class="mr-2"
                  icon
                  @click="chgGroupVisible(group)"
                >
                  <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  :disabled="mode !== 'default'"
                  class="mr-2"
                  icon
                  @click="chgGroupVisible(group)"
                >
                  <v-icon>mdi-eye-off-outline</v-icon>
                </v-btn>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="pl-2"
                      v-bind="attrs"
                      :small="!group.visible"
                      :class="!group.visible ? 'pl-5' : 'pl-2'"
                      v-on="on"
                    >
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span v-if="group.comment">
                    {{ group.comment }}
                  </span>
                  <span v-else>
                    Нет комментариев
                  </span>
                </v-tooltip>
                <span
                  :class="!group.visible ? 'font-weight-thin pl-2' : 'font-weight-black pl-2'"
                >
                  {{ group.title.toUpperCase() }}
                </span>
              </div>
              <v-spacer />
              <v-radio-group
                :value="group.typeOfGroup"
                class="pa-0 ma-auto"
                hide-details
                row
                :disabled="mode !== 'default'"
              >
                <v-radio
                  class="mx-5"
                  label="Актив"
                  value="assets"
                  @change="chgRadio(group, 'assets')"
                />
                <v-radio
                  class="mx-5"
                  label="Пассив"
                  value="liabilities"
                  @change="chgRadio(group, 'liabilities')"
                />
              </v-radio-group>
              <v-btn
                class="mr-2"
                icon
                @click="editGroup(group)"
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
  name: 'Groups',
  display: 'Transition',
  order: 6,
  components: {
    draggable
  },
  mixins: [getters, sectsAndGroups],
  data () {
    return {
      drag: false,
      dirtySearchField: false,
      typeOfGroup: 'assets'
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
    groups: {
      get () {
        const arr = this.$store.getters['user/properties/groups/groups']
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
        this.$store.dispatch('user/properties/groups/chgGroups', v)
        this.MXchgOrderGroups(v)
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
        this.$store.commit('utils/chgSecondSortBtn', 'search')
      } else if (this.dirtySearchField && !v) {
        this.$store.commit('utils/chgSecondSortBtn', 'drag')
        this.dirtySearchField = false
      }
    },
    sort () {
      this.groups = this.groups.sort((a, b) => a.order - b.order);
    },
    editGroup (group) {
      this.$store.dispatch('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'TabContentGroupsEdit' })
      this.$store.dispatch('mode/chgEditMode', { mode: 'edit', item: group })
      this.$store.dispatch('utils/chgSearchField', group.title)
      this.$store.dispatch('utils/chgCommentField', group.comment)
    },
    chgGroupVisible (item) {
      const newItem = Object.assign({}, item)
      newItem.groupId = item._id
      newItem.userId = this.gUser.id
      newItem.visible = !item.visible
      this.MXtoEditGroup(newItem)
    },
    chgRadio (item, val) {
      const newItem = Object.assign({}, item)
      newItem.groupId = item._id
      newItem.userId = this.gUser.id
      newItem.typeOfGroup = val
      this.MXtoEditGroup(newItem)
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
