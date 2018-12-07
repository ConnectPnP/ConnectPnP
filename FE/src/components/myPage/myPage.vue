<template>
  <div id="mypage">
    <div>
      <b-tabs>

        <b-tab title="Profile" active>
          <b-row>

            <div class="image-container">
              <b-img :src="memberInfo.img" id="imgProfile" style="width: 150px; height: 150px" class="img-thumbnail"></b-img>
              <div class="middle">
                <b-form-file v-model="file" accept=".jpg, .png" size="sm" class="mt-3" plain>프로필 바꾸기</b-form-file>
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
              <star-rating id="starRating" :rating="memberInfo.starRating" :read-only="true" :star-size="30" :increment="0.5"></star-rating>
            </div>

          </b-row>

          <hr>

          <b-row>
            <div class="col-sm-2 col-md-2 col-2">
              <label style="font-weight:bold;">평가 지수</label>
            </div>
            <div class="col-sm-10 col-md-10 col-10">
              <Chart :ratingResult="memberInfo.ratingStatus" :name="memberInfo.usrName"></Chart>
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

export default {
  name: 'mypage',
  components: {
    StarRating,
    Chart,
    FullCalendar,
  },
  data() {
    return {
      categoryList: [],
      file:'',
      memberInfo: {
        id: '',
        usrName: "",
        img: "",
        nickName: "",
        interestedCategory: [],
        starRating:0,
        ratingStatus: [],
        eventsId: [],
        eventsDate: []
      }
    }
  },
  mounted(){
    this.memberInfo.id = this.$session.get('userID');
    this.memberInfo.usrName = this.$session.get('userName');
    this.memberInfo.img = this.$session.get('profile_path');

    this.getCategoryList();

    this.$http.get('http://localhost:3000/user/details/'+this.memberInfo.id)
      .then((result)=>{
        // 닉네임 가져오기
        if(result.data.nickName == null){
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

        // 평점 가져오기
        this.memberInfo.starRating = result.data.star_rate;

        for(var k = 0;k<result.data.group_log.length;k++){
          this.memberInfo.eventsId.push(result.data.group_log[k].group_id);
          console.log("groupId : "+result.data.group_log[k].group_id);
        }
    }).then(()=>{ this.getGroupDate(); });

  },methods:{
    getCategoryList() {
                var vm = this
                this.$http.get('http://localhost:3000/category')
                .then((result) => {
                    // get category list
                    for(var i=0; i<result.data.length; i++) {
                            var categoryOption = '{"value" : "' + result.data[i]._id + '", "text" : "'+ result.data[i].name+'"}';
                            vm.categoryList.push(JSON.parse(categoryOption));
                    }

                });
            },
  changeNickname(){
    this.$http.post('http://localhost:3000/user/profile/'+this.memberInfo.id, {
      nickName: this.memberInfo.nickName
    }).then(()=>{
      alert('닉네임 변경이 완료되었습니다.');
    });
  },
  changeCategory(){
    this.$http.post('http://localhost:3000/user/profile/'+this.memberInfo.id, {
      categoryList: this.memberInfo.interestedCategory
    }).then(()=>{
        alert('관심 카테고리 변경이 완료되었습니다.');
    });
  },
  getGroupDate(){
    for(var i=0;i<this.memberInfo.eventsId.length;i++){
      this.$http.get('http://localhost:3000/board/details/'+this.memberInfo.eventsId[i])
        .then((result)=>{
          var event = '{ "title": "'+result.data.title + '", "start": "' + result.data.meeting_date + '", editable: false }';
          this.memberInfo.eventsDate.push(JSON.parse(event));
        });
    }
    
  }
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
