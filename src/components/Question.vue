<template>
  <h1 class="title is-1 has-text-centered mb-6">Here's an example question?</h1>
  <div class="container has-text-centered px-6">
    <div class="container px-6 mx-6">

      <div class="box is-justify-content-center mx-6">
        <button class="button subtitle is-fullwidth mx-1">
          <a>Possible Answer 1</a>
        </button>
        <button class="button subtitle is-fullwidth mx-1">
          <a>Possible Answer 2</a>
        </button>
        <button class="button subtitle is-fullwidth mx-1">
          <a>Possible Answer 3</a>
        </button>
        <button class="button subtitle is-fullwidth mx-1">
          <a>Possible Answer 4</a>
        </button>
      </div>
    </div>
  </div>

</template>
 
<script>

export default {
  name: 'Question',
  props: {

  },
  data() {
    return {
      picked: '',
      q: 1,
    }
  },
}

</script>
 
<style scoped>
.container {
  max-width: min-content;
}
</style>