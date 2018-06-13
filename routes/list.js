var data = require('../app.js');
var express = require('express');
var router = express.Router();

var discord = data.discord;
var checkSignIn = discord.checkSignIn;

router.get('/', checkSignIn, function(req, res) {
	console.log(discord.users);
	res.render('list.ejs', {
		discord: discord.discord,
		username: req.session.user
	});
});

router.post('/', function(req, res) {
	res.redirect('/' + req.body.new_channel);
});

module.exports = router;
