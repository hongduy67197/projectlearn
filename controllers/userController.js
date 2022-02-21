const productModel = require("../models/productSchema");
const productCodeModel = require("../models/productCodesSchema");
const catagoriesModel = require("../models/catagoriesSchema");
const cartsModel = require("../models/cartsSchema");
const ordersModel = require("../models/ordersSchema");
const usersModel = require("../models/usersSchema");
const { hashPassword, comparePassword } = require("../services/auth");
const { generateCode, sendEmail } = require("../utils/utils");
const { CodeCheck } = require("../utils/utils");
const codeCheck = new CodeCheck();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
exports.register = async function (req, res) {
  try {
    const { password, email } = req.body;

    // const alreadyExistUser = await usersModel.findOne({ username });
    const alreadyExistEmail = await usersModel.findOne({ email });

    // if (alreadyExistUser) {
    //   return res.status(400).json({ status: "username da co" });
    // } else
    if (alreadyExistEmail) {
      return res.status(400).json({ status: "email da co" });
    } else {
      const hashed = await hashPassword(password);
      const newUser = await usersModel.create({
        // username,
        password: hashed,
      });
      const newCart = await cartsModel.create({
        iduser: newUser._id,
      });
      codeCheck.setCode(generateCode());
      await sendEmail(newUser._id, email, codeCheck.getCode());
      newUser.code = codeCheck.getCode();
      await newUser.save();
      res.status(200).json({ message: "check email" });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.params;
    const user = await usersModel.findOne({ code }).catch((err) => {
      console.log(err);
    });
    user.email = email;
    user.code = null;
    await user.save();

    return res.status(200).send("Dang ky thanh cong");
  } catch (e) {
    return res.status(400).send({ message: e });
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
      res.cookie("user", token, { expires: new Date(Date.now() + 900000) });
      res.json({ data: { token: token, role: user.role }, mess: "oke" });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.editUserInfor = async function (req, res) {
  try {
    let userEdit = await usersModel.updateOne(
      { _id: req.params.idUser },
      {
        username: req.body.username,
        phone: req.body.phone,
        sex: req.body.sex,
        address: req.body.address,
      }
    );
    res.json(userEdit);
  } catch (error) {
    console.log(error);
  }
};

exports.getList = async function (req, res) {
  try {
    // const listCatagory = await catagoriesModel.find();
    let product = await productModel.find({
      idCatagories: req.query.idCatagories,
    });
    const listCatagory = await catagoriesModel.find();
    let cartId = req.query.cartId;
    // let orderlist = await ordersModel
    //   .find({ _id: orderId })
    //   .populate("listProducts.idproduct");
    // let userid = await usersModel.find();
    // let listproduct = await productModel.find({});
    let cart = await cartsModel
      .find({ _id: cartId })
      .populate("listProducts.idproduct");
    // console.log(cart.listProducts);
    let listData = {
      product: product,
      // orderlist: orderlist,
      cart: cart,
      listCatagory,
      // listproduct: listproduct,
      // iduser: userid,
    };
    res.json(listData);
    console.log(25, cart[0]);
    // res.render("cart.ejs", listData);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getListOrderUser = async function (req, res) {
  try {
    let listOrder = await ordersModel
      .find({ iduser: req.params.iduser })
      .populate("listProducts.idproduct");
    res.json(listOrder);
  } catch (error) {
    console.log(error);
  }
};

exports.createorder = async function (req, res) {
  try {
    let listsp = await cartsModel.find({ iduser: req.body.iduser });
    console.log(70, listsp[0].listProducts);
    let a;
    a = listsp[0].listProducts;
    let newDate = new Date();
    console.log(73, a);
    let newOrder = await ordersModel.create({
      listProducts: a,
      iduser: req.body.iduser,
      status: req.body.status,
      createDate: newDate,
      status: "waiting",
    });
    let olderQuality = listsp[0].listProducts;
    for (let elm of olderQuality) {
      let CartQuality = elm.quantity;
      console.log(83, -CartQuality, elm.idproduct);
      await productModel.updateOne(
        {
          _id: elm.idproduct,
        },
        {
          $inc: { quality: -CartQuality },
        }
      );
    }
    console.log(123, olderQuality);
    let clearCartUser = await cartsModel.updateOne(
      {
        iduser: req.body.iduser,
      },
      { listProducts: [] }
    );
    res.json(newOrder);
  } catch (error) {
    console.log(error);
  }
};

exports.updatecart = async function (req, res) {
  try {
    let idproductes = req.body.idproductes;
    let quantity = req.body.quantity;
    let searchproduct = await cartsModel.findOne({
      _id: req.query.cartId,
    });

    console.log(80, req.body);
    let oldquantity;
    for (let i = 0; i < searchproduct.listProducts.length; i++) {
      if (idproductes === searchproduct.listProducts[i].idproduct) {
        oldquantity = searchproduct.listProducts[i].quantity;
      }
    }
    if (oldquantity) {
      // console.log(91, "if");
      // let newQuantity = oldquantity * 1 + quantity * 1;
      let newQuantity = quantity;
      console.log(87, newQuantity);
      let updatecartquantity = await cartsModel.updateOne(
        { _id: req.query.cartId, "listProducts.idproduct": idproductes },
        { $set: { "listProducts.$.quantity": newQuantity } }
        // $. trong "listProducts.$.quantity" su dung de truy van den "listProducts.idproduct"
      );
      res.json(updatecartquantity);
    } else {
      console.log(101, "else");

      let fixcartes = await cartsModel.updateOne(
        { _id: req.query.cartId },
        {
          cartsPrice: req.body.cartsPrice,
          $push: {
            listProducts: {
              idproduct: idproductes,
              quantity: quantity,
            },
          },
        }
      );
      res.json(fixcartes);
    }
  } catch (error) {
    console.log(100, error);
  }
};

exports.updatecarqua = function (req, res) {
  cartsModel
    .updateOne(
      { _id: req.query.cartId, "listProducts.idproduct": req.body.idproduct },
      {
        $pull: {
          listProducts: {
            idproduct: req.body.idproduct,
          },
        },
      }
    )
    .then(() => {
      cartsModel
        .updateOne(
          {
            _id: req.query.cartId,
            // "listProducts.idproduct": req.body.idproduct,
          },
          {
            $push: {
              listProducts: {
                idproduct: req.body.idproduct,
                quantity: req.body.quantity,
              },
            },
          }
        )
        .then((data) => {
          res.json(data);
        });
      // .catch((err) => {
      //   res.json(err);
      // });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

exports.deletacard = async function (req, res) {
  try {
    let detecard = await cartsModel.updateOne(
      { _id: req.query.cartId, "listProducts.idproduct": req.body.idproduct },
      {
        $pull: {
          listProducts: {
            idproduct: req.body.idproduct,
          },
        },
      }
    );
    res.json(detecard);
    console.log(detecard);
  } catch (error) {
    console.log(error);
  }
};

exports.getidcard = async function (req, res) {
  try {
    let userid = req.params.userid;

    let cardid = await cartsModel.find({ iduser: userid });
    // console.log(cardid);
    res.json(cardid[0]._id);
  } catch (error) {
    console.log(error);
  }
};

exports.getidproduct = async function (req, res) {
  let seaidpro = await productModel.find({
    productCode: req.query.namesp,
    productName: req.query.productName,
    color: req.query.color,
    size: req.query.size,
  });
  res.json(seaidpro);
};
