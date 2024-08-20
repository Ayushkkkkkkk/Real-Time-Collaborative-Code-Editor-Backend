import express from "express"
import { AddUser, GetUser } from "../User/user";

const app = express.Router();
app.post("/new", AddUser);
app.get("/:email", GetUser)

export default app
