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
                <span class="has-text-weight-bold">Search</span>
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
          <header class="card-header subtitle is-3 p-2">Explore or Create</header>
          <div class="card-content">
            <p class="subtitle is-5">
              Choose from thousands of pre-made trivia questions or create your own using your own custom questions with
              just a few a few clicks.
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <header class="card-header subtitle is-3 p-2">Play and Compete</header>
          <div class="card-content">
            <p class="subtitle is-5">
              Enjoy a fun and intuitive gameplay experience accessible via any device, complete with leaderboards and
              fun
              gamification.
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card mr-6">
          <header class="card-header subtitle is-3 p-2">Host or Share</header>
          <div class="card-content">
            <p class="subtitle is-5">
              Easily host multiplayer live trivia games by sharing a unique room URL or game code.
            </p>
          </div>
        </div>
      </div>


    </div>
  </section>

  <section class="m-6 p-6">
    <h2 class="title is-2 has-text-centered">Popular Trivia</h2>
    <div class="tile is-ancestor m-6">
      <div class="tile is-parent">
        <TriviaBox v-for="trivia in latestTrivias" v-bind:key="trivia.id" v-bind:trivia="trivia" />
      </div>
    </div>
  </section>

  <section class="m-6 p-6">
    <h2 class="title is-2 has-text-centered">Browse by Category</h2>
    <div class="tile is-ancestor m-6">
      <div class="tile is-parent is-vertical m-6">
        <figure class="image is-16by16">
          <img class="is-rounded" src="../../public/quiz-banners/music-banner-medium.jpg">
        </figure>
        <p class="title is-4 has-text-centered">Music</p>
        <figure class="image is-16by16">
          <img class="is-rounded" src="../../public/quiz-banners/art-banner-medium.jpg">
        </figure>
        <p class="title is-4 has-text-centered">Art</p>
      </div>
      <div class="tile is-vertical m-6">
        <figure class="image is-16by16">
          <img class="is-rounded" src="../../public/quiz-banners/business-tech-banner-medium.jpg">
        </figure>
        <p class="title is-4 has-text-centered">Technology</p>
        <figure class="image is-16by16">
          <img class="is-rounded" src="../../public/quiz-banners/cars-banner-medium.jpg">
        </figure>
        <p class="title is-4 has-text-centered">Cars</p>
      </div>
      <div class="tile is-vertical m-6">
        <figure class="image is-16by16">
          <img class="is-rounded" src="../../public/quiz-banners/general-knowledge-banner-medium.jpg">
        </figure>
        <p class="title is-4 has-text-centered">General Knowledge</p>
        <figure class="image is-16by16">
          <img class="is-rounded" src="../../public/quiz-banners/geography-banner-medium.jpg">
        </figure>
        <p class="title is-4 has-text-centered">Geography</p>
      </div>
      <div class="tile is-vertical m-6">
        <figure class="image is-16by16">
          <img class="is-rounded" src="../../public/quiz-banners/history-banner-medium.jpg">
        </figure>
        <p class="title is-4 has-text-centered">History</p>
        <figure class="image is-16by16">
          <img class="is-rounded" src="../../public/quiz-banners/literature-banner-medium.jpg">
        </figure>
        <p class="title is-4 has-text-centered">Literature</p>
      </div>
    </div>
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

