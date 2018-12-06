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
                    <b-img class="slideProfileImg" rounded="circle" :src="memberImg" />
                </b-col>
                <b-col>
                    <h4>{{ memberNickName }}</h4>
                    <star-rating id="starRating" :show-rating="false" :star-size="30" :increment="0.5"></star-rating>
                    <b-form-select v-model="selected" :options="options" size="sm" />
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
            selected: null,
            options: [
                { value: null, text: '--멤버 리뷰--', disabled:true},
                { value: 1, text: '매너 좋음'},
                { value: 2, text: '매너 구림'},
                { value: 3, text: '욕설'},
                { value: 4, text: '그냥 좋음'},
                { value: 5, text: '그냥 싫음'},
                { value: 6, text: '잘 모르는 사람'},
            ]
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
}

div {
    color: #2c3e50;
}

#starRating {
    margin-bottom: 20px;
}
</style>
