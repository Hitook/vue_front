<template>
  <div class="tile is-parent">
    <router-link v-bind:to="trivia.get_absolute_url" class="tile is-child is-10 box">
      <figure class="image">
        <img class="is-rounded" src="../../public/quiz-banners/art-banner-medium.jpg">
      </figure>
      <p class="title is-4 has-text-centered">{{ trivia.name}}</p>
    </router-link>
    <button class="icon-heart" @click="favoriteTrivia"> Favorite</button>
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
    this.getAccountInfo()
    setTimeout(() => {
      //this.favoriteTrivia()
    }, 1000);
    
  },
  methods: {
    async getAccountInfo() {
      this.$store.commit('setIsLoading', true)
      const formData = {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password")
      }
      await axios
        .post("/api/v1/user-info/", formData)
        .then(response => {
            this.Account = response.data
        })
        .catch(error => {
            console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    },
    async favoriteTrivia() {
      //console.log(this.trivia.category_id)
      var category_id = this.trivia.category_id
      var trivia_id   = this.trivia.id
      var user_id     = this.Account.user_id
      await axios
        .post(`/api/v1/favorite/${category_id}/${trivia_id}/${user_id}/`)
        .catch(error => {
            console.log(error)
        })
    },
  }
}
  </script>
 
<style scoped>

</style>