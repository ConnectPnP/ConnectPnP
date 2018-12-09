<template>
    <div class="sc-chat-window" :class="{opened: isOpen, closed: !isOpen}">
        <Header
                :title="title"
                :imageUrl="titleImageUrl"
                :onClose="onClose"
                :colors="colors"
                @userList="handleUserListToggle"
                @groupList="handleGroupListToggle"
        />
        <UserList
                v-if="showUserList && groups.length!=0 "
                :participants="participants"
        />
        <GroupList
                v-if="showGroupList"
                v-on:getCurrentDestId="getCurrentDestId"
                :groups="groups"
                :toggleGroupUI="toggle"
        />
        <MessageList
                v-if="!showUserList && !showGroupList && groups.length!=0"
                :messages="messages"
                :participants="participants"
                :colors="colors"
                :alwaysScrollToBottom="alwaysScrollToBottom"
                :messageStyling="messageStyling"
        />
        <UserInput
                v-if="!showUserList && !showGroupList && groups.length!=0"
                :current_dest_id="current_dest_id"
                :showEmoji="showEmoji"
                :onSubmit="onUserInputSubmit"
                :suggestions="getSuggestions()"
                :showFile="showFile"
                :placeholder="placeholder"
                :colors="colors"/>
    </div>
</template>
<scritp></scritp>
<script>
    /* eslint-disable */
    import Header from './Header.vue'
    import MessageList from './MessageList.vue'
    import UserInput from '../user/UserInput.vue'
    import UserList from '../user/UserList.vue'
    import GroupList from "../group/GroupList"

    export default {
        components: {
            GroupList,
            Header,
            MessageList,
            UserInput,
            UserList
        },
        props: {
            showEmoji: {
                type: Boolean,
                default: false
            },
            showFile: {
                type: Boolean,
                default: false
            },
            participants: {
                type: Array,
                required: true
            },
            groups: {
                type: Array,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            titleImageUrl: {
                type: String,
                default: ''
            },
            onUserInputSubmit: {
                type: Function,
                required: true
            },
            toggleGroupUI: {
                type: Function,
                required: true
            },
            onClose: {
                type: Function,
                required: true
            },
            messageList: {
                type: Array,
                default: () => []
            },
            isOpen: {
                type: Boolean,
                default: () => false
            },
            placeholder: {
                type: String,
                default: 'Write a reply'
            },
            colors: {
                type: Object,
                required: true
            },
            alwaysScrollToBottom: {
                type: Boolean,
                required: true
            },
            messageStyling: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                showUserList: false,
                showGroupList: true,
                current_dest_id: ''
            }
        },
        computed: {
            messages() {
                let messages = this.messageList
                return messages
            }
        },
        methods: {
            handleUserListToggle(showUserList) {
                this.showUserList = !showUserList
            },
            handleGroupListToggle(showGroupList) {
                this.showGroupList = !showGroupList
            },
            getSuggestions() {
                return this.messages.length > 0 ? this.messages[this.messages.length - 1].suggestions : []
            },
            toggle(group_id) {
                this.handleGroupListToggle(true)
                this.toggleGroupUI(group_id)
            },
            getCurrentDestId(_id) {
                this.current_dest_id = _id
            }
        }
    }
</script>
<style scoped>
    .sc-chat-window {
        width: 370px;
        height: calc(100% - 120px);
        max-height: 590px;
        position: fixed;
        right: 25px;
        bottom: 100px;
        box-sizing: border-box;
        box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1);
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: 0.3s ease-in-out;
        border-radius: 10px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        z-index: 10;
    }

    .sc-chat-window.closed {
        opacity: 0;
        visibility: hidden;
        bottom: 90px;
    }

    .sc-message--me {
        text-align: right;
    }

    .sc-message--them {
        text-align: left;
    }

    @media (max-width: 450px) {
        .sc-chat-window {
            width: 100%;
            height: 100%;
            max-height: 100%;
            right: 0px;
            bottom: 0px;
            border-radius: 0px;
        }

        .sc-chat-window {
            transition: 0.1s ease-in-out;
        }

        .sc-chat-window.closed {
            bottom: 0px;
        }
    }
</style>
