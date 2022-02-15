const express = require("express");
const path = require("path");
const app = express();
const port = 3050;
const Router = require("./routes");
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());
app.get("*", (req, res) => {
  res.send("<h1>Invalid URL</h1>");
});

app.use("/pub", express.static(path.join(__dirname, "./views")));
app.use("/", Router);
app.listen(port, () => {
  console.log(`Server listern in localhost: ${port}`);
});
