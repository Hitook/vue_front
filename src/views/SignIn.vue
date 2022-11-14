<template>
  <section class="section">
    <div class="page-sign-up">
      <div class="columns">
        <div class="column is-4 is-offset-4 mt-6">
          <div class="box mt-6">
            <h1 class="title has-text-centered is-2">Sign In</h1>

            <form @submit.prevent="submitForm">
              <div class="field my-">
                <label class="subtitle">Username:</label>
                <div class="control">
                  <input type="text" class="input" v-model="username">
                </div>
              </div>

              <div class="field">
                <label class="subtitle">Password:</label>
                <div class="control">
                  <input type="password" class="input" v-model="password">
                </div>
              </div>

              <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error"> {{ error }}</p>

              </div>

              <div class="field">
                <div class="control">
                  <button class="button subtitle is-primary is-fullwidth">Sign In</button>
                </div>
              </div>
              <hr>
              Or <router-link to="/sign-up">click here</router-link> to Sign Up
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  mounted() {
    document.title = 'Sign In | Trivia'
  },
  methods: {
    async submitForm() {

      axios.defaults.headers.common['Authorization'] = ""
      localStorage.removeItem("token")

      this.errors = []

      if (this.username === '') {
        this.errors.push('The username is missing')
      }

      if (this.password === '') {
        this.errors.push('The password is missing')
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password
        }

        await axios
          .post("/api/v1/token/login/", formData)
          .then(response => {
            const token = response.data.auth_token;

            this.$store.commit('setToken', token);
            axios.defaults.headers.common["Authorization"] = "Token " + token;
            localStorage.setItem("token", token);
            localStorage.setItem("username", formData.username);
            localStorage.setItem("password", formData.password);
            axios.post("/api/v1/user-info/", formData)
              .then(response => {
                var account = response.data
                localStorage.setItem("user_id", account.user_id);
              })
            const toPath = this.$route.query.to || '/my-account';

            this.$router.push(toPath);
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