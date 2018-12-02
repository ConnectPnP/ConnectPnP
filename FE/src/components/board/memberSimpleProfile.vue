<template>
    <b-card class="memberSimpleProfile"
            border-variant="light">

        <input type="image"
               :src="member.profile_img"
               v-bind:id="`memberSimpleProfile${member.id}`"
               height="150px"
               width="120px"
        />
        <b-popover v-bind:target="`memberSimpleProfile${member.id}`" triggers="hover focus">
            <template slot="title">{{member.name}}</template>
            Age : <strong>{{member.age}}</strong> <br>
            gender : <strong>{{member.gender}}</strong>
        </b-popover>


    </b-card>
</template>

<script>
    export default {
        name: "memberSimpleProfile",
        props: {
            member: {
                id: Number,
                name: String,
                age: Number,
                gender: String,
                profile_img: String
            },
            index: Number
        }
    }
</script>

<style scoped>
    img {
        padding-top: 10px;
        padding-left: 20px;
    }

    .memberSimpleProfile {
        align-self: center;
    }
</style>
