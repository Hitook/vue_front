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
            <form method="get" action="/search">
              <div class="field has-addons mx-6 px-6">
                <input type="text" class="input is-rounded"
                  placeholder="Search a trivia category or description, for example 'History'" name="query">
                <button class="button is-success is-rounded ml-2">
                  <span class="has-text-weight-bold">Search</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </section>

  <section class="m-6 p-6">
    <h2 class="title is-2 has-text-centered mb-6">How It Works</h2>

    <div class="columns">
      <div class="column">
        <div class="card ml-6">
          <header class="card-header subtitle is-4 p-2">Create an Account</header>
          <div class="card-content">
            <p class="subtitle is-5">
              Create an account to save your favorite categories and trivias or to create your own
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <header class="card-header subtitle is-4 p-2">Explore or Create</header>
          <div class="card-content">
            <p class="subtitle is-5">
              Choose from dozens of pre-made trivia questions or create a new trivia or edit an existing one
            </p>
          </div>
        </div>
      </div>
      <div class="column mr-6">
        <div class="card">
          <header class="card-header subtitle is-4 p-2">Play and Score</header>
          <div class="card-content">
            <p class="subtitle is-5">
              Challenge yourself by playing a trivia. See if you can beat your own highest score!
            </p>
          </div>
        </div>
      </div>


    </div>
  </section>

  <section class="m-6 p-6">
    <h2 class="title is-2 has-text-centered mb-6">Popular Trivia</h2>
    <div class="tile is-ancestor mx-6">
      <TriviaBox v-for="trivia in latestTrivias" v-bind:key="trivia.id" v-bind:trivia="trivia" />
    </div>
  </section>

  <section class="m-6 p-6">
    <h2 class="title is-2 has-text-centered mb-6">Browse by Category</h2>
    <div class="columns is-multiline">
      <Categories v-for="category in categories" v-bind:key="category.id" v-bind:category="category" />
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

import TriviaBox from '@/components/TriviaBox'
import Categories from '@/components/CategoriesBox.vue'
export default {
  name: 'HomeView',
  data() {
    return {
      latestTrivias: [],
      categories: [],
    }
  },
  components: {
    TriviaBox,
    Categories
  },
  mounted() {
    this.getLatestTrivias()
    this.getCategories()
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
    },
    async getCategories() {

      this.$store.commit('setIsLoading', true)

      axios
        .get(`api/v1/trivias/display-categories/`)
        .then(response => {
          this.categories = response.data
          document.title = 'Categories | Trivia'
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

