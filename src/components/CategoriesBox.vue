<template>
  <div class="column is-3">
         <div class="box">
           <h3 class="is-size-4">{{ category.name}} </h3>
           <router-link v-bind:to="category.get_absolute_url" class="button is-dark mt-4">  Trivias</router-link>
         </div>
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