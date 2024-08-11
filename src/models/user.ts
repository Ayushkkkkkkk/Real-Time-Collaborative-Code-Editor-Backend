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
});

export const User = mongoose.model<User>("User", userSchema);


