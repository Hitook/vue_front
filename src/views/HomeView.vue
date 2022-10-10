<template>
  <section>
    <div class="hero is-halfheight has-background-grey-dark">
      <div class="hero-body p-6">
        <div class="container has-text-centered p-6">
          <div class="container mx-6 px-6">
            <h1 class="title is-1 has-text-white">
              Welcome to Trivia
            </h1>
            <h2 class="subtitle is-4 has-text-white">
              Search for trivia
            </h2>
            <div class="field has-addons mx-6 px-6">
              <input type="text" class="input is-rounded"
                placeholder="Search a trivia category or description, for example 'History'" name="query">
              <button class="button is-success is-rounded ml-2">
                <span><b>Search</b></span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <section class="p-6">
    <h2 class="title is-2 has-text-centered">How It Works</h2>

    <div class="columns">
      <div class="column">
        <div class="card ml-6">
          <header class="card-header subtitle is-3">Explore or Create</header>
          <div class="card-content">
            Choose from thousands of pre-made trivia questions or create your own using your own custom questions with
            just a few a few clicks.
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <header class="card-header subtitle is-3">Play and Compete</header>
          <div class="card-content">
            Enjoy a fun and intuitive gameplay experience accessible via any device, complete with leaderboards and
            fun
            gamification.
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card mr-6">
          <header class="card-header subtitle is-3">Host or Share</header>
          <div class="card-content">
            Easily host multiplayer live trivia games by sharing a unique room URL or game code.
          </div>
        </div>
      </div>

      <TriviaBox v-for="trivia in latestTrivias" v-bind:key="trivia.id" v-bind:trivia="trivia" />

    </div>
  </section>

  <section class="p-6">
    <h2 class="title is-2 has-text-centered">Popular Trivia</h2>
  </section>
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

