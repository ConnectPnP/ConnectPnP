<template>
<div id="app">

    <h3>모임의 후기를 작성해주세요!</h3>

    <b-carousel class="carousel" indicators controls :interval="0">
        
        <reviewSlide></reviewSlide>
        <reviewSlide></reviewSlide>
        <reviewSlide></reviewSlide>
        <reviewSlide></reviewSlide>

    </b-carousel>

        <b-form-checkbox size="sm" style="display: block">다시 보지 않기</b-form-checkbox>
        <b-btn class="btnGroup" size="sm">제출</b-btn> 

</div>
</template>

<script>
import reviewSlide from './components/reviewSlide.vue'
export default {
  name: 'app',
  components: {
      reviewSlide
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
  background: #bdbdbd;

  max-width: 500px;
  max-height: 480px;

  padding: 15px;
}

.carousel {
    height: 300px;
}

.btnGroup {
    width: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
}

</style>
