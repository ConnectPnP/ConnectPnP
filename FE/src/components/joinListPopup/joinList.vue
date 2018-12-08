<template>
<div id="joinList">
    <h3>신청자 리스트</h3>
    <b-carousel class="carousel" indicators controls :interval="0">
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
        members : [
            {
                _id : {type: Number},
                name : {type : String},
                avatar_path : {type : String},
                gender : {type : String},
                age : {type : Number},
                star_rate : {type : Number}
            }
        ],
        group : {
            groupId : {type : Number},
            groupTitle : {type: String},
            groupDate : {type: String}
        }
    }
}

</script>

<style>
#joinList {
  background: rgb(210, 232, 255);

  max-width: 500px;
  max-height: 480px;

  text-align: center;

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
