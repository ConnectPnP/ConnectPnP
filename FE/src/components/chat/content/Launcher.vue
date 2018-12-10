<template>
    <div>
        <div class="sc-launcher" :class="{opened: isOpen}" @click.prevent="isOpen ? closeChat() : openChat()"
             :style="{backgroundColor: colors.launcher.bg}">
            <div v-if="newMessagesCount > 0 && !isOpen" class="sc-new-messsages-count">
                {{newMessagesCount}}
            </div>
            <img class="sc-open-icon" src="../../../assets/chat_file/close-icon.png"/>
            <img class="sc-closed-icon" src="../../../assets/chat_file/logo-no-bg.svg"/>
        </div>
        <ChatWindow
                :messageList="messageList"
                :onUserInputSubmit="onMessageWasSent"
                :participants="participants"
                :groups="groups"
                :toggleGroupUI="toggleGroupUI"
                :title="title"
                :titleImageUrl="titleImageUrl"
                :isOpen="isOpen"
                :onClose="closeChat"
                :showEmoji=true
                :showFile=true
                :placeholder='placeholder'
                :colors="colors"
                :alwaysScrollToBottom="alwaysScrollToBottom"
                :messageStyling="messageStyling"
        />
    </div>
</template>
<script>
    /* eslint-disable */
    import ChatWindow from './ChatWindow.vue'
    import availableColors from '../colors'

    export default {
        components: {
            ChatWindow
        },
        data() {
            return {
                colors: {
                    validator: c =>
                        'header' in c
                        && 'bg' in c.header && 'text' in c.header
                        && 'launcher' in c
                        && 'bg' in c.launcher
                        && 'messageList' in c
                        && 'bg' in c.messageList
                        && 'sentMessage' in c
                        && 'bg' in c.sentMessage && 'text' in c.sentMessage
                        && 'receivedMessage' in c
                        && 'bg' in c.receivedMessage && 'text' in c.receivedMessage
                        && 'userInput' in c
                        && 'bg' in c.userInput && 'text' in c.userInput,
                    default: function () {
                        return {
                            header: {
                                bg: '#4e8cff',
                                text: '#ffffff'
                            },
                            launcher: {
                                bg: '#4e8cff'
                            },
                            messageList: {
                                bg: '#ffffff'
                            },
                            sentMessage: {
                                bg: '#4e8cff',
                                text: '#ffffff'
                            },
                            receivedMessage: {
                                bg: '#f4f7f9',
                                text: '#ffffff'
                            },
                            userInput: {
                                bg: '#f4f7f9',
                                text: '#565867'
                            }
                        }
                    }
                },
                //현재 chat 참여 리스트 (userId, name, imgpath 필요)
                participants: [],
                groups: [],
                titleImageUrl: 'http://poooo.ml/data/editor/1810/aa7462a202b36ecf40db2f8e44d4f594_1539011087_018.gif',
                //불러와야하는 message 기록 (type :'text' author:참가자이름, data : 채팅내용 필요)
                chatRoom: [],
                messageList: [],
                newMessagesCount: 0,
                isOpen: false,
                chosenColor: null,
                availableColors,
                alwaysScrollToBottom: false,
                messageStyling: true,
                title: 'Group List'
            }
        },
        created() {
            this.setColor('blue');
            this.$socket.emit('group', {command: "group", type: "group", userId: this.$session.get('id')})
        },
        methods: {
            sendMessage(text) {
                if (text.length > 0) {
                    this.newMessagesCount = this.isOpen ? this.newMessagesCount : this.newMessagesCount + 1
                    this.onMessageWasSent({author: 'support', type: 'text', data: {text}})
                }
            },
            //채팅하고자 하는 group이 바뀔경우 UI 바꾸기
            toggleGroupUI(_id) {

                var chatRoom = this.chatRoom.filter((room) => room.group.group_id == _id)

                this.participants = chatRoom[0].group.participants
                this.messageList = chatRoom[0].messageList
                // this.titleImageUrl = chatRoom[0].group.titleImageUrl
                this.title = chatRoom[0].group.name
            },
            onMessageWasSent(message) {
                // if(this.groups.length!=0){
                //
                // }
                this.$socket.emit('message', message)
            },
            openChat() {
                this.isOpen = true
                this.newMessagesCount = 0
            },
            closeChat() {
                this.isOpen = false
            },
            setColor(color) {
                this.colors = this.availableColors[color]
                this.chosenColor = color
            },
            arrangeChatroom(List) {

                var messageList = {}
                this.groups.forEach((group) => {
                    messageList = List.filter((list) => list.dest == group.group_id)
                    this.chatRoom.push({
                        group: group,
                        messageList: messageList
                    })
                })


            }
        },
        computed: {
            backgroundColor() {
                return this.chosenColor === 'dark' ? this.colors.messageList.bg : '#fff'
            },
            changeTitle() {
                var group = this.groups.filter((group) => group.title === this.title)
                if (!group) {
                    this.title = 'Group List'
                }
            }
        },
        sockets: {
            message(message) {
                this.messageList.push(message)
            },
            group(data) {
                if (data.command == 'list') {
                    this.groups = data.roomList
                    this.arrangeChatroom(data.messageList)
                }
                this.title = 'Group List'
            },
            connect() {
                console.log("소켓 연결")
            },
            disconnect() {
                console.log("소켓 연결 종료")
            }
        },
        }
    }
</script>
<style scoped>
    .sc-launcher {
        width: 60px;
        height: 60px;
        background-position: center;
        background-repeat: no-repeat;
        position: fixed;
        right: 25px;
        bottom: 25px;
        border-radius: 50%;
        box-shadow: none;
        transition: box-shadow 0.2s ease-in-out;
        cursor: pointer;
    }

    .sc-launcher:before {
        content: '';
        position: relative;
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        transition: box-shadow 0.2s ease-in-out;
    }

    .sc-launcher .sc-open-icon,
    .sc-launcher .sc-closed-icon {
        width: 60px;
        height: 60px;
        position: fixed;
        right: 25px;
        bottom: 25px;
        transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
    }

    .sc-launcher .sc-closed-icon {
        transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
        width: 60px;
        height: 60px;
    }

    .sc-launcher .sc-open-icon {
        padding: 20px;
        box-sizing: border-box;
        opacity: 0;
    }

    .sc-launcher.opened .sc-open-icon {
        transform: rotate(-90deg);
        opacity: 1;
    }

    .sc-launcher.opened .sc-closed-icon {
        transform: rotate(-90deg);
        opacity: 0;
    }

    .sc-launcher.opened:before {
        box-shadow: 0px 0px 400px 250px rgba(148, 149, 150, 0.2);
    }

    .sc-launcher:hover {
        box-shadow: 0 0px 27px 1.5px rgba(0, 0, 0, 0.2);
    }

    .sc-new-messsages-count {
        position: absolute;
        top: -3px;
        left: 41px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        background: #ff4646;
        color: white;
        text-align: center;
        margin: auto;
        font-size: 12px;
        font-weight: 500;
    }
</style>
