const mongoose = require("mongoose");

const DailyTrainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  nums: {
    type: Number,
    required: true,
    trim: true,
  },
  sets: {
    type: Number,
    required: true,
    trim: true,
  },
  weight: {
    type: Number,
    required: false,
    trim: true,
  },
  bodyweight: {
    type: Number,
    required: false,
    trim: true,
  },
  date: {
    type: String,
  },
});

// 모델명s -> 컬렉션이 만들어짐
module.exports = mongoose.model("DailyTrain", DailyTrainSchema);
