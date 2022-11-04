<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <h1 class="title has-text-left">{{ trivia.name }}</h1>
        <h2 class="subtitle">{{ trivia.description }}</h2>
      </div>
      <div class="column">
        <h1 class="title has-text-right"> Current Score: {{ total }}</h1>
      </div>
    </div>
  </section>
  <section class="section">
    <Question />
  </section>
</template>

<script>
import axios from 'axios'
import Question from '@/components/Question.vue'
export default {
  name: 'Trivia',
  data() {
    return {
      trivia: {},
      questions: {},
      answer: {},
      currQuestion: 0,
      total: 0,
    }
  },
  components: {
    Question
  },
  mounted() {
    this.getTrivia()
  },
  methods: {
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
          this.trivia = response.data
          document.title = this.trivia.name + ' | Trivia'
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      axios
        .get(`api/v1/${trivia_slug}/questions`)
        .then(response => {
          this.questions = response.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    },
  },
}
</script>