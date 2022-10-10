<template>
  <div class="column is-3">
         <div class="box">
          <span class="title is-6 is-spaced">Question: {{question.question}}</span>
          <div class="answers">
            <span class='answer'>
              <input type="radio" id="one" :name="question.id" :value="question.fake_answer" v-model="picked" />       
              <label for="one">{{question.fake_answer}}</label>
            </span>

            <span class='answer'>
              <input type="radio" id="two" :name="question.id" :value="question.correct_answer" v-model="picked"/>
              <label for="two">{{question.correct_answer}}</label>
            </span>

          </div>
         </div>
       </div>
 </template>
 
 <script>
import { $dataMetaSchema } from 'ajv';

   export default {
      name: 'Question',
      props: {
        question: Object
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
  .answers {
    overflow: hidden;
    widows: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 50%;
  }

  .answer {
    
    position:relative;
  }
 </style>