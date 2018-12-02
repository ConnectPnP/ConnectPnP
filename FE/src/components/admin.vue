<template>
    <div id="admin">


<!--대분류 카테고리 -->
        <nav class="mainCatagoryGroup">
            <h3>대분류 카테고리</h3>
            <br>


        <div  v-for="item in mainCatagoryList" :key="item.id">
            <table class="catagoryTable">
                <tr>
                    <th class="catagoryImg"  rowspan="2">
                        <input v-on:click="catagoryClicked(item.catagoryName)" type="image" :src="item.catagoryImg"
                               height="140px" width="140px"/>
                    </th>
                    <th class="mainCatagoryTitle">{{item.catagoryName}}</th>
                </tr>
                <tr>
                    <td class="tg-0lax">
                        <button class="btn btn-danger">삭제</button>
                    </td>
                </tr>
            </table>
        </div>

            <div class="createCatagory">
                <div class="inputMain">
                    <label for="mainCatagory"> 대분류 이름: </label>  &nbsp;
                    <input id="mainCatagory" size="sm" type="text" placeholder="입력해주세요."></input>
                </div>

                <div class="inputMain">
                    <label for="imgURL"> 이미지 URL: </label>  &nbsp;
                    <input id="imgURL" size="sm" type="text" placeholder="입력해주세요."></input>
                </div>
                <button class="plusbtn btn btn-primary" v-on:click="addCatagory" >+</button>
            </div>

        </nav>






<!--대분류에 속해있는 소분류 카테고리 -->
        <article class="subCatagory">
            <h2>소분류 카테고리</h2>
            <br>

            <div  v-for="item in mainCatagoryList" :key="item.id">
                <div v-if="tmp==item.catagoryName">
                    <div v-for="sub in item.sub_category">
                        <b-col sm class="homePageCatagory">
                        <div class="subCatagorySingle">
                            <h3>{{sub.name}}</h3>
                        </div>
                        </b-col>
                    </div>
                </div>
            </div>

            <div class="createCatagory">
                <div class="inputMain">
                    <label for="subCatagory"> 소분류 이름: </label>  &nbsp;
                    <input id="subCatagory" size="sm" type="text" placeholder="입력해주세요."></input>
                </div>
                <button class="subplusbtn btn btn-primary" v-on:click="addCatagory" >+</button>
            </div>


        </article>


    </div>
</template>

