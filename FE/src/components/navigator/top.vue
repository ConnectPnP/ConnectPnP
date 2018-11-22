<template>
  <div class="top">
    <b-navbar toggleable="md" type="dark" variant="secondary">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="/">
        ConnectPnP
      </b-navbar-brand>
      <sidebar></sidebar>
      <!--카카오 로그인 버튼-->
      <button type="button" class="btn navbtn btn-primary"  v-if="loginStatus==false" v-on:click=loginWithKakao>로그인</button>

      <button type="button" class="btn navbtn btn-primary" v-if="loginStatus" v-on:click=logoutWithKakao>로그아웃</button>

      <button type="button" class="btn navbtn btn-primary" v-if="loginStatus==false" v-on:click="loginStatus">회원가입</button>

      <b-collapse v-if="loginStatus" is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <b-img class="profileImg" rounded="circle" width="40px" stype="margin-right:5px" :src="profile_path" />
              <em>  {{user_name}}</em>
            </template>
            <b-dropdown-item href="/myPage">MyPage</b-dropdown-item>
            <b-dropdown-item href="/">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>

  </div>
</template>

<script>
  import topItem from './topItem';
  import sidebar from './nav';
  //import kakaoLogin from '../kakaoLogin';
  /* eslint-disable no-console*/
  export default {
    name: 'top',
    components: { topItem , sidebar},
    props: {
        user_name : {
          type: String,
          default() { return "hyeon";}
        }, 
        profile_path : {
          type: String,
          default() { return "https://tistory1.daumcdn.net/tistory/user/1122646/profile/profileImg?v=1537856192204";}
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

          }
      },
      methods: {
          initiate: () => {
              Kakao.init("08991fe24f4ff6700ae96d13f881ea66");
          },
          handleError: (err) => {
              /* eslint-disable no-console*/
              console.warn(`This component threw an error (in '${err.target.outerHTML}'):`, this)
          },

          loginWithKakao(){
              Kakao.Auth.login({
                  success: (authObj) => {
                      this.$cookie.set('loginStatus','login', 1);
                      console.log( this.$cookie.get('loginStatus'));
                      location.href="/"
                      Kakao.API.request({
                          url: '/v1/user/me',
                          success: function (res) {
                              //console.log(res);
                              var userID = res.id;      //유저의 카카오톡 고유 id
                              var userNickName = res.properties.nickname; //유저가 등록한 별명
                              var profile_image = res.properties.profile_image;   //유저의 프로필 이미지

                              console.log(res);
                              // console.log(userID);
                              // console.log(profile_image);
                              // console.log(userNickName);

                          }
                      })
                  },
                  fail: (err) => this.onFailure(err)
              });
          },
          logoutWithKakao(){

              Kakao.Auth.logout(function() {
                  setTimeout(function(){
                      location.href="/"
                  },1000);//로그아웃 처리되는 타임을 임시적으로 1000설정
              });
              this.$cookie.set('loginStatus','logout', 1);
              console.log( this.$cookie.get('loginStatus'));
          }

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
