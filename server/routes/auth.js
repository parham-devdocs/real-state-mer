import express from "express";
const router = express.Router()
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";

import User from "../models/User.js";

const multerConfig = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,"public/uploads/")
    },
    filename:function (req,file,cb) {
        cb(null,file.originalname)
    }
})
const upload=multer({storage:multerConfig})
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const profileImage = req.file;
    if (!profileImage) {
      return res.status(400).send("no file uploaded");
    }
    const profileImagePath = profileImage.path;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "user already exists" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword =await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });
    await newUser.save();
console.log(newUser)
   return res.status(200).send("user registered");
  } catch (error) {
    console.log(error);
    res.status(500).send("something unexpected happend in the server");
  }
});


router.post('/login', (req, res) => {
  res.send('hello')
})



export default router