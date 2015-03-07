var http = require('http');
var md5 = require('MD5');

httpServer = http.createServer(function(req, res) { //Création du serveur http
	res.end("Hello World");
});
httpServer.listen("2901"); //écoute du serveur sur le port 2901

var io = require('socket.io').listen(httpServer);
var usersConnected = {}; //objet qui contiendra la liste de tous les utilisateurs connectés
var messagesPosted = []; //tableau qui contiendra les messages postés
var history = 20; //historiques des messages à garder en mémoire

//Ecoute des entrées et sorties http
io.sockets.on('connection', function(socket) { //un utilisateur est sur la page
	var me = false;

	/**
	 * À l'arrivée d'une personne sur la page
	 */
	for (var user in usersConnected) // indique tous les utilisateurs connectés
	{
		socket.emit("newUser", usersConnected[user]);
	}
	for (var msg in messagesPosted) // indique tous messages postés
	{
		socket.emit("newMsg", messagesPosted[msg]);
	}

	/**
	 * L'utilisateur s'identifie
	 */
	socket.on('login', function(user) {
		//Récupération des informations du formulaire
		me = user;
		me.id = user.mail.replace("@", "_").replace(/\./g, "_");
		me.avatar = "https://gravatar.com/avatar/" + md5(user.mail) + "?s=50";
		usersConnected[me.id] = me; //stocke l'utilisateur dans la liste des utilisateurs connectés

		//ENVOIS D'EVENEMENTS AU(X) CLIENT(S)
		//socket.emit("newUser"); //n'affecte que la personne connectée
		//socket.broadcast.emit("newUser"); //affecte tous les utilisateurs sauf celui courant
		io.sockets.emit("newUser", me); //affecte tous les utilisateurs même celui connecté : indique à tous les utilisateurs qu'un nouveau est arrivé
		socket.emit("logged", me); //indique à l'utilisateur courant qu'il est connecté : indique à l'utilisateur courant qu'il est identifié
	});

	/**
	 * L'utilisateur se déconnecte (quitte la page) : on va avertir tous les utilisateurs
	 */
	socket.on('disconnect', function() {
		if (!me) return false; //si l'utilisateur n'est pas loggué pas besoin de passer à la suite
		io.sockets.emit("disconnectUser", me);
		delete usersConnected[me.id];
	});


	/**
	 * L'utilisateur courant envoit un message
	 */
	socket.on("newMsg", function(message) {

		if (!me) { //si l'utilisateur n'est pas identifié, il ne peut pas envoyer de message
			socket.emit("errMsgNoLog");
			return;
		}

		//on donne des propriété à l'objet message reçu
		message.user = me; //le user emettant
		date = new Date();
		message.h = date.getHours(); //l'heure
		message.m = date.getMinutes() //les minutes

		//stocke le message dans le tableau de message postés
		messagesPosted.push(message);

		//vérifie la longueur de l'historique des messages
		if (messagesPosted.length > history) {
			messagesPosted.shift(); //supprime le plus ancien message stocké
		}

		//informe tous les utilisateurs du nouveau message
		io.sockets.emit("newMsg", message);

	});

});
