<template>
  <div id="app">
    <createParty></createParty>
  </div>
</template>

<script>
import createParty from './components/createParty.vue'

export default {
  name: 'app',
  components: {
      createParty
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
