//CLIENT-SIDE
//challenges.js

// on page load
$(function() {
	// get and render the challenges
	Challenge.all();
});

//CHALLENGE OBJECT

function Challenge() {}

Challenge.all = function() {
	$.get("/api/challenges").
		done(function (challenges) {
		console.log(challenges);
		var templateHTML = $("#challenges-template").html();
		var compiledTemplate = _.template(templateHTML);
		var renderedTemplate = compiledTemplate({collection: challenges});
		$("#challenges-wrapper").html(renderedTemplate);	
	});
};

Challenge.addTitleToUser = function(challenge) {
	// if user's currentChallenge is null
    // when user clicks on "I Accept This Challenge" button
    // get title of challenge
    // and update user's currentChallenge with new challenge title
    console.log("Clicked!");
 //    var challengeTitle = $(challenge).data().id;
 //    console.log(challengeTitle);
 //    $.ajax({
 //        url: "api/user/" + currentChallenge,
 //        method: "PUT",
 //        data: $this.serialize(),
 //        success: function(res) {
 //            // once successful, add challenge title to user profile
 //            // something goes here
 //     }
 // });
};
