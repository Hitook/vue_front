<template>
  <div class="tile is-parent">
    <router-link v-bind:to="trivia.get_absolute_url" class="tile is-child is-10 box">
      <figure class="image">
        <img class="is-rounded" src="../../public/quiz-banners/art-banner-medium.jpg">
      </figure>
      <p class="title is-4 has-text-centered">{{ trivia.name}}</p>
    </router-link>
    <button class="button is-warning" v-if="favorites"  @click="defavoriteTrivia"> Favorited</button>
    <button class="button is-light" v-else  @click="favoriteTrivia"> Favorite</button>
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
    }
  },
  mounted() {
    document.title = 'My account | Trivia'
    this.isFavorite()
    //this.getAccountInfo()
  },
  methods: {
    async favoriteTrivia() {
      //console.log(this.trivia.category_id)
      var category_id = this.trivia.category_id
      var trivia_id   = this.trivia.id
      var user_id     = localStorage.getItem("user_id")
      await axios
        .post(`/api/v1/trivia/favorite/${category_id}/${trivia_id}/${user_id}/`)
        .catch(error => {
            console.log(error)
        })
      window.location.reload();
    },
    async defavoriteTrivia() {
      var category_id = this.trivia.category_id
      var trivia_id   = this.trivia.id
      var user_id     = localStorage.getItem("user_id")
      await axios
      .post(`/api/v1/trivia/defavorite/${category_id}/${trivia_id}/${user_id}/`)
      .catch(error => {
          console.log(error)
      })
      window.location.reload();
    },
     isFavorite() {
      var category_id = this.trivia.category_id
      var trivia_id   = this.trivia.id
      var user_id     = localStorage.getItem("user_id")
      axios
      .get(`/api/v1/trivia/isfavorite/${category_id}/${trivia_id}/${user_id}/`)
      .then(response => {
        var isfav = response.data
        this.favorites = (isfav)
      })
      .catch(error => {
        console.log(error)
      })
    },
  }
}
  </script>
 
<style scoped>

</style>