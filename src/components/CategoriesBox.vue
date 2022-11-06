<template>
  <div class="column is-3">
         <div class="box">
           <h3 class="is-size-4">{{ category.name}} </h3>
           <router-link v-bind:to="category.get_absolute_url" class="button is-dark mt-4">  Trivias</router-link>
           <button class="button is-warning" v-if="favorites"  @click="defavoriteCategory"> Favorited</button>
           <button class="button is-light" v-else  @click="favoriteCategory"> Favorite</button>
         </div>
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
    }
  },
  mounted() {
    document.title = 'My account | Trivia'
    this.isFavorite()
    //this.getAccountInfo()
  },
  methods: {
    async favoriteCategory() {
      //console.log(this.trivia.category_id)
      var category_id = this.category.id
      var user_id     = localStorage.getItem("user_id")
      await axios
        .post(`/api/v1/category/favorite/${category_id}/${user_id}/`)
        .catch(error => {
            console.log(error)
        })
      window.location.reload();
    },
    async defavoriteCategory() {
      var category_id = this.category.id
      var user_id     = localStorage.getItem("user_id")
      await axios
      .post(`/api/v1/category/defavorite/${category_id}/${user_id}/`)
      .catch(error => {
          console.log(error)
      })
      window.location.reload();
    },
     isFavorite() {
      var category_id = this.category.id
      var user_id     = localStorage.getItem("user_id")
      axios
      .get(`/api/v1/category/isfavorite/${category_id}/${user_id}/`)
      .then(response => {
        var isfav = response.data
        this.favorites = (isfav)
        console.log(isfav)
      })
      .catch(error => {
        console.log(error)
      })
    },
  }
}
  </script>
 
 <script>

   
 </script>
 
 <style scoped>
  
 </style>