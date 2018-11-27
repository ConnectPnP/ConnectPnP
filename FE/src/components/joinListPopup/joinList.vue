<template>
<div id="joinList">

    <h3>신청자 리스트</h3>

    <b-carousel class="carousel" indicators controls :interval="0">
        <div v-for="member in members">
            <joinSlide :groupTitle=member.memberInfo.group 
                :groupDate=member.memberInfo.date
                :starRating=member.memberInfo.score
                :memberNickName=member.memberInfo.nickname 
                :memberImg=member.memberInfo.memberImg />
        </div>
    </b-carousel>

    <b-btn class="btnGroup" size="sm" variant="primary">수락</b-btn> 
    <b-btn class="btnGroup" size="sm" variant="primary">거절</b-btn> 

</div>
</template>

<script>
import joinSlide from './joinSlide.vue'
export default {
  name: 'review',
  components: {
      joinSlide
  },
  data(){
      return {
          members: [
                {
                    id:1,
                    memberInfo: {
                        group: "보드게임 하쟈",
                        date: "2018/11/10",
                        score: "3.0",
                        nickname: "Won",
                        profileImg:"https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                    }
                },
                {
                    id:2,
                    memberInfo: {
                        group: "보드게임 하쟈",
                        date: "2018/11/10",
                        score: "2.0",
                        nickname: "Kim",
                        profileImg:"https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                    }
                },
                {
                    id:3,
                    memberInfo: {
                        group: "놀이공원 기기",
                        date: "2018/11/08",
                        score: "4.0",
                        nickname: "Park",
                        profileImg:"https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                    }
                },
                {
                    id:4,
                    memberInfo: {
                        group: "놀이공원 기기",
                        date: "2018/11/08",
                        score: "4.0",
                        nickname: "Na",
                        profileImg:"https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                    }
                }
            ]
      }
  }
}
</script>

<style>
#joinList {
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
