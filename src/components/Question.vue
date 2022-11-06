<template>
  <div class="container px-6">
    <div class="container px-6">
      <h1 class="title is-3 has-text-centered mb-6">{{ question }}</h1>
    </div>
    <div class="container has-text-centered px-6">
      <div class="container px-6 mx-6">
        <div class="box is-justify-content-center mx-6">
          <button v-for="answer in answers" class="button subtitle is-fullwidth is-light mx-1">
            <a>{{ answer }}</a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
    question: '',
    correctAnswer: '',
    fakeAnswer: '',
  },
  data() {
    return {
      picked: '',
      q: 1,
      answers: [],
    }
  },
  mounted() {
    this.getAnswers()
  },
  methods: {
    getAnswers() {
      this.answers = [this.correctAnswer, this.fakeAnswer]
    }
  }
}

</script>
 
<style scoped>
.container {
  max-width: min-content;
}
</style>