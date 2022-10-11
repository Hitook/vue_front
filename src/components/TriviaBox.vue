<template>
  <div class="tile is-parent">
    <router-link v-bind:to="trivia.get_absolute_url" class="tile is-child is-10 box">
      <figure class="image">
        <img class="is-rounded" src="../../public/quiz-banners/art-banner-medium.jpg">
      </figure>
      <p class="title is-4 has-text-centered">{{ trivia.name}}</p>
    </router-link>
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