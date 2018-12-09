<template>
    <b-card class="memberSimpleProfile"
            border-variant="light">

        <input type="image"
               :src="member.avatar_path"
               v-bind:id="`memberSimpleProfile${member._id}`"
               height="150px"
               width="120px"
        />
        <b-popover v-bind:target="`memberSimpleProfile${member._id}`" triggers="hover focus">
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
            member: {},
            index: Number
        },
        mounted(){
            console.log(this.member);
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
