const { Router } = require("express");
const router = Router();

router.use("/dailytrain", require("./dailytrain"));
router.use("/user", require("./user"));

module.exports = router;
