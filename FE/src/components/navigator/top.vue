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
          <button type="button" class="btn navbtn btn-primary"  v-if="loginStatus==false" v-on:click=loginWithKakao>로그인</button>
          <button type="button" class="btn navbtn btn-primary" v-if="loginStatus==false" v-on:click="loginWithKakao">회원가입</button>

          <b-nav-item-dropdown right v-if="loginStatus">
            <template slot="button-content">
              <b-img class="profileImg" rounded="circle" width="40px" height="40px" stype="margin-right:5px" :src="userInfo[1]" />
              <em>  {{userInfo[0]}}</em>
            </template>
            <b-dropdown-item href="/myPage">MyPage</b-dropdown-item>
            <b-dropdown-item  v-on:click=logoutWithKakao >Signout </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>

  </div>
</template>

<script>
  /*
  * <template slot="button-content">
              <b-img class="profileImg" rounded="circle" width="40px" stype="margin-right:5px" :src="profile_path" />
              <em>  {{user_name}}</em>
            </template>
  * */


  import topItem from './topItem';
  import sidebar from './nav';

  //import kakaoLogin from '../kakaoLogin';
  /* eslint-disable no-console*/
  export default {
    name: 'top',
    components: { topItem , sidebar},
    data(){
          return{
              user_name : String,
              profile_path : String
          }
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
        //현재 로그인 상태 확인, 쿠키로 저장.
          loginStatus(){
              var cookie_status= this.$cookie.get('loginStatus');
              console.log("loginStatus>>"+ cookie_status);
              if(cookie_status=='login'){
                  console.log(cookie_status=='login');
                  return true
              } else {
                  console.log(cookie_status=='login');
                  return false
              }
          },

          userInfo(){
              //쿠키에 저장되어 있는 유저 정보 불러오기
              var cookie_status= this.$cookie.get('loginStatus');
              if(cookie_status=='login'){
                  var userInfoName=this.$cookie.get('userName');
                  var userInfoProfile = this.$cookie.get('profile_path');
                  return [userInfoName,userInfoProfile]
              } else{
                  return["",""]
              }
          }
      },
      methods: {
          //카카오 api 사용을 위한 초기화
          initiate: () => {
              Kakao.init("08991fe24f4ff6700ae96d13f881ea66");
          },
          handleError: (err) => {
              /* eslint-disable no-console*/
              console.warn(`This component threw an error (in '${err.target.outerHTML}'):`, this)
          },

          //로그인
          async loginWithKakao(){
              var loginResult = await Kakao.Auth.login();
              console.log("loginResult>>"+loginResult);

              //카카오 계정에서 유저 정보 얻기
              var kakaoData = await Kakao.API.request({url: '/v1/user/me'});
              var userID= kakaoData.id;
              var getURL = "http://localhost:3000/user/"+userID;
              var user_name = kakaoData.properties.nickname.toString();
              var profile_path = kakaoData.properties.profile_image.toString();
              this.$cookie.set('userName',user_name, 1);
              this.$cookie.set('profile_path',profile_path, 1);



              var userResult = await this.$http.get(getURL);
              if(userResult.data.user){ //유저일 경우 (이미 db에 유저 정보가 있다.) -> 새로고침
                  this.$cookie.set('loginStatus','login', 1);
                  console.log( this.$cookie.get('loginStatus'));
                  location.href="/"

              } else{   //유저가 아닌 경우 -> 회원가입 창으로
                 location.href="/signUp"
              }

              //location.href="/"
          },

          //로그아웃
          logoutWithKakao(){
              Kakao.Auth.logout(function() {
                  setTimeout(function(){
                      location.href="/"
                  },1000);//로그아웃 처리되는 타임을 임시적으로 1000설정
              });
              this.$cookie.set('loginStatus','logout', 1);
              console.log( this.$cookie.get('loginStatus'));
              location.href="/"
          },

      }
  }

  
</script>

<style scoped>
  .top {
    padding-bottom : 30px;
  }
  .navbtn{
    margin: 5px;
  }
</style>
