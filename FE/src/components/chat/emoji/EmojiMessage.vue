<template>
    <div class="sc-message--emoji">{{data.content}}</div>
</template>

<script>
    import emojichanger from 'node-emoji'
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data(){
            return{
                emoji:''
            }
        },
        created() {
            changeToEmoji:{
                this.data.content=emojichanger.emojify(this.data.content)
            }
        }
    }
</script>

<style scoped>
    .sc-message--emoji {
        font-size: 40px;
    }
</style>
