<template>
  <section class="section">
    <div class="page-sign-up">
      <div class="coulmns">
        <div class="column is-4 is-offset-4 mt-6">
          <div class="box mt-6">
            <h1 class="title has-text-centered is-2">Sign Up</h1>

            <form @submit.prevent="submitForm">
              <div class="field">
                <label class="subtitle">Username</label>
                <div class="control">
                  <input type="text" class="input" v-model="username">
                </div>
              </div>

              <div class="field">
                <label class="subtitle">Password</label>
                <div class="control">
                  <input type="password" class="input" v-model="password">
                </div>
              </div>

              <div class="field">
                <label class="subtitle">Repeat Password</label>
                <div class="control">
                  <input type="password" class="input" v-model="password2">
                </div>
              </div>

              <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error"> {{ error }}</p>

              </div>

              <div class="field">
                <div class="control">
                  <button class="button subtitle is-primary is-fullwidth">Sign Up</button>
                </div>
              </div>
              <hr>

              Or <router-link to="/sign-in">click here</router-link> to Sign In
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      errors: []
    }
  },
  methods: {
    submitForm() {
      this.errors = []

      if (this.username === '') {
        this.errors.push('The username is missing')
      }

      if (this.password === '') {
        this.errors.push('The password is too short')
      }

      if (this.password !== this.password2) {
        this.errors.push('The passwords do not match')
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password
        }

        axios
          .post("/api/v1/users/", formData)
          .then(response => {
            toast({
              message: 'Account created, please sign in',
              type: 'is-success',
              dismissable: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })

            this.$router.push('/sign-in')
          })
          .catch(error => {
            if (error.repsonse) {
              for (const property in error.response.data) {
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