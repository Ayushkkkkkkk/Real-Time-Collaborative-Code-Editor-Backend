import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

  socket.on("editor-message", (data) => {
    io.emit('editor-message', data)
    console.log(data);
  })

  socket.on("chat-message", (data) => {
    io.emit('chat-message', { user: data.user, text: data.text })
    console.log(data);
  })
});

server.listen(4000, () => {
  console.log("Server is running on port 3000 hell yeah biath wohooo");
});
