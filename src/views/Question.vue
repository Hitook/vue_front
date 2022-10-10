<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered"> {{ category.name }}</h2>
      </div>
      <Questions 
        v-for="trivia in trvia.questions"
        v-bind:key="trivia.id"
        v-bind:trivia="trivia" 
      />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { toast } from 'bulma-toast'
  import Questions from '@/components/Questions.vue'

export default {
  name: 'Questions',
  components: {
    Questions
},
  data() {
    return {
      trivia: {
      questions: []
      }
    }
  },
  mounted() {
    this.getQuestion()
  },
  watch: {
    $route(to, from) {
      console.log(to.name)
      if (to.name === 'Category') {
        this.getQuestion()
      }
    }
  },
  methods: {
    async getQuestion() {
      const categorySlug = this.$route.params.category_slug
      const triviaSlug = this.$route.params.trivia_slug
      this.$store.commit('setIsLoading', true)
      axios
      .get(`/api/v1/${categorySlug}/${triviaSlug}/`)
      .then(response => {
        this.category = response.data
        console.log(response.data)
       // document.title = this.category.name + ' | Djackets'
      })
      .catch(error => {
        console.log(error)
        toast({
          message: 'Something went wrong. Please try again.',
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: 'bottom-right',
        })
      })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>