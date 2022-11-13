<template>
  <div class="container">
    <h1 class="is-size-2 has-text-centered my-6">Categories</h1>
    <div class="columns is-multiline">
      <Categories v-for="category in categories" v-bind:key="category.id" v-bind:category="category" />
    </div>
  </div>
  <div class="block my-6 py-3"></div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import Categories from '@/components/CategoriesBox'

export default {
  name: 'Category',
  components: {
    Categories
  },
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    this.getCategories()
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Category') {
        this.getCategories()
      }
    }
  },
  methods: {
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