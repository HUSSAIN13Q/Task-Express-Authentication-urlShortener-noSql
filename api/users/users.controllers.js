const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXP,
  });
  return token;
}

exports.signup = async (req, res, next) => {
  saltRounds = 10;
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    console.log(token);
    res
      .status(201)
      .json({ message: "User created successfully", token: token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "unathentication" });
  try {
    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
