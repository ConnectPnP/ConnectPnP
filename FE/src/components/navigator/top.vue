<template>
  <div class="top">
    <b-navbar toggleable="md" type="dark" variant="secondary">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="/">
        ConnectPnP
      </b-navbar-brand>
      <sidebar></sidebar>
      <!--카카오 로그인 버튼-->
      <b-collapse  is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <button type="button" class="btn navbtn btn-primary"  v-if="loginStatus==false" v-on:click=loginWithKakao(1)>로그인</button>
          <button type="button" class="btn navbtn btn-primary" v-if="loginStatus==false" v-on:click=loginWithKakao(0)>회원가입</button>



          <b-nav-item-dropdown right v-if="loginStatus">
                <template slot="button-content">
                    <em>리뷰하기 <b-badge variant="light" @click="groupReview">NEW</b-badge></em>
                </template>
                <b-dropdown-header>리뷰해주세요☆</b-dropdown-header>
                <b-dropdown-item
                    v-for="list in groupReviewList"
                    :key="list._id" @click="showReview(list._id)">
                    {{ list.title }}
                </b-dropdown-item>
          </b-nav-item-dropdown>

<!-- :to="{name:'cards-by-pack-id',params:{id:pack.id}}" -->

          <b-nav-item-dropdown right v-if="loginStatus">
            <template slot="button-content">
              <b-img class="profileImg" rounded="circle" width="40px" height="40px" stype="margin-right:5px" :src="userInfo[1]" />
              <em>  {{userInfo[0]}}</em>
            </template>
            <b-dropdown-item href="/myPage">MyPage</b-dropdown-item>
            <b-dropdown-item href="/admin" v-show="adminStatus">Administrator</b-dropdown-item>
            <b-dropdown-item  v-on:click=logoutWithKakao>Signout </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>

  </div>
</template>

