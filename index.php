<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>Chat Node JS Test</title>
		<meta name="description" content="" />
        <link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/mobile.css">
        <link rel="stylesheet" href="css/main.css">
	</head>

	<body>
		<div>
			<header>
				<h1>Node JS test Chat</h1>
			</header>

			<div>

				<!-- formulaire de connection -->
				<form action="" id="loginform">
					<input type="text" name="username" id="username" placeholder="Nom d'utilisateur">
					<input type="mail" name="mail" id="mail" placeholder="e-mail">
					<input class="btn" type="submit" value="Se connecter">
				</form>

				<!--<div id ="welcome"><p>Bienvenue Proustibat !</p></div>-->

				<!-- utilisateurs connectés -->
				<div id="sidebar">
					<div id="users"><h1>Utilisateurs connectés</h1></div>
				</div>

				<!-- contenu du milieu -->
				<div id="content">

					<!-- formulaire pour poster un message -->
					<form action="" id="form">
						<input type="text" id="message" class="text"/>
						<input type="submit" id="send" value="Envoyer mon message !" class="submit"/>
					</form>

					<!-- messages des utilisateurs -->
					<div id="messages">
						<div class="message" id="msgtpl" style="display: none;">
							 <img src="{{{user.avatar}}}">
							 <div class="info">
							 	<p><strong>{{user.username}}</strong></p>
							 	<p>{{message}}</p>
							 	<span class="date">{{h}}:{{m}}</span>
							 </div>
						</div><!--end of message-->
					</div>

				</div>
			</div>
		</div>

	    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
	    <script src="js/mustache.js"></script>
	    <script src="https://cdn.socket.io/socket.io-1.3.4.js"></script>
	    <script src="appclient.js"></script>
	</body>
</html>
