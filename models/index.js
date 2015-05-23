var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/filmmakerly");

module.exports.User = require("./user");

// module.exports.Challenge = require ("./challenge");

