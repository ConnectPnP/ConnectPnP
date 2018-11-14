<template>
    <div>
        <!--
        로고 이미지
        <img alt="Vue logo" src="../assets/logo.png">-->
    <div class="mainTitleArea">
        <div class="mainTitle">
            Connect PnP
        </div>
    </div>

    <div class="searchArea">
        <form action="">
            <b-input-group >
                <b-form-input></b-form-input>
                <b-input-group-append>
                    <b-btn variant="info">검색</b-btn>
                </b-input-group-append>
            </b-input-group>
        </form>
    </div>




        <!--
        카테고리 정렬을 위한 v-for 함수

            <div  v-for="item in catagoryList" :key="item.id">
            <b-col sm class="catagorySingle">
                <img alt="Vue logo" src="../assets/logo.png" height="120" width="120">
                <a href="url"><span></span></a>
                <p>{{item.catagory_name}}</p>
            </b-col>
        </div>
        -->

        <b-container class="catagoryGroup">
            <b-row>
                <b-col sm class="catagorySingle">
                    <img alt="Vue logo" src="../assets/logo.png" height="120" width="120">
                    <a href="url"><span></span></a>
                    <p>catagory</p>
                </b-col>
                <b-col sm class="catagorySingle">
                    <img alt="Vue logo" src="../assets/logo.png" height="120" width="120">
                    <a href="url"><span></span></a>
                    <p>catagory</p>
                </b-col>
                <b-col sm class="catagorySingle">
                    <img alt="Vue logo" src="../assets/logo.png" height="120" width="120">
                    <a href="url"><span></span></a>
                    <p>catagory</p>
                </b-col>
                <b-col sm class="catagorySingle">
                    <img alt="Vue logo" src="../assets/logo.png" height="120" width="120">
                    <a href="url"><span></span></a>
                    <p>catagory</p>
                </b-col>
                <b-col sm class="catagorySingle">
                    <img alt="Vue logo" src="../assets/logo.png" height="120" width="120">
                    <a href="url"><span></span></a>
                    <p>catagory</p>
                </b-col>

            </b-row>
        </b-container>

        <div>
            <button type="button" class="btn btn-outline-primary moreButton">더보기</button>
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
                <b-card title="Card Title"
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

                <b-card title="Card Title"
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
                    <b-card title="Card Title"
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
                    <b-card title="Card Title"
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
                    <b-card title="Card Title"
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
                </b-card-group>


            </div>


        </div>


    </div>

</template>

<script>


    export default {
        name: "homePage",
        data() {
            return {
                catagoryList: [
                    {id: Number,
                        catagory_name: String,
                        },
                ],
                rankingList: [
                    {id: Number,
                        party_name: String
                    },
                ]
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
        weight: 160px;
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