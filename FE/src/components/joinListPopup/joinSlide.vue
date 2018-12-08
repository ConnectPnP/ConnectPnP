<template>
    <b-carousel-slide class="slide">
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
                    <b-img class="slideProfileImg" rounded="circle" :src="member.avatar_path"/>
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
                <b-btn class="btnGroup" size="sm" variant="primary" @click="acceptMember">수락</b-btn> 
                <b-btn class="btnGroup" size="sm" variant="primary" @click="refuseMember">거절</b-btn> 
        </b-container>

    </b-carousel-slide>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
    components:{
        StarRating
    },
    props: {
        members : [
            {
                _id : {type: Number},
                name : {type : String},
                avatar_path : {type : String},
                gender : {type : String},
                age : {type : Number},
                star_rate : {type : Number}
            }
        ],
        group : {
            groupId : {type : Number},
            groupTitle : {type: String},
            groupDate : {type: String}
        }
    },
    methods: {
        acceptMember() {
            this.$http.post('http://localhost:3000/board/join', {
                        group: this.groupId, // 모임 Id
                        user : this.member._id
                    }).then((result) => {
                        console.log(result)
                    })
        },
        refuseMember() {
            this.$http.post('http://localhost:3000/board/cancel', {
                        group: this.groupId, // 모임 Id
                        user : this.member._id
                    }).then((result) => {
                        console.log(result)
                    })
        }
    }

}
</script>


<style>
.slide {
    height: 350px;
}

.slideProfileImg {
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
</style>
