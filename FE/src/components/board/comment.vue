<template>
    <!--대댓글에 대한 부분을 어떻게 해야할지 생각이 필요-->
    <div>
        <b-row class="comment">
            <b-col cols="1" class="comment-profile">
                <!--<b-img left
                       :src="comment.member.profile_img"
                       rounded="circle" width="75" height="75"
                />
                <b>{{comment.member.name}} </b> -->
            </b-col>
            <b-col class="comment-content">
                <b-form-textarea id="commentModify"
                                class="content"
                                     v-if="isModify"
                                     v-model="comment.content"
                                     :rows="2">
                    </b-form-textarea>
                <p v-if="!isModify" class="content">{{comment.content}}</p>
            </b-col>
            <b-col class="btn">
                <b-btn size="sm" class="btn" variant="secondary"
                                 @click="replyComment">답글</b-btn>
                <b-btn size="sm" class="btn" variant="secondary"
                                 @click="modifyComment">수정</b-btn>
                <b-btn size="sm" class="btn" variant="secondary"
                                 v-if="!isModify" @click="deleteComment">삭제</b-btn>
            </b-col>
        </b-row>
    </div>
</template>

<script>
/* eslint-disable */
    export default {
        name: "comment",
        props: {
            isModify: false,
            comment: {
                _id: String,
                member: {
                    _id: String,
                    name: {
                        type: String,
                        default() { return "noName";}
                    },
                    age: Number,
                    sex: String,
                    profile_img: {
                        type: String,
                        default() { return "http://www.cchannel.com/images/noimg.gif"; }
                    },
                    gender: String,
                },
                content: String,
                depth: Number,
                parentComment: Number,
                createdAt : String
            }
        },
        methods: {
            modifyComment(){
                if(this.isModify){ // 댓글 수정, 댓글 내용 업데이트
                    this.isModify = false;
                    this.$http.post("http://localhost:3000/board/comments/" + this.$route.params.id+ "/"+  this.comment._id, 
                    {
                        content : comment.content,
                    })
                    .then((result) => {
                        window.location.href = "http://localhost:8080/party/detail/" + this.$route.params.id
                    })
                } else { // 댓글 수정기능 활성화
                    this.isModify = true;
                }
            },
            deleteComment(){
                this.$http.delete('http://localhost:3000/board/comments/' + this.$route.params.id+'/'+  this.comment._id)
                .then((result) => {
                    window.location.href = "http://localhost:8080/party/detail/" + this.$route.params.id
                })
            },
            replyComment(){
                    // 답글 달기
            }
        }
    }
</script>

<style scoped>
    .comment {
        padding-top: 30px;
    }

    p {
        text-align: left;
        padding-top: 20px;
        width: 80%;
    }

    b{
        text-align: center;
    }

    .btn {
        text-align: right;
    }

    .content {
        width: 800px;
    }



</style>
