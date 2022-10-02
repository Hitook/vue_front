<template>
  <div class="page-sign-up">
    <div class= "coulmns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Log In</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label> Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username">
            </div>
          </div>

          <div class="field">
            <label> Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password">
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in erorrs" v-bind:key="error"> {{ errror }}</p>

          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Log in</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { toast } from 'bulma-toast'

  export default {
    name: 'LogIn',
    data() {
      return {
        username: '',
        password: '',
        errors: []
      }
    },
    mounted() {
      document.title = 'Log In | Trivia'
    },
    methods: {
      async submitForm() {

        axios.defaults.headers.common['Athorization'] = ""
        localStorage.removeItem("token")

        this.errors = []

        if (this.username === '') {
          this.erorrs.push('The username is missing')
        }

        if (this.password === '') {
          this.erorrs.push('The password is too short')
        }

        if (!this.errors.length) {
          const formData = {
            username: this.username,
            password: this.password
          }

          await axios 
            .post("/api/vi/token/login/", formData)
            .then( response => {
              const token = response.data.auth_token

              this.$store.commit('setToken', token)
              axios.defaults.headers.common["Athorization"] = "Token " + token
              localStorage.setItem("token", token)
              const toPath = this.$route.query.to || '/cart'

              this.$router.push(toPath)
            })
            .catch(error => {
              if (error.repsonse) {
                for(const property in error.response.data) {
                  this.errors.push(`${property}: ${error.response.data[property]}`)
                }

                console.log(JSON.stringify(error.response.data))
              } else if (error.message) {
                this.errors.push('Something went wrong. Please try again.')
                console.log(JSON.stringify(error))
              }
            })
        }
      }
    }
  }
</script>