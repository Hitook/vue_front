<template>
  <article class="tile is-child is-2 p-5">
    <figure class="image is-16by16">
      <img class="is-rounded" src="../../public/quiz-banners/history-banner-medium.jpg">
    </figure>
    <p class="title is-4 has-text-centered">{{ trivia.name}}</p>
    <router-link v-bind:to="trivia.get_absolute_url" class="button is-dark mt-4"> Play {{
    trivia.name}}</router-link>
  </article>
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