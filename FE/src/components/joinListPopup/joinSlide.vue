<template>
    <b-carousel-slide class="joinSlide">
        <b-container>
            <b-row>
                <b-col>
                    <h3>{{ group.groupTitle}}</h3>
                    <h3>{{ group.groupDate}}</h3>
                    <br>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-img class="joinSlideProfileImg" rounded="circle" :src="member.avatar_path"/>
                </b-col>
                <b-col>
                    <h4>{{ member.name }}</h4>
                    <star-rating id="starRating" :rating="member.star_rate" :read-only="true" :star-size="30" :increment="0.5"></star-rating>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <br><br><br>
                </b-col>
            </b-row>
                <b-btn class="joinbtnGroup" :variant="isAccept" :disabled="disabled" size="sm" @click="acceptMember">수락</b-btn>
                <b-btn class="joinbtnGroup" :variant="isRefuse" :disabled="disabled" size="sm" @click="refuseMember">거절</b-btn>
        </b-container>

    </b-carousel-slide>
</template>

<script>
import StarRating from 'vue-star-rating'
import io from 'socket.io-client'

export default {
    data(){
        return{
            socket:io.connect('http://localhost:3000')
        }
    },
    components:{
        StarRating
    },
    props: {
        member : [],
        group : {}
    },
    data(){
        return {
            isAccept: "secondary",
            isRefuse: "secondary",
            disabled: false
        }
    },
    methods: {
        acceptMember() {
            this.isAccept = "primary";
            this.disabled = true;
            this.$http.post('http://localhost:3000/board/join', {
                        group: this.group.groupId, // 모임 Id
                        user : this.member._id
                    }).then((result) => {
                        console.log(result)
                        // this.socket.emit('')
                    })
        },
        refuseMember() {
            this.isRefuse = "danger";
            this.disabled = true;
            this.$http.post('http://localhost:3000/board/cancel', {
                        group: this.group.groupId, // 모임 Id
                        user : this.member._id
                    }).then((result) => {
                        console.log(result)
                    })
        }
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
    cursor : pointer;
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
