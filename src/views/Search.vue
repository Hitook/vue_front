<template>
  <div class="page-search">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Search</h1>
        <h2 class="is-size-5 has-text-grey">Search term: "{{query}}"</h2>
      </div>
      <TriviaBox 
        v-for="trivia in  trivias"
        v-bind:key="trivia.id"
        v-bind:trivia="trivia"
        />
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import TriviaBox from "@/components/TriviaBox.vue";

  export default {
    name:'Search',
    components: {
    TriviaBox,
    TriviaBox
},
    data() {
      return {
        trivias:[],
        query:''
      }
    },
    mounted() {
      document.title = 'Search | Trivia'

      let uri = window.location.search.substring(1)
      let params = new URLSearchParams(uri)

      if(params.get('query')) {
        this.query = params.get('query')
        this.performSearch()
      }
    },
    methods: {
      async performSearch() {
        
        this.$store.commit('setIsLoading', true)

        await axios
          .post(`api/v1/trivias/search/`, {'query': this.query})
          .then(response => {
            this.trivias = response.data
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>