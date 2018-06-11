var data = require('../app.js');
var express = require('express');
var router = express.Router();

var discord = data.discord;

router.get('/', function(req, res) {
	res.render("index.ejs");
});

router.post('/', function(req, res) {
	if (discord.users.indexOf(req.body.username) == -1)
		discord.add_user(req.body.username);
	req.session.user = req.body.username;
	res.redirect("/list");
});

module.exports = router;
