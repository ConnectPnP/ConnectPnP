<template>
    <div id="signUp">
       <!-- 로고 이미지
       <img alt="Vue logo" src="./assets/logo.png">
       -->
        <div class="mainTitleArea">
            <div class="mainTitle1">Sign Up</div>
            <div class="mainTitle2">Connect PnP</div>
            <h5>Connect PnP와 함께 새로운 만남을 시작하세요!</h5>
        </div>


        <div class="signUp-backGround" align="center">

            <b-img class="profileImg" rounded="circle" width="120px" height="120px" stype="margin-right:5px" :src="userInfo[1]" />
            <div class="contact-form-title">
                반갑습니다 {{userInfo[0]}} 님
            </div>

            <div class="guid-msg">
                아래 항목에 답하고 ConnectPnP 회원가입을 완료하세요!
            </div>

            <div class="inputLabel"> 나이</div>
            <b-form-input id="age" class="ageInput" v-model="userAge"
                          type="number"
                          placeholder=""></b-form-input>

            <div class="inputLabel"> 성별</div>
            <input type="radio" id="female" value="female" v-model="userGender">
            <label class="radioButtonlabel" for="female">여성</label>


            <input type="radio" id="male" value="male" v-model="userGender">
            <label class="radioButtonlabel" for="male">남성</label>



            <!-- <form action="http://localhost:3000/user" method="post">-->
                <div class="inputLabel">관심 카테고리</div>
                    <div class="checkboxBackground">
                        <div class="checkboxGroup">

                            <div  v-for="item in categoryList" :key="item.id">
                                <div class="custom-control custom-checkbox custom-control-inline singleCategoryCheck">
                                    <input type="checkbox" class="custom-control-input" :id="item.id"  :value="item.categoryName" v-model="checkedCategory">
                                    <label class="custom-control-label" :for="item.id">{{item.categoryName}}</label>
                                </div>
                            </div>


                        </div>
                    </div>


            <button class="btn btn-primary" @click="senddata">회원가입</button>

        </div>


    </div>
</template>

<script>
    const axios = require('axios');

    export default {
        /* eslint-disable no-console*/
        name: "signUp",
        data() {
            return {
                userAge:Number,
                userGender:String,
                checkedCategory: [],


                categoryList: [
                    {   id: 1,
                        categoryName: "category1"
                    },
                    {   id: 2,
                        categoryName: "category2"
                    },
                    {   id: 3,
                        categoryName: "category3"
                    },
                    {   id: 4,
                        categoryName: "category4"
                    },
                    {   id: 5,
                        categoryName: "category5"
                    },
                    {   id: 6,
                        categoryName: "category6"
                    },
                ]
            }
        },
       mounted: function () {

       },
        computed:{
            userInfo(){
                var userInfoName=this.$cookie.get('userName');
                var userInfoProfile = this.$cookie.get('profile_path');
                return [userInfoName, userInfoProfile]
            }

        },
        methods:{
            async senddata(){

                var kakaoData = await Kakao.API.request({url: '/v1/user/me'});
                console.log(kakaoData);

                //id, nickname, profile_img
                console.log(this.userGender);

                var userData ={
                    age: this.userAge,
                    gender: this.userGender,
                    categoryList: this.checkedCategory
                }

                var userFindRes = await this.$http.post('http://localhost:3000/user', [kakaoData,userData]);
                console.log(userFindRes.data.result);

                if(userFindRes.data.result=='exist'){
                    alert("이미 회원가입된 회원입니다.");
                    location.href="/"
                } else{
                    alert("회원가입이 완료되었습니다.");
                    location.href="/"
                }


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
        margin: 50px 300px;
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
    .ageInput{

        width: 100px;
    }

    .inputLabel{
        margin-top: 40px;
        margin-bottom: 10px;
        font-size: 25px;
        font-weight: bold;
    }
    .inputForm{
        margin-bottom: 20px;

        padding: 0px 50px;
    }

    .radioButtonlabel{
        font-size: 20px ;
        margin-right: 20px;
        margin-left: 20px;
    }
    .checkboxBackground{
        padding: 20px 10px;
        border: 10px solid #d2e8ff;
        margin: 10px 30px 50px 30px;
    }
    .checkboxGroup{
        margin: 20px 50px;
    }
    .singleCategoryCheck{
        margin-bottom: 20px;
    }

</style>