const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/server.config');
const app = express();
const autoIncrement = require('mongoose-auto-increment');
const chat_controller = require('./router/chat')

// [CONFIGURE SERVER PORT]
const port = process.env.PORT || 3000;

// [RUN SERVER]
const server = app.listen(port, function () {
    console.log("Express server has started on port " + port)
});
// [CONFIGURE MONGOOSE]
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

// [CONFIGURE MONGOOSE]
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

// [CONFIGURE MONGOOSE]
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

mongoose.connect(config.dbUrl());

// [CONFIGURE FOR CHAT]
const socketio = require('socket.io');
const cors = require('cors');

// [START SOCKET IO SERVER]
const io = socketio.listen(server);


// [SOCKET CONNECTION]
io.sockets.on('connection', function (socket) {
    console.log('socket 연결 완료')

    // 소켓 객체에 클라이언트 Host, Port 정보 속성으로 추가
    socket.remoteAddress = socket.request.connection.remoteAddress;
    socket.remotePort = socket.request.connection.remotePort;

    var login_ids = {};
    socket.on('login', function (login) {
        // 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가
        console.log('접속한 소켓의 ID : ' + socket.id);
        login_ids[login.id] = socket.id;
        socket.login_id = login.id;

        console.log('접속한 클라이언트 ID 갯수 : %d', Object.keys(login_ids).length);

    });

    socket.on('logout', function (login) {
        console.log('logout 이벤트를 받았습니다.');

        login_ids.splice(login.id, 1)

        console.log('접속한 클라이언트 ID 갯수 : %d', Object.keys(login_ids).length);
    })


    // 'message' 이벤트를 받았을 때의 처리 (
    /**
     command
     chat : 1대1 채팅
     groupchat : 그룹 채팅
     **/
    socket.on('message', function (message) {
        console.log('message 이벤트를 받았습니다.');
        console.dir(message);

        chat_controller.sendMessage(message)

        // command 속성으로 일대일 채팅(chat)과 그룹채팅(groupchat) 구분
        if (message.command == 'chat') {
            // 일대일 채팅 대상에게 메시지 전달
            if (message.dest) {
                io.sockets.connected[login_ids[message.dest]].emit('message', message);

            } else {
            }
        } else if (message.command == 'groupchat') {
            // 방에 들어있는 모든 사용자에게 메시지 전달
            io.to(message.dest).emit('message', message)
        }


    });


    // 'group' 이벤트를 받았을 때의 처리
    //TODO FE create 시, call back 함수에 this.socket.on('group') socket 신호 보내기
    /**
     command
     create : 그룹 채팅방 생성
     update : 그룹 채팅방 변경 사항 적용
     delete : 그룹 채팅방 삭제
     join : 그룹 채팅방 참여
     leave : 그룹 채팅방 나감
     **/
    socket.on('group', function (group) {
        console.log('group 이벤트를 받았습니다.');
        if (group.command === 'create') {
            group = group.result.data
            if (io.sockets.adapter.rooms[group._id]) { // 방이 이미 만들어져 있는 경우
                console.log('방이 이미 만들어져 있습니다.');
            } else {
                console.log('방을 새로 만듭니다.');
                chat_controller.createChatRoom(socket, group)
            }

        }
        //TODO client 단에서 party detail 에 대한 것 수정 시 사용되도록 하기
        else if (group.command === 'update') {
            group = group.result.data

        }
        //TODO 다른 사람이 참여되어있는 방도 바꿀 수 있을까?
        else if (group.command === 'delete') {
            group = group.group
            if (io.sockets.adapter.rooms[group._id]) { // 방이  만들어져 있는 경우
                socket.leave(group._id);
                chat_controller.deleteChatRoom(socket, group)
                delete io.sockets.adapter.rooms[group._id];

            } else {  // 방이  만들어져 있지 않은 경우
                console.log('방이 만들어져 있지 않습니다.');
            }

        } else if (group.command === 'join') {
            group = group.data

            if (!io.sockets.adapter.rooms[group._id]) { // 방이 없는 경우
                console.log('존재하지 않는 방입니다.')
            } else {  // 방이 있는 경우
                chat_controller.joinChatRoom(socket, group)
            }
        } else if (group.command === 'leave') {  // 방 나가기 요청

            if (!io.sockets.adapter.rooms[group.group._id]) { // 방이 없는 경우
                console.log('존재하지 않는 방입니다.');
            } else {  // 방이 있는 경우
                chat_controller.leaveChatRoom(socket, group.group, group.user)
            }

        } else if (group.command === 'group') {
            console.log('채팅방 정보를 찾아옵니다.')
            chat_controller.getRoomList(socket, group.userId)
        }
    });


});
//
// function getRoomList() {
//     console.dir(io.sockets.adapter.rooms);
//
//     var roomList = [];
//
//     Object.keys(io.sockets.adapter.rooms).forEach(function (roomId) {
//         console.log('current room id : ' + roomId);
//         var outRoom = io.sockets.adapter.rooms[roomId];
//
//         // socket 내의 broadcasting으로 뿌려줄 때 쓰는 default room 찾기
//         var foundDefault = false;
//         var index = 0;
//         Object.keys(outRoom).forEach(function (key) {
//             console.log('#' + index + ' : ' + key + ', ' + outRoom[key]);
//
//             if (roomId == key) {  // default room
//                 foundDefault = true;
//                 console.log('this is default room.');
//             }
//             index++;
//         });
//
//         if (!foundDefault) {
//             roomList.push(outRoom);
//         }
//     });
//
//     console.log('[ROOM LIST]');
//     console.dir(roomList);
//
//     return roomList;
// }


const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Connected to mongodb server');
});
autoIncrement.initialize(db);

app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next()
})

//CORS 크로스 도메인 요청을 위한 함수..

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', config.serverFE());

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', require('./router'));
app.use('/files', express.static(__dirname + '/files'));
module.exports = app;

