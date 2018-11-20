<template>
  <div id="app">
    <b-container fluid class="px-0">
      <router-view></router-view>
    </b-container>
  </div>

</template>

<script>
  export default {
    name: 'app',
  };

</script>

<style>
  .btn .fa-icon {
    vertical-align: middle;
    margin-right: 0.5rem;
  }
  .btn .fa-icon:last-child {
    margin-right: 0;
  }

  #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

</style>
