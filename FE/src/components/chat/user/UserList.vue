<template>
    <div class="user-list">
        <table class="" style="padding-top: 5px">
            <tbody>
            <tr v-for="user in participants" :key="user.userId">
                <td style="text-align: center; width: 100px; margin-left: 15px"><img :src=user.avatar_path class="img-msg"/></td>
                <td style="text-align: left;">{{user.name}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        props: {
            participants: {
                type: Array,
                required: true
            }
        }
    }
</script>
<style scoped>
    .user-list {
        height: 100%;
        overflow: auto;
        padding-left: 5px;
        padding-top: 8px;
    }
    .img-msg {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-right: 5px;
    }
</style>
