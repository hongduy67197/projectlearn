const mongoose = require("./dbConnect");
const productModel = require("./productSchema");
const ordersSchema = mongoose.Schema(
  {
    listProducts: [
      {
        idproduct: { type: String, ref: "product", required: true },
        quantity: Number,
        totalIprice: Number,
      },
    ],
    iduser: [{ type: String, ref: "users" }],
    address: String,
    orderPrice: Number,
    phone: String,
    createDate: Date,
    status: {
      type: String,
      enum: ["waiting", "doing", "done"],
      required: true,
      trim: true,
    },
  },
  { collection: "orders" }
);

let ordersModel = mongoose.model("orders", ordersSchema);

module.exports = ordersModel;
