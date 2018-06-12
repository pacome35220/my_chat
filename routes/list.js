var data = require('../app.js');
var express = require('express');
var router = express.Router();

var discord = data.discord;
var checkSignIn = discord.checkSignIn;

router.get('/', checkSignIn, function(req, res) {
	res.render('list.ejs', {
		discord: discord.discord,
		username: req.session.user
	});
});

router.post('/', function(req, res) {
	if (req.body.new_channel.match(/\S/))
		res.redirect('/' + req.body.new_channel);
	else
		res.redirect('/list');
});

module.exports = router;
