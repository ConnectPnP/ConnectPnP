<template>
    <div id="dev-detailParty">
        <b-container>
            <b-row>
                <coverflow :width=480 :coverList="detailPartyInfo.images" :coverWidth="260" :index="2"></coverflow>

                <b-col cols="6">
                    <b-card class="text-left"
                            id="js-detailParty-info"
                            border-variant="light"
                    >
                        <h1>{{detailPartyInfo.title}}</h1>

                        <hr>
                        Organizer : <b> {{detailPartyInfo.host}} </b> <br>
                        Location : <b> {{detailPartyInfo.location}}</b><br>
                        Recruitment Period : <b> {{detailPartyInfo.start_date}} ~ {{detailPartyInfo.due_date}}</b><br>
                        Party Date : <b> {{detailPartyInfo.meeting_date}}</b><br>
                        Category : <b> {{detailPartyInfo.category}}</b><br>
                        <!--숫자 슬라이더 바를 통해서 min과 max표시하고 현재 모인 멤버 수를 표현해주는 방식 생각해보기-->
                        Min number of member : <b> {{detailPartyInfo.min_num}}</b><br>
                        Max number of member : <b> {{detailPartyInfo.max_num}}</b><br>
                        Cost : <b> {{detailPartyInfo.cost}}</b><br>
                        condition : <b> {{detailPartyInfo.condition}}</b><br>
                        <button class="btn btn-info" id="js-party-join-btn"
                                  size="md"
                        >　Join　
                        </button>
                    </b-card>

                </b-col>
                <b-col>
                    <b-tabs>
                        <b-tab id="tabsInfo-detail" title="Detail" active>
                            <br>참여하는 Guest 정보
                        </b-tab>
                        <b-tab title="Members">
                            <b-card-group columns>
                                <memberSimpleProfile v-for="(member,index) in detailPartyInfo.guest" :key="member._id"
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
            <!--<p class="comment-info" style="text-align: left;padding-left: 30px">댓글 수 : {{detailPartyInfo.comments.length}} 조회수 : 0</p>-->
            <b-row>
                <b-input-group prepend="Username"
                               style="padding-top: 2px;padding-left: 30px; padding-right: 10px; width: 90%">
                    <b-form-input></b-form-input>
                    <b-input-group-append>
                        <b-btn variant="info"> Enter</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </b-row>
            <b-row>
                <ul>
                    <commentTemplate
                            v-for="comment in detailPartyInfo.comments" :key="comment._id"
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
            return {
                detailPartyInfo : {},
                // commentList: [
                //     {
                //         id: 1,
                //         member: {
                //             id: 1,
                //             name: "seo",
                //             age: "23",
                //             sex: "F",
                //             profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"
                //         },
                //         content: "This will be fun and " +
                //             "This is the loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Sentence for the check the layout ",
                //         depth: 0,
                //         parentComment: null
                //     },
                //     {
                //         id: 2,
                //         member: {
                //             id: 1,
                //             name: "ko",
                //             age: "24",
                //             sex: "F",
                //             profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"
                //         },
                //         content: "Yes it will be cool",
                //         depth: 1,
                //         parentComment: 1
                //     }
                // ],
                // coverList: [
                //     {
                //         cover: 'http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg',

                //     }, {
                //         cover: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg",
                //     }, {
                //         cover: 'http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg',
                //     }, {
                //         cover: 'http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg',
                //     }, {
                //         cover: 'http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg',
                //     }
                // ],

                // detailPartyInfo: {
                //     title: "Go to Disney Land!",
                //     location: "Japan",
                //     organizer:"seo",
                //     recruitment_period: "2018-11-17 ~ 2018-11-22",
                //     party_date: "2018-12-01",
                //     category: "travel",
                //     min: 2,
                //     max: 5,
                //     cost: "100000 won",
                //     condition: " under 25 years old"
                // },
                // tabsInfo: {
                //     detail: "This is for the example of detail info of specific Party",
                //     members: [
                //         {
                //             // 멤버 모델에 따른 attribute
                //             id: 1,
                //             name: "seo",
                //             age: "23",
                //             sex: "F",
                //             profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"

                //         },
                //         {
                //             // 멤버 모델에 따른 attribute
                //             id: 2,
                //             name: "ko",
                //             age: "24",
                //             sex: "F",
                //             profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"
                //         },
                //         {
                //             // 멤버 모델에 따른 attribute
                //             id: 3,
                //             name: "jo",
                //             age: "23",
                //             sex: "F",
                //             profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"
                //         },
                //         {
                //             // 멤버 모델에 따른 attribute
                //             id: 4,
                //             name: "kim",
                //             age: "22",
                //             sex: "F",
                //             profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"

                //         },
                //         {
                //             // 멤버 모델에 따른 attribute
                //             id: 5,
                //             name: "won",
                //             age: "22",
                //             sex: "F",
                //             profile_img: "http://image.chosun.com/sitedata/image/201809/20/2018092000716_0.jpg"

                //         }
                //     ],

                // }

            }
        },
        methods: {
            getPartyDetail () {
                var vm = this
                this.$http.get('http://localhost:3000/board/details/' + this.$route.params.id)
                .then((result) => {
                    vm.detailPartyInfo = result.data
                })
            }
        },
        mounted() {
        this.getPartyDetail()
    }
    }
</script>

<style scoped>
    #js-party-join-btn {
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
