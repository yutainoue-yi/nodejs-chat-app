//expressを読み込む
const express = require("express");
//使用できる形へ
const app = express();
const http = require("http");
const { Socket } = require("socket.io");
//サーバーを作成
const server = http.createServer(app);
const io = require("socket.io")(server);
//const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

io.on("connection", (socket) => {
    console.log("ユーザーが接続しました。");

    socket.on("chat message", (msg) => {
        //console.log("メッセージ:" + msg);
        io.emit("chat message", msg);
    });
});

//サーバーを立ち上げる
server.listen(process.env.PORT || 3000, () => {
    console.log("listening on 3000");
})