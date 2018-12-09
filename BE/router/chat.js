const chatRoom = require('../models/chat/chatRoom');
const chatMessage = require('../models/chat/chatMessage')
const user = require('../models/user')


exports.createChatRoom = (group) => {

    if (group.type == "group") { // 생성할 chatRoom이 그룹채팅방일 때,
        chatRoom.find({name: group.title, host: group.host._id},
            function (err, existchatRoom) {
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
                    participants.push(group.host._id)

                    var newRoom = new chatRoom({
                        name: group.title,
                        img_path: group.images[0],
                        participants: participants,
                        host: group.host._id
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
            }
        )
    } else if (group.type == "solo") {
        //채팅방이 1:1채팅방일 경우
        user.find({_jd: group.userId}, function (err, existUser) {
            if (err) {
                console.log(err)
                return null
            }
            if (existUser != null) {
                chatRoom.find({name: existUser.name, host: group.host._id}, function (err, existchatRoom) {
                    //이미 db에 방이 존재하는 경우
                    if (existchatRoom.length != 0) {
                        console.log("이미 존재하는 방입니다.")
                        return null
                    }
                    //존재하지 않는 경우
                    else {
                        var participants = [];
                        participants.push(group.host._id)

                        var newRoom = new chatRoom({
                            name: existUser.name,
                            img_path: existUser.avatar_path,
                            participants: participants,
                            host: group.host._id
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
            }
        })
    }
};

exports.deleteChatRoom = (group) => {
    chatRoom.delete({userId: group.userId},
        function (err) {
            if (err) {
                console.log(err)
            }
        })
}

exports.joinChatRoom = (group) => {
    chatRoom.find({userId: group.userId},
        function (err, room) {
            if (err) {
                console.log(err)
            }
            //새로 참가할 때
            if (!room.participants.includes(global.currentUser.user_code)) {
                room.participants.push(global.currentUser.user_code)
                chatRoom.update({
                    userId: group.userId
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
                    userId: group.userId
                }, {participants: room.participants})
            }
        })
}

exports.getRoomList = (socket, id) => {
    var roomList = []
    var messageList = []

    console.log(id)

    chatRoom.find({participants: {"$in": [id]}})
        .populate({path: 'host', model: 'User'})
        .populate({
            path: 'participants', model: 'User',
            options: {sort: {newMessageReceivedDate: 'desc'}}
        })
        .exec(function (err, list) {
            roomList = list

            var room_id_list = roomList.map((room) => {
                return room._id
            })
            room_id_list.forEach((room_id) => {
                socket.join(room_id);
            })

            chatMessage.find({dest: {"$in": room_id_list}})
                .populate({
                    path: 'author', model: 'User',
                    options: {
                        sort: {
                            dest: 'desc',
                            date: 'asc'
                        }
                    }
                })
                .exec(function (err, list) {
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

exports.sendMessage = (message) => {

    if (message.command == 'chat') {
        var newMessage = new chatMessage({
            dest: message.dest,
            author: message.author._id,
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
                author: message.author._id,
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

