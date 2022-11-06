<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <h1 class="title has-text-left">{{ triviaData.name }}</h1>
        <h2 class="subtitle is-6">{{ triviaData.description }}</h2>
      </div>
      <div class="column">
        <h1 class="title has-text-right"> Current Score: {{ total }}</h1>
      </div>
    </div>
  </section>
  <section class="section">
    <Question :question="currentQuestionData.question" :correctAnswer="currentQuestionData.correct_answer"
      :fakeAnswer="currentQuestionData.fake_answer" :key="currentQuestion" />
    <div class="container has-text-centered mt-4">
      <button @click="getNextQuestion" class="button">Next</button>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Question from '@/components/Question.vue'
export default {
  name: 'Trivia',
  data() {
    return {
      triviaData: {},
      currentQuestionData: {},
      answer: {},
      currentQuestion: 0,
      total: 0,
    }
  },
  components: {
    Question
  },
  mounted() {
    this.getTrivia()
    this.getNextQuestion()
  },
  methods: {
    forceRerender() {
      this.currentQuestion += 1
    },
    onSubmit(e) {
      this.total = 0;
      const form = e.target
      const formData = new FormData(form)
      for (const [inputName, value] of formData) {
        this.checkAnswer(inputName, value)
      }
    },
    async checkAnswer(inputName, value) {
      this.$store.commit('setIsLoading', true)
      const question_id = inputName
      const trivia_slug = this.$route.params.trivia_slug

      await axios
        .get(`api/v1/${trivia_slug}/questions`)
        .then(response => {
          this.trivia = response.data
          for (let i = 0; i < this.trivia.length; i++) {
            if (this.trivia[i]['id'] == question_id) {
              if (value === this.trivia[i]['correct_answer']) {
                this.total++
              }
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    },
    async getTrivia() {
      this.$store.commit('setIsLoading', true)

      const category_slug = this.$route.params.category_slug
      const trivia_slug = this.$route.params.trivia_slug

      await axios
        .get(`api/v1/trivias/${category_slug}/${trivia_slug}`)
        .then(response => {
          this.triviaData = response.data
          document.title = this.triviaData.name + ' | Trivia'
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    },
    async getNextQuestion() {
      this.$store.commit('setIsLoading', true)
      const trivia_slug = this.$route.params.trivia_slug

      axios
        .get(`api/v1/${trivia_slug}/questions`)
        .then(response => {
          if (this.currentQuestion >= response.data.length) {
            console.log(this.currentQuestion)
          } else {
            this.currentQuestionData = response.data[this.currentQuestion]
            this.forceRerender()
          }
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    }
  },
}
</script>
--