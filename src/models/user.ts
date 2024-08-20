import mongoose from "mongoose";

interface User {
  name: string,
  email: string
}


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  }
});

export const User = mongoose.model<User>("User", userSchema);


