<template>
    <div id="dev-detailParty">
        <modals-container />
        <b-container>
            <b-row>
                <coverflow :width=480 :coverList="coverList" :coverWidth="260" :index="2"></coverflow>

                <b-col cols="6">
                    <b-card class="text-left"
                            id="js-detailParty-info"
                            border-variant="light"
                    >

                        <h1>{{detailPartyInfo.title}}</h1>

                        <hr>
                        Host : <b> {{detailPartyInfo.host}} </b> <br>
                        Location : <b> {{detailPartyInfo.locationText}}</b><br>
                        Recruitment Period : <b> {{detailPartyInfo.recruitment_period}}</b><br>
                        Party Date : <b> {{detailPartyInfo.party_date}}</b><br>
                        Category : <b> {{detailPartyInfo.category}}</b><br>
                        <!--숫자 슬라이더 바를 통해서 min과 max표시하고 현재 모인 멤버 수를 표현해주는 방식 생각해보기-->
                        Min number of member : <b> {{detailPartyInfo.min}}</b><br>
                        Max number of member : <b> {{detailPartyInfo.max}}</b><br>
                        Cost : <b> {{detailPartyInfo.cost}}</b><br>
                        condition : <b> {{showConditions}}</b><br>
                    </b-card>
                </b-col>
                <b-col>
                    <div class="hostBtnGroup" v-if="isHost">
                            <b-button-group>
                                <b-button class="btn btn-info" id="js-join-list" href="/party/edit">
                                    수정
                                </b-button>
                                <b-button class="btn btn-info" id="js-edit">
                                    삭제
                                </b-button>
                                <b-button class="btn btn-info" id="js-delete" @click="showJoinList">
                                    신청 리스트
                                </b-button>
                            </b-button-group>
                    </div>
                    <!-- <div class="guestBtnGroup"> -->
                    <div class="guestBtnGroup" v-if="!isHost">
                        <b-button v-if="!isJoined" class="btn btn-info" @click="joinParty">참여</b-button>
                        <b-button v-if="isJoined" class="btn btn-info" v-b-modal.exitParty>모임 나가기</b-button>
                        
                        <b-modal id="exitParty" @ok="exitParty" title="모임 나가기">
                            <p>정말 나가시겠습니까?</p>
                        </b-modal>
                    </div>

                </b-col>
            </b-row>
            <b-row>
                
                <b-col>
                    <b-tabs>
                        <b-tab id="tabsInfo-detail" title="Detail" active>
                            <br>{{tabsInfo.detail}}
                        </b-tab>
                        <b-tab title="Members">
                            <b-card-group columns>
                                <memberSimpleProfile v-for="(member,index) in tabsInfo.members" :key="member.id"
                                                     :member="member" :index="index"></memberSimpleProfile>
                            </b-card-group>
                        </b-tab>
                        <b-tab id="tabsInfo-locationMap" title="Location Map">
                            <!-- Here will be with location map -->
                            <br><vue-daum-map :appKey="daumMap.appKey"
                                :center.sync="detailPartyInfo.location"
                                :level.sync="daumMap.level"
                                :mapTypeId="daumMap.mapTypeId"
                                :libraries="daumMap.libraries"
                                @load="onLoad"

                                style="width:500px;height:400px;"
                            />
                        </b-tab>
                    </b-tabs>
                </b-col>
            </b-row>
            <hr>
            <p class="comment-info" style="text-align: left;padding-left: 30px">댓글 수 : {{commentList.length}} 조회수 : 0</p>
            <b-row>
                <b-input-group :prepend=currentUserEx.name
                               style="padding-top: 2px;padding-left: 30px; padding-right: 10px; width: 90%">
                    <b-form-input v-model="commentContent"></b-form-input>
                    <b-input-group-append>
                        <b-btn variant="info" v-on:click="enter">Enter</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </b-row>
            <b-row>
                <div>
                    <commentTemplate
                            v-for="comment in commentList" :key="comment.id"
                            :comment="comment" />
                </div>
            </b-row>
            <br>

        </b-container>
    </div>
