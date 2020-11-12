<template>
  <div class="row">
    <div class="col-6">
      <h3>Transition</h3>
      <div class="group w50">
        <h2>Текущие вопросы</h2>
        <draggable
          v-model="questions"
          class="question-draggable-list"
          group="questions"
          @start="drag = true"
          @end="drag = false"
        >
          <div v-for="question in questions" :key="question.index" class="question-draggable">
            <div class="question-name">
              {{ question }}
            </div>
            <nuxt-link :to="`/question/${question._id}`">
              Редактировать
            </nuxt-link>
          </div>
        </draggable>
      </div>
      <div class="group w50">
        <h2>Общий список вопросов</h2>
        <draggable
          v-model="questionsList"
          class="question-draggable-list"
          group="questions"
          @start="drag = true"
          @end="drag = false"
        >
          <div v-for="question in questionsList" :key="question.index" class="question-draggable">
            <div class="question-name">
              {{ question }}
            </div>
            <nuxt-link :to="`/question/${question._id}`">
              Редактировать
            </nuxt-link>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Groups',
  display: 'Transitions',
  order: 7,
  components: {
    draggable
  },
  data () {
    return {
      questions: [],
      questionsList: [111, 222, 333, 444],
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
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }

  .question-draggable-list {
    margin: 16px 0;
    background-color: #eee;
    padding: 8px;}

  .question-draggable {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 12px 16px;
    box-sizing: border-box;
    background-color: #fff;
    cursor: grab;
  }
</style>
