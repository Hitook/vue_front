<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <h1 class="title has-text-left">{{ triviaName }}</h1>
        <h2 class="subtitle is-6">{{ triviaDescription }}</h2>
      </div>
      <div class="column">
        <h1 class="title has-text-right"> Highest Score: {{ userScore }}</h1>
        <h1 class="title has-text-right"> Current Score: {{ score }}</h1>
      </div>
    </div>
  </section>
  <section class="section" v-if="!triviaComplete">
    <div class="container">
      <h1 class="title is-3 has-text-centered mb-6">{{ currentQuestion.question }}</h1>
      <div class="box has-background-dark mx-6">
        <button v-for="answer in answers" @click="onSubmit" :disabled="isDisabled"
          class="button subtitle is-fullwidth mx-1" id="answer-button" ref="answerButton">
          <span class="is-size-4">{{ answer }}</span>
        </button>
      </div>
    </div>
  </section>
  <section class="section" v-else>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 v-if="newHighScore" class="title has-text-centered is-1 m-6">Congrats, you beat your high score!</h1>
        <h1 class="title has-text-centered is-1 m-6">Your final score is: {{ score }}</h1>
        <h2 class="subtitle has-text-centered is-3 mt-6">Click to play again!</h2>
      </div>
      <div class="column has-text-centered is-12">
        <button @click="restartTrivia" class="button subtitle is-primary has-text-dark is-4">Play Again</button>
      </div>
    </div>
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
      userScore: 0,
      isDisabled: false,
      newHighScore: false,
    }
  },
  mounted() {
    if (localStorage.getItem("user_id") != null) {
      this.getUserHighScore()
    }
    this.getNewQuestion()
  },
  methods: {
    restartTrivia() {
      window.location.reload();
    },
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
      const selection = e.target
      this.isDisabled = true

      let classToApply = 'incorrect'
      if (selection.textContent == this.correctAnswer) {
        this.score += 1
        classToApply = 'correct'
      }

      selection.classList.add(classToApply)
      setTimeout(() => {
        if (this.questionIndx + 1 == this.totalQuestions) {
          this.triviaComplete = true
          if (this.score > this.userScore && localStorage.getItem("user_id") != null) {
            this.updateUserHighScore()
            this.newHighScore = true
          }
        } else {
          this.questionIndx += 1
          this.getNewQuestion()
          this.isDisabled = false
        }
        selection.classList.remove(classToApply)
      }, 1000
      )


    },
    async getNewQuestion() {
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
    async getUserHighScore() {
      const trivia_slug = this.$route.params.trivia_slug
      const user_id = localStorage.getItem("user_id")
      axios
        .get(`api/v1/score/${trivia_slug}/${user_id}/`)
        .then(response => {
          response = response.data
          console.log(response[0].score)
          if (response[0].score) {
            this.userScore = response[0].score
          }
        })
    },
    async updateUserHighScore() {
      const trivia_slug = this.$route.params.trivia_slug
      const user_id = localStorage.getItem("user_id")
      axios
        .post(`api/v1/trivia/${trivia_slug}/${user_id}/${this.score}/`)
    }
  }
}

</script>
 
<style scoped>
.correct {
  background-color: hsl(171, 100%, 41%) !important;
}

.correct>span {
  color: hsl(0, 0%, 21%) !important;
}

.incorrect {
  background-color: hsl(348, 100%, 61%) !important;
}

.incorrect>span {
  color: hsl(0, 0%, 21%) !important;
}

button>* {
  pointer-events: none;
}

#answer-button {
  background-color: hsl(0, 0%, 21%);
}

#answer-button>span {
  color: hsl(0, 0%, 96%);
}

#answer-button:disabled {
  opacity: 100;
}

#answer-button:hover {
  background-color: hsl(0, 0%, 96%);
}

#answer-button:hover>span {
  color: hsl(0, 0%, 21%);
}
</style>