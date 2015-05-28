var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var md5 = require("MD5");

var userSchema = new mongoose.Schema({
					email: {
						type: String,
						lowercase: true,
						required: true,
						index: {
							unique: true
						}
					},
					passwordDigest: {
						type: String,
						required: true
					},
					firstName: {
						type: String,
						default: ""
					},
					lastName: {
						type: String,
						default: ""
					},
					city: {
						type: String
					},
					state: {
						type: String
					},
					country: {
						type: String
					},
					bio: {
						type: String
					},
					hashedEmail: {
						type: String
					},
					gravatar: {
						type: String
					},
					currentChallenge: {
						type: String,
						ref: 'Challenge'
					},
					submitLink: {
						type: String
					}
});

var confirm = function (pswrd, pswrdCon) {
	return pswrd === pswrdCon;
};

userSchema.statics.createSecure = function (params, cb) {
	var isConfirmed;

	isConfirmed = confirm(params.password, params.password_confirmation);

	if (!isConfirmed) {
		// update message bar with error on frontend
		return cb("Passwords should match", null);
	}

	var that = this;

	bcrypt.hash(params.password, 12, function (err, hash) {
		params.hashedEmail = that.hashEmail(params);
		params.passwordDigest = hash;
		that.create(params, cb);
	});
};

userSchema.statics.authenticate = function (params, cb) {
	this.findOne({
		email: params.email
	},
	function (err, user) {
		user.checkPswrd(params.password, cb);
	});
};

userSchema.methods.checkPswrd = function(password, cb) {
	var user = this;
	bcrypt.compare(password,
		this.passwordDigest, function (err, isMatch) {
			if (isMatch) {
				cb(null, user);
			} else {
				cb("Oops", null);
			}
		});
};

userSchema.statics.hashEmail = function (params) {
	var emailTrimmedAndLowerCase = params.email.trim().toLowerCase();
	var emailHashed = md5(emailTrimmedAndLowerCase);
	console.log(emailHashed);
	return emailHashed;
};


var User = mongoose.model("User", userSchema);

module.exports = User;
