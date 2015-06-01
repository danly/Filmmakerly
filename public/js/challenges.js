//CLIENT-SIDE
//challenges.js

// on page load
$(function() {
	// get and render the challenges
	Challenge.all();
});

//CHALLENGE OBJECT

function Challenge() {}

// render all challenges into template

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


// when user clicks on "I Accept This Challenge" button
// get the challenge's id and save to user's currentChallenge

Challenge.getChallengeId = function(challenge) {
    event.preventDefault();
    var challengeId = $(challenge).data().id;
    console.log(challengeId);
    $.ajax({
        url: "/api/user/" + challengeId,
        method: "PUT",
        success: function(res) {
            // once successful, add challenge title to user profile
            console.log("You chose a challenge.");
     	}
 	});
};