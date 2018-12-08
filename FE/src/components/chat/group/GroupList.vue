<template>
    <div class="group-list">
        <div class="sc-header" v-for="group in groups" :key="group._id" style="padding-top: 5px">
            <div>
                <img class="sc-header--img img-msg"
                     :src="group.img_path"
                     @click=""/>
            </div>
            <div class="sc-header--title" :_id=group._id @click="toggle(group._id)" > {{group.name}}</div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "GroupList",
        props: {
            groups: {
                type: Array,
                required: true
            },
            toggleGroupUI: {
                type: Function,
                required: true
            }
        },
        methods:{
            toggle(group_id){
                this.toggleGroupUI(group_id)
                this.$emit('getCurrentDestId',group_id.toString())
            }
        }
    }
</script>

<style scoped>
    .group-list {
        height: 100%;
        overflow: auto;
    }

    .img-msg {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-right: 5px;
    }

    .sc-header--title {
        align-self: center;
        padding: 10px;
        flex: 1;
        user-select: none;
        cursor: pointer;
        border-radius: 5px;
    }

    .sc-header {
        min-height: 75px;
        padding: 10px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
        position: relative;
        box-sizing: border-box;
        display: flex;
    }

    .sc-header--title:hover {
        box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, .1);
    }


</style>
