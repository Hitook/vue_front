<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
              <h1 class="title">Welcome {{Account.username}}</h1>
            </div>





            <hr>
            <!-- Add check for if staff member -->
            <a href="http://44.203.134.65/admin/auth/user/" class="button">Admin Page</a>
            <input type="text" class="input" placeholder="Change Username">
            <input type="text" class="input" placeholder="Change Password">
            <hr>

            <h2 class="subtitle">My Favorite Trivias</h2>
            <div class="tile is-ancestor is-12">

                <TriviaBox v-if="this.trivias.length > 0" v-for="trivia in this.trivias" v-bind:key="trivia.id" v-bind:trivia="trivia" />


            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import TriviaBox from '@/components/TriviaBox.vue'
import Account from '@/components/Account.vue'

export default {
    name: 'MyAccount',
    components: {
        TriviaBox,
        Account
    },
    data() {
        return {
            trivias: [],
            Account: {},
            favorites: {},
        }
    },
    mounted() {
        document.title = 'My account | Trivia'
        this.getAccountInfo()
        setTimeout(() => {
          this.getFavoriteTrivia()
        }, 1000);
        
    },
    methods: {

        signout() {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")
            this.$store.commit('removeToken')

            this.$router.push('/')
        },
        async getAccountInfo() {

            this.$store.commit('setIsLoading', true)
            const formData = {
              username: localStorage.getItem("username"),
              password: localStorage.getItem("password")
            }
            await axios
              .post("/api/v1/user-info/", formData)
              .then(response => {
                  this.Account = response.data
              })
              .catch(error => {
                  console.log(error)
              })

            this.$store.commit('setIsLoading', false)
        },
        async getFavoriteTrivia() {
            this.$store.commit('setIsLoading', true)
            await axios
                .get(`/api/v1/favorites/${this.Account.user_id}`)
                .then(response => {
                    this.favorites = response.data
                    //console.log(this.favorites)
                    for (let i = 0; i < this.favorites.length; i++) {
                      this.getTrivia(this.favorites[i].trivia_id)
                    }
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        },
        async getTrivia(trivia_id) {
            await axios
                .get(`/api/v1/trivias/${trivia_id}`)
                .then(response => {
                  //console.log(response.data[0])
                  this.trivias.push(response.data[0])
                })
                .catch(error => {
                    console.log(error)
                })

        }
    }
}
</script>