// CLIENT-SIDE
//app.js

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
		});

	$("#profileInfo").on("submit", function (err) {
		event.preventDefault();
		var $this = $(this);
		$.ajax({
			method: "PUT", 
			url:"/api/user", 
			data: $this.serialize(),
			success: function(data, textStatus, jqXHR) {
				alert("Everything was okay");
			}
		});	
	});
});