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
const { checkRoleUser } = require("../middleware/auth");
const upload = multer({ storage: storage });
// user
router.get("/user", checkRoleUser, adminController.getListUser);
router.post("/login", adminController.login);
router.delete("/user/:idUser", adminController.deleteUser);
// order
router.get("/listOrder", checkRoleUser, adminController.getListOrder);
router.put(
  "/updateOrder/:idorder",
  checkRoleUser,
  adminController.UpdateOrderinlist
);
// catagories
router.post("/catagories", checkRoleUser, adminController.createCatagories);
router.put(
  "/catagories/:idcatagories",
  checkRoleUser,
  adminController.updateCatagories
);
router.delete(
  "/catagories/:idCatagories",
  checkRoleUser,
  adminController.deleteCatagories
);
// product
router.get("/searchproduct", checkRoleUser, adminController.searchProduct);
// prettier-ignore
router.post("/productandcode", upload.single("img"), checkRoleUser, adminController.createProductandProductCOde);
router.post(
  "/product",
  upload.single("img"),
  checkRoleUser,
  adminController.createProduct
);
// prettier-ignore
router.put("/product/:idProduct", upload.single("img"), checkRoleUser, adminController.updateProduct);
router.delete(
  "/product/:idProduct",
  checkRoleUser,
  adminController.deleteProduct
);

module.exports = router;
