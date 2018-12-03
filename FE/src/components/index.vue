<template>
    <div id="homePage">
        <!--
        로고 이미지
        <img alt="Vue logo" src="../assets/logo.png">-->

    <div class="mainTitleArea">
        <div class="mainTitle">
            Connect PnP
        </div>
    </div>

    <div class="searchArea">
        <form action="#">
            <b-input-group >
                <b-form-input></b-form-input>
                <b-input-group-append>
                    <b-btn variant="info">검색</b-btn>
                </b-input-group-append>
            </b-input-group>
        </form>
    </div>

        <!--  카테고리 리스트가 보여지는 부분   -->
        <b-container class="catagoryGroup">
            <b-row>
                <div  v-for="item in catagoryList" :key="item.id">
                    <div v-if="item.id<=btnclicked">
                        <b-col sm class="homePageCatagory catagorySingle">
                        <input type="image"
                               :src="item.catagoryImg"
                               height="120px"
                               width="120px"/>
                        <b-link :href="item.catagoryURL"><span></span></b-link>
                        <p>{{item.catagoryName}}</p>
                    </b-col>
                    </div>
                </div>
            </b-row>
        </b-container>

        <div>
            <button v-on:click='moreBtn' type="button" class="btn btn-outline-primary moreButton">더보기</button>
        </div>



        <!--
       랭킹5 정렬을 위한 v-for 함수

          <div  v-for="item in rankingList" :key="item.id">
            <b-card title={{item.party_name}}
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2 rankingSingle">
                <p class="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
        </div>
       -->


        <div class="rankingArea">
            <div class>
                <h2>Ranking Best 5</h2>
                <h4>인기 모임 순위</h4>
            </div>

            <div class="rankingGroup">
                <b-card-group>
                <div  v-for="item in rankingList" :key="item.id">
                 <b-card :title="item.title"
                        :img-src="item.images[0]"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 260px;"
                        class="mb-2 rankingSingle">
                    <p class="card-text">
                        {{item.condition}}
                        <!-- {{item.images[0]}}  -->
                    </p>
                    <b-button href="#" variant="primary">참여하기</b-button>
                </b-card>
                </div>
                </b-card-group>
            </div>


        </div>


    </div>

</template>

