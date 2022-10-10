<template>
  <div class="page-trivia">
    <div class="columns is-multiline">
      <div class="column is-9">
        <h1 class="title">{{ trivia.name }}</h1>
        <p>{{ trivia.description}}</p>
  
        <form @submit.prevent="onSubmit">
          <Questions 
            v-for="question in questions"
            v-bind:key="question.id"
            v-bind:question="question"
          />
          <button class="button is-primary" type="submit">Submit</button>
        </form>
        <div> {{total}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {toast} from 'bulma-toast'
  import Questions from '@/components/Questions.vue'
  export default {
    name: 'Trivia',
    data() {
      return {
        trivia: {},
        questions: {},
        answer:{},
        total: 0,
      }
    },
    components: {
      Questions
    },
    mounted() {
      this.getTrivia()
    },
    methods: {
      onSubmit(e){
        this.total = 0;
        const form = e.target
        const formData = new FormData(form)
        for (const [inputName, value] of formData) {
          console.log({ inputName, value })
          this.checkAnswer(inputName, value)
          console.log('Hit')
        }
      },
      async checkAnswer(inputName, value) {
        this.$store.commit('setIsLoading', true)
        const question_id = inputName
        const category_slug = this.$route.params.category_slug
        const trivia_slug  = this.$route.params.trivia_slug

        await axios
        .get(`api/v1/${trivia_slug}/questions`)
        .then(response => {
          this.trivia = response.data
          console.log(this.trivia)
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
        const trivia_slug  = this.$route.params.trivia_slug

        await axios
          .get(`api/v1/trivias/${category_slug}/${trivia_slug}`)
          .then(response => {
            this.trivia = response.data
            document.title = this.trivia.name + ' | Trivia'
          })
          .catch(error => {
            console.log(error)
          })
        axios 
          .get(`api/v1/${trivia_slug}/questions`)
          .then(response => {
            this.questions = response.data
          })
          .catch(error => {
            console.log(error)
          })
        this.$store.commit('setIsLoading', false)
      },
    },
  }
</script>