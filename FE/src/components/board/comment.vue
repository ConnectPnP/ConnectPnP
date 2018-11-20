<template>
    <!--대댓글에 대한 부분을 어떻게 해야할지 생각이 필요-->
    <li>
        <b-row class="comment">
            <b-col cols="1" class="comment-profile">
                <b-img left
                       :src="comment.member.profile_img"
                       rounded="circle" width="75" height="75"
                />
                <b>{{comment.member.name}} </b>
            </b-col>
            <b-col class="comment-content">
                <p>{{comment.content}}</p>
            </b-col>
        </b-row>
    </li>
</template>

<script>
    export default {
        name: "comment",
        props: {
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


</style>
