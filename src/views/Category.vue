<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered"> {{ category.name }}</h2>
      </div>
      <TriviaBox v-for="trivia in category.trivias" v-bind:key="trivia.id" v-bind:trivia="trivia" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import TriviaBox from '@/components/TriviaBox'

export default {
  name: 'Category',
  components: {
    TriviaBox
  },
  data() {
    return {
      category: {
        trivias: []
      }
    }
  },
  mounted() {
    this.getCategory()
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Category') {
        this.getCategory()
      }
    }
  },
  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.category_slug
      this.$store.commit('setIsLoading', true)
      axios
        .get(`/api/v1/trivias/${categorySlug}/`)
        .then(response => {
          this.category = response.data
          document.title = this.category.name + ' | Djackets'
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