<script>
  /* eslint-disable no-console*/
  import topItem from './topItem';
  import sidebar from './nav';
  import Review from '../reviewPopup/Review.vue'

  var topVue = this;
  export default {
    name: 'top',
    components: { topItem , sidebar, Review},
    data(){
          return{
              user_name : String,
              profile_path : String,
              groupReviewList: [],
          }
      },
      created:function() {

      },
      mounted: function () {
          const scriptId = 'kakao_login';
          const isExist = !!document.getElementById(scriptId);
          if (!isExist) {
              const script = document.createElement('script');
              script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
              script.onload = () => this.initiate();
              script.onerror = error => this.handleError(error);
              script.id = scriptId;
              document.body.appendChild(script)
          } else this.initiate()
      },

      computed:{
        //현재 로그인 상태 확인. 로그인/ 로그아웃시 보여져야하는 UI 조정.
          loginStatus(){
              //var cookie_status= this.$cookie.get('loginStatus');
              var session_status= this.$session.get('loginStatus');
              //console.log("loginStatus>>"+ cookie_status);
              console.log("loginStatus_Session>>"+ session_status);

              if(session_status=='login'){
                  console.log(session_status=='login');
                 return true;
              } else {
                  console.log(session_status=='login');
                  return false
              }
          },

           userInfo(){
              //쿠키에 저장되어 있는 유저 정보 불러오기
              //var cookie_status= this.$cookie.get('loginStatus');
              var session_status= this.$session.get('loginStatus');
              if(session_status=='login'){
                  var userInfoName=this.$session.get('userName');
                  var userInfoProfile = this.$session.get('profile_path');
                  return [userInfoName,userInfoProfile]
              } else{
                  return["",""]
              }
          },

          //세션값을 가져와 유저가 관리자인지 확인.
           adminStatus(){
              var isAdmin = this.$session.get('admin');
              return isAdmin;
          },

         
      },
      methods: {
          //카카오 api 사용을 위한 초기화
          initiate: () => {
              Kakao.init("08991fe24f4ff6700ae96d13f881ea66");
          },
          handleError: (err) => {
              console.warn(`This component threw an error (in '${err.target.outerHTML}'):`, this)
          },



        groupReview(){
            //alert('리뷰 필요한 목록 가져오기');
            var id = this.$session.get('userID');

            // 오늘 날짜 가져오기
            var today = new Date();
            var year = today.getFullYear();                               
            var month = (1 + today.getMonth());                  
            month = month >= 10 ? month : '0' + month;     
            var day = today.getDate();                                  
            day = day >= 10 ? day : '0' + day;                          
            var changeDateFormat = year+'-'+month+'-'+day;
            console.log(changeDateFormat);

            this.groupReviewList = [];

            this.$http.get('http://localhost:3000/user/details/'+id)
            .then((userAllInfo) => { 
                console.log(userAllInfo.data);
                console.log(userAllInfo.data.group_log.length);

                // 날짜랑.. 리뷰팝업.. 둘다 고려
                for(var i=0; i<userAllInfo.data.group_log.length; i++){
                    console.log(userAllInfo.data.group_log[i].group_id.title);
                    if((userAllInfo.data.group_log[i].review_popup == true) 
                    && (userAllInfo.data.group_log[i].group_id.meeting_date < changeDateFormat)) {

                        this.groupReviewList.push(userAllInfo.data.group_log[i].group_id);
                    }
                    console.log(this.groupReviewList.length);

                }
            });            
            //this.groupReviewList.push(1);
        },
        showReview(id){
            // console.log(id);
            this.$modal.show(Review,{
                getid: id,
            },{
                name: 'review',
                width: '500px',
                height: '450px',
                draggable: true
            });
        },



          //로그인 파라미터 값은 클릭한 버튼(로그인:1, 회원가입:0)
           loginWithKakao(btnClick){

              //카카오 인증하는 부분. 창을 띄워 이메일,비밀번호 값을 받아 토큰 반환.
               Kakao.Auth.login({
                   success: function(authObj) {
                       afterAuth();
                   },
                   fail: function(err) {
                       console.log("AuthError>>"+err);
                   }
               });

                var topVuethis = this;

                //카카오에서 받은 토큰으로 유저 데이터 불러오기, 유저가 등록된 회원인지 판별
               async function  afterAuth (){
                   //유저 데이터 불러오기
                   var kakaoData = await Kakao.API.request({url: '/v1/user/me'});
                   var userID= kakaoData.id;
                   var user_name = kakaoData.properties.nickname.toString();
                   var profile_path = kakaoData.properties.profile_image.toString();

                   //유저 이름, 프로필 이미지 쿠키로 저장.
                   //topVuethis.$cookie.set('userID',userID, 1);
                   //topVuethis.$cookie.set('userName',user_name, 1);
                   //topVuethis.$cookie.set('profile_path',profile_path, 1);

                   //유저 이름, 프로필 이미지 세션으로 저장.
                   topVuethis.$session.set('userID',userID);
                   topVuethis.$session.set('userName',user_name);
                   topVuethis.$session.set('profile_path',profile_path);


                   //유저 관리자 여부 확인. 관리자 정보 세션에 저장.
                   var useradminData = await topVuethis.$http.get('http://localhost:3000/user/details/'+userID);
                   if(useradminData.data.admin){
                       topVuethis.$session.set('admin',true);
                   } else {
                       topVuethis.$session.set('admin',false);
                   }

                   //유저가 이미 등록된 회원인지 판별.
                   var getURL = "http://localhost:3000/user/"+userID;
                   var userResult = await topVuethis.$http.get(getURL);

                   //회원일 경우 (이미 db에 유저 정보가 있다.) -> 새로고침-> 로그인 완료
                   if(userResult.data.user){
                       //회원가입 버튼으로 클릭했으면 알림창을 띄운후 로그인 처리
                       if(btnClick==0){
                           alert("이미 회원가입이 완료된 회원입니다. 로그인 합니다.")
                       }
                       //topVuethis.$cookie.set('loginStatus','login', 1);
                       topVuethis.$session.set('loginStatus','login');
                       topVuethis.$session.set('id', userResult.data._id);
                       topVuethis.$session.set('gender', userResult.data.gender);
                       topVuethis.$session.set('age', userResult.data.age);
                       location.href="/"

                   } else{  //회원이 아닌 경우 -> 회원가입 창으로
                       location.href="/signUp"
                   }
                }
            },

            //로그아웃
            logoutWithKakao() {
                Kakao.Auth.logout(function () {
                    setTimeout(function () {
                        location.href = "/"
                    }, 1000);//로그아웃 처리되는 타임을 임시적으로 1000설정
                    location.href = "/"
                });
                Kakao.Auth.cleanup();
                //this.$cookie.set('loginStatus', 'logout', 1);
                this.$session.clear();
                location.href = "/"
            }

        }
    }


</script>

<style scoped>
    .top {
        padding-bottom: 30px;
    }

    .navbtn {
        margin: 5px;
    }
</style>
