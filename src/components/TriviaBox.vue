<template>
  <div class="column is-3">
         <div class="box">
           <figure class="image mb-4">
             <img :src="trivia.get_thumbnail">
           </figure>
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
   .image{
     margin-top: -1.25rem;
     margin-left: -1.25rem;
     margin-right: -1.25rem;
   }
 </style>