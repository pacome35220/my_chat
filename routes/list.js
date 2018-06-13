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
	var new_channel = req.body.new_channel;

	if (new_channel.length < 25 && new_channel.match(/^[a-zA-Z]+$/))
		res.redirect('/' + new_channel);
	else
		res.redirect('/list');
});

module.exports = router;
