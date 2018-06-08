var data = require('../app.js');
var express = require('express');
var router = express.Router();

function checkSignIn(req, res, next) {
	if (req.session.user)
		next();
	else
		next("Not logged in !");
}

router.get('/', checkSignIn, function(req, res) {
	console.log("list : ", req.session.user);
	res.render('list.ejs', {
		discord: data.discord
	});
});

router.post('/', function(req, res) {
	res.redirect("/" + req.body.new_channel);
});

module.exports = router;