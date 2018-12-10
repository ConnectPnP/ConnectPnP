<template>
<div id="review">

    <h3>모임 후기를 작성해주세요!</h3>


        <h3>{{ groupData.name}}</h3>
        <h5>{{ groupData.hostName}}</h5>
        <b-img  rounded="circle" width="120px" height="120px" stype="margin-right:5px" :src="groupData.hostProfile" />
        <star-rating id="starRatingReview" :glow="10" :rounded-corners="true"  @rating-selected="CurrentRating"  :show-rating="false" :star-size="30" :increment="0.5" ></star-rating>

    <br>


    <b-btn class="btnGroup" size="sm" variant="primary" v-on:click="reviewSubmit">제출</b-btn>
    <b-button class="btnGroup" size="sm" @click="$emit('close')">취소</b-button>


</div>
</template>

<script>

import StarRating from 'vue-star-rating'

const config = require('../../server.config');
export default {
  name: 'review',
  components: {
      StarRating
  },
  props: {
    getid: Number,
  },
  data(){
      return {
          slide:0,
          currentRating:Number,
          groupData: {
              id:Number,
              hostId:Number,
              name:String,
              hostName:String,
              hostProfile:String
          },
      }
  },
    async mounted(){
        //'/details/:id'var deleteResult = this.$http.post(subdeleteURL);
        var groupID = this.getid;
        var getGroupData = await this.$http.get( config.serverUrl()+"board/details/"+groupID);
        console.log(getGroupData.data);
        this.groupData.id=getGroupData.data._id;
        this.groupData.name= getGroupData.data.title;
        this.groupData.hostId=getGroupData.data.host._id;
        this.groupData.hostName= getGroupData.data.host.name;
        this.groupData.hostProfile=getGroupData.data.host.avatar_path;
    },
    methods:{
        CurrentRating(rating){
            this.currentRating=rating;
        },
        reviewSubmit(){
            var ratingData={
                rating: this.currentRating*2,
                currentUserId: this.$session.get('id'),
                group_id: this.groupData.id
            }
            var getGroupData =  this.$http.post(config.serverUrl()+"user/rating/"+this.groupData.hostId,ratingData);
            this.$emit('getResult', this.result);
            this.$emit('close');

        }
    }
}
</script>

<style>
.gorupInfo{
    alignment: center;
}
#review {
  background: rgb(210, 232, 255);

  width: 500px;
  height: 450px;

  padding: 15px;
  text-align: center;
}
#starRatingReview {
    margin-bottom: 20px;
    margin-top:20px;
    margin-left:35%;
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