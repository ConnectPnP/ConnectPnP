<template>
    <b-carousel-slide class="slide">
        <b-container>
            <b-row>
                <b-col>
                    <h3>{{ groupTitle }}</h3>
                    <h4>{{ groupDate }}</h4>
                    <br>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-img class="profileImg" rounded="circle" :src="memberImg"
                        onclick="location.href='/myPage'" />
                </b-col>
                <b-col>
                    <h4>{{ memberNickName }}</h4>
                    <star-rating id="starRating" :rating="starRating" :read-only="true" :star-size="30" :increment="0.5"></star-rating>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <br><br><br>
                </b-col>
            </b-row>
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
        starRating: {
            type: String,
            default() {return "0"}
        },
        groupTitle: {
            type: String,
            default() { return "Title"; }
        },
        groupDate: {
            type: String,
            default() { return "Date"; }
        },
        memberNickName: {
            type: String,
            default() { return "NickName"; }
        },
        memberImg: {
            type: String,
            default() { return "https://www.freeiconspng.com/uploads/no-image-icon-6.png"; }
        }
    },
    data () {
        return {
        }
    }
}
</script>


<style>
.slide {
    height: 350px;
}

.profileImg {
    width: 100px;
    height: 100px;
}

div {
    color: #2c3e50;
}

#starRating {
    margin-bottom: 20px;
}
</style>
