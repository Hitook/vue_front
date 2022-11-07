<template>
  <div id="wrapper">
    <nav class="navbar is-dark p-1">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item has-text-weight-bold is-size-4">Trivia Home</router-link>
        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu"
          @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navbar-menu" v-bind:class="{ 'is-active': showMobileMenu }">
        <div class="navbar-start">
          <router-link to="/categories" class="navbar-item">Categories</router-link>
          <router-link to="/about" class="navbar-item">About Us</router-link>
          <div class="navbar-item ">


          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="account-related">
              <template v-if="isloggedin()">
                <router-link to="/my-account" class="button is-dark is-rounded mx-1">My account</router-link>
                <button @click="signout()" class="button is-danger is-rounded mx-1">Sign out</button>
              </template>

              <template v-else>
                <router-link to="/sign-in" class="button is-dark is-rounded mx-1"><b>Sign In</b></router-link>
                <router-link to="/sign-up" class="button is-light is-rounded mx-1"><b>Sign Up</b></router-link>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="is-loading-bar has-text-centered" v-bind:class="{ 'is-loading': $store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div>

    <body>
      <router-view />
    </body>

    <footer class="footer p-4">
      <p class="has-text-centered">Copyright (c) 2022</p>
    </footer>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: []
      }
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
  methods: {
    signout() {
      axios.defaults.headers.common["Authorization"] = ""

      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("user_id")
      localStorage.removeItem("password")

      this.$store.commit('removeToken')

      this.$router.push('/')
    },
  },
  isloggedin() {
    if (localStorage.getItem("user_id") != null) {
      return true
    }else {
      return false
    }
  },
  computed: {
    isSignedIn() {
      const token = this.$store.state.token
      if (token) {
        return false
      } else {
        return true
      }

    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/bulma';

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring::after {
  content: "";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}

.space {
  margin-right: 10px;
}
</style>
