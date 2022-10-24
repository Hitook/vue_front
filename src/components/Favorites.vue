<template>
  <div class="column is-3">
         <div class="box">
           <h3 class="is-size-4">{{ Account.username}} </h3>
           <span> test</span>
         </div>
       </div>
 </template>
 
 <script>
   export default {
     name: 'Favorite',
     props: {
       Favorite: Object
     }
   }
 </script>
 
 <style scoped>
  
 </style>