var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./models");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

var views = path.join(__dirname, "views");

app.get("/", function (req, res) {
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
});

app.get("/signup", function (req, res){
	var signupPath = path.join(views, "signup.html");
	res.sendFile(signupPath);
});

app.post("/users", function (req, res){
	var newUser = req.body.user;
	db.User.
	createSecure(newUser, function (err, user){
		if (user) {
			res.send(user);
		} else {
			res.redirect("/signup");
		}
	});
});

app.listen(3000, function () {
	console.log("Running!");
});
