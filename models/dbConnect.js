const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/testproject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.connect("mongodb://localhost/k12nodemy_project", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });
module.exports = mongoose;
