const mongoose = require("./dbConnect");
const cartsSchema = mongoose.Schema(
  {
    listProducts: [
      { idproduct: { type: String, ref: "product" }, quantity: Number },
    ],
    cartsPrice: Number,
    iduser: { type: String, ref: "users" },
  },
  { collection: "carts" }
);

let cartsModel = mongoose.model("carts", cartsSchema);

module.exports = cartsModel;
