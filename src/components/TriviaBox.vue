<template>
  <div class="column is-3">
    <router-link v-bind:to="trivia.get_absolute_url" class="box m-2">
      <figure class="image p-4">
        <img class="is-rounded" src="../../public/default-banner-medium.jpg">
      </figure>
      <p class="title is-4 has-text-centered mt-4">
        {{ trivia.name }}
      </p>
      <div v-if="signedIn" class="has-text-right">
        <button class="button is-warning" v-if="favorites" @click.prevent="defavoriteTrivia"> Favorited</button>
        <button class="button is-light" v-else @click.prevent="favoriteTrivia"> Favorite</button>
      </div>
    </router-link>
  </div>
</template>
 
<script>
import axios from 'axios'

export default {
  name: 'TriviaBox',
  props: {
    trivia: Object
  },
  data() {
    return {
      trivias: [],
      Account: {},
      favorites: {},
      signedIn: false,
    }
  },
  mounted() {
    document.title = 'My account | Trivia'
    this.isFavorite()
    if (localStorage.getItem("user_id") != null) {
      this.signedIn = true
    }
  },
  methods: {
    async favoriteTrivia() {
      var category_id = this.trivia.category_id
      var trivia_id = this.trivia.id
      var user_id = localStorage.getItem("user_id")
      await axios
        .post(`/api/v1/trivia/favorite/${category_id}/${trivia_id}/${user_id}/`)
        .catch(error => {
          console.log(error)
        })
      window.location.reload();
    },
    async defavoriteTrivia() {
      var category_id = this.trivia.category_id
      var trivia_id = this.trivia.id
      var user_id = localStorage.getItem("user_id")
      await axios
        .post(`/api/v1/trivia/defavorite/${category_id}/${trivia_id}/${user_id}/`)
        .catch(error => {
          console.log(error)
        })
      window.location.reload();
    },
    isFavorite() {
      if (localStorage.getItem("user_id") != null) {
        var category_id = this.trivia.category_id
        var trivia_id = this.trivia.id
        var user_id = localStorage.getItem("user_id")
        axios
          .get(`/api/v1/trivia/isfavorite/${category_id}/${trivia_id}/${user_id}/`)
          .then(response => {
            var isfav = response.data
            this.favorites = (isfav)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.favorites = false
      }
    },
  }
}
</script>
 
<style scoped>

</style>