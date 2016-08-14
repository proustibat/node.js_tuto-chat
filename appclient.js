(function($) {

	var socket = io.connect('http://192.168.1.42:2901');
	var msgtpl = $("#msgtpl").html(); //stocke le code html d'une div de message
	$("#msgtpl").remove(); //supprime la div


	/**
	 *	Quand l'utilisateur courant soumet le formulaire de connection
	 */
	$('#loginform').submit(function(event) {
		event.preventDefault(); //empêche l'utilisateur de soumettre le formulaire
		socket.emit("login", {
			username: $('#username').val(),
			mail: $('#mail').val()
		})
	});

	/**
	 *	Quand l'utilisateur courant est identifié : enlève le formulaire de connection et affiche un message de bienvenue
	 */
	socket.on("logged", function(me) {
		$("#loginform").before("<div id ='welcome'><p>Bienvenue " + me.username + " !</p></div>");
		var welcomeMessage = $("#welcome");
		welcomeMessage.hide();
		$("#loginform").fadeOut(300);
		welcomeMessage.fadeIn(400);
		$("#message").focus();
	});


	/**
	 *	Quand un nouvel utilisateur se connecte
	 */
	socket.on("newUser", function(user) {
		// console.log("==>"+user.avatar);
		$("#users").append("<img src='" + user.avatar + "' id='" + user.id + "' alt='" + user.username + "' title='" + user.username + "' >");
	});

	/**
	 *	Quand un utilisateur se déconnecte
	 */
	socket.on("disconnectUser", function(user) {
		console.log("UN UTILISATEUR EST PARTI : " + user.id + ($("#" + user.id)));
		//retire son image
		$("#" + user.id).remove();
	});



	/**
	 *	Envoi de message
	 */
	$('#form').submit(function(event) {
		event.preventDefault(); //empêche l'utilisateur de soumettre le formulaire
		socket.emit("newMsg", {
			message: $("#message").val()
		});
		$("#message").val('');
		$("#message").focus();
	});


	/**
	 *	Quand l'utilisateur reçoit le message d'erreur parce qu'il a essayé d'envoyer un message sans être identifié
	 */
	socket.on("errMsgNoLog", function() {
		alert("Il faut s'identifier pour pouvoir envoyer un message ! ");
	});


	/**
	 *	Réception d'un message d'un utilisateur
	 */
	socket.on("newMsg", function(message) {
		Mustache.render(msgtpl, message); //injecte le message dans le template
		$("#messages").prepend("<div class='message'>" + Mustache.render(msgtpl, message) + "</div>");
	});


})(jQuery);
