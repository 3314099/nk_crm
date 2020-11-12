<template>
  <div>
    <draggable
      v-model="sections"
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
              <v-icon class="handle">
                mdi-drag-vertical
              </v-icon>
              <v-btn
                v-if="section.visible"
                class="mr-2"
                icon
                @click="chgFPSectionVisible(section)"
              >
                <v-icon>mdi-eye-outline</v-icon>
              </v-btn>
              <v-btn
                v-if="!section.visible"
                class="mr-2"
                icon
                @click="chgFPSectionVisible(section)"
              >
                <v-icon>mdi-eye-off-outline</v-icon>
              </v-btn>
              <v-chip class="mx-2" small :color="section.color.color">
                {{ }}
              </v-chip>
              <v-tooltip left>
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
                <span>
                  <div v-if="section.comment">{{ section.comment }}</div>
                  <div v-else>Нет комментариев</div>
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
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'Sections',
  display: 'Transition',
  order: 6,
  components: {
    draggable
  },
  data () {
    return {
      drag: false
    };
  },
  computed: {
    sections: {
      get () {
        return this.$store.getters['user/properties/sections/sections']
      },
      set (v) {
        this.$store.dispatch('user/properties/sections/chgSectionsState', v)
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
  methods: {
    sort () {
      this.sections = this.sections.sort((a, b) => a.order - b.order);
    },
    editSection (section) {
      this.$store.dispatch('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'TabContentSectsEdit' })
      this.$store.dispatch('mode/chgEditMode', { mode: 'edit', item: section })
      this.$store.dispatch('utils/chgSearchField', section.title)
      this.$store.dispatch('utils/chgCommentField', section.comment)
      this.$store.dispatch('utils/chgColorPicker', section.color)
    }
  }
}
</script>

<style scoped>
  .button {
    margin-top: 35px;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .list-group {
    min-height: 50px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }
  .item {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 12px 5px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .handle {
    cursor: grab;
  }
</style>
