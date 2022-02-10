const mongoose = require("./dbConnect");
const catagoriesSchema = mongoose.Schema(
  {
    catagoriesName: String,
  },
  { collection: "catagories" }
);

let catagoriesModel = mongoose.model("catagories", catagoriesSchema);

module.exports = catagoriesModel;
