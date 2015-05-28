var mongoose = require("mongoose");

var challengeSchema = new mongoose.Schema({
					title: {
						type: String,
						required: true
					},
					description: {
						type: String
					},
					dueDate: {
						type: String
					},
					deadline: {
						type: Date
					},
					imgURL: {
						type: String
					},
					category: {
						type: String
					},
					skillLevel: {
						type: String
					},
					createdBy: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'User'
					},
					dateCreated: {
						type: Date,
						default: Date.now
					},
					displayStart: {
						type: Date
					},
					displayEnd: {
						type: Date
					}
});


var Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;