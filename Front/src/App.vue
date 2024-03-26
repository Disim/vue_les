<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <!-- Page content here -->
      <router-view/>

    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/about">Профиль</router-link></li>
        <li v-if="!isAuth"><router-link to="/login">Войти</router-link></li>
        <li v-if="!isAuth"><router-link to="/register">Регистрация</router-link></li>
        <li v-if="isAuth"><router-link to="/" @click="logout()">Выйти</router-link></li>
      </ul>

    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  },
  mounted() {
    const uid  = localStorage.getItem('uid')
    uid ? this.$store.commit('auth/setAuth', true) : this.$store.commit('auth/setAuth', false)
  },
  computed: {
    ...mapState({
      isAuth: state => state.auth.isAuth
    })
  }
}
</script>

<style>
@import './styles/output.css';

#app {
  background: url("assets/bg.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>