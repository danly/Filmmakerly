var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var session = require("express-session");
var db = require("./models");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("bower_components"));
app.use(express.static("node_modules"));

app.use(session({
	secret: "SUPER STUFF",
	resave: false,
	saveUninitialized: true
}));

var loginHelpers = function (req, res, next){
	
	req.login = function (user) {
		req.session.userId = user._id;
		req.user = user;
		return user;
	};

	req.logout = function () {
		req.session.userId = null;
		req.user = null;
	};

	req.currentUser = function (cb) {
		var userId = req.session.userId;
		db.User.
			findOne({
				_id: userId
			}, cb);
	};
	next();	
};

app.use(loginHelpers);

// app.use("/api", function (req, res, next) {
// 	req.currentUser(function )
// })

var views = path.join(__dirname, "views");

app.get("/", function (req, res) {
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
});

// login user

app.get("/login", function (req, res) {
	var loginPath = path.join(views, "login.html");
	res.sendFile(loginPath);
});

// send user to profile page if logged in

app.get("/profile", function (req, res) {
	if (!req.session.userId) {
		res.redirect("/login");
	} else {
		var profilePath = path.join(views, "profile.html");
  		req.currentUser(function (err, user) {
  			if (!err) {
  				res.sendFile(profilePath);
  			} else {
  				res.redirect("/login");
  			}
  		});
	}	
});

// logout user

app.get("/logout", function (req, res){
	req.logout();
	res.redirect("/");
});

// create a new user at signup, redirect to profile page

app.post("/users", function (req, res) {
	var newUser = req.body.user;
	db.User.
	createSecure(newUser, function (err, user) {
		if (user) {
			req.login(user);
			res.redirect("/profile");
		} else {
			res.redirect("/signup");
		}
	});
});

// authenticate the user at login

app.post("/login", function (req, res) {
	var user = req.body.user;
	db.User.
	authenticate(user,
	function (err, user) {
		if (!err) {
			req.login(user);
			res.redirect("/profile");
		} else {
			res.redirect("/login");
		}
	}); 
});

// get all user's profile data for profile page (minus their password)

app.get("/api/user", function (req, res) {
	if (!req.session.userId) {
		res.redirect("/login");
	} else {
	db.User.
		findOne({
			"_id": req.session.userId
		}).
		select("-passwordDigest").
		exec(function (err, user) {
			res.send(user);
		});
	}
});

// update user profile when changes are saved

app.put("/api/user", function (req, res) {
	var updateProfile = req.body.user;
	db.User.update({
		_id: req.session.userId
	}, updateProfile, function (err, user) {
		console.log("The update error is:", err);
		res.send(user);
	});
});

// update challenge title on profile page when a challenge is selected on challenge page

app.get("/api/user/challengeTitle", function (req, res){
	var userId = req.session.userId;
	db.User.
	findById(userId)
	.populate("currentChallenge")
	.exec(function (err, user) {
		res.send(user.currentChallenge.title);
	});
});

// update current challenge in database with selected challengeId

app.put("/api/user/:currentChallenge", function (req, res) {
	var userId = req.session.userId;
	var challengeId = req.params.currentChallenge;
	console.log("The user is:", req.session.userId);
	console.log("The challengeId is:", challengeId);
	db.User.findByIdAndUpdate(userId,
		{currentChallenge: challengeId}, {new: true}, function (err, user) {
		console.log("The error is:", err);
		console.log("The user is:", user);
		res.send(user);
	});
});

// show challenges if user logged in

app.get("/challenges", function (req, res) {
	if (!req.session.userId) {
		res.redirect("/login");
	} else {
	var challengePath = path.join(views, "challenges.html");
	res.sendFile(challengePath);
	}
});

// get all challenges from database

app.get("/api/challenges", function (req, res) {
	if (!req.session.userId) {
		res.redirect("/login");
	} else {
		db.Challenge.
		find({}, function (err, challenge) {
			res.send(challenge);
		});
	}
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Running!");
});
