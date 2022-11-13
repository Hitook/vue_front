<template>
    <div class="section">
        <div class="columns is-multiline">
            <div class="column is-12 has-text-centered">
                <h1 class="title is-2 m-4">Welcome {{ Account.username }}</h1>
            </div>
            <div class="column is-12 has-text-centered">
                <a href="http://44.203.134.65/admin/auth/user/" class="button subtitle">Admin Page</a>
            </div>
        </div>
        <div class="section">
            <h2 class="title">My Favorite Trivias:</h2>
            <div class="block px-6 mx-6">
                <div v-if="this.trivias.length > 0" class="columns is-multiline">
                    <TriviaBox v-for="trivia in this.trivias" v-bind:key="trivia.id" v-bind:trivia="trivia" />
                </div>
                <div v-else>
                    <h2 class="subtitle">Looks like you haven't favorited any trivias...</h2>
                </div>
            </div>
            <h2 class="title">My Favorite Categories:</h2>
            <div class="block px-6 mx-6">
                <div v-if="this.categories.length > 0" class="columns is-multiline">
                    <CategoryBox v-for="category in this.categories" v-bind:key="category.id"
                        v-bind:category="category" />
                </div>
                <div v-else>
                    <h2 class="subtitle">Looks like you haven't favorited any categories...</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import TriviaBox from '@/components/TriviaBox.vue'
import Account from '@/components/Account.vue'
import CategoryBox from '@/components/CategoriesBox.vue'

export default {
    name: 'MyAccount',
    components: {
        TriviaBox,
        CategoryBox,
        Account
    },
    data() {
        return {
            trivias: [],
            categories: [],
            Account: {},
            favorites: {},
        }
    },
    mounted() {
        document.title = 'My account | Trivia'
        this.getAccountInfo()
        setTimeout(() => {
            this.getFavoriteCategory()
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
                .get(`/api/v1/trivia/favorites/${this.Account.user_id}/`)
                .then(response => {
                    this.favorites = response.data
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
                .get(`/api/v1/trivias/${trivia_id}/`)
                .then(response => {
                    //console.log(response.data[0])
                    this.trivias.push(response.data[0])
                })
                .catch(error => {
                    console.log(error)
                })

        },
        async getFavoriteCategory() {
            this.$store.commit('setIsLoading', true)
            await axios
                .get(`/api/v1/categories/favorites/${this.Account.user_id}/`)
                .then(response => {
                    this.favorites = response.data
                    for (let i = 0; i < this.favorites.length; i++) {
                        this.getCategory(this.favorites[i].category_id)
                    }
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        },
        async getCategory(category_id) {
            await axios
                .get(`/api/v1/category/${category_id}/`)
                .then(response => {
                    this.categories.push(response.data[0])
                })
                .catch(error => {
                    console.log(error)
                })

        },
    }
}
</script>