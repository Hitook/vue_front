<template>
  <div class="column is-3">
    <div class="tile is-parent">
      <router-link v-bind:to="trivia.get_absolute_url" class="tile box is-child is-10">
        <figure class="image">
          <img class="is-rounded" src="../../public/quiz-banners/default-banner-medium.jpg">
        </figure>
        <p class="title is-4 has-text-centered mt-4">
          {{ trivia.name }}
        </p>
      </router-link>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'TriviaBox',
  props: {
    trivia: Object
  }
}

</script>
 
<style scoped>

</style>