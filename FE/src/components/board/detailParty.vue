<template>
    <div id="dev-detailParty">
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
                        Location : <b> {{detailPartyInfo.location}}</b><br>
                        Recruitment Period : <b> {{detailPartyInfo.recruitment_period}}</b><br>
                        Party Date : <b> {{detailPartyInfo.party_date}}</b><br>
                        Category : <b> {{detailPartyInfo.category}}</b><br>
                        <!--숫자 슬라이더 바를 통해서 min과 max표시하고 현재 모인 멤버 수를 표현해주는 방식 생각해보기-->
                        Min number of member : <b> {{detailPartyInfo.min}}</b><br>
                        Max number of member : <b> {{detailPartyInfo.max}}</b><br>
                        Cost : <b> {{detailPartyInfo.cost}}</b><br>
                        condition : <b> {{detailPartyInfo.condition}}</b><br>
                        <button class="btn btn-info" id="js-party-join-btn"
                                  size="md"
                        >　Join　
                        </button>
                        
                    </b-card>
                        <button class="btn btn-info" id="js-join-list" size="md">
                            join list
                        </button>
                </b-col>
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
                            <br>Here will be with location map
                        </b-tab>
                    </b-tabs>
                </b-col>
            </b-row>
            <hr>
            <p class="comment-info" style="text-align: left;padding-left: 30px">댓글 수 : {{commentList.length}} 조회수 : 0</p>
            <b-row>
                <b-input-group prepend="Username" v-model="commentContent"
                               style="padding-top: 2px;padding-left: 30px; padding-right: 10px; width: 90%">
                    <b-form-input></b-form-input>
                    <b-input-group-append>
                        <b-btn variant="info" v-on:click="enter"> Enter</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </b-row>
            <b-row>
                <ul>
                    <commentTemplate
                            v-for="comment in commentList" :key="comment.id"
                            :comment="comment"></commentTemplate>
                </ul>
            </b-row>
            <br>

        </b-container>
    </div>
</template>

<script>
    import coverflow from 'vue-coverflow'
    import memberSimpleProfile from './memberSimpleProfile.vue'
    import commentTemplate from './comment.vue'

    export default {
        name: "detailParty",
        components: {
            coverflow,
            memberSimpleProfile,
            commentTemplate,
        },
        data() {
            commentContent: "";
            return {
                commentList: [ // id: number, member: { id, name, age, sex, profile_img}, content: String, depth: number, parentComment:  

                    // {
                    //     id: 1,
                    //     member: {
                    //         id: 1,
                    //         name: "seo",
                    //         age: "23",
                    //         sex: "F",
                    //         profile_img: ""
                    //     },
                    //     content: "This will be fun and " +
                    //         "This is the loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Sentence for the check the layout ",
                    //     depth: 0,
                    //     parentComment: null
                    // },
                    // {
                    //     id: 2,
                    //     member: {
                    //         id: 1,
                    //         name: "ko",
                    //         age: "24",
                    //         sex: "F",
                    //         profile_img: ""
                    //     },
                    //     content: "Yes it will be cool",
                    //     depth: 1,
                    //     parentComment: 1
                    // }
                ],
                coverList: [ 
                    // {cover : String(url)}, { }, { }, ...
                ],

                detailPartyInfo: { 
                    // title: String, location: String, host: String, recruitment_period: String, party_date: String, category: String, min: number, max: number, cost: String, condition: String

                    // title: "Go to Disney Land!",
                    // location: "Japan",
                    // host:"seo",
                    // recruitment_period: "2018-11-17 ~ 2018-11-22",
                    // party_date: "2018-12-01",
                    // category: "travel",
                    // min: 2,
                    // max: 5,
                    // cost: "100000 won",
                    // condition: " under 25 years old"
                },
                tabsInfo: { 
                    // detail: String
                    // members: [{id:number, name:String, age:String, sex:String, profile_img:String(url)}]
                    // detail: "This is for the example of detail info of specific Party",
                    // members: [
                    //     {
                    //         // 멤버 모델에 따른 attribute
                    //         id: 1,
                    //         name: "seo",
                    //         age: "23",
                    //         sex: "F",
                    //         profile_img: ""

                    //     },
                    //     {
                    //         // 멤버 모델에 따른 attribute
                    //         id: 2,
                    //         name: "ko",
                    //         age: "24",
                    //         sex: "F",
                    //         profile_img: ""
                    //     },
                    //     {
                    //         // 멤버 모델에 따른 attribute
                    //         id: 3,
                    //         name: "jo",
                    //         age: "23",
                    //         sex: "F",
                    //         profile_img: ""
                    //     },
                    //     {
                    //         // 멤버 모델에 따른 attribute
                    //         id: 4,
                    //         name: "kim",
                    //         age: "22",
                    //         sex: "F",
                    //         profile_img: """

                    //     },
                    //     {
                    //         // 멤버 모델에 따른 attribute
                    //         id: 5,
                    //         name: "won",
                    //         age: "22",
                    //         sex: "F",
                    //         profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"

                    //     }
                    // ],

                }

            }
        },
        created(){
            var url = window.location.pathname;
            var boardId = url.split('/')[3]; // 이렇게 해도 되나..?

            this.$http.get('http://localhost:3000/board/details/'+boardId)
                .then((result)=>{
                    var data = result.data;
                    console.log(data);
                    this.detailPartyInfo.title = data.title;
                    this.detailPartyInfo.host = data.host;
                    this.detailPartyInfo.location = data.location;
                    this.detailPartyInfo.recruitment_period = data.start_date + " ~ " + data.due_date;
                    this.detailPartyInfo.party_date = data.meeting_date;
                    this.detailPartyInfo.category = data.category_id; // 카테고리 이름 가져와야 함
                    this.detailPartyInfo.min = data.min_num;
                    this.detailPartyInfo.max = data.max_num;
                    this.detailPartyInfo.cost = data.cost;
                    this.detailPartyInfo.condition = data.condition;
                    this.tabsInfo.detail = data.detail;
                    this.tabsInfo.members = data.guest; // 멤버 정보 가져와야함
                    this.commentList = data.comments; // 댓글 가져와야함
                })
        },
        methods: {
            enter(){
                alert(this.commentContent);
                var commentId =  this.commentList; //??
                this.$http.post('http://localhost:3000/board/comments/'+commentId, {
                    // id: ??,
                    member: {
                        // id: ??
                    },
                    content: this.commentContent,
                    depth: 0, // 대댓글 할때는 가변적
                    //parentComment: 
                }).then((result)=>{
                    console.log(result);
                });
            }
        }
    }
</script>

<style scoped>
    #js-party-join-btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    #js-join-list {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

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
    ul {
        list-style-type: none;
    }
    .comment-info{
        font-size: smaller;
    }

</style>
