<template>
  <myPage></myPage>
</template>

<script>
import myPage from './components/myPage.vue'

export default {
  name: 'app',
  components: {
    myPage
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