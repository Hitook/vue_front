<template>
  <div class="page-trivia">
    <div class="columns is-multiline">
      <div class="column is-9">

        <h1 class="title">{{ trivia.name }}</h1>
        <p>{{ trivia.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {toast} from 'bulma-toast'
  export default {
    name: 'Trivia',
    data() {
      return {
        trivia: {},
        quantity: 1
      }
    },
    mounted() {
      this.getTrivia()
    },
    methods: {
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
        this.$store.commit('setIsLoading', false)
      },
    },
  }
</script>