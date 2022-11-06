<template>
  <div class="column is-4">
    <router-link v-bind:to="category.get_absolute_url" class="box title has-text-centered is-dark is-2 my-2 py-6">
      {{ category.name }}
    </router-link>
  </div>

</template>
 
<script>
export default {
  name: 'Categories',
  props: {
    category: Object
  }
}
</script>
 
<style scoped>

</style>