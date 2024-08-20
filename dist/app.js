"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const features_1 = require("./utils/features");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
(0, features_1.connectDB)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/v1/user", userRoutes_1.default);
io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
    socket.on("editor-message", (data) => {
        io.emit('editor-message', data);
        console.log(data);
    });
    socket.on("chat-message", (data) => {
        io.emit('chat-message', data);
        console.log(data);
    });
});
server.listen(4000, () => {
    console.log("Server is running on port 4000 right now yeah");
});