<script>
    var tempimg = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyMS4xNDUgMzIxLjE0NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIxLjE0NSAzMjEuMTQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzIwLjk3MywyMDAuOTgxYy0wLjgtMTguNC00LTM4LjgtOC44LTU4Yy00LjgtMTguNC0xMC44LTM1LjYtMTgtNDguOGMtMjgtNDkuMi01OC40LTQxLjYtOTQuOC0zMiAgICBjLTExLjYsMi44LTI0LDYtMzYuOCw3LjJoLTRjLTEyLjgtMS4yLTI1LjItNC40LTM2LjgtNy4yYy0zNi40LTkuMi02Ni44LTE3LjItOTQuOCwzMi40Yy03LjIsMTMuMi0xMy42LDMwLjQtMTgsNDguOCAgICBjLTQuOCwxOS4yLTgsMzkuNi04LjgsNThjLTAuOCwyMC40LDEuMiwzNS4yLDUuNiw0NS42YzQuNCw5LjYsMTAuOCwxNS42LDE5LjIsMThjNy42LDIsMTYuNCwxLjIsMjUuNi0yLjggICAgYzE1LjYtNi40LDMzLjYtMjAsNTEuMi0zNi40YzEyLjQtMTIsMzUuNi0xOCw1OC44LTE4czQ2LjQsNiw1OC44LDE4YzE3LjYsMTYuNCwzNS42LDMwLDUxLjIsMzYuNGM5LjIsMy42LDE4LDQuOCwyNS42LDIuOCAgICBjOC0yLjQsMTQuOC04LDE5LjItMTguNEMzMTkuNzczLDIzNi41ODEsMzIxLjc3MywyMjEuNzgxLDMyMC45NzMsMjAwLjk4MXogTTMwMS43NzMsMjQwLjk4MWMtMi40LDUuNi01LjYsOC44LTkuNiwxMCAgICBjLTQuNCwxLjItMTAsMC40LTE2LjQtMmMtMTQtNS42LTMwLjQtMTgtNDYuNC0zMy4yYy0xNS4yLTE1LjItNDItMjIuOC02OC44LTIyLjhzLTUzLjYsNy42LTY5LjIsMjJjLTE2LjQsMTUuMi0zMi44LDI4LTQ2LjQsMzMuMiAgICBjLTYuNCwyLjQtMTIsMy42LTE2LjQsMmMtNC0xLjItNy4yLTQuNC05LjYtMTBjLTMuMi03LjYtNC44LTIwLTQtMzguNGMwLjgtMTcuMiwzLjYtMzYuOCw4LjQtNTUuMmM0LjQtMTcuMiwxMC0zMy4yLDE2LjgtNDUuMiAgICBjMjItMzkuNiw0Ny42LTMzLjIsNzgtMjUuMmMxMi40LDMuMiwyNS4yLDYuNCwzOS4yLDcuNmMwLjQsMCwwLjQsMCwwLjgsMGg0LjRjMC40LDAsMC40LDAsMC44LDBjMTQuNC0xLjIsMjcuMi00LjQsMzkuNi03LjYgICAgYzMwLjQtNy42LDU2LTE0LjQsNzgsMjUuMmM2LjgsMTIsMTIuNCwyNy42LDE2LjgsNDUuMmM0LjQsMTguNCw3LjYsMzcuNiw4LjQsNTUuMiAgICBDMzA2Ljk3MywyMjAuMTgxLDMwNS4zNzMsMjMyLjU4MSwzMDEuNzczLDI0MC45ODF6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTIzLjc3MywxMjIuOTgxYy00LTMuNi04LjgtNi40LTE0LjQtNi44Yy0wLjQtNS4yLTIuOC0xMC40LTYuNC0xNGwtMC40LTAuNGMtNC40LTQuNC0xMC02LjgtMTYuNC02LjggICAgYy02LjQsMC0xMi40LDIuOC0xNi40LDYuOGMtMy42LDMuNi02LjQsOC44LTYuOCwxNC40Yy01LjYsMC40LTEwLjQsMi44LTE0LjQsNi40bC0wLjQsMC40Yy00LjQsNC40LTYuOCwxMC02LjgsMTYuNCAgICBjMCw2LjQsMi44LDEyLjQsNi44LDE2LjRjNCw0LDguOCw2LjQsMTQuOCw2LjhjMC40LDUuNiwyLjgsMTAuOCw2LjgsMTQuNGM0LjQsNC40LDEwLDYuOCwxNi40LDYuOGM2LjQsMCwxMi40LTIuOCwxNi40LTYuOCAgICBjMy42LTQsNi40LTguOCw2LjgtMTQuNGM1LjYtMC40LDEwLjgtMi44LDE0LjQtNi44YzQuNC00LjQsNi44LTEwLDYuOC0xNi40QzEzMC41NzMsMTMyLjk4MSwxMjcuNzczLDEyNi45ODEsMTIzLjc3MywxMjIuOTgxeiAgICAgTTExMy43NzMsMTQ1LjM4MWMtMS42LDEuNi0zLjYsMi40LTYsMi40aC01LjZjLTQsMC03LjYsMy4yLTcuNiw3LjZ2NS4yYzAsMi40LTAuOCw0LjQtMi40LDZjLTEuNiwxLjYtMy42LDIuNC02LDIuNCAgICBjLTIuNCwwLTQuNC0wLjgtNi0yLjRjLTEuNi0xLjYtMi40LTMuNi0yLjQtNnYtNS42YzAtNC0zLjItNy42LTcuNi03LjZoLTUuNmMtMi40LDAtNC40LTAuOC02LTIuNGMtMS4yLTEuMi0yLjQtMy4yLTIuNC01LjYgICAgYzAtMi40LDAuOC00LjQsMi40LTZjMCwwLDAsMCwwLjQtMC40YzEuNi0xLjIsMy42LTIsNS42LTJoNS42YzQsMCw3LjYtMy4yLDcuNi03LjZ2LTUuNmMwLTIuNCwwLjgtNC40LDIuNC02ICAgIGMxLjYtMS42LDMuNi0yLjQsNi0yLjRjMi40LDAsNC40LDAuOCw2LDIuNGMwLDAsMCwwLDAuNCwwLjRjMS4yLDEuNiwyLDMuNiwyLDUuNnY1LjZjMCw0LDMuMiw3LjYsNy42LDcuNmg1LjYgICAgYzIuNCwwLDQuNCwwLjgsNiwyLjRjMS42LDEuNiwyLjQsMy42LDIuNCw2QzExNi4xNzMsMTQxLjc4MSwxMTUuMzczLDE0My43ODEsMTEzLjc3MywxNDUuMzgxeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPGNpcmNsZSBjeD0iMjMwLjE3MyIgY3k9IjExMC45ODEiIHI9IjE0IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8Y2lyY2xlIGN4PSIyMzAuMTczIiBjeT0iMTY3Ljc4MSIgcj0iMTQiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxjaXJjbGUgY3g9IjIwMS43NzMiIGN5PSIxMzkuMzgxIiByPSIxNCIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPGNpcmNsZSBjeD0iMjU4LjU3MyIgY3k9IjEzOS4zODEiIHI9IjE0IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
    export default {
        name: 'homePage',
        components:{

        } ,
        data() {
            return {
                btnclicked:5,
                catagoryList: [
                    {   id: 1,
                        catagoryName: "catagory1",
                        catagoryImg:tempimg,
                        catagoryURL:'http://www.naver.com'
                        },
                    {   id: 2,
                        catagoryName: "catagory2",
                        catagoryImg:tempimg,
                        catagoryURL:'http://www.naver.com'
                    },
                    {   id: 3,
                        catagoryName: "catagory3",
                        catagoryImg:tempimg,
                        catagoryURL:'http://www.naver.com'
                    },
                    {   id: 4,
                        catagoryName: "catagory4",
                        catagoryImg:tempimg,
                        catagoryURL:'http://www.naver.com'
                    },
                    {   id: 5,
                        catagoryName: "catagory5",
                        catagoryImg:tempimg,
                        catagoryURL:'http://www.naver.com'
                    },
                    {   id: 6,
                        catagoryName: "catagory6",
                        catagoryImg:tempimg,
                        catagoryURL:'http://www.naver.com'
                    },
                    {   id: 7,
                        catagoryName: "catagory7",
                        catagoryImg:tempimg,
                        catagoryURL:'http://www.naver.com'
                    }
                ],
                rankingList: []
            }
        },
        beforeMount() {
            this.$http.get(`http://localhost:3000/home`).then((result) => {
                console.log(result);
                this.rankingList = result.data;
            })
        },
        methods:{
           //"더보기" 버튼이 클릭되면 보여지는 카테고리 수가 5개씩 늘어나도록
            moreBtn(){
                this.btnclicked+=5;
            }
        }
    }
</script>

<style scoped>

    span{
        position:absolute;
        width:100%;
        height:100%;
        top:0;
        left: 0;

        z-index: 1;
    }

    .mainTitleArea{
        width: 100%;
        height: 200px;
        position: relative;

    }
    .mainTitle{
        color: #000000;
        font-size: 80px;
        font-weight: bold;
        padding-bottom: 30px;
        margin-top: 200px;
    }

    .searchArea{
        width: 50%;
        margin-left: 25%;
        padding-bottom: 50px;
    }

    .catagoryGroup{
        width: 1000px;

        position: relative;
    }
    .catagorySingle{

        height: 160px;
        width: 160px;
        background-color: #007bff;
        margin: 20px 20px;
        text-align: center;
        color:white;
    }

    .moreButton{
        margin: 50px 20px;
    }

    .rankingArea{
        width: 100%;
        height: 1000px;
        position: relative;
        background-color: #d2e8ff;
        padding-top: 100pt;
        padding-bottom: 100pt;
    }

    .rankingGroup{
        width:100%;
        margin-top: 150px;

    }

    .rankingSingle{
        margin: 20px 20px;
    }

</style>