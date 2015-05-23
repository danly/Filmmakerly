var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./models");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname, "public")); //maybe /public

var views = path.join(__dirname, "views");

app.get("/", function (req, res) {
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
});

app.get("/signup", function (req, res) {
	var signupPath = path.join(views, "signup.html");
	res.sendFile(signupPath);
});

app.get("/login", function (req, res) {
	var loginPath = path.join(views, "login.html");
	res.sendFile(loginPath);
});

// app.get("/profile", function (req, res) {
// 	var profilePath = path.join(views, "profile.html");
// 	res.sendFile(profilePath);
// });

app.get("/profile", function (req, res) {
  res.send("COMING SOON");
});

app.post("/users", function (req, res) {
	var newUser = req.body.user;
	db.User.
	createSecure(newUser, function (err, user) {
		if (user) {
			res.send(user);
		} else {
			res.redirect("/signup");
		}
	});
});

app.post("/login", function (req, res) {
	var user = req.body.user;
	db.User.
	authenticate(user,
	function (err, user) {
		if (!err) {
			res.redirect("/profile");
		} else {
			res.redirect("/login");
		}
	}); 
});


app.listen(3000, function () {
	console.log("Running!");
});
