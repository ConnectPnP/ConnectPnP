<template>
  <div id="app">
    <top/>
    <router-view></router-view>
  </div>
</template>

<script>
import top from '@/components/navigator/top'

  export default {
    name: 'app',
    components: {
      top,
    },
  };
</script>

<style>
#app 
{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>