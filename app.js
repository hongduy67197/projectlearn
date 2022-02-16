const express = require("express");
const path = require("path");
const app = express();
const port = 3050;
app.use("/pub", express.static(path.join(__dirname, "./views")));
app.set('view engine', 'ejs');
// sign in
app.get('/signin', function(req, res) {
  res.render('signin');
});
// sign up
app.get('/signup', function(req, res) {
  res.render('signup');
});
// categories
app.get('/categories', function(req, res) {
  res.render('categories');
});
// index
app.get('/', function(req, res) {
  res.render('index');
});
// single
app.get('/single', function(req, res) {
  res.render('single');
});
// contact
app.get('/contact', function(req, res) {
  res.render('contact');
});
//
const Router = require("./routes");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use("/pub", express.static(path.join(__dirname, "./views")));
// parse application/json

app.use("/", Router);
app.get("*", (req, res) => {
  res.send("<h1>Invalid URL</h1>");
});
app.listen(port, () => {
  console.log(`Server listern in localhost: ${port}`);
});
