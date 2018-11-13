<template>
<div id="review">

    <h3>모임의 후기를 작성해주세요!</h3>

    <b-carousel class="carousel" indicators controls :interval="0">
        
        <reviewSlide></reviewSlide>
        <reviewSlide></reviewSlide>
        <reviewSlide></reviewSlide>
        <reviewSlide></reviewSlide>

    </b-carousel>

        <b-form-checkbox size="sm" style="display: block">다시 보지 않기</b-form-checkbox>
        <b-btn class="btnGroup" size="sm" variant="primary">제출</b-btn> 

</div>
</template>

<script>
import reviewSlide from './reviewSlide.vue'
export default {
  name: 'review',
  components: {
      reviewSlide
  }
}
</script>

<style>
#review {
  background: rgb(210, 232, 255);

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
