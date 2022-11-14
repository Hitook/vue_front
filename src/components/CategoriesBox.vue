<template>
  <div class="column is-4">
    <router-link v-bind:to="category.get_absolute_url" class="box has-text-centered is-2 my-2">
      <h1 class="title is-dark py-4">{{ category.name }}</h1>
      <div v-if="signedIn" class="has-text-right">
        <button class="button is-light" v-if="!favorites" @click.prevent="favoriteCategory">Favorite</button>
        <button class="button is-warning" v-else @click.prevent="defavoriteCategory">Favorited</button>
      </div>
    </router-link>
  </div>
</template>
 
<script>
import axios from 'axios'
export default {
  name: 'Categories',
  props: {
    category: Object
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
    async favoriteCategory() {
      var category_id = this.category.id
      var user_id = localStorage.getItem("user_id")
      await axios
        .post(`/api/v1/category/favorite/${category_id}/${user_id}/`)
        .catch(error => {
          console.log(error)
        })
      window.location.reload();
    },
    async defavoriteCategory() {
      var category_id = this.category.id
      var user_id = localStorage.getItem("user_id")
      await axios
        .post(`/api/v1/category/defavorite/${category_id}/${user_id}/`)
        .catch(error => {
          console.log(error)
        })
      window.location.reload();
    },
    isFavorite() {
      if (localStorage.getItem("user_id") != null) {
        var category_id = this.category.id
        var user_id = localStorage.getItem("user_id")
        axios
          .get(`/api/v1/category/isfavorite/${category_id}/${user_id}/`)
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
