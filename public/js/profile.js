$(function() {

// update profile page on load

	$.get("/api/user").
		done(function (user) {
			$("#firstName").val(user.firstName);
			$("#lastName").val(user.lastName);
			$("#city").val(user.city);
			$("#state").val(user.state);
			$("#country").val(user.country);
			$("#bio").val(user.bio);
			$("#email").val(user.email);
			$("#currentChallenge").val(user.currentChallenge);
			$("#submitLink").val(user.submitLink);
			var gravUrl = "http://www.gravatar.com/avatar/";
			$("#gravatarImg").attr("src", gravUrl + user.hashedEmail + "?s=200");
			var firstName = user.firstName;
			$("#pageHeader").html(firstName + "'s " + "Profile");
		});

// this is causing the app to crash when a new user is created

	$.get("/api/user/challengeTitle").
	done(function (title){
			$("#currentChallenge").val(title);
	});

// update profile page on submit

	$("#profileInfo").on("submit", function (err) {
		event.preventDefault();
		var $this = $(this);
		console.log($this);
		$.ajax({
			method: "PUT", 
			url:"/api/user", 
			data: $this.serialize(),
			success: function(data, textStatus, jqXHR) {
				$("#alert span").text("Your changes were saved.");
			}
		});	
	});
});