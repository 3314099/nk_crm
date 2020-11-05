<template>
  <div>
    <draggable
      v-model="list"
      class="list-group"
      v-bind="dragOptions"
      handle=".handle"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group>
        <v-sheet
          v-for="element in list"
          :key="element.order"
          class="ma-1 item"
          rounded
          color="teal"
          transition="scroll-y-transition"
          aria-hidden="true"
          @click="element.fixed = !element.fixed"
        >
          <v-icon class="handle">
            mdi-drag-vertical
          </v-icon>
          {{ element.name }}
          <v-btn
            @click="sss(element.name)"
          >
            AAA
          </v-btn>
        </v-sheet>
      </transition-group>
    </draggable>
    {{ list }}
  </div>
</template>

<script>
import draggable from 'vuedraggable'
const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs'
]
export default {
  name: 'Groups',
  display: 'Transition',
  order: 6,
  components: {
    draggable
  },
  data () {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      drag: false
    };
  },
  computed: {
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
      this.list = this.list.sort((a, b) => a.order - b.order);
    },
    sss (item) {
      alert(item)
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
