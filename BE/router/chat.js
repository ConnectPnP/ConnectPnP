const chatRoom = require('../models/chat/chatRoom');
const chatMessage = require('../models/chat/chatMessage')
const user = require('../models/user')


exports.createChatRoom = (socket, group) => {
    chatRoom.find({group_id: group._id},
        function (err, existchatRoom) {
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
                    group_id: group._id,
                    name: group.title,
                    img_path: group.images[0],
                    participants: participants,
                    host: group.host._id
                })
                newRoom.save((err, result) => {
                    if (err) {
                        console.log(err)
                        return null
                    } else {
                        chatRoom.find({group_id: group._id})
                            .populate({path: 'host', model: 'User'})
                            .populate({
                                path: 'participants', model: 'User',
                                options: {sort: {newMessageReceivedDate: 'desc'}}
                            })
                            .exec(function (err, createdGroup) {
                                if (createdGroup) {
                                    socket.join(createdGroup.group_id);
                                    socket.emit('created', createdGroup);
                                    console.log("방이 생성되었습니다")
                                } else {
                                    console.log('방이 생성되지 않았습니다.')
                                }
                            })
                    }
                });

            }
        })

};

exports.deleteChatRoom = (group) => {
    chatRoom.delete({userId: group.userId},
        function (err) {
            if (err) {
                console.log(err)
            }
        })
}

exports.joinChatRoom = (socket, group) => {
    var newMessage = new chatMessage({
        dest: group._id,
        author: group.user._id,
        content: group.user.name+'님이 들어오셨습니다.',
        type: 'system',
        group: true

    })
    newMessage.save((err) => {
        console.log(err)
    })
    chatRoom.findOne({group_id: group._id},
        function (err, room) {
            if (err) {
                console.log(err)
            }
            //새로 참가할 때
            if (!room.participants.includes(group.user._id)) {
                chatRoom.findOneAndUpdate({
                    group_id: group._id
                }, {$push: {participants: group.user._id}}).then((err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        socket.in(group._id).emit('join', group.user)
                        socket.in(group._id).emit('message',newMessage)
                        console.log('채팅방 참여인원으로 등록')
                    }
                })
            } else {
                console.log("이미 참가중인 상태입니다.")
            }

        })
}

exports.leaveChatRoom = (socket, group, user) => {
    var vm = this
    var newMessage = new chatMessage({
        dest: group._id,
        author: user._id,
        content: user.name+'님이 나가셨습니다.',
        type: 'system',
        group: true

    })
    newMessage.save((err) => {
        console.log(err)
    })
    chatRoom.findOne({group_id: group._id},
        function (err, room) {

            if (err) {
                console.log(err)
            }
            if (room.participants.includes(user._id)) {
                chatRoom.findOneAndUpdate({
                    group_id: group._id
                }, {$pull: {participants: user._id}})
                    .exec((err, result) => {
                        if (err) {
                            console.log(err)
                            console.log("채팅방 나가기 불가")
                        } else {
                            socket.leave(group._id, function (err) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    vm.getRoomList(socket, user._id)
                                    socket.in(group._id).emit('message', newMessage)
                                }
                            });
                        }
                    })
            }


        })
}

exports.getRoomList = (socket, id) => {
    var roomList = []
    var messageList = []

    console.log('getRooms')
    chatRoom.find({participants: {"$in": [id]}})
        .populate({path: 'host', model: 'User'})
        .populate({
            path: 'participants', model: 'User',
            options: {sort: {newMessageReceivedDate: 'desc'}}
        })
        .exec(function (err, list) {
            roomList = list

            var room_id_list = roomList.map((room) => {
                return room.group_id
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
                    // console.log('클라이언트로 보낼 데이터 : ' + JSON.stringify(output));
                    socket.emit('leave')
                    socket.emit('group', output)

                })
        })
}

exports.sendMessage =  (message) => {

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

