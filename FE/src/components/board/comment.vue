<template>
    <!--대댓글에 대한 부분을 어떻게 해야할지 생각이 필요-->
    <div>
        <b-row class="comment">
            <b-col cols="1" class="comment-profile">
                <b-img left
                       :src="comment.member.avatar_path"
                       rounded="circle" width="50px" height="50px"
                />
                <p>{{comment.member.name}} </p>
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
                <b-btn size="sm" class="btn" variant="secondary" v-if="!show && comment.depth == 0"
                       @click="replyComment">답글
                </b-btn>
                <b-btn size="sm" class="btn" variant="secondary"  v-if="currentUser.id == comment.member._id"
                       @click="modifyComment">수정
                </b-btn>
                <b-btn size="sm" class="btn" variant="secondary"  
                       v-if="!isModify && currentUser.id == comment.member._id && comment.depth==0" @click="deleteComment">삭제
                </b-btn>
                <b-btn size="sm" class="btn" variant="secondary"  
                       v-if="!isModify && currentUser.id == comment.member._id && comment.depth==1" @click="deleteReply">삭제
                </b-btn>
            </b-col>
        </b-row>
        <div v-show="show">
            <b-row>
                <b-input-group :prepend=currentUser.nickName style = "padding-left:60px;"> 
                    <b-form-input v-model="reply"></b-form-input>
                    <b-input-group-append>
                        <b-btn variant="info" @click="createReply()"> Enter</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </b-row>
        </div>
        <hr>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        name: "comment",
        props: {
            isModify: false,
            reply : '',
            parentComment: '',
            currentUser: {
                    id: '',
                    user_id: '',
                    nickName: '',
                    age: 14,
                    gender: 'female',
                    profile_img: ''
                },
            comment: {
                _id: String,
                depth : Number,
                member: {
                    _id: String,
                    name: {
                        type: String,
                        default() {
                            return "noName";
                        }
                    },
                    age: Number,
                    sex: String,
                    avatar_path: {
                        type: String,
                        default() {
                            return "http://www.cchannel.com/images/noimg.gif";
                        }
                    },
                    gender: String,
                },
                content: String,
                depth: Number,
                parentComment: Number,
                createdAt: String
            }
        },
        data() {
            return {
                show: false
            }
        },
        methods:
            {
                modifyComment() {
                    if (this.isModify) { // 댓글 수정, 댓글 내용 업데이트
                        this.isModify = false;
                        this.$http.post("http://localhost:3000/board/comments/" + this.$route.params.id + "/" + this.comment._id,
                            {
                                content: this.comment.content,
                            })
                            .then((result) => {
                                window.location.reload();
                            })
                    } else { // 댓글 수정기능 활성화
                        this.isModify = true;
                    }
                }
                ,
                deleteComment() {
                    this.$http.delete('http://localhost:3000/board/comments/' + this.$route.params.id + '/' + this.comment._id)
                        .then((result) => {
                            window.location.reload();
                        })
                }, 
                deleteReply() {
                    this.$http.delete('http://localhost:3000/board/reply/'+this.parentComment + '/' + this.comment._id)
                     .then((result) => {
                            window.location.reload();
                        })
                },
                replyComment() {
                    this.show = true
                },
                createReply() {
                    this.$http.post('http://localhost:3000/board/reply/' + this.comment._id, 
                    {
                        content : this.reply , user_id : this.currentUser.id})
                    .then((result) => {
                        window.location.reload();
                    })
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

    b {
        text-align: center;
    }

    .btn {
        text-align: right;
    }

    .content {
        width: 800px;
    }


</style>
