<template>
<div id="review">

    <h3>모임의 후기를 작성해주세요!</h3>

    <b-carousel class="carousel" indicators controls :interval="0">
        <div v-for="member in members">
            <reviewSlide v-bind:groupTitle=member.memberInfo.group v-bind:groupDate=member.memberInfo.date
                v-bind:memberNickName=member.memberInfo.nickname v-bind:memberImg=member.memberInfo.memberImg />
        </div>
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
  },
  data(){
      return {
          members: [
                {
                    id:1,
                    memberInfo: {
                        group: "보드게임 하쟈",
                        date: "2018/11/10",
                        nickname: "Won",
                        profileImg:"https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                    }
                },
                {
                    id:2,
                    memberInfo: {
                        group: "보드게임 하쟈",
                        date: "2018/11/10",
                        nickname: "Kim",
                        profileImg:"https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                    }
                },
                {
                    id:3,
                    memberInfo: {
                        group: "마이크 공동구매!",
                        date: "2018/11/12",
                        nickname: "Jo",
                        profileImg:"https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                    }
                },
                {
                    id:4,
                    memberInfo: {
                        group: "놀이공원 기기",
                        date: "2018/11/08",
                        nickname: "Ko",
                        profileImg:"https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                    }
                },
                {
                    id:5,
                    memberInfo: {
                        group: "놀이공원 기기",
                        date: "2018/11/08",
                        nickname: "Seo",
                        profileImg:"https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                    }
                }
            ]
      }
  }
}
</script>

<style>
#review {
  background: rgb(210, 232, 255);

  max-width: 500px;
  max-height: 480px;

  padding: 15px;
  text-align: center;
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
