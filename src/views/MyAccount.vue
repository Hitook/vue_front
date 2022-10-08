<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My account</h1>
            </div>

            <div class="column is-12">
                <button @click="logout()" class="button is-danger">Log out</button>
            </div>

            <hr>

            <div class="column is-12">
                <h2 class="subtitle">My Favorite Trivias</h2>

               <TriviaBox
                    v-for="trivia in this.trivias"
                    v-bind:key="trivia.id"
                    v-bind:trivia="trivia" />
                   
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import TriviaBox from '@/components/TriviaBox.vue'

export default {
    name: 'MyAccount',
    components: {
        TriviaBox
},
    data() {
        return {
            trivias: []
        }
    },
    mounted() {
        document.title = 'My account | Trivia'

        this.getFavoriteTrivia()
    },
    methods: {
        logout() {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")

            this.$store.commit('removeToken')

            this.$router.push('/')
        },
        async getFavoriteTrivia() {
            this.$store.commit('setIsLoading', true)

            await axios
                .get('/api/v1/latest-trivias/')
                .then(response => {
                    this.trivias = response.data
                    console.log(this.trivias[0].id)
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>