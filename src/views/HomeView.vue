<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to Trivia
        </p>
        <p class="subtitle">
          Random Trivias
        </p>
      </div>
    </section>
    
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest Trivias</h2>
      </div>

      <TriviaBox 
        v-for="trivia in latestTrivias"
        v-bind:key="trivia.id"
        v-bind:trivia="trivia"
        />
    
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

import TriviaBox from '@/components/TriviaBox'
export default {
  name: 'HomeView',
  data() {
    return {
      latestTrivias: []
    }
  },
  components: {
    TriviaBox
  },
  mounted() {
    this.getLatestTrivias()
    document.title = 'Home | Trivia'
  },
  methods: {
    getLatestTrivias() {
      axios
        .get('/api/v1/latest-trivias/')
        .then(response => {
          this.latestTrivias = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