</template>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a3cfd8f8c44ef55f94f2fa1a99a18558"></script>
<script>
    import coverflow from 'vue-coverflow'
    import memberSimpleProfile from './memberSimpleProfile.vue'
    import commentTemplate from './comment.vue'
    import VueDaumMap from 'vue-daum-map';
    import JoinList from '../joinListPopup/joinList.vue'

    export default {
        name: "detailParty",
        components: {
            coverflow,
            memberSimpleProfile,
            commentTemplate,
            VueDaumMap,
            JoinList
        },
        data() {
            commentContent: "";
            return {
                boardId:'',
                isHost:false, // host인지 guest인지 
                isJoined:true, // 이 모임에 참여중인지
                currentUserEx:{
                    user_code: 'abcd',
                    name: 'wow',
                    age: 12,
                    gender: 'female',
                    profile_img: 'http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg'
                },
                commentList: [ // id: number, member: { id, name, age, gender, profile_img}, content: String, depth: number, parentComment:  

                    {
                        id: 1,
                        member: {
                            id: 1,
                            name: "seo",
                            age: "23",
                            gender: "F",
                            profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"
                        },
                        content: "This will be fun and " +
                            "This is the loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Sentence for the check the layout ",
                        depth: 0,
                        parentComment: null
                    },
                    {
                        id: 2,
                        member: {
                            id: 1,
                            name: "ko",
                            age: "24",
                            gender: "F",
                            profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"
                        },
                        content: "Yes it will be cool",
                        depth: 1,
                        parentComment: 1
                    }
                ],
                coverList: [ 
                    // {cover : String(url)}, { }, { }, ...
                    { cover : "http://magazine.hankyung.com/magazinedata/images/photo/201707/c3667962b7df3ae222a3306d4d59fc6f.jpg"},
                    { cover : "http://i.011st.com/ex_t/R/400x400/1/85/0/src/pd/17/5/3/4/8/3/5/LxXLR/1784534835_B.jpg"},
                    { cover : "http://adventure.lotteworld.com/common/images/logo.png"}
                    
                ],

                detailPartyInfo: { 
                    // title: String, locationText: String, host: String, recruitment_period: String, party_date: String, category: String, min: number, max: number, cost: String, conditions: String

                    title: "Go to Disney Land!",
                    location: {lat:37.282908, lng:127.046402},
                    locationText: "Japan",
                    host:"seo",
                    recruitment_period: "2018-11-17 ~ 2018-11-22",
                    party_date: "2018-12-01",
                    category: "travel",
                    min: 2,
                    max: 5,
                    cost: "100000 won",
                    conditions: {
                        gender: 'none',
                        age: [0,100]
                    }
                },
                tabsInfo: { 
                    // detail: String
                    // members: [{id:number, name:String, age:String, gender:String, profile_img:String(url)}]
                    
                    detail: "This is for the example of detail info of specific Party",
                    members: [
                        {
                            // 멤버 모델에 따른 attribute
                            id: 1,
                            name: "seo",
                            age: "23",
                            gender: "F",
                            profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"

                        },
                        {
                            // 멤버 모델에 따른 attribute
                            id: 2,
                            name: "ko",
                            age: "24",
                            gender: "F",
                            profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"
                        },
                        {
                            // 멤버 모델에 따른 attribute
                            id: 3,
                            name: "jo",
                            age: "23",
                            gender: "F",
                            profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"
                        },
                        {
                            // 멤버 모델에 따른 attribute
                            id: 4,
                            name: "kim",
                            age: "22",
                            gender: "F",
                            profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"

                        },
                        {
                            // 멤버 모델에 따른 attribute
                            id: 5,
                            name: "won",
                            age: "22",
                            gender: "F",
                            profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"

                        }
                    ],

                },
                daumMap:{
                    appKey: 'a3cfd8f8c44ef55f94f2fa1a99a18558',
                    // center: {lat:37.282908, lng:127.046402},
                    level: 4,
                    mapTypeId: VueDaumMap.MapTypeId.NORMAL,
                    libraries: [],
                    map: null
                }

            }
        },
        created(){
            var url = window.location.pathname;
            this.boardId = url.split('/')[3]; // 이렇게 해도 되나..?

            this.$http.get('http://localhost:3000/board/details/'+boardId)
                .then((result)=>{
                    var data = result.data;
                    console.log(data);
                    this.detailPartyInfo.title = data.title;
                    this.detailPartyInfo.host = data.host;
                    this.detailPartyInfo.location = data.location;
                    this.detailPartyInfo.locationText = data.locationText;
                    this.detailPartyInfo.recruitment_period = data.start_date + " ~ " + data.due_date;
                    this.detailPartyInfo.party_date = data.meeting_date;
                    this.detailPartyInfo.category = data.category_id; // 카테고리 이름 가져와야 함
                    this.detailPartyInfo.min = data.min_num;
                    this.detailPartyInfo.max = data.max_num;
                    this.detailPartyInfo.cost = data.cost;
                    this.detailPartyInfo.conditions = data.conditions;
                    this.tabsInfo.detail = data.detail;
                    this.tabsInfo.members = data.guest; // 멤버 정보 가져와야함
                    this.commentList = data.comments; // 댓글 가져와야함
                })
        },
        computed:{
            showConditions(){
                var condition = '';
                var gender = this.detailPartyInfo.conditions.gender;
                var age = this.detailPartyInfo.conditions.age;
                if(gender == 'none'){
                    condition += '성별 무관, ';
                } else if(gender == 'female'){
                    condition += '성별 : 여성, ';
                } else {
                    condition += '성별 : 남성, ';
                }
                if(age[0] == 0 && age[1] == 100){
                    condition += '나이 무관';
                } else {
                    condition += '나이 : '+ age[0] +'세 이상 ' + age[1]+'세 이하';
                }
                return condition;
            }
        },
        methods: {
            onLoad(map){
                var bounds = map.getBounds();

                var iwContent = '<br><pre> 아주대학교 </pre>'
                var iwPosition = new daum.maps.LatLng(this.detailPartyInfo.location["lat"], this.detailPartyInfo.location["lng"]);
                var marker = new daum.maps.Marker({
                    position: iwPosition,
                    map: map
                });
                var infowindow = new daum.maps.InfoWindow({
                    position: iwPosition,
                    content: iwContent
                });
                infowindow.open(map, marker)
                
            },
            enter(){
                // var commentId =  this.commentList; //?? 어떻게 하는지 물어보기
                // this.$http.post('http://localhost:3000/board/comments/'+commentId, {
                //     // id: ??, 댓글 아이디
                //     member: this.currentUserEx,
                //     content: this.commentContent,
                //     depth: 0, // 대댓글 할때는 가변적
                //     //parentComment: 
                // }).then((result)=>{
                //     console.log(result);
                // });

                // test
                var comment = {
                    id: this.commentList.length +1,
                    member: this.currentUserEx,
                    content: this.commentContent,
                    depth: 0,
                    parentComment: null
                };
                this.commentList.push(comment);
                this.commentContent = '';
            },
            showJoinList(){
                this.$modal.show(JoinList,{
                    // 주최자 정보
                },{
                    name: 'joinList',
                    width: '500px',
                    height: '440px',
                    draggable: true
                })
            },
            joinParty(){
                // 이미 신청 or 가입 되어있는지 확인해야 함

                var condition = this.detailPartyInfo.conditions;
                if(((condition.gender == 'none')||(condition.gender == this.currentUserEx.gender))
                    &&((this.currentUserEx.age >= condition.age[0])&&(this.currentUserEx.age <= condition.age[1]))){
                        //참여 신청 보내기
                        this.$http.post('http://localhost:3000/board/join',{
                            id: this.boardId, // 모임 Id
                            // user 정보
                        })
                        alert("신청 완료 되었습니다.");
                } else {
                    alert("조건에 맞지 않아 참여할 수 없습니다!");
                }
                this.isJoined = true;
            },
            exitParty(){
                // 모임 나가기
                this.isJoined = false;
            }
        }
    }
</script>

<style scoped>
    /* #js-party-join-btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
    } */

    /* #js-join-list {
        position: absolute;
        right: 10px;
        bottom: 10px;
    } */

    #tabsInfo-detail
    {
        text-align: left;
        padding-left: 10px;
    }
    #tabsInfo-locationMap
    {
        text-align: left;
        padding-left: 10px;
    }
    .comment-info{
        font-size: smaller;
    }

    .hostBtnGroup, .guestBtnGroup {
        text-align: right;
    }

</style>
