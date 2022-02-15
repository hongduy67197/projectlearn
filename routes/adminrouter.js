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
router.put("/updateOrder/:idorder", adminController.UpdateOrderinlist);
// catagories
router.post("/catagories", adminController.createCatagories);
router.put("/catagories/:idcatagories", adminController.updateCatagories);
router.delete("/catagories/:idCatagories", adminController.deleteCatagories);
// product
router.get("/searchproduct", adminController.searchProduct);
router.post("/product", upload.single("img"), adminController.createProduct);
// prettier-ignore
router.put("/product/:idProduct", upload.single("img"), adminController.updateProduct);
router.delete("/product/:idProduct", adminController.deleteProduct);

module.exports = router;
