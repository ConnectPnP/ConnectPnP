<template>
    <b-carousel-slide class="joinSlide">
        <b-container>
            <b-row>
                <b-col>
                    <h3>{{ group.groupTitle }}</h3>
                    <h3>{{ group.groupDate }}</h3>
                    <br>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-img class="joinSlideProfileImg" rounded="circle" :src="member.avatar_path"/>
                </b-col>
                <b-col>
                    <h4>{{ member.name }}</h4>
                    <star-rating id="starRating" :rating="ratingCalculate()" :read-only="true" :star-size="30"
                                 :increment="0.5"></star-rating>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <br><br><br>
                </b-col>
            </b-row>
            <b-btn class="joinbtnGroup" :variant="isAccept" :disabled="disabled" size="sm" @click="acceptMember">수락
            </b-btn>
            <b-btn class="joinbtnGroup" :variant="isRefuse" :disabled="disabled" size="sm" @click="refuseMember">거절
            </b-btn>
        </b-container>

    </b-carousel-slide>
</template>

<script>
    import StarRating from 'vue-star-rating'
    import io from 'socket.io-client'
    const config = require('../../server.config');
    export default {
        components: {
            StarRating
        },
        props: {
            member: {
                type:Array
            },
            group: {}
        },
        data() {
            return {
                isAccept: "secondary",
                isRefuse: "secondary",
                disabled: false,
                socket: io.connect(config.serverUrl())
            }
        },
        methods: {
            acceptMember() {
                var vm = this
                this.isAccept = "primary";
                this.disabled = true;
                this.$http.post(config.serverUrl() + 'board/join', {
                    group: this.group.groupId, // 모임 Id
                    user: this.member._id
                }).then((result) => {
                    vm.socket.emit('group', {
                        command: 'join',
                        data: {
                            _id: this.group.groupId,
                            user: result.data
                        }
                    })

                })
            },
            refuseMember() {
                this.isRefuse = "danger";
                this.disabled = true;
                this.$http.post(config.serverUrl() + 'board/cancel', {
                    group: this.group.groupId, // 모임 Id
                    user: this.member._id
                }).then((result) => {
                })
            },
            ratingCalculate() {
                if(this.member.star_rate.divider != 0){
                    return (this.member.star_rate.totalScore)/(this.member.star_rate.divider)/2
                }
                else {
                    return 0
                }
            },
        }

    }
</script>


<style>
    .joinSlide {
        height: 430px;
    }

    .joinSlideProfileImg {
        width: 100px;
        height: 100px;
        cursor: pointer;
    }

    div {
        color: #2c3e50;
    }

    #starRating {
        margin-bottom: 20px;
    }

    .joinbtnGroup {
        width: 100px;
        margin-top: 10px;
        margin-bottom: 30px;
    }
</style>
