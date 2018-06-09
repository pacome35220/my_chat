var data = require('../app.js');
var express = require('express');
var router = express.Router();

var name = data.name;

router.get('/', function(req, res) {
	res.render("index.ejs");
});

router.post('/', function(req, res) {
	if (name.indexOf(req.body.username) != -1)
		res.redirect('/');
	else {
		name.push(req.body.username);
		req.session.user = req.body.username;
		res.redirect("/list");
	}
});

module.exports = router;
