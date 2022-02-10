const express = require("express");
const path = require("path");
const app = express();
const port = 3050;
const Router = require("./routes");
app.get("*", (req, res) => {
    res.send("<h1>Invalid URL</h1>");
  });

app.listen(port, ()=>{
    console.log(`Server listern in localhost: ${port}`);
});
