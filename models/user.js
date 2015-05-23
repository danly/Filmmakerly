var mongoose = require("mongoose");

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
						type: String,
					},
					state: {
						type: String,
					},
					country: {
						type: String,
					},
					bio: {
						type: String,
					},
					gravatar: {
						type: String,
					},
					link: {
						type: String,
					},
					currentChallenge: {
						type: String
					}
});

var User = mongoose.model("User", userSchema);

module.exports = User;