const express = require("express");
const router = express.Router();
const restrict = require("../misc/passport");
const {
  getAllChecklist,
  getChecklistById,
  createChecklist,
  deleteChecklist,
  updateChecklist,
} = require("../controllers/checklist.controller");

router.get("/", restrict, getAllChecklist);
router.post("/", restrict, createChecklist);
router.get("/:id", restrict, getChecklistById);
router.delete("/:id", restrict, deleteChecklist);
router.put("/:id", restrict, updateChecklist);

module.exports = router;
