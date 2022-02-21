const productModel = require("../models/productSchema");
const usersModel = require("../models/usersSchema");
const catagoriesModel = require("../models/catagoriesSchema");
const cartstModel = require("../models/cartsSchema");
const ordersModel = require("../models/ordersSchema");
const productCodeModel = require("../models/productCodesSchema");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { comparePassword } = require("../services/auth");
exports.getListOrder = async function (req, res) {
  try {
    let listAllOrder = await ordersModel
      .find()
      .populate("listProducts.idproduct")
      .populate("iduser")
      .sort("createDate");
    let listStatus = [
      {
        title: "Waiting",
        value: "waiting",
      },
      {
        title: "Doing",
        value: "doing",
      },
      {
        title: "Done",
        value: "done",
      },
    ];

    // res.render("list-order-admin.ejs", { listAllOrder, listStatus });
    // console.log(listAllOrder[0].iduser[0].username);
    res.json(listAllOrder);
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateOrderinlist = async function (req, res) {
  try {
    let updateOrder = await ordersModel.updateOne(
      { _id: req.params.idorder },
      {
        status: req.body.status,
      }
    );
    res.json(updateOrder);
  } catch (error) {
    console.log(error);
  }
};
exports.createCatagories = async function (req, res) {
  try {
    let { catagoriesName } = req.body;
    let searchcata = await catagoriesModel.findOne({ catagoriesName });
    if (searchcata) {
      res.json("da co phan loai nay");
    } else {
      let newCatagories = await catagoriesModel.create({
        catagoriesName: catagoriesName,
      });
      res.json("tao moi thanh cong ", newCatagories);
    }
  } catch (error) {
    res.json(error);
  }
};

exports.updateCatagories = async function (req, res) {
  try {
    let updateCata = await catagoriesModel.updateOne(
      { _id: req.params.idcatagories },
      {
        catagoriesName: req.body.catagoriesName,
      }
    );
    res.json(updateCata);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCatagories = async function (req, res) {
  try {
    let deleteCata = await catagoriesModel.deleteOne({
      _id: req.params.idCatagories,
    });
    req.json(deleteCata);
  } catch (error) {
    console.log(error);
  }
};

exports.searchProduct = async function (req, res) {
  try {
    let searchProductList = await productModel.find({
      productName: { $regex: `.*${req.query.search}*` },
    });
    res.json(searchProductList);
  } catch (error) {
    console.log(error);
  }
};

exports.createProductandProductCOde = async function (req, res) {
  try {
    let index = req.file.path.indexOf("assets");
    let link = "/pub/" + req.file.path.slice(index, req.file.path.length);
    let newProductCode = await productCodeModel.create({
      productCode: req.body.productCode,
    });
    let newProduct = await productModel.create({
      idCatagories: req.body.idCatagories,
      productName: req.body.productName,
      productCode: newProductCode.productCode,
      ListImg: link,
      price: req.body.price,
      quality: req.body.quality,
      info: req.body.info,
      description: req.body.description,
      color: req.body.color,
      size: req.body.size,
      createDate: new Date(),
    });
    res.json(newProduct);
  } catch (error) {
    console.log(error);
  }
};
exports.createProduct = async function (req, res) {
  try {
    let index = req.file.path.indexOf("assets");
    let link = "/pub/" + req.file.path.slice(index, req.file.path.length);
    let newProduct = await productModel.create({
      idCatagories: req.body.idCatagories,
      productName: req.body.productName,
      productCode: req.body.productCode,
      ListImg: link,
      price: req.body.price,
      quality: req.body.quality,
      description: req.body.description,
      color: req.body.color,
      size: req.body.size,
      createDate: new Date(),
    });
    res.json(newProduct);
  } catch (error) {
    console.log(error);
  }
};

exports.updateProduct = async function (req, res) {
  try {
    let index = req.file.path.indexOf("assets");
    let newlink = "/pub/" + req.file.path.slice(index, req.file.path.length);
    let fixProduct = await productModel.updateOne(
      { _id: req.params.idProduct },
      {
        idCatagories: req.body.idCatagories,
        productName: req.body.productName,
        productCode: req.body.productCode,
        ListImg: newlink,
        price: req.body.price,
        quality: req.body.quality,
        description: req.body.description,
        color: req.body.color,
        size: req.body.size,
      }
    );
    res.json(fixProduct);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async function (req, res) {
  try {
    let disProduct = await productModel.deleteOne({
      _id: req.params.idProduct,
    });
    res.json(disProduct);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });
    const matchPassword = await comparePassword(password, user.password);
    if (!user) {
      return res.json({ status: "user or password undifind" });
    } else if (!user.email) {
      return res.json({ status: "tai khoan chua kich hoat email" });
    } else if (!matchPassword) {
      return res.json({ status: " password khong thay" });
    } else {
      let token = jwt.sign({ id: user._id }, "projectlearn");
      if (user.role == "admin") {
        res.cookie("user", token, { expires: new Date(Date.now() + 900000) });
        res.json({ data: { token: token, role: user.role }, mess: "oke" });
      } else {
        res.json({ mess: "khong co quyen" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
exports.getListUser = async function (req, res) {
  try {
    let listUser = await usersModel.find();
    res.json(listUser);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async function (req, res) {
  try {
    let deleteUserInfor = await usersModel.deleteOne({
      _id: req.params.idUser,
    });
    res.json(deleteUserInfor);
  } catch (error) {
    console.log(error);
  }
};
