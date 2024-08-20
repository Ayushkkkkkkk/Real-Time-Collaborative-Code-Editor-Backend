import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { UserRequest } from "../types/types";
import ErrorHandler from "../utils/ErrorHandler";




export const AddUser = async (req: Request<{}, {}, UserRequest>, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return next(new ErrorHandler("Please enter the name", 400));
    }

    if (!email) {
      return next(new ErrorHandler("Please enter the email", 400));
    }

    await User.create({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "User added successfully",
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

export const GetUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    console.log(email);
    const data = await User.findOne({ email })

    if (data) {
      return res.status(201).json({
        success: true,
        user: data
      })
    }
    else {
      return next(new ErrorHandler("User not found ", 400))
    }

  }
  catch (e) {
    return next(e);
  }
}


