<template>
  <div id="mypage">
    <div>
      <b-tabs>

        <b-tab title="Profile" active>
          <b-row>

            <div class="image-container">
              <b-img :src="memberInfo.img" id="imgProfile" style="width: 150px; height: 150px" class="img-thumbnail"></b-img>
              <div class="middle">
                <b-form-file v-model="file" @change="changeProfileImage($event.target.files)" accept=".jpg, .png" size="sm" class="mt-3" plain>프로필 바꾸기</b-form-file>
              </div>
              <h2 class="d-block" style="font-size: 1.5rem; font-weight: bold; margin-top:10px">{{ memberInfo.usrName }}</h2>

            </div>

            <div class="userData ml-3">
              <b-row>
                <div class="col-sm-3 col-md-4 col-5">
                  <!-- <h2 class="d-block" style="font-size: 1.5rem; font-weight: bold">{{ memberInfo.usrName }}</h2> -->
                </div>
              </b-row>

              <b-row>
                <div class="col-sm-3 col-md-4 col-5">
                  <label style="font-weight:bold;">닉네임</label>
                </div>
                <div class="col-md-5 col-6">
                  <input type="text" name="nickname" v-model="memberInfo.nickName">
                </div>
                <div class="col-md-1 col-2">
                  <b-button class="btn btn-info ml-2" @click="changeNickname">닉네임 변경</b-button>
                </div>
              </b-row>

              <hr>

              <b-row>
                <div class="col-sm-3 col-md-4 col-5">
                  <label style="font-weight:bold;">관심 카테고리</label>
                </div>
                <div class="col-md-5 col-6">
                  <b-form-group>
                    <b-form-checkbox-group v-model="memberInfo.interestedCategory" name="flavour1" :options="categoryList"></b-form-checkbox-group>
                  </b-form-group>
                </div>
                <div class="col-md-1 col-2">
                  <b-button  class="btn btn-info ml-2" @click="changeCategory">관심 카테고리 변경</b-button>
                </div>
              </b-row>
            </div>

          </b-row>

          <hr>

          <b-row>

            <div class="col-sm-2 col-md-2 col-2">
              <label style="font-weight:bold;">나의 평점</label>
            </div>
            <div class="col-sm-2 col-md-2 col-2">
              <star-rating id="starRating" :rating="memberInfo.starRating" :read-only="true" :star-size="30" :increment="0.01"></star-rating>
            </div>

          </b-row>

          <hr>

          <b-row>
            <div class="col-sm-2 col-md-2 col-2">
              <label style="font-weight:bold;">참여도</label>
            </div>
            <div class="col-sm-10 col-md-10 col-10">
              <Chart :eventMonth="eventMonth"></Chart>
            </div>
          </b-row>

        </b-tab>

        <b-tab title="Calendar" >

            <full-calendar :events="memberInfo.eventsDate" defaultView="month"></full-calendar>



        </b-tab>

        <!-- <b-tab title="참여중인 모임" >

          <div class="margin">
            <div class="row" v-for="i in Math.ceil(groupList.length / 2)">
              <span v-for="group in groupList.slice((i-1)*2,i*2)">
                <ListView v-bind:groupTitle=group.groupInfo.title v-bind:groupLocation=group.groupInfo.location
                v-bind:groupContent=group.groupInfo.content v-bind:groupImg=group.groupInfo.group_img />
              </span>
            </div>
          </div>

        </b-tab>

        <b-tab title="내가 만든 모임">

          <div class="margin">

            <div class="row" v-for="i in Math.ceil(groupList.length / 2)">
              <span v-for="group in groupList.slice((i-1)*2,i*2)">
                <ListView v-bind:groupTitle=group.groupInfo.title v-bind:groupLocation=group.groupInfo.location
                v-bind:groupContent=group.groupInfo.content v-bind:groupImg=group.groupInfo.group_img />
              </span>
            </div>
          </div>

        </b-tab> -->

      </b-tabs>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import Chart from './Chart.vue'

import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'

