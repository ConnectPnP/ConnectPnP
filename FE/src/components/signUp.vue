<template>
    <div id="signUp">
       <!-- 로고 이미지
       <img alt="Vue logo" src="./assets/logo.png">
       -->
        <div class="mainTitleArea">
            <div class="mainTitle1">Sign Up</div>
            <div class="mainTitle2">Connect PnP</div>
            <p>Connect PnP와 함께 새로운 만남을 시작하세요!</p>
        </div>


        <div class="signUp-backGround" align="center">
            <div class="contact-form-title">
                회원 가입
            </div>

            <div class="contact-form-title">
                반갑습니다 ___ 님
            </div>

            <div class="guid-msg">
                아래 항목에 답하고 ConnectPnP 회원가입을 완료하세요!
            </div>



            <!-- <form action="http://localhost:3000/user" method="post">-->
                <div class="inputLabel">관심 카테고리</div>
                    <div class="checkboxBackground">
                        <div class="checkboxGroup">

                            <div  v-for="item in catagoryList" :key="item.id">
                                <div class="custom-control custom-checkbox custom-control-inline singleCatagoryCheck">
                                    <input type="checkbox" class="custom-control-input" :id="item.id" :name="item.name" :value="item.name" >
                                    <label class="custom-control-label" :for="item.id">{{item.catagoryName}}</label>
                                </div>
                            </div>


                        </div>
                    </div>



            <button class="btn btn-primary" @click="senddata">회원가입</button>






        </div>


    </div>
</template>

<script>


    export default {
        /* eslint-disable no-console*/
        name: "signUp",
        data() {
            return {
                signUpData:{
                    kakaoID: String,
                    userNickName: String,
                    profileImg : String,
                },
                catagoryList: [
                    {   id: 1,
                        catagoryName: "catagory1"
                    },
                    {   id: 2,
                        catagoryName: "catagory2"
                    },
                    {   id: 3,
                        catagoryName: "catagory3"
                    },
                    {   id: 4,
                        catagoryName: "catagory4"
                    },
                    {   id: 5,
                        catagoryName: "catagory5"
                    },
                    {   id: 6,
                        catagoryName: "catagory6"
                    }
                ]
            }
        },
       mounted: function () {

       },
        methods:{
            senddata(){
                var userData = new FormData();
                Kakao.API.request({
                    url: '/v1/user/me',
                    success: function (res) {
                        //console.log(res);
                        // var userID = res.id;      //유저의 카카오톡 고유 id
                        //var userNickName = res.properties.nickname; //유저가 등록한 별명
                        //var profile_image = res.properties.profile_image;   //유저의 프로필 이미지
                        //console.log("image>>"+ profile_image);
                        //console.log(res);
                        this.kakaoID=res.id;
                        this.userNickName=res.properties.nickname;
                        this.profileImg=res.properties.profile_image;
                        console.log( this.kakaoID);
                        //userData.append('kakaoID',this.kakaoID);
                        //userData.append('userNickName',this.userNickName);
                        //userData.append('profileImg',this.profileImg);

                        // console.log(userID);
                        // console.log(profile_image);
                        // console.log(userNickName);
                    }
                });
                userData.set('tmp','hello!');
                console.log(userData.get('tmp'));
                this.$http.post("http://localhost:3000/user",userData)
                    .then(response => {
                        console.log(response);
                    }, error => {
                        console.log(error);
                    });

            }
        }

    }
</script>

<style scoped>

    .mainTitle1{
        color: #007bff;
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .mainTitle2{
        color:#000000;
        font-size: 40px;
        margin-bottom: 50px;
    }

    .signUp-backGround{
        padding: 30px 100px;

        background-color: #f3edff;
        margin: 50px 400px;
    }

    .contact-form-title{
        font-size: 27px;
        margin-top: 30px;

    }
    .guid-msg{
        margin-top: 20px;
        font-size: 20px;
    }
    .inputGroup{

    }
    .inputLabel{
        margin-top: 40px;
        margin-bottom: 10px;
        font-size: 17px;
        font-weight: bold;
    }
    .inputForm{
        margin-bottom: 20px;

        padding: 0px 50px;
    }

    .checkboxBackground{
        padding: 20px 10px;
        border: 10px solid #d2e8ff;
        margin: 10px 30px 50px 30px;
    }
    .checkboxGroup{
        margin: 20px 50px;
    }
    .singleCatagoryCheck{
        margin-bottom: 20px;
    }

</style>