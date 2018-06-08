var data = require('../app.js');
var express = require('express');
var path = require('path');
var router = express.Router();

var name = data.name;

router.get('/', function(req, res) {
	console.log("index : ", req.session.user);
	res.sendFile(path.join(__dirname, '../views', "./login.html"));
});

router.post('/', function(req, res) {
	if (name.indexOf(req.body.username) != -1)
		res.redirect('/');
	//res.sendFile(path.join(__dirname, '../views', "./login.html"));
	name.push(req.body.username);
	req.session.user = req.body.username;
	console.log("session.user : ", req.session.user);
	res.redirect("/list");
});

module.exports = router;
