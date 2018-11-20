<template>
  <div id="app">
    <top></top>
    <b-container fluid class="px-0">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
  import top from './components/layout/top';

  export default {
    name: 'app',
    components: {
      top,
    },
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
</style>
