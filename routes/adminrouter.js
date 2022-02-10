const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../views/assets/img"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
// order
router.get("/listOrder", adminController.getListOrder);
router.put("/updateOrder", adminController.UpdateOrderinlist);
// catagories
router.put("/updatecata", adminController.updateCatagories);
router.post("/createcata", adminController.createCatagories);
router.delete("/deletecata", adminController.deleteCatagories);
// product
router.post("/profile", upload.single("img"), adminController.createProduct);

module.exports = router;
