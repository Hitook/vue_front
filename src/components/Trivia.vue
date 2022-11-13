<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <h1 class="title has-text-left">{{ triviaName }}</h1>
        <h2 class="subtitle is-6">{{ triviaDescription }}</h2>
      </div>
      <div class="column">
        <h1 class="title has-text-right"> Current Score: {{ score }}</h1>
      </div>
    </div>
  </section>
  <section class="section" v-if="!triviaComplete">
    <div class="container">
      <h1 class="title is-3 has-text-centered mb-6">{{ currentQuestion.question }}</h1>
      <div class="box mx-6">
        <button v-for="answer in answers" @click="onSubmit" class="button subtitle is-fullwidth mx-1">
          <a class="is-size-4 has-text-dark">{{ answer }}</a>
        </button>
      </div>
    </div>
  </section>
  <section class="section" v-else>
    <h1 class="title has-text-centered is-1 m-6">You completed the trivia!</h1>
    <h2 class="subtitle has-text-centered is-2 m-6">Your final score is: {{ score }}</h2>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Question',
  props: {
    triviaName: '',
    triviaDescription: '',
    triviaId: '',
  },
  data() {
    return {
      currentQuestion: {},
      totalQuestions: 0,
      questionIndx: 0,
      answers: [],
      correctAnswer: '',
      score: 0,
      triviaComplete: false,
    }
  },
  mounted() {
    this.getQuestion()
  },
  methods: {
    // Create and shuffle answers array
    shuffleAnswers() {
      for (let i = this.answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = this.answers[i];
        this.answers[i] = this.answers[j];
        this.answers[j] = temp;
      }
    },
    // Call on each question answer submission
    onSubmit(e) {
      const selection = e.target.textContent
      if (selection == this.correctAnswer) {
        this.score += 1
      }

      if (this.questionIndx + 1 == this.totalQuestions) {
        this.triviaComplete = true
      } else {
        this.questionIndx += 1
        this.getQuestion()
      }

    },
    async getQuestion() {
      this.$store.commit('setIsLoading', true)
      const trivia_slug = this.$route.params.trivia_slug

      axios
        .get(`api/v1/${trivia_slug}/questions`)
        .then(response => {
          if (this.questionIndx >= response.data.length) {
            console.log(this.questionIndx)
          } else {
            this.currentQuestion = response.data[this.questionIndx]
            this.correctAnswer = response.data[this.questionIndx].correct_answer
            this.answers = [response.data[this.questionIndx].correct_answer, response.data[this.questionIndx].fake_answer]
            this.totalQuestions = response.data.length
            this.shuffleAnswers()
          }
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    },
  }
}

</script>
 
<style scoped>

</style>