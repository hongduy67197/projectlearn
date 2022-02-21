const usersModel = require("../models/usersSchema");
const jwt = require("jsonwebtoken");

async function checkRoleUser(req, res, next) {
  try {
    let token = req.cookies.user;
    let id = jwt.verify(token, "projectlearn");
    let checkIdUser = await usersModel.findOne({ _id: id });
    if (checkIdUser.role == "admin") {
      next();
    } else {
      res.json({ mess: "ban khong co quyen" });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { checkRoleUser };
