const { Router } = require("express");
const router = Router();
const ctrl = require("./dailytrain.ctrl");

router.get("/", ctrl.list); // 목록조회
router.post("/", ctrl.create); // 등록
router.put("/:id", ctrl.checkId, ctrl.update); // 수정
router.delete("/:id", ctrl.checkId, ctrl.remove); // 삭제

module.exports = router;
