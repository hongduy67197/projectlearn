const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// user
router.get("/:email/:code", userController.verifyEmail);
router.post("/register", userController.register);
router.put("/:idUser", userController.editUserInfor);
// cart
router.get("/cart", userController.getList);
router.put("/cart/fix", userController.updatecarqua);
router.put("/cart/del", userController.deletacard);
router.get("/productid", userController.getidproduct);
router.get("/:userid", userController.getidcard);
router.put("/cartupdate", userController.updatecart);
// order
router.get("/order/:iduser", userController.getListOrderUser);
router.post("/order", userController.createorder);
module.exports = router;
