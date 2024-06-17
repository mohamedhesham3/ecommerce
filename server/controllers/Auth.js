const jwt = require("jsonwebtoken");
const User = require("../models/User");
const cloudinary = require("../configs/cloudinary.js");
const bcrypt = require("bcrypt");
require("dotenv").config();

const register = async (req, res) => {
  const { Username, Email, Password } = req.body;
  
  const usernameRegex = /^[a-zA-Z0-9_]+$/;

  const Avatar = req.file;
  let AvatarURL = "https://ih1.redbubble.net/image.1380092762.9137/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg";

  try {
    if (Avatar) {
      const uploadedImage = await cloudinary.uploader.upload(Avatar.path, {
        public_id: "user_avatar_" + Username,
      });
      AvatarURL = uploadedImage.url;
    }

    if (!(Username && Email && Password)) {
      return res.status(401).json({ message: "Enter the forms to register" });
    }

    const user = await User.findOne({ Username });
    if (user) {
       return res.status(401).json({ message: "Username is taken." })}
    if(Username.length > 25){
      return res.status(401).json({ message: "too long username" });}
  
  
  
  
  
    if (!usernameRegex.test(Username)) {
      return res.status(400).json({ message: "Username can only contain letters, numbers, and underscores." });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new User({
      Username,
      Email,
      Password: hashedPassword,
      Avatar: AvatarURL,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

 res.cookie('token', token, {
      httpOnly: true, // Ensures the cookie is only accessible via HTTP(S)
      secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
      sameSite: 'None', // Allows the cookie to be sent cross-origin in modern browsers
    });
    
    res.status(200).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};


const login = async (req, res) => {
  const { Username, Password } = req.body;

  try {
    if (!Username || !Password) {
      return res.status(400).send({ message: "Enter Username and Password" });
    }

    const user = await User.findOne({ Username });

    if (!user) {
      return res.status(401).send({ message: "Invalid username" });
    }

    const passwordMatching = await bcrypt.compare(Password, user.Password);

    if (!passwordMatching) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

 res.cookie('token', token, {
      httpOnly: true, // Ensures the cookie is only accessible via HTTP(S)
      secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
      sameSite: 'None', // Allows the cookie to be sent cross-origin in modern browsers
    });

    
    res.status(200).send({ message: "User loggedin successfully", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};

const findUserByID = async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await User.findById(userID);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { register, login, verifyToken, findUserByID };
