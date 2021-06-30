import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const prevUser = await User.findOne({ email });

    if (!prevUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, prevUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { username: prevUser.userName, id: prevUser._id },
      secret
    );

    res.status(200).json({ result: prevUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { userName, lastName, email, password, name } = req.body;

  try {
    const userExist = await User.findOne({ email });
    const usernameExist = await User.findOne({ userName });

    if (userExist)
      return res.status(400).json({ message: "Email already exists" });

    if (usernameExist)
      return res.status(400).json({ message: "Username already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      userName,
      email,
      password: hashedPassword,
      name: `${name} ${lastName}`,
    });

    const token = jwt.sign({ username: result.name, id: result._id }, secret);

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
