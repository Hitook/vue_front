<template>
  <Trivia
    :triviaName="trivia.name"
    :triviaDescription="trivia.description"
    :triviaId="trivia.id" 
    />
</template>

<script>
import axios from 'axios'
import Trivia from '@/components/Trivia.vue'
export default {
  name: 'TriviaView',
  data() {
    return {
      trivia: {},
    }
  },
  components: {
    Trivia
  },
  mounted() {
    this.getTrivia()
  },
  methods: {
    async getTrivia() {
      this.$store.commit('setIsLoading', true)

      const category_slug = this.$route.params.category_slug
      const trivia_slug = this.$route.params.trivia_slug

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
--