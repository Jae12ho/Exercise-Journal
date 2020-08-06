const DailyTrainModel = require("../../models/DailyTrain");
const mongoose = require("mongoose");

const checkId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" }).end();
  }
  next();
};

// 목록조회 (localhost:3000/api/dailytrain?limit=10)
// - 성공: limit 수만큼 dailytrain 객체를 담은 배열을 리턴 (200: OK)
// - 실패: limit가 숫자형이 아닐 경우 400 응답 (400: Bad Request)
const list = (req, res) => {
  let limit = req.query.limit || 10; // string
  parseInt(limit, 10); // number

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  DailyTrainModel.find((err, result) => {
    if (err) return res.status(500).end();
    res.render("dailytrain/list", { result, lasttrain: result[0] });
    //res.json(result);
  })

    //.limit(limit)
    .sort({ date: -1 });
  // limit 원하는 갯수만큼 잘라서 보여줌   sort 정렬 { created: -1 } 역순
};

// 등록 (localhost:3000/api/dailytrain)
// - 성공: 입력값으로 dailytrain 객체를 생성 후 배열에 추가 (201: Created)
// - 실패: singer, title 값 누락 시 400 응답 (400: Bad Request)
const create = (req, res) => {
  const { name, nums, sets, date, weight, bodyweight } = req.body;
  if (!name || !sets || !nums || !date)
    return res.status(400).send("필수값이 입력되지 않았습니다.");

  // 1. Model -> Document
  const dailytrain = new DailyTrainModel({
    name,
    nums,
    sets,
    date,
    weight,
    bodyweight,
  });
  dailytrain.save((err, result) => {
    if (err) return res.status(500).send("등록 시 오류가 발생했습니다.");
    res.status(201).json(result);
  });
  // 2. Model
};

// 수정 (localhost:3000/api/dailytrain/:id)
// - 성공: id에 해당하는 객체의 정보를 수정 후 반환 (200:OK)
// - 실패: id가 숫자가 아닐 경우 400 응답 (400: Bad Request)
//        해당하는 id가 없는 경우 404 응답 (404: Not Found)
const update = (req, res) => {
  const id = req.params.id;
  // 1. id가 유효한지 체크

  const { name, nums, sets, date, weight, bodyweight } = req.body;

  DailyTrainModel.findByIdAndUpdate(
    id,
    { name, nums, sets, date, weight, bodyweight },
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send("수정 시 오류가 발생했습니다.");
      if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
      res.json(result);
    }
  );
};

// 삭제 (localhost:3000/api/dailytrain/:id)
// - 성공: id에 해당하는 dailytrain 객체 delete 하고 남은 dailytrain 객체 출력 (200: OK)
// - 실패: id가 숫자가 아닌 경우 (400: Bad Request)
//      해당하는 id가 없는 경우 404 응답 (404: Not Found)
const remove = (req, res) => {
  const id = req.params.id;
  DailyTrainModel.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    res.json(result);
  });
};

module.exports = {
  checkId,
  list,
  create,
  update,
  remove,
};
