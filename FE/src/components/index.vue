<template>
    <div id="homePage">
    <modals-container />

    <div class="mainTitleArea">
        <div class="mainTitle">
            Connect PnP
        </div>
    </div>




    <div class="searchArea">
        <form action="#">
            <b-input-group >
                <b-form-input type="text" v-model="searchQuery" placeholder="Search"/>
                <b-input-group-append>
                    <b-btn variant="info" @click="searchGroup(true)">검색</b-btn>
                </b-input-group-append>
            </b-input-group>
        </form>
    </div>

        <!--  카테고리 리스트가 보여지는 부분   -->
        <b-container class="categoryGroup">
            <b-row>
                <div  v-for="item in categoryList" :key="item._id" @click="goCategoryList(item._id)">
                        <b-col sm class="homePageCategory categorySingle">
                        <input type="image"
                               :src="item.img_path"
                               height="120px"
                               width="120px"/>
                        <p>{{item.name}}</p>
                    </b-col>
                </div>
            </b-row>
        </b-container>

        <div>
            <button v-on:click='moreBtn' type="button" class="btn btn-outline-primary moreButton">더보기</button>
        </div>





        <div class="rankingArea">

            <div class>
                <h2>Group Ranking Best 5</h2>
                <h4>인기 모임 순위</h4>
            </div>
            <!--justify-content-md-center-->
            <b-container fluid>
                <b-row class="rankingGroup justify-content-md-center">
                    <div  v-for="item in rankingList" :key="item.id">
                        <b-col class="singleRanking">
                            <b-img fluid :src="item.images[0]" style="max-height: 200px;" alt="Thumbnail" />
                            <div class="singleRankingTitile">{{item.title}}</div>
                            <div class="singleRankingDescription">{{item.location.title}}</div>
                            <router-link :to= "{name: 'detailParty' , params: {id: item._id}}" class="btn-info" tag="b-button">자세히 보기</router-link>
                        </b-col>
                    </div>
                </b-row>
            </b-container>




            <div class>
                <h2>Recommended Group 5</h2>
                <h4>추천 모임 순위</h4>
            </div>
            <!--justify-content-md-center-->
            <b-container fluid>
                <b-row class="rankingGroup justify-content-md-center">
                    <div  v-for="item in recommendedList" :key="item.id">
                        <b-col class="singleRanking">
                            <b-img fluid :src="item.images[0]" style="max-height: 200px;" alt="Thumbnail" />
                            <div class="singleRankingTitile">{{item.title}}</div>
                            <div class="singleRankingDescription">{{item.location.title}}</div>
                            <router-link :to= "{name: 'detailParty' , params: {id: item._id}}" class="btn-info" tag="b-button">자세히 보기</router-link>
                        </b-col>
                    </div>
                </b-row>
            </b-container>

        </div>

    </div>

</template>

