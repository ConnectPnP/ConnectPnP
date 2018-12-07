const chatRoom = require('../models/chat/chatRoom');
const chatMessage = require('../models/chat/chatMessage')
const user = require('../models/user')


exports.createChatRoom = (group) => {

    chatRoom.find({name: group.title, host: group.host}, function (err, existchatRoom) {
        console.log(existchatRoom)
        if (err) {
            console.log(err)
            return null
        }
        //이미 db에 방이 존재하는 경우
        if (existchatRoom.length != 0) {
            console.log("이미 존재하는 방입니다.")
            return null
        }
        //존재하지 않는 경우
        else {
            var participants = [];
            participants.push(group.host)

            var newRoom = new chatRoom({
                name: group.title,
                participants: participants,
                host: group.host
            })
            newRoom.save((err, group) => {
                if (err) {
                    console.log(err)
                    return null
                } else {
                    return group;
                }
            });
        }
    })
};

exports.deleteChatRoom = (group) => {
    chatRoom.delete({id: group.id},
        function (err) {
            if (err) {
                console.log(err)
            }
        })
}

exports.joinChatRoom = (group) => {
    chatRoom.find({id: group.id},
        function (err, room) {
            if (err) {
                console.log(err)
            }
            //새로 참가할 때
            if (!room.participants.includes(global.currentUser.user_code)) {
                room.participants.push(global.currentUser.user_code)
                chatRoom.update({
                    id: group.id
                }, {participants: room.participants})
            }
        })
}

exports.leaveChatRoom = (group) => {
    chatRoom.find({name: group.title, host: group.host.user_code},
        function (err, room) {
            if (err) {
                console.log(err)
            }
            if (room.participants.includes(global.currentUser.user_code)) {
                room.participants.slice(
                    room.participants.indexOf(global.currentUser.user_code))
                chatRoom.update({
                    id: group.id
                }, {participants: room.participants})
            }
        })
}

exports.getRoomList = (socket, userID) => {
    var roomList = []
    var messageList = []

    chatRoom.find({participants: {"$in": [userID]}}).sort({newMessageReceivedDate: 'desc'}).exec(function (err, list) {
        roomList = list

        var room_id_list = roomList.map((room) => {
            return room._id
        })

        chatMessage.find({dest: {"$in": room_id_list}}).sort({dest: 'desc', date: 'asc'}).exec(function (err, list) {
            if (err) {
                console.log(err)
            }
            messageList = list.filter(message => roomList.filter(room => room._id == message.dest) != null)

            var output = {command: 'list', roomList: roomList, messageList: messageList};
            console.log(output)
            // console.log('클라이언트로 보낼 데이터 : ' + JSON.stringify(output));
            socket.emit('group', output)

        })
    })
}

exports.sendMessage = async (message) => {

    if (message.command == 'chat') {
        var newMessage = new chatMessage({
            dest: message.dest,
            author: message.author,
            content: message.data.content,
            type: 'chat',
            group: false
        })
        newMessage.save((err) => {
            console.log(err)
        })
    } else if (message.command == 'groupchat') {
        if (message.type == 'text') {
            console.log("db저장 전")
            var newMessage = new chatMessage({
                dest: message.dest,
                author: message.author,
                content: message.content,
                type: message.type,
                group: true

            })
            newMessage.save((err) => {
                console.log(err)
            })
        }
    }
}

