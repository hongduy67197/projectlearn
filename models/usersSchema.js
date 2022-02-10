const mongoose = require("./dbConnect");

const usersSchema = mongoose.Schema(
  {
    role: { type: String, default: "user" },
    idcart: [{ type: String, ref: "carts" }],
    username: String,
    password: String,
    email: String,
    phone: String,
    sex: String,
    dob: Date,
    address: String,
    createDate: Date,
  },
  { collection: "users" }
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;

usersModel.create({
  username: "abciuefuwe",
});
