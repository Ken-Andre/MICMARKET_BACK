const express = require("express");
const {
  createStartup,
  getaStartup,

  getAllStartup,
  updateStartup,
  deleteStartup,
} = require("../controller/startupCtrl");

const {isAuthStartOrAdmin,isAdmin, authMiddleware} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/", createStartup);
router.get("/:id", getaStartup);
router.put("/:id", authMiddleware, isAuthStartOrAdmin, updateStartup);
router.delete("/:id", authMiddleware, isAdmin,deleteStartup);
// router.put('/:id',  authMiddleware, isAdmin, updateProduct);
// router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

router.get('/', getAllStartup);

module.exports = router;
