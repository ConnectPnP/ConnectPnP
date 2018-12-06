<template>
  <div id="app">
    <top/>
    <div class="wrapper">
      <div style="width: 90%">
        <router-view></router-view>
      </div>
      <div>          
        <recentGroup class="sidebar"></recentGroup>
      </div>
    </div>  
  </div>
</template>

<script>
import top from '@/components/navigator/top'
import recentGroup from '@/components/recentShownGroup/recentGroup'

  export default {
    name: 'app',
    components: {
      top,
      recentGroup,
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
.wrapper {
  display: flex;
  justify-content: space-between;
}

</style>