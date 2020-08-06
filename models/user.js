const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // 중복 방지
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: Number,
    default: 0, //0: 일반 사용자, 1: 관리자
  },
  token: {
    type: String,
  },
});

// 모델명s -> 컬렉션이 만들어짐
module.exports = mongoose.model("user", UserSchema);
