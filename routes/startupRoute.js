const express = require("express");
const {
  createStartup,
  getaStartup,
  getAllStartup,
  updateStartup,
  deleteStartup,
  blockStartup,
  unblockStartup,
  rating,
  uploadImages,
} = require("../controller/startupCtrl");

const {
  isAuthStartOrAdmin,
  isAdmin,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", createStartup);
router.put(
  "/upload/:id",
  authMiddleware,
  uploadPhoto.array("images", 2),
  productImgResize,
  uploadImages,
);
router.get("/:id", getaStartup);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAuthStartOrAdmin, updateStartup);
router.delete("/:id", authMiddleware, isAdmin, deleteStartup);
// router.put('/:id',  authMiddleware, isAdmin, updateProduct);
// router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.put("/block-startup/:id", authMiddleware, isAdmin, blockStartup); //);
router.put("/unblock-startup/:id", authMiddleware, isAdmin, unblockStartup); //);
router.get("/", getAllStartup);

module.exports = router;
