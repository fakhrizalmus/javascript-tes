const express = require("express");
const router = express.Router();
const restrict = require("../misc/passport");
const {
  getAllItem,
  getItemById,
  createItem,
  deleteItem,
  updateItem,
  updateStatusItem
} = require("../controllers/item.controller");

router.get("/", restrict, getAllItem);
router.post("/", restrict, createItem);
router.get("/:id", restrict, getItemById);
router.delete("/:id", restrict, deleteItem);
router.put("/:id", restrict, updateItem);
router.put("/status/:id", restrict, updateStatusItem);

module.exports = router;
