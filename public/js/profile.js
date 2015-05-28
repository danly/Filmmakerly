$(function() {
	$.get("/api/user").
		done(function (user) {
			console.log(user);
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