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

            <form>
                <div class="inputGroup" >
                    <div class="inputLabel">카카오 ID</div>
                    <div class="col-sm-10 inputForm">
                        <input type="text" class="form-control" id="kakaoID" placeholder="kakaoID" >
                    </div>
                </div>

                <div class="inputGroup">
                    <div class="inputLabel">비밀번호</div>
                    <div class="col-sm-10 inputForm">
                        <input type="password" class="form-control" id="password" placeholder="Password">
                    </div>
                </div>


                <div class="inputLabel">관심 카테고리</div>
                <div class="checkboxBackground">
                <div class="checkboxGroup">

                    <div  v-for="item in catagoryList" :key="item.id">
                        <div class="custom-control custom-checkbox custom-control-inline singleCatagoryCheck">
                            <input type="checkbox" class="custom-control-input" :id="item.id">
                            <label class="custom-control-label" :for="item.id">{{item.catagoryName}}</label>
                        </div>
                    </div>


                </div>

                </div>
                <div >
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">카카오톡으로 회원가입</button>
                    </div>
                </div>
            </form>

        </div>


    </div>
</template>

<script>

    export default {
        name: "signUp",
        data() {
            return {
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
        margin-bottom: 60px;
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