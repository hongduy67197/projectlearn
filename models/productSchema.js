const mongoose = require("./dbConnect");
const productSchema = mongoose.Schema(
  {
    idCatagories: [{ type: String, ref: "catagories" }],
    productName: String,
    productCode: String,
    ListImg: [{ type: String }],
    price: Number,
    quality: Number,
    info: [{ infoTitle: String, infoValue: String }],
    description: String,
    color: String,
    size: String,
    createDate: Date,
  },
  { collection: "product" }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
