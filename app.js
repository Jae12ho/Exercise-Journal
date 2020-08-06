var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

const mongoose = require("mongoose");

const userCtrl = require("./api/user/user.ctrl");

mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", function () {
  console.log("Database Connected");
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(userCtrl.checkAuth);

app.get("/", (req, res) => {
  res.render("index");
});

// 라우팅 모듈 설정
app.use("/api", require("./api")); // api/index

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  console.log(err);
});

module.exports = app;
