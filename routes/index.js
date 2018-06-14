var data = require('../app.js');
var express = require('express');
var router = express.Router();

var discord = data.discord;

router.get('/', function(req, res) {
	res.render("index.ejs");
});

router.post('/', function(req, res) {
	var user = req.body.username;

	if (user.length < 20 && user.match(/^[a-zA-Z][a-zA-Z0-9 -_]*[a-zA-Z0-9]+$/)) {
		if (discord.users.indexOf(user) == -1)
			discord.add_user(user);
		req.session.user = user;
		console.log(discord.users);
		res.redirect("/list");
	} else
		res.redirect('/');
});

module.exports = router;