<script>
    var tempimg = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyMS4xNDUgMzIxLjE0NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIxLjE0NSAzMjEuMTQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzIwLjk3MywyMDAuOTgxYy0wLjgtMTguNC00LTM4LjgtOC44LTU4Yy00LjgtMTguNC0xMC44LTM1LjYtMTgtNDguOGMtMjgtNDkuMi01OC40LTQxLjYtOTQuOC0zMiAgICBjLTExLjYsMi44LTI0LDYtMzYuOCw3LjJoLTRjLTEyLjgtMS4yLTI1LjItNC40LTM2LjgtNy4yYy0zNi40LTkuMi02Ni44LTE3LjItOTQuOCwzMi40Yy03LjIsMTMuMi0xMy42LDMwLjQtMTgsNDguOCAgICBjLTQuOCwxOS4yLTgsMzkuNi04LjgsNThjLTAuOCwyMC40LDEuMiwzNS4yLDUuNiw0NS42YzQuNCw5LjYsMTAuOCwxNS42LDE5LjIsMThjNy42LDIsMTYuNCwxLjIsMjUuNi0yLjggICAgYzE1LjYtNi40LDMzLjYtMjAsNTEuMi0zNi40YzEyLjQtMTIsMzUuNi0xOCw1OC44LTE4czQ2LjQsNiw1OC44LDE4YzE3LjYsMTYuNCwzNS42LDMwLDUxLjIsMzYuNGM5LjIsMy42LDE4LDQuOCwyNS42LDIuOCAgICBjOC0yLjQsMTQuOC04LDE5LjItMTguNEMzMTkuNzczLDIzNi41ODEsMzIxLjc3MywyMjEuNzgxLDMyMC45NzMsMjAwLjk4MXogTTMwMS43NzMsMjQwLjk4MWMtMi40LDUuNi01LjYsOC44LTkuNiwxMCAgICBjLTQuNCwxLjItMTAsMC40LTE2LjQtMmMtMTQtNS42LTMwLjQtMTgtNDYuNC0zMy4yYy0xNS4yLTE1LjItNDItMjIuOC02OC44LTIyLjhzLTUzLjYsNy42LTY5LjIsMjJjLTE2LjQsMTUuMi0zMi44LDI4LTQ2LjQsMzMuMiAgICBjLTYuNCwyLjQtMTIsMy42LTE2LjQsMmMtNC0xLjItNy4yLTQuNC05LjYtMTBjLTMuMi03LjYtNC44LTIwLTQtMzguNGMwLjgtMTcuMiwzLjYtMzYuOCw4LjQtNTUuMmM0LjQtMTcuMiwxMC0zMy4yLDE2LjgtNDUuMiAgICBjMjItMzkuNiw0Ny42LTMzLjIsNzgtMjUuMmMxMi40LDMuMiwyNS4yLDYuNCwzOS4yLDcuNmMwLjQsMCwwLjQsMCwwLjgsMGg0LjRjMC40LDAsMC40LDAsMC44LDBjMTQuNC0xLjIsMjcuMi00LjQsMzkuNi03LjYgICAgYzMwLjQtNy42LDU2LTE0LjQsNzgsMjUuMmM2LjgsMTIsMTIuNCwyNy42LDE2LjgsNDUuMmM0LjQsMTguNCw3LjYsMzcuNiw4LjQsNTUuMiAgICBDMzA2Ljk3MywyMjAuMTgxLDMwNS4zNzMsMjMyLjU4MSwzMDEuNzczLDI0MC45ODF6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTIzLjc3MywxMjIuOTgxYy00LTMuNi04LjgtNi40LTE0LjQtNi44Yy0wLjQtNS4yLTIuOC0xMC40LTYuNC0xNGwtMC40LTAuNGMtNC40LTQuNC0xMC02LjgtMTYuNC02LjggICAgYy02LjQsMC0xMi40LDIuOC0xNi40LDYuOGMtMy42LDMuNi02LjQsOC44LTYuOCwxNC40Yy01LjYsMC40LTEwLjQsMi44LTE0LjQsNi40bC0wLjQsMC40Yy00LjQsNC40LTYuOCwxMC02LjgsMTYuNCAgICBjMCw2LjQsMi44LDEyLjQsNi44LDE2LjRjNCw0LDguOCw2LjQsMTQuOCw2LjhjMC40LDUuNiwyLjgsMTAuOCw2LjgsMTQuNGM0LjQsNC40LDEwLDYuOCwxNi40LDYuOGM2LjQsMCwxMi40LTIuOCwxNi40LTYuOCAgICBjMy42LTQsNi40LTguOCw2LjgtMTQuNGM1LjYtMC40LDEwLjgtMi44LDE0LjQtNi44YzQuNC00LjQsNi44LTEwLDYuOC0xNi40QzEzMC41NzMsMTMyLjk4MSwxMjcuNzczLDEyNi45ODEsMTIzLjc3MywxMjIuOTgxeiAgICAgTTExMy43NzMsMTQ1LjM4MWMtMS42LDEuNi0zLjYsMi40LTYsMi40aC01LjZjLTQsMC03LjYsMy4yLTcuNiw3LjZ2NS4yYzAsMi40LTAuOCw0LjQtMi40LDZjLTEuNiwxLjYtMy42LDIuNC02LDIuNCAgICBjLTIuNCwwLTQuNC0wLjgtNi0yLjRjLTEuNi0xLjYtMi40LTMuNi0yLjQtNnYtNS42YzAtNC0zLjItNy42LTcuNi03LjZoLTUuNmMtMi40LDAtNC40LTAuOC02LTIuNGMtMS4yLTEuMi0yLjQtMy4yLTIuNC01LjYgICAgYzAtMi40LDAuOC00LjQsMi40LTZjMCwwLDAsMCwwLjQtMC40YzEuNi0xLjIsMy42LTIsNS42LTJoNS42YzQsMCw3LjYtMy4yLDcuNi03LjZ2LTUuNmMwLTIuNCwwLjgtNC40LDIuNC02ICAgIGMxLjYtMS42LDMuNi0yLjQsNi0yLjRjMi40LDAsNC40LDAuOCw2LDIuNGMwLDAsMCwwLDAuNCwwLjRjMS4yLDEuNiwyLDMuNiwyLDUuNnY1LjZjMCw0LDMuMiw3LjYsNy42LDcuNmg1LjYgICAgYzIuNCwwLDQuNCwwLjgsNiwyLjRjMS42LDEuNiwyLjQsMy42LDIuNCw2QzExNi4xNzMsMTQxLjc4MSwxMTUuMzczLDE0My43ODEsMTEzLjc3MywxNDUuMzgxeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPGNpcmNsZSBjeD0iMjMwLjE3MyIgY3k9IjExMC45ODEiIHI9IjE0IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8Y2lyY2xlIGN4PSIyMzAuMTczIiBjeT0iMTY3Ljc4MSIgcj0iMTQiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxjaXJjbGUgY3g9IjIwMS43NzMiIGN5PSIxMzkuMzgxIiByPSIxNCIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPGNpcmNsZSBjeD0iMjU4LjU3MyIgY3k9IjEzOS4zODEiIHI9IjE0IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="

    export default {
        name: "admin",
        props: {
            tmp:String
        },
        data() {
            return {
                mainCatagoryList: [
                    {
                        id:0,
                        catagoryName: "catagory1",
                        catagoryImg:tempimg,
                        sub_category:[
                            {
                                name:"catagory1-1"
                            },
                            {
                                name:"catagory1-2"
                            },
                            {
                                name:"catagory1-3"
                            },
                            {
                                name:"catagory1-4"
                            },
                        ]

                    },
                    {
                        id:1,
                        catagoryName: "catagory2",
                        catagoryImg:tempimg,
                        sub_category:[{
                            name:"catagory2-1"
                        },
                            {
                                name:"catagory2-2"
                            },
                            {
                                name:"catagory2-3"
                            },
                            {
                                name:"catagory2-4"
                            },]

                    },
                    {
                        id:2,
                        catagoryName: "catagory3",
                        catagoryImg:tempimg,
                        sub_category:[
                            {
                                name:"catagory3-1"
                            },
                            {
                                name:"catagory3-2"
                            },
                        ]

                    },


                ]


            }
        },
        methods:{
            catagoryClicked(catagoryname){
                this.tmp=catagoryname;
                console.log(catagoryname+"clicked!");
            },

            addCatagory(){

            }
        }
    }
</script>

<style scoped>

    .mainCatagoryGroup{
        padding-right:15px;
        border-right: 5px solid #d2e8ff;
        float:left;
    }

    .mainCatagoryTitle{
        font-size: 30px;
    }

    .catagoryTable{
        margin-left: 20px;
        margin-bottom: 15px;

        border: 5px solid #007bff;
    }

    .catagoryImg{
        width: 160px;
        background-color: #007bff;
        margin: 20px 20px;
        text-align: center;
        color:white;
    }

    .createCatagory{
        background-color: white;
        width: 410px;
        border-radius:10px;
        border: 5px solid #007bff;
        padding-top: 5px;
        margin-left: 20px;
        margin-bottom: 500px;
    }

    .inputMain{
        margin-top: 15px;
    }

    .plusbtn{
        margin-top: 15px;
        width: 400px;
    }

    .subplusbtn{
        margin-top: 15px;
        width: 405px;
    }

    .subCatagory{
        float:left;
        alignment: left;
    }

    .subCatagorySingle{
        background-color: white;
        height: 60px;
        width: 250px;
        border-radius:10px;
        border: 5px solid #007bff;
        padding-top: 5px;
        margin-left: 20px;
        margin-bottom: 50px;
    }

</style>