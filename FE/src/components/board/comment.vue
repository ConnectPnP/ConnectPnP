<template>
    <!--대댓글에 대한 부분을 어떻게 해야할지 생각이 필요-->
    <div>
        <b-row class="comment">
            <b-col cols="1" class="comment-profile">
                <b-img left
                       :src="comment.member.profile_img"
                       rounded="circle" width="75" height="75"
                />
                <b>{{comment.member.name}} </b>
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
                                 @click="modifyComment">수정</b-btn>
                <b-btn size="sm" class="btn" variant="secondary"
                                 v-if="!isModify" @click="deleteComment">삭제</b-btn>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "comment",
        props: {
            isModify: false,
            comment: {
                id: Number,
                member: {
                    id: Number,
                    name: String,
                    age: Number,
                    sex: String,
                    profile_img: String
                },
                content: String,
                depth: Number,
                parentComment: Number
            }
        },
        methods: {
            modifyComment(){
                if(this.isModify){ // 댓글 수정, 댓글 내용 업데이트
                    this.isModify = false;
                } else { // 댓글 수정기능 활성화
                    this.isModify = true;
                }
            },
            deleteComment(){
                    // 댓글 삭제
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