<script>
import Review from './reviewPopup/Review.vue'
    var tempimg = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyMS4xNDUgMzIxLjE0NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIxLjE0NSAzMjEuMTQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzIwLjk3MywyMDAuOTgxYy0wLjgtMTguNC00LTM4LjgtOC44LTU4Yy00LjgtMTguNC0xMC44LTM1LjYtMTgtNDguOGMtMjgtNDkuMi01OC40LTQxLjYtOTQuOC0zMiAgICBjLTExLjYsMi44LTI0LDYtMzYuOCw3LjJoLTRjLTEyLjgtMS4yLTI1LjItNC40LTM2LjgtNy4yYy0zNi40LTkuMi02Ni44LTE3LjItOTQuOCwzMi40Yy03LjIsMTMuMi0xMy42LDMwLjQtMTgsNDguOCAgICBjLTQuOCwxOS4yLTgsMzkuNi04LjgsNThjLTAuOCwyMC40LDEuMiwzNS4yLDUuNiw0NS42YzQuNCw5LjYsMTAuOCwxNS42LDE5LjIsMThjNy42LDIsMTYuNCwxLjIsMjUuNi0yLjggICAgYzE1LjYtNi40LDMzLjYtMjAsNTEuMi0zNi40YzEyLjQtMTIsMzUuNi0xOCw1OC44LTE4czQ2LjQsNiw1OC44LDE4YzE3LjYsMTYuNCwzNS42LDMwLDUxLjIsMzYuNGM5LjIsMy42LDE4LDQuOCwyNS42LDIuOCAgICBjOC0yLjQsMTQuOC04LDE5LjItMTguNEMzMTkuNzczLDIzNi41ODEsMzIxLjc3MywyMjEuNzgxLDMyMC45NzMsMjAwLjk4MXogTTMwMS43NzMsMjQwLjk4MWMtMi40LDUuNi01LjYsOC44LTkuNiwxMCAgICBjLTQuNCwxLjItMTAsMC40LTE2LjQtMmMtMTQtNS42LTMwLjQtMTgtNDYuNC0zMy4yYy0xNS4yLTE1LjItNDItMjIuOC02OC44LTIyLjhzLTUzLjYsNy42LTY5LjIsMjJjLTE2LjQsMTUuMi0zMi44LDI4LTQ2LjQsMzMuMiAgICBjLTYuNCwyLjQtMTIsMy42LTE2LjQsMmMtNC0xLjItNy4yLTQuNC05LjYtMTBjLTMuMi03LjYtNC44LTIwLTQtMzguNGMwLjgtMTcuMiwzLjYtMzYuOCw4LjQtNTUuMmM0LjQtMTcuMiwxMC0zMy4yLDE2LjgtNDUuMiAgICBjMjItMzkuNiw0Ny42LTMzLjIsNzgtMjUuMmMxMi40LDMuMiwyNS4yLDYuNCwzOS4yLDcuNmMwLjQsMCwwLjQsMCwwLjgsMGg0LjRjMC40LDAsMC40LDAsMC44LDBjMTQuNC0xLjIsMjcuMi00LjQsMzkuNi03LjYgICAgYzMwLjQtNy42LDU2LTE0LjQsNzgsMjUuMmM2LjgsMTIsMTIuNCwyNy42LDE2LjgsNDUuMmM0LjQsMTguNCw3LjYsMzcuNiw4LjQsNTUuMiAgICBDMzA2Ljk3MywyMjAuMTgxLDMwNS4zNzMsMjMyLjU4MSwzMDEuNzczLDI0MC45ODF6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTIzLjc3MywxMjIuOTgxYy00LTMuNi04LjgtNi40LTE0LjQtNi44Yy0wLjQtNS4yLTIuOC0xMC40LTYuNC0xNGwtMC40LTAuNGMtNC40LTQuNC0xMC02LjgtMTYuNC02LjggICAgYy02LjQsMC0xMi40LDIuOC0xNi40LDYuOGMtMy42LDMuNi02LjQsOC44LTYuOCwxNC40Yy01LjYsMC40LTEwLjQsMi44LTE0LjQsNi40bC0wLjQsMC40Yy00LjQsNC40LTYuOCwxMC02LjgsMTYuNCAgICBjMCw2LjQsMi44LDEyLjQsNi44LDE2LjRjNCw0LDguOCw2LjQsMTQuOCw2LjhjMC40LDUuNiwyLjgsMTAuOCw2LjgsMTQuNGM0LjQsNC40LDEwLDYuOCwxNi40LDYuOGM2LjQsMCwxMi40LTIuOCwxNi40LTYuOCAgICBjMy42LTQsNi40LTguOCw2LjgtMTQuNGM1LjYtMC40LDEwLjgtMi44LDE0LjQtNi44YzQuNC00LjQsNi44LTEwLDYuOC0xNi40QzEzMC41NzMsMTMyLjk4MSwxMjcuNzczLDEyNi45ODEsMTIzLjc3MywxMjIuOTgxeiAgICAgTTExMy43NzMsMTQ1LjM4MWMtMS42LDEuNi0zLjYsMi40LTYsMi40aC01LjZjLTQsMC03LjYsMy4yLTcuNiw3LjZ2NS4yYzAsMi40LTAuOCw0LjQtMi40LDZjLTEuNiwxLjYtMy42LDIuNC02LDIuNCAgICBjLTIuNCwwLTQuNC0wLjgtNi0yLjRjLTEuNi0xLjYtMi40LTMuNi0yLjQtNnYtNS42YzAtNC0zLjItNy42LTcuNi03LjZoLTUuNmMtMi40LDAtNC40LTAuOC02LTIuNGMtMS4yLTEuMi0yLjQtMy4yLTIuNC01LjYgICAgYzAtMi40LDAuOC00LjQsMi40LTZjMCwwLDAsMCwwLjQtMC40YzEuNi0xLjIsMy42LTIsNS42LTJoNS42YzQsMCw3LjYtMy4yLDcuNi03LjZ2LTUuNmMwLTIuNCwwLjgtNC40LDIuNC02ICAgIGMxLjYtMS42LDMuNi0yLjQsNi0yLjRjMi40LDAsNC40LDAuOCw2LDIuNGMwLDAsMCwwLDAuNCwwLjRjMS4yLDEuNiwyLDMuNiwyLDUuNnY1LjZjMCw0LDMuMiw3LjYsNy42LDcuNmg1LjYgICAgYzIuNCwwLDQuNCwwLjgsNiwyLjRjMS42LDEuNiwyLjQsMy42LDIuNCw2QzExNi4xNzMsMTQxLjc4MSwxMTUuMzczLDE0My43ODEsMTEzLjc3MywxNDUuMzgxeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPGNpcmNsZSBjeD0iMjMwLjE3MyIgY3k9IjExMC45ODEiIHI9IjE0IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8Y2lyY2xlIGN4PSIyMzAuMTczIiBjeT0iMTY3Ljc4MSIgcj0iMTQiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxjaXJjbGUgY3g9IjIwMS43NzMiIGN5PSIxMzkuMzgxIiByPSIxNCIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPGNpcmNsZSBjeD0iMjU4LjU3MyIgY3k9IjEzOS4zODEiIHI9IjE0IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
    export default {
        name: 'homePage',
        components:{
            Review
        } ,
        data() {
            return {
                searchQuery :'',
                categoryPage : 0,
                btnclicked:5,
                categoryList: [],
                rankingList: [],
                recommendedList: [],
                id: String,
                usrName: String,
                img: String,
                userInterestedCategory: [],
            }
        },
        beforeMount() {
            this.id = this.$session.get('userID');
        },
        mounted: function() {
            this.getCategoryList();
            this.getGroupRanking();
            //this.getRecommendGroup();
        },
        methods:{
           //"더보기" 버튼이 클릭되면 보여지는 카테고리 수가 5개씩 늘어나도록
            moreBtn(){
                this.categoryPage ++
                this.getCategoryList()
            },
            goCategoryList(categoryId) {
                this.$session.set('category',categoryId);
                window.location.href="http://localhost:8080/party/list"
            },
            searchGroup() {
                this.$session.set('mainQuery',this.searchQuery);
                this.$session.set('category',null);
                window.location.href="http://localhost:8080/party/list"
            },
            getGroupRanking(){
                // 모든 그룹 중에 top 5
                this.$http.get(`http://localhost:3000/home`)
                .then((result) => {
                    this.rankingList = result.data.slice(0,5);

                    if(this.id != null) {
                        // 나의 관심카테고리 중에 top 5
                        this.$http.get('http://localhost:3000/user/details/'+this.id)
                        .then((userInfo) => {

                        // 관심 카테고리 가져오기
                        var catListtemp = [];
                        for(var j=0; j<userInfo.data.categoryList.length; j++){
                            catListtemp.push(userInfo.data.categoryList[j]);
                        }
                        this.userInterestedCategory = catListtemp;

                        var num = 0;
                        var id = this.$session.get('id');

                        for(var i=0; i<result.data.length; i++){
                            if(num == 5) break;
                            if((catListtemp.indexOf(result.data[i].category) != -1) && (result.data[i].host != id)){
                                this.recommendedList.push(result.data[i]);
                                num++;
                            }
                        }
                        });
                    }
                })
            },
            getCategoryList() {
            var vm = this
            this.$http.get('http://localhost:3000/category/list/' + this.categoryPage)
            .then((result) => {
                // get category list
                for(var i = 0; i < result.data.length; i++ ) {
                    vm.categoryList.push(result.data[i])
                }
            })
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

    .categoryGroup{
        width: 1000px;
        position: relative;
    }
    .categorySingle{

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
        margin-bottom: 100px;
        background-color: #d2e8ff;
        padding-top: 100pt;
        padding-bottom: 100pt;
    }

    .rankingGroup{
        width: 100%;
        margin-top: 60px;
    }
    .singleRanking{
        padding:10px;
        background-color: white;
        border:10px solid #d2e8ff;
    }
    .singleRankingTitile{
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 30px;
    }
    .singleRankingDescription{
        max-width: 250px;
        max-height: 30px;
        overflow: hidden;
        font-size: 20px;
        margin-bottom: 20px;
    }
    .rankingSingle{

        margin: 20px 20px;
    }

</style>
