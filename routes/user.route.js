const express = require("express");
const router = express.Router();
const restrict = require("../misc/passport");
const {
  getAllUser,
  postUser,
  login,
  register,
  getUserById,
} = require("../controllers/user.controller");

router.get("/", getAllUser);
router.post("/", restrict, postUser);
router.post("/login", login);
router.post("/register", register);
router.get("/:id", restrict, getUserById);

module.exports = router;
