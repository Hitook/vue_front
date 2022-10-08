<template>
  <div class="column is-3">
         <div class="box">
           <h3 class="is-size-4">{{ trivia.name}} </h3>
           <router-link v-bind:to="trivia.get_absolute_url" class="button is-dark mt-4"> Play {{ trivia.name}}</router-link>
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