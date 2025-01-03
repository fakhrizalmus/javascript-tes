const express = require("express");
const router = express.Router();
const User = require("./user.route");
const Checklist = require("./checklist.route");
const Item = require("./item.route");

router.use("/user", User);
router.use("/checklist", Checklist);
router.use("/item", Item);

module.exports = router;
