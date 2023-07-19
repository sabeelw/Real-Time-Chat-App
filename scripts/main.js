const express = require('express');
let app = express();
const http = require('http');
const path = require('path');
const { Server } = require("socket.io")
const htmlfiles = path.dirname(__dirname);
const server = http.createServer(app);
let io = new Server(server)
let rooms = {}
app.get('', (req, res) => {
    console.log()
    res.sendFile(htmlfiles + '/index.html');
});
app.get('/scripts/webrtc.js', (req, res) => {
    console.log()
    res.sendFile(htmlfiles + '/scripts/webrtc.js');
});
app.get('/style/style.css', (req, res) => {

    res.sendFile(htmlfiles + '/style/style.css');
});

io.on('connection', (socket) => {
    socket.on('joinroom', (e) => {

        socket.join(e)
        socket.rooms.forEach((value) => {
            socket.to(value).emit('message', "User has connected" + socket.client.conn.remoteAddress)
        })

    })

    console.log('a user connected ');
    socket.on("disconnect", (e) => {
        socket.rooms.forEach((value) => {
            socket.to(value).emit('message', "User has dicconnected")
            socket.leave(value)
        })
        console.log("user has disconnected")
        console.log(e)
    })
    socket.on('chat message', (e) => {
        socket.rooms.forEach((value) => {
            socket.to(value).emit('message', e)
        })
        console.log(e)})
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});
