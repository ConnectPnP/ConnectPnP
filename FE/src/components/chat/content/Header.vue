<template>
    <div class="sc-header" :style="{background: colors.header.bg, color: colors.header.text}">
        <div>
            <img class="sc-header--img small_img" :src="imageUrl" alt="" @click="toggleGroupList"/>
        </div>
        <div class="sc-header--title" @click="toggleUserList"> {{title}}</div>
        <div class="sc-header--close-button" @click="onClose">
            <img src="../../../assets/chat_file/close-icon.png" alt=""/>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            imageUrl: {
                type: String,
                required: true
            },
            title: {
                type: String
            },
            onClose: {
                type: Function,
                required: true
            },
            colors: {
                type: Object,
                required: true
            }
        },
        methods: {
            toggleUserList() {
                if (this.inGroupList == true) {
                    this.$emit("groupList", this.inGroupList)
                    this.inGroupList = false
                }
                this.$emit("userList", this.inUserList)
                this.inUserList = !this.inUserList
            },
            toggleGroupList() {
                if (this.inUserList == true) {
                    this.$emit("userList", this.inUserList)
                    this.inUserList = false
                }
                this.$emit("groupList", this.inGroupList)
                this.inGroupList = !this.inGroupList
            }
        },
        data() {
            return {
                inUserList: false,
                inGroupList: true
            }
        }
    }
</script>
<style scoped>
    #close-CSS {
        background-image: url('../../../assets/chat_file/chat-group-icon.png');
        border-color: white;
        background-size: 40px 40px;
        padding-left: 10px;
        height: 40px;
        width: 40px;
    }

    button {
        display: inline-block;
        height: 134px;
        padding: 0;
        margin: 0;
        vertical-align: top;
        width: 104px;
    }

    .small_img {
        width: 60px;
        height: 50px;
    }

    .sc-header {
        min-height: 75px;
        border-top-left-radius: 9px;
        border-top-right-radius: 9px;
        padding: 10px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
        position: relative;
        box-sizing: border-box;
        display: flex;
    }

    .sc-header--img {
        border-radius: 50%;
        align-self: center;
        padding: 10px;
    }

    .sc-header--title {
        align-self: center;
        padding: 10px;
        flex: 1;
        user-select: none;
        cursor: pointer;
        border-radius: 5px;
    }

    .sc-header--title:hover {
        box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, .1);
    }

    .sc-header--close-button {
        width: 40px;
        align-self: center;
        height: 40px;
        margin-right: 10px;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 5px;
    }

    .sc-header--close-button:hover {
        box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, .1);
    }

    .sc-header--close-button img {
        width: 100%;
        height: 100%;
        padding: 13px;
        box-sizing: border-box;
    }

    @media (max-width: 450px) {
        .sc-header {
            border-radius: 0px;
        }
    }
</style>
