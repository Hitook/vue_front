<template>
  <div class="column is-7 has-text-centered">
         <div class="box has-background-dark">
          <span class="title is-6 is-spaced has-text-primary-light">Question: {{question.question}}</span>
          <div class="answers">
            <span class='answer has-text-primary-light'>
              <input type="radio" id="one" :name="question.id" :value="question.fake_answer" v-model="picked" />       
              <label :for="question.fake_answer">{{question.fake_answer}}</label>
            </span>
            <!-- Find a way to randomize the question output -->
            <span class='answer has-text-primary-light'>
              <input type="radio" id="two" :name="question.id" :value="question.correct_answer" v-model="picked"/>
              <label :for="question.id">{{question.correct_answer}}</label>
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

  label {
    margin-left: 10%;
  }
 </style>