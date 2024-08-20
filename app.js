const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

app.set("view engine", "ejs");
// app.use('/public',(express.static(path.join(__dirname, "public"))));
app.use(express.static('public', {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));

io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("recieve-location",{id: socket.id, ...data})
    })
   socket.on("disconnect",function(){
    io.emit("user-disconnected",socket.id);
   })
});


app.get("/", function (req, res) {
  res.render("index");
});

server.listen(3000);


