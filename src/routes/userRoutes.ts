import express from "express"
import { AddUser } from "../User/user";

const app = express.Router();
app.post("/new", AddUser);

export default app
