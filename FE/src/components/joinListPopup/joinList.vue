<template>
<div id="joinList">
    <h3>신청자 리스트</h3>
    <b-carousel class="joincarousel" indicators controls :interval="0">
        <div v-for="member in members">
            <joinSlide :member=member :group=group />
        </div>
    </b-carousel>
</div>
</template>

<script>
import joinSlide from './joinSlide.vue'
export default {
  name: 'review',
  components: {
      joinSlide
  },
  props: {
        members : [],
        group : {}
    }
}

</script>

<style>
#joinList {
  background: rgb(210, 232, 255);

  width: 500px;
  height: 500px;

  text-align: center;

  padding: 15px;
}

.joincarousel {
    height: 330px;
}

.btnJoinAccept {
    margin-top: 50px;
}


</style>
