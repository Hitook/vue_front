<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My account</h1>
            </div>
            <hr>
            <!-- Add check for if staff member -->
            <a href="http://127.0.0.1:8000/admin/auth/user/" class="button">Admin Page</a>
            <input type="text" class="input" placeholder="Change Username">
            <input type="text" class="input" placeholder="Change Password">
            <hr>
            <h2 class="subtitle">My Favorite Trivias</h2>
            <div class="tile is-ancestor is-12">

                <TriviaBox v-for="trivia in this.trivias" v-bind:key="trivia.id" v-bind:trivia="trivia" />

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