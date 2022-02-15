const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// user
router.post("/register", userController.register);
// cart
router.get("/cart", userController.getList);
router.put("/cart/fix", userController.updatecarqua);
router.put("/cart/del", userController.deletacard);
router.get("/productid", userController.getidproduct);
router.get("/:userid", userController.getidcard);
router.put("/cartupdate", userController.updatecart);
// order
router.get("/orderuser/:iduser", userController.getListOrderUser);
router.post("/order", userController.createorder);
module.exports = router;
