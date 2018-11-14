<template>
    <div>

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

                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="catagoryCheck1">
                        <label class="custom-control-label" for="catagoryCheck1">catagory</label>
                    </div>

                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="catagoryCheck2">
                        <label class="custom-control-label" for="catagoryCheck2">catagory</label>
                    </div>

                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="catagoryCheck3">
                        <label class="custom-control-label" for="catagoryCheck3">catagory</label>
                    </div>

                </div>

                <div class="checkboxGroup">
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="catagoryCheck4">
                        <label class="custom-control-label" for="catagoryCheck4">catagory</label>
                    </div>

                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="catagoryCheck5">
                        <label class="custom-control-label" for="catagoryCheck5">catagory</label>
                    </div>

                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="catagoryCheck6">
                        <label class="custom-control-label" for="catagoryCheck6">catagory</label>
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
        name: "signUp"
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
        height: 730px;
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

</style>