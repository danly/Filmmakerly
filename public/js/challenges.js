//CLIENT-SIDE
//challenges.js

$(function() {
	$.get("/api/challenges").
		done(function (challenges) {
		console.log(challenges);
		var templateHTML = $("#challenges-template").html();
		var compiledTemplate = _.template(templateHTML);
		var renderedTemplate = compiledTemplate({collection: challenges});
		$("#challenges-wrapper").html(renderedTemplate);	
	});

	// $("#profileInfo").on("submit", function (err) {
	// 	event.preventDefault();
	// });	
});