<template>
  <div id="app">
    <top/>
    <div>
      <b-tabs>

        <b-tab title="Profile" active>
          <b-row>

            <div class="image-container">
              <b-img :src="memberInfo.img" id="imgProfile" style="width: 150px; height: 150px" class="img-thumbnail"></b-img>
              <div class="middle">
                <b-form-file v-model="file" accept=".jpg, .png" size="sm" class="mt-3" plain>프로필 바꾸기</b-form-file>
              </div>
            </div>

            <div class="userData ml-3">
              <b-row>
                <div class="col-sm-3 col-md-4 col-5">
                  <h2 class="d-block" style="font-size: 1.5rem; font-weight: bold">{{ memberInfo.usrName }}</h2>
                </div>
              </b-row>

              <b-row>
                <div class="col-sm-3 col-md-4 col-5">
                  <label style="font-weight:bold;">닉네임</label>
                </div>
                <div class="col-md-5 col-6">
                  <input type="text" name="nickname" :value="memberInfo.nickName">
                </div>        
                <div class="col-md-1 col-2">
                  <a href="#" onclick="{props.handleSubmitProfile}" class="btn btn-primary ml-2">닉네임 변경</a>
                </div>
              </b-row>

              <hr>

              <b-row>
                <div class="col-sm-3 col-md-4 col-5">
                  <label style="font-weight:bold;">관심 카테고리</label>
                </div>
                <div class="col-md-5 col-6">
                  <b-form-group>
                    <b-form-checkbox-group v-model="memberInfo.interestedCategory" name="flavour1" :options="options"></b-form-checkbox-group>
                  </b-form-group>
                </div>
                <div class="col-md-1 col-2">
                  <a href="#" onclick="{props.handleSubmitProfile}" class="btn btn-primary ml-2">관심 카테고리 변경</a>
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

            <full-calendar :events="memberInfo.events" defaultView="month"></full-calendar>



        </b-tab>

      </b-tabs>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import Chart from './Chart.vue'
import top from '../navigator/top'

import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'

export default {
  name: 'app',
  components: {
    StarRating,
    Chart,
    FullCalendar,
    top,
  },
  data() {
    return {
      options: [
        {text: 'Category1', value: 'category1'},
        {text: 'Category2', value: 'category2'},
        {text: 'Category3', value: 'category3'},
        {text: 'Category4', value: 'category4'},
        {text: 'Category5', value: 'category5'},
        {text: 'Category6', value: 'category6'},
      ],
      file:'',
      memberInfo: {
        id: 1,
        usrName: "Kim",
        img: "https://scontent-sea1-1.cdninstagram.com/vp/7a5265ee63e43334d660ebd242da2206/5C8240E9/t51.2885-19/s150x150/13556877_1756206201259678_2048804432_a.jpg",
        nickName: "haha",
        interestedCategory: ["category1", "category5"],
        starRating: 3.4,
        ratingStatus: [10, 8, 10],
        events: [
          {
            title  : 'event1',
            start  : '2018-11-13',
            editable  : false,
          },
          {
            title  : 'event2',
            start  : '2018-11-05',
            end    : '2018-11-07',
            editable  : false,

          },
          {
            title  : 'event3',
            start  : '2018-11-09T12:30:00',
            editable  : false,
            allDay : false,
          },
        ]
      }
    }
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
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
}
.image-container {
  position: relative;
  margin: 10px;
}
.userData {
    margin: 15px;
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
