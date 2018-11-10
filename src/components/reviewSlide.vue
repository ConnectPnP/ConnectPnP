<template>
    <b-carousel-slide class="slide">
        <b-container>
            <b-row>
                <b-col>
                    <h3>Title</h3>
                    <h4>Date</h4>
                    <br>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-img class="profileImg" rounded="circle" src="https://picsum.photos/1024/480/?image=55" />
                </b-col>
                <b-col>
                    <h4>NickName</h4>
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
