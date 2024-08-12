"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../User/user");
const app = express_1.default.Router();
app.post("/new", user_1.AddUser);
app.get("/:email", user_1.GetUser);
exports.default = app;