const config = require('../../server.config');
export default {
  name: 'mypage',
  components: {
    StarRating,
    Chart,
    FullCalendar,
  },
  data() {
    return {
      eventMonth:[],
      categoryList: [],
      file : null,
      formData : new FormData(),
      memberInfo: {
        id: '',
        usrName: "",
        img: "",
        nickName: "",
        interestedCategory: [],
        starRating:0,
        joinHistory: [0,0,0], // 이번 달, 저번 달, 저저번 달
        events: [],
        eventsDate: []
      }
    }
  },
  created(){
    this.memberInfo.id = this.$session.get('userID');
    this.memberInfo.usrName = this.$session.get('userName');
    this.memberInfo.img = this.$session.get('profile_path');

    this.getCategoryList();

    this.$http.get(config.serverUrl() + 'user/details/'+this.memberInfo.id)
      .then((result)=>{
        // 닉네임 가져오기
        if((result.data.nickName == "")||(result.data.nickName == null)){
          this.memberInfo.nickName = this.memberInfo.usrName;
        } else {
          this.memberInfo.nickName = result.data.nickName;
        }

        // 관심 카테고리 가져오기
        var catListtemp = [];
        for(var j=0;j<result.data.categoryList.length;j++){
          catListtemp.push(result.data.categoryList[j]);
        }
        this.memberInfo.interestedCategory = catListtemp;
        this.memberInfo.img = result.data.avatar_path
        // 평점 가져오기
        if(result.data.star_rate.divider != 0){
          this.memberInfo.starRating = (result.data.star_rate.totalScore/result.data.star_rate.divider)/2;

        }
        else {
          this.memberInfo.starRating = 0;
        }
        this.memberInfo.events = result.data.group_log
        console.log(this.memberInfo.starRating);

    }).then(()=>{ this.getGroupDate(); })

  },
  methods:{
    getCategoryList() {
                var vm = this
                this.$http.get(config.serverUrl()+'category')
                .then((result) => {
                    // get category list
                    for(var i=0; i<result.data.length; i++) {
                        if(result.data[i].depth == 0){
                          var categoryOption = '{"value" : "' + result.data[i]._id + '", "text" : "'+ result.data[i].name+'"}';
                          vm.categoryList.push(JSON.parse(categoryOption));
                        }
                    }
                });
            },
    changeNickname(){
      this.$http.post(config.serverUrl()+'user/profile/'+this.memberInfo.id, {
        nickName: this.memberInfo.nickName
      }).then((result)=>{
        alert('닉네임 변경이 완료되었습니다.');
      });
    },
    changeCategory(){
      this.$http.post(config.serverUrl()+'user/profile/'+this.memberInfo.id, {
        categoryList: this.memberInfo.interestedCategory
      }).then(()=>{
          alert('관심 카테고리 변경이 완료되었습니다.');
      });
    },
    getGroupDate(){
      var view = this
      this.memberInfo.events.forEach(
        function getevent(value) {
          if(value.group_id != null){
            var event = '{ "title": "'+ value.group_id.title + '", "start": "' + value.group_id.meeting_date + '", "editable": "false", "url": "'+config.serverFE()+'party/detail/'+ value.group_id._id+'" }';
            view.memberInfo.eventsDate.push(JSON.parse(event));
            view.eventMonth.push(Number(value.group_id.meeting_date.split('-')[1]));
          }

        }
      )
    },
    changeProfileImage(newFile){
      this.file = {blob: URL.createObjectURL(newFile[0])};
      this.formData.append('profileImage', newFile[0], newFile[0].name);

      this.$http.post(config.serverUrl()+'user/profile/files/'+this.memberInfo.id, this.formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    },
  }

}
</script>

<style>
#mypage {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
}
.image-container {
  position: relative;
  margin: 15px;
  margin-left: 40px;

}
.userData {
    margin: 15px;
    width: 65%;
}
.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.image-container:hover .image {
  opacity: 0.3;
}

.image-container:hover .middle {
  opacity: 1;
}
</style>
