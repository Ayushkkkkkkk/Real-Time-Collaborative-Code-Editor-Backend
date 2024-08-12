"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = exports.AddUser = void 0;
const user_1 = require("../models/user");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const AddUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        if (!name) {
            return next(new ErrorHandler_1.default("Please enter the name", 400));
        }
        if (!email) {
            return next(new ErrorHandler_1.default("Please enter the email", 400));
        }
        await user_1.User.create({ name, email });
        return res.status(201).json({
            success: true,
            message: "User added successfully",
        });
    }
    catch (e) {
        console.log(e);
        return next(e);
    }
};
exports.AddUser = AddUser;
const GetUser = async (req, res, next) => {
    try {
        const { email } = req.params;
        console.log(email);
        const data = await user_1.User.findOne({ email });
        if (data) {
            return res.status(201).json({
                success: true,
                user: data
            });
        }
        else {
            return next(new ErrorHandler_1.default("User not found ", 400));
        }
    }
    catch (e) {
        return next(e);
    }
};
exports.GetUser = GetUser;